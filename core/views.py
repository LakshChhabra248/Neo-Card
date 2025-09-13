# core/views.py

from django.shortcuts import render
from .models import Student, Teacher, UtilityStaff, Transaction
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.hashers import make_password, check_password
from decimal import Decimal
from django.utils import timezone


# Yeh function 'index.html' page ko render karega (dikhayega)
def index(request):
    return render(request, 'index.html')

# Yeh function 'login.html' page ko render karega
def login(request):
    return render(request, 'login.html')

# Yeh function 'utilities.html' page ko render karega
def utilities(request):
    return render(request, 'utilities.html')

def signup_view(request):
    if request.method == 'POST':
        role = request.POST.get('role')
        name = request.POST.get('name')
        password = request.POST.get('password')
        hashed_password = make_password(password)
        email = request.POST.get('email_id')
        phone = request.POST.get('phone_no')

        # Pehle object ko 'loginId' ke bina save karo
        new_user = None
        if role == 'student':
            new_user = Student.objects.create(
                name=name, password=hashed_password, email_id=email, phone_no=phone
            )
        elif role == 'teacher':
            new_user = Teacher.objects.create(
                name=name, password=hashed_password, email=email
            )
        elif role == 'utility':
            new_user = UtilityStaff.objects.create(
                name=name, password=hashed_password
            )
        else:
            messages.error(request, 'Invalid role selected.')
            return redirect('signup')

        # Ab ID generate karo
        prefix = {'student': 'STU', 'teacher': 'TEA', 'utility': 'UTI'}.get(role)
        name_part = name[:3].upper()
        unique_id_part = str(new_user.id) # Database se mila unique ID
        
        generated_id = f"{prefix}_{name_part}_{unique_id_part}"

        # Ab object ko generated ID ke saath update karo
        new_user.loginId = generated_id
        new_user.save()

        # User ko uska naya ID batao
        request.session['generated_id'] = generated_id
        return redirect('signup_success')

    return render(request, 'signup.html')


def signup_success_view(request):
    generated_id = request.session.pop('generated_id', None)
    if not generated_id:
        return redirect('login') # Agar direct access kare to login par bhej do
    
    context = {
        'generated_id': generated_id
    }
    return render(request, 'signup_success.html', context)

# core/views.py

def login_view(request):
    if request.method == 'POST':
        login_id = request.POST.get('loginId')
        password_from_form = request.POST.get('password') # User ka daala hua password
        category = request.POST.get('category')

        user = None
        redirect_url_name = ''

        # Category ke hisaab se user ko dhoondo (sirf loginId se)
        Model = None
        if category == 'student': Model = Student
        elif category == 'teacher': Model = Teacher
        elif category == 'utilities': Model = UtilityStaff
        
        try:
            # Sirf loginId se user ko dhoondhne ki koshish karo
            user = Model.objects.get(loginId=login_id)
        except (Model.DoesNotExist, TypeError):
            user = None

        # Ab check karo ki user mila aur password sahi hai ya nahi
        if user is not None and check_password(password_from_form, user.password):
            # check_password(plain_password, hashed_password) -> True ya False
            
            # Login successful!
            request.session['user_id'] = user.loginId
            request.session['user_role'] = category

            if category == 'student': redirect_url_name = 'students'
            elif category == 'teacher': redirect_url_name = 'teachers'
            elif category == 'utilities': redirect_url_name = 'utilities'
            
            return redirect(redirect_url_name)
        else:
            # Login failed
            messages.error(request, 'Invalid Login ID or Password.')
            return redirect('login')

    return render(request, 'login.html')

def students(request):
    user_id = request.session.get('user_id')
    user_role = request.session.get('user_role')

    if not user_id or user_role != 'student':
        messages.error(request, 'Please log in as a student to view this page.')
        return redirect('login')

    try:
        student_data = Student.objects.get(loginId=user_id)
        
        # --- YAHAN PAR NAYA CODE ADD HUA HAI ---
        # Uss student ke saare transactions ko dhoondo, sabse naye wale pehle
        transactions_qs = Transaction.objects.filter(student=student_data).order_by('-timestamp')

        transactions = []
        for trx in transactions_qs:
            # Agar 'items' mein "Recharge" shabd hai, to yeh credit hai
            if "Recharge" in trx.items:
                trx_type = 'credit'
            else:
                trx_type = 'debit'
            
            transactions.append({
                'object': trx,
                'type': trx_type,
            })

    except Student.DoesNotExist:
        messages.error(request, 'Student profile not found.')
        return redirect('login')
    
    # Context mein ab student ke saath transactions bhi bhejo
    context = {
        'student': student_data,
        'transactions': transactions, # Naya data
    }
    
    return render(request, 'students.html', context)

def update_profile_view(request):
    # Check karo ki user logged in hai ya nahi
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    # Logged in user ka data database se nikaalo
    try:
        student = Student.objects.get(loginId=user_id)
    except Student.DoesNotExist:
        # Agar user nahi milta, to session clear karke login par bhej do
        request.session.flush()
        return redirect('login')

    if request.method == 'POST':
        # Form se naya data lo
        student.name = request.POST.get('name')
        student.email_id = request.POST.get('email_id')
        student.student_class = request.POST.get('student_class')
        student.roll_no = request.POST.get('roll_no')
        student.school_name = request.POST.get('school_name')
        student.phone_no = request.POST.get('phone_no')
        student.father_name = request.POST.get('father_name')
        student.mother_name = request.POST.get('mother_name')
        
        # Data ko database mein save kardo
        student.save()
        
        # Success ka message dekar wapas dashboard par bhej do
        messages.success(request, 'Profile updated successfully!')
        return redirect('students')

    # Agar 'GET' request hai, to form ko user ke data ke saath dikha do
    context = {'student': student}
    return render(request, 'update_profile.html', context)

def logout_view(request):
    # Session se saara data clear kar do
    request.session.flush()
    
    # User ko login page par redirect kar do
    return redirect('login')

def teachers(request):
    # Check karo ki user logged in hai aur role 'teacher' hai
    user_id = request.session.get('user_id')
    user_role = request.session.get('user_role')

    if not user_id or user_role != 'teacher':
        messages.error(request, 'Please log in as a teacher to view this page.')
        return redirect('login')

    try:
        # Database se teacher ka data nikaalo
        teacher_data = Teacher.objects.get(loginId=user_id)
    except Teacher.DoesNotExist:
        messages.error(request, 'Teacher profile not found.')
        return redirect('login')
    
    # Data ko context dictionary mein daalo
    context = {
        'teacher': teacher_data
    }
    
    # Data ko template (teachers.html) ko bhej do
    return render(request, 'teachers.html', context)


def update_teacher_profile_view(request):
    # Check karo ki user logged in hai aur role teacher hai
    user_id = request.session.get('user_id')
    user_role = request.session.get('user_role')

    if not user_id or user_role != 'teacher':
        return redirect('login')

    # Logged in teacher ka data database se nikaalo
    try:
        teacher = Teacher.objects.get(loginId=user_id)
    except Teacher.DoesNotExist:
        request.session.flush()
        return redirect('login')

    if request.method == 'POST':
        # Form se naya data lo
        teacher.name = request.POST.get('name')
        teacher.email = request.POST.get('email')
        teacher.subjects = request.POST.get('subjects')
        
        # Data ko database mein save kardo
        teacher.save()
        
        # Success ka message dekar wapas dashboard par bhej do
        messages.success(request, 'Profile updated successfully!')
        return redirect('teachers')

    # Agar 'GET' request hai, to form ko teacher ke data ke saath dikha do
    context = {'teacher': teacher}
    return render(request, 'update_teacher_profile.html', context)


import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def get_student_info(request):
    # Yeh function student ID lekar uska naam aur balance batayega
    student_id = request.GET.get('student_id')
    try:
        student = Student.objects.get(loginId=student_id)
        data = {
            'status': 'success',
            'name': student.name,
            'balance': student.balance,
        }
    except Student.DoesNotExist:
        data = {'status': 'error', 'message': 'Student not found'}
    
    return JsonResponse(data)

@csrf_exempt
def process_transaction(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        student_id = data.get('student_id')
        total_amount = data.get('total_amount') # Yeh abhi bhi float ya string ho sakta hai
        bill_items = data.get('bill_items')

        try:
            student = Student.objects.get(loginId=student_id)
            
            # YAHAN PAR DATA TYPE CONVERSION KARO
            total_amount_decimal = Decimal(total_amount)
            
            if student.balance < total_amount_decimal:
                return JsonResponse({'status': 'error', 'message': 'Insufficient balance!'})

            # Balance update karo (ab dono Decimal hain)
            student.balance -= total_amount_decimal
            student.save()
            
            # Transaction record banao
            Transaction.objects.create(
                student=student,
                amount=total_amount_decimal,
                items=json.dumps(bill_items)
            )
            
            return JsonResponse({
                'status': 'success', 
                'message': 'Payment successful!',
                'new_balance': student.balance
            })
        except Student.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Student not found'})
        except Exception as e:
            # Koi aur unexpected error aaye to usko bhi handle karo
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})

def initiate_recharge(request):
    if request.method == 'POST':
        amount = request.POST.get('amount')
        user_id = request.session.get('user_id')

        if not user_id:
            return redirect('login')

        # Amount aur user_id ko session mein save kar lo taaki success page par use kar sakein
        request.session['recharge_amount'] = amount
        
        # Ek dummy context banao
        context = {
            'amount': amount,
            'student_name': Student.objects.get(loginId=user_id).name,
            'order_id': f"ORD_{user_id}_{int(timezone.now().timestamp())}" # Ek dummy order ID
        }
        # User ko dummy payment page par bhej do
        return render(request, 'dummy_payment_page.html', context)
    return redirect('students')


def recharge_success(request):
    # Session se amount aur user_id nikaalo
    amount_str = request.session.pop('recharge_amount', None)
    user_id = request.session.get('user_id')

    if not user_id or not amount_str:
        messages.error(request, 'Something went wrong. Please try again.')
        return redirect('students')

    try:
        student = Student.objects.get(loginId=user_id)
        amount = Decimal(amount_str)

        # Student ka balance update karo
        student.balance += amount
        student.save()

        # Recharge ka transaction bhi save karo
        Transaction.objects.create(
            student=student,
            amount=amount, # Positive amount for recharge
            items=f"Recharge of ₹{amount}"
        )
        
        messages.success(request, f"Recharge of ₹{amount} was successful!")
    except (Student.DoesNotExist, ValueError):
        messages.error(request, "Could not process the recharge.")

    return redirect('students')
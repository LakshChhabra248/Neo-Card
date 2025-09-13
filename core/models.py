from django.db import models

# Student Model
class Student(models.Model):
    #loginId is the primary key and will be unique for each student.
    loginId = models.CharField(max_length=50, unique=True, null=True, blank=True)
    password = models.CharField(max_length=100)  # Passwords should be stored securely in a real app
    
    name = models.CharField(max_length=100, verbose_name="Name")
    student_class = models.CharField(max_length=20, verbose_name="Class")
    roll_no = models.CharField(max_length=20, verbose_name="Roll No.")
    school_name = models.CharField(max_length=200, verbose_name="School Name")
    father_name = models.CharField(max_length=100, verbose_name="Father's Name")
    mother_name = models.CharField(max_length=100, verbose_name="Mother's Name")
    phone_no = models.CharField(max_length=15, verbose_name="Phone No.")
    email_id = models.EmailField(verbose_name="Email Id")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.name} ({self.loginId})"


# Teacher Model
class Teacher(models.Model):
    loginId = models.CharField(max_length=50, unique=True, null=True, blank=True)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subjects = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name} ({self.loginId})"

# Utilities Model (for canteen/store staff)
class UtilityStaff(models.Model):
    loginId = models.CharField(max_length=50, unique=True, null=True, blank=True)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default="Canteen Staff") # e.g., Canteen, Stationery

    def __str__(self):
        return f"{self.name} ({self.loginId})"
    
class Transaction(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    items = models.TextField() # Bill mein kya-kya tha, usko text ke roop mein save karenge

    def __str__(self):
        return f"Transaction for {self.student.name} of ₹{self.amount} at {self.timestamp}"
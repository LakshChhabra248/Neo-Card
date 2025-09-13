from django.contrib import admin
from .models import Student, Teacher, UtilityStaff, Transaction

# Student model ke liye Admin view ko aacha banate hain
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'loginId', 'student_class', 'balance') # List mein kaun se columns dikhein
    search_fields = ('name', 'loginId') # Kin fields par search kar sakein
    list_filter = ('student_class', 'school_name') # Kin fields se filter kar sakein
    readonly_fields = ('loginId',) # Is field ko edit na kar sakein

# Teacher model ke liye Admin view
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'loginId', 'email', 'subjects')
    search_fields = ('name', 'loginId', 'email')

# Transaction model ke liye Admin view
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('student', 'amount', 'timestamp')
    list_filter = ('timestamp',)

# Ab sabhi models ko unke respective admin classes ke saath register karo
admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(UtilityStaff) # Iske liye simple registration
admin.site.register(Transaction, TransactionAdmin)
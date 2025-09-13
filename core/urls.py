# core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), 
    path('login/', views.login_view, name='login'),
    path('students/', views.students, name='students'),
    path('teachers/', views.teachers, name='teachers'),
    path('utilities/', views.utilities, name='utilities'),
    path('signup/', views.signup_view, name='signup'), 
    path('signup-success/', views.signup_success_view, name='signup_success'),
    path('update-profile/', views.update_profile_view, name='update_profile'),
    path('update-teacher-profile/', views.update_teacher_profile_view, name='update_teacher_profile'),
    path('logout/', views.logout_view, name='logout'),
    path('get-student-info/', views.get_student_info, name='get_student_info'),
    path('process-transaction/', views.process_transaction, name='process_transaction'),
    path('initiate-recharge/', views.initiate_recharge, name='initiate_recharge'),
    path('recharge-success/', views.recharge_success, name='recharge_success'),
]
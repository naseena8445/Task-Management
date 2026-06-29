from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, TaskListCreateView, TaskDetailView

urlpatterns = [
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/login', LoginView.as_view(), name='login'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('tasks', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>', TaskDetailView.as_view(), name='task-detail'),
]

from core_apps.user.views import CustomTokenObtainPairView
from django.urls import path

urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
]

from typing import Optional

from django.conf import settings
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView


def set_auth_cookies(
    response: Response,
    access_token: str,
    refresh_token: Optional[str] = None,
) -> None:
    access_token_lifetime = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()
    cookie_settings = {
        "path": settings.COOKIE_PATH,
        "secure": settings.COOKIE_SECURE,
        "httponly": settings.COOKIE_HTTPONLY,
        "samesite": settings.COOKIE_SAMESITE,
        "max_age": access_token_lifetime,
    }
    response.set_cookie("access", access_token, **cookie_settings)
    if refresh_token:
        refresh_token_lifetime = settings.SIMPLE_JWT[
            "REFRESH_TOKEN_LIFETIME"
        ].total_seconds()
        refresh_cookie_settings = cookie_settings.copy()
        refresh_cookie_settings["max_age"] = refresh_token_lifetime
        response.set_cookie("refresh", refresh_token, **refresh_cookie_settings)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        token_res = super().post(request, *args, **kwargs)

        if token_res.status_code == status.HTTP_200_OK:
            access_token = token_res.data.get("access")
            refresh_token = token_res.data.get("refresh")

            if access_token and refresh_token:
                set_auth_cookies(
                    token_res, access_token=access_token, refresh_token=refresh_token
                )
                token_res.data.pop("access", None)
                token_res.data.pop("refresh", None)
                token_res.data["message"] = "Login Successful."
            else:
                token_res.data["message"] = "Login Failed"
                # logger.error("Access or refresh token not found in login response data")
        return token_res

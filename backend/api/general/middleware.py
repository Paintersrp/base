from django.http import JsonResponse
from django.urls import resolve


class Default404ResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if (
            response.status_code == 404
            and response["Content-Type"] == "text/html; charset=utf-8"
        ):
            requested_url = request.build_absolute_uri()
            error_message = (
                f"The requested resource '{request.path_info}' was not found."
            )
            error_description = (
                f"No view function could be found for the URL '{request.path_info}'."
            )
            error_instructions = f"This error may have occurred due to a temporary outage or maintenance. Please check back later or contact our support team if the issue persists."
            error_thanks = "Thank you for using Edgelords!"
            error_response = {
                "error": {
                    "message": error_message,
                    "description": error_description,
                    "instructions": error_instructions,
                    "thanks": error_thanks,
                }
            }

            return JsonResponse(error_response, status=404)

        return response

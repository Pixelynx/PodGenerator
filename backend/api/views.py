from django.shortcuts import render

import requests
import google.generativeai as genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Makes call to Gemini
class GeneratePodcastView(APIView):
    def post(self, request, *args, **kwargs):
        input_type = request.data.get('type')  # 'audio' or 'transcript'
        input_data = request.data.get('data')  # Audio file URL or transcript text

        if not input_type or not input_data:
            return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            headers = {
                'Authorization': f'Bearer {settings.GEMINI_API_KEY}',
                'Content-Type': 'application/json',
            }

            if input_type == 'audio':
                # Call Gemini API with audio URL to generate video
                response = requests.post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + {settings.GEMINI_API_KEY},
                    json={'audio_url': input_data},
                    headers=headers,
                )
            elif input_type == 'transcript':
                # Call Gemini API with transcript text to generate video
                response = requests.post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + {settings.GEMINI_API_KEY},
                    json={'transcript': input_data},
                    headers=headers,
                )
            else:
                return Response({'error': 'Invalid type'}, status=status.HTTP_400_BAD_REQUEST)

            # Handle response from Gemini API
            if response.status_code == 200:
                data = response.json()
                video_url = data.get('video_url')  # Need to confirm this key is in the response
                return Response({'video_url': video_url}, status=status.HTTP_200_OK)
            else:
                return Response({'error': response.json()}, status=response.status_code)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
def upload_audio(request):
    if request.method == 'POST' and request.FILES.get('audio'):
        audio_file = request.FILES['audio']
        try:
            # Upload file to Gemini
            uploaded_file = genai.upload_file(audio_file)
            
            # Use uploaded file in Gemini API call
            model = genai.GenerativeModel("gemini-1.5-pro")
            response = model.generate_content([uploaded_file, "Generate a video for this audio"])
            
            # Take response and return result
            return JsonResponse({
                'success': True,
                'generated_content': response.text
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'success': False, 'error': 'No file provided'}, status=400)
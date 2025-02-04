from django.shortcuts import render

import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
                    'https://<AUDIO-TO-VIDEO>',
                    json={'audio_url': input_data},
                    headers=headers,
                )
            elif input_type == 'transcript':
                # Call Gemini API with transcript text to generate video
                response = requests.post(
                    'https://<TRANSCRIPT-TO-VIDEO',
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


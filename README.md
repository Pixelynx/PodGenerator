# Podcast-to-Video Generator

A web application that allows users to upload audio files or manually input transcripts, generates scripts from audio using Gemini AI, and creates videos based on the script. This project uses a Django backend and a React frontend, with plans to integrate Redux for state management and enhance scalability.

## Features
### Current Features
- Upload an audio file (e.g., a podcast episode)
- Generate a script based on the uploaded audio using Gemini AI

### Planned Features
- Generate a video based on the script using text-to-video APIs
- Allow manual entry of transcripts for video generation
- Implement Redux for efficient global state management and improved scalability
- Enhance UI for a seamless user experience from audio upload to video generation

## Technologies Used
### Backend:
- **Django**: Web framework for building the backend API
- **Django REST Framework (DRF)**: For creating RESTful APIs
- **Gemini AI**: For generating transcripts from audio files

### Frontend:
- **React**: For building the user interface
- **Redux (Planned)**: For state management

### Other Tools:
- **PostgreSQL**: Planned database for production (currently using SQLite)
- **Axios**: For making API calls in the frontend
- **dotenv**: For managing environment variables securely

import React, { useState } from 'react';
import { 
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography 
} from '@mui/material';
import AudioUploader from './AudioUpload/AudioUploader';
import PodcastGenerator from './PodPlayer/PodcastGenerator';
import TranscriptUploader from './TranscriptUpload/TranscriptUploader';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const App: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [inputType, setInputType] = useState<'audio' | 'transcript' | 'video' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleGeneratePodcast = async () => {
    setIsLoading(true);
    try {
      if (audioUrl) {
        // Generate video from audio
        console.log("Generate video from audio file.")
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([audioUrl, "Generate a video for this audio"]);
        const response = await result.response;
        const videoUrl = response.text();
        setVideoUrl(videoUrl);
        setInputType('video');
      } else if (transcript) {
        console.log("Generate video from transcript.")
        // Generate audio from transcript
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(transcript);
        const response = await result.response;
        const audioUrl = response.text();
        
        // Next generate video from this audio
        const videoModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const videoResult = await videoModel.generateContent([audioUrl, "Generate a video for this audio"]);
        const videoResponse = await videoResult.response;
        const videoUrl = videoResponse.text();
        
        setVideoUrl(videoUrl);
        setInputType('video');
      }
    } catch (error) {
      console.error("Error generating podcast:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center" my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Podcast Generator
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <AudioUploader setAudioUrl={setAudioUrl} setInputType={setInputType} />
            <Button variant="contained" onClick={() => setInputType(inputType === 'transcript' ? null : 'transcript')}>
              {inputType === 'transcript' ? 'Hide Transcript' : 'Enter Transcript'}
            </Button>
          </Box>

          <Box width="100%" mb={2}>
            {inputType === 'transcript' && (
              <TranscriptUploader
                transcript={transcript}
                setTranscript={setTranscript}
              />
            )}
            {/* {inputType === 'video' && videoUrl && (
            <PodcastGenerator audioUrl={videoUrl} />
          )} */}
          </Box>

          <Box mt="auto">
            {(inputType === 'audio' || (inputType === 'transcript' && transcript)) && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneratePodcast}
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? 'Generating...' : 'Generate Podcast'}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;

import React, { useState } from 'react';
import AudioUploader from './AudioUpload/AudioUploader';
import TranscriptUploader from './TranscriptUpload/TranscriptUploader';
import PodcastGenerator from './PodPlayer/PodcastGenerator';
import './App.css';

const App: React.FC = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState<File | null>(null);

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Podcast Generator</h1>
        <div className="upload-buttons">
          <AudioUploader />
          <button className="upload-button" onClick={toggleTranscript}>
            Enter Transcript
          </button>
        </div>
        {showTranscript && (
          <TranscriptUploader
            setTranscript={setTranscript}
          />
        )}
        <PodcastGenerator
          transcript={transcript}
          audioUrl={audioUrl}
        />
      </div>
    </div>
  );
};

export default App;

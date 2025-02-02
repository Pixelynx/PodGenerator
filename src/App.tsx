import React, { useState } from 'react';
import AudioUploader from './AudioUpload/AudioUploader';
import TranscriptUploader from './TranscriptUpload/TranscriptUploader';
import PodcastGenerator from './PodPlayer/PodcastGenerator';
import './App.css';

const App: React.FC = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const toggleView = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Podcast Generator</h1>
        <div className="upload-buttons">
          <AudioUploader onAudioUploaded={setAudioUrl}/>
          <button className="upload-button" onClick={toggleView}>
            Enter Transcript
          </button>
        </div>
        {showTranscript && (
        <TranscriptUploader
          transcript={transcript}
          setTranscript={setTranscript}
        />
      )}
      <PodcastGenerator
        transcript={transcript}
        audioUrl={audioUrl}
        showTranscript={showTranscript}
      />
    </div>
    </div>
  );
};

export default App;

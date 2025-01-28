import React, { useState } from 'react';
import TranscriptUploader from './TranscriptUpload/TranscriptUploader';
import AudioUploader from './AudioUpload/AudioUploader';
import Player from './PodPlayer/Player';
import './App.css';

const App: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerateAudio = (url: string) => {
    setAudioUrl(url);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Podcast Generator</h1>
        <div className="upload-buttons">
          <AudioUploader  />
          <button className="upload-button">Enter Transcript</button>
        </div>
        <TranscriptUploader  />
        {audioUrl && <Player  />}
      </div>
    </div>
  );
};

export default App;

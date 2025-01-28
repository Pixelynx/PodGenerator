import React from 'react';

interface AudioUploaderProps {
  onAudioUploaded: (url: string) => void;
}

const AudioUploader = () => {

  return (
    <div className="audio-uploader">
      <button id="audio-btn" className="upload-button">
        Upload Audio
      </button>
      <input
        type="file"
        accept="audio/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AudioUploader;

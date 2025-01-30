import React, { useRef } from 'react';

interface AudioUploaderProps {
  onAudioUploaded: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAudioUploaded(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="audio-uploader">
      <button onClick={handleButtonClick} className="upload-button">
        Upload Audio
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AudioUploader;

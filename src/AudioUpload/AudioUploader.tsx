import React, { useRef, useState } from 'react';
import { handleAudioUpload } from '../api/utils/uploadAudioFile';

interface AudioUploaderProps {
  onAudioUploaded: (file: File) => void;
}

const AudioUploader: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {

        // TODO: Handle saving file to server

        // setAudioUrl();
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
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
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        />
    </div>
  );
};

export default AudioUploader;

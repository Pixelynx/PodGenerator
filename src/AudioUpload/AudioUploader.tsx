import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface AudioUploaderProps {
  setInputType: (inputType: 'audio' | 'transcript' | null) => void;
  setAudioUrl: (url: string) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ setAudioUrl, setInputType }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setInputType('audio');
    }
  };

  return (
    <Button variant="contained" component="label">
      Upload Audio
      <input
        type="file"
        hidden accept="audio/*"
        onChange={handleFileUpload}
        />
    </Button>
  );
};


export default AudioUploader;

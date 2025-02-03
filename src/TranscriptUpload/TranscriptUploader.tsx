import React from 'react';
import { TextField } from '@mui/material';

interface TranscriptUploaderProps {
  transcript: string;
  setTranscript: (transcript: string) => void;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({
  transcript,
  setTranscript,
}) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      value={transcript}
      onChange={(e) => setTranscript(e.target.value)}
      placeholder="Enter your transcript here"
    />
  );
};

export default TranscriptUploader;

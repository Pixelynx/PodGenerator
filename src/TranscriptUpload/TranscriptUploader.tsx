import React from 'react';

interface TranscriptUploaderProps {
  setTranscript: (transcript: string) => void;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({ setTranscript }) => {
  return (
    <textarea
      className="transcript-textarea"
      onChange={(e) => setTranscript(e.target.value)}
      placeholder="Enter your transcript here"
    />
  );
};

export default TranscriptUploader;

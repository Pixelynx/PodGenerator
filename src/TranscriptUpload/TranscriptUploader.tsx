import React from 'react';

interface TranscriptUploaderProps {
  transcript: string;
  setTranscript: (transcript: string) => void;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({ setTranscript, transcript }) => {
  return (
    <textarea
      className="transcript-textarea"
      value={transcript}
      onChange={(e) => setTranscript(e.target.value)}
      placeholder="Enter your transcript here"
    />
  );
};

export default TranscriptUploader;

import React from 'react';

interface TranscriptUploaderProps {
  transcript: string;
  setTranscript: (transcript: string) => void;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({ transcript, setTranscript }) => {
  return (
    <div className="transcript-form">
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Enter your transcript here"
        className="transcript-textarea"
      />
    </div>
  );
};

export default TranscriptUploader;

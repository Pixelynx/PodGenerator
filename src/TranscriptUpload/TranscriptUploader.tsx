import React, { useState } from 'react';

const TranscriptUploader = () => {
  const [transcript, setTranscript] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form  className="transcript-form">
      <textarea
        className='transcript-textarea'
        placeholder="Enter your transcript here"
      />
      <button type="submit" className="generate-button" onClick={handleSubmit}>Generate Podcast</button>
    </form>
  );
};

export default TranscriptUploader;

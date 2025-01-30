import React from 'react';

interface PodcastGeneratorProps {
  transcript: string;
  audioUrl: File | null;
}

const PodcastGenerator: React.FC<PodcastGeneratorProps> = ({ transcript, audioUrl }) => {
  const handleGeneratePodcast = () => {
    if (audioUrl) {
      console.log('Generate podcast from audio file.');
    } else if (transcript) {
      console.log('Generate podcast from transcript');
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(transcript);
      synth.speak(utterance);
    } else {
      alert('Please upload an audio file or enter a transcript first.');
    }
  };

  return (
    <div className="podcast-generator">
      <button onClick={handleGeneratePodcast} className="generate-button">
        Generate Podcast
      </button>
    </div>
  );
};

export default PodcastGenerator;

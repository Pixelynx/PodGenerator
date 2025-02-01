import React, { useEffect, useRef, useState } from 'react';

interface PodcastGeneratorProps {
  transcript: string;
  audioUrl: File | null;
}

const PodcastGenerator: React.FC<PodcastGeneratorProps> = ({ transcript, audioUrl }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }
  }, []);

  const handleGeneratePodcast = () => {
    if (!canvasRef.current || !context) {
      console.error('Canvas or context not available');
      return;
    }

    if (audioUrl) {
      console.log('Generate podcast from audio file.');
    } else if (transcript) {
      console.log('Generate podcast from transcript');
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(transcript);

      const stream = canvasRef.current.captureStream(30);
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();

      const combinedStream = new MediaStream([
        ...stream.getVideoTracks(),
        ...destination.stream.getAudioTracks()
      ]);

      const mediaRecorder = new MediaRecorder(combinedStream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        console.log("MEDIA ON AVAILAIBLE: ", e);
        return chunks.push(e.data)
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        console.log("MEDIA ON STOP: ", blob)
        setVideoUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      synth.speak(utterance);

      utterance.onboundary = (e) => {
        context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        context.fillText(transcript.slice(e.charIndex, e.charIndex + 20), 10, 50);
      };

      utterance.onend = () => {
        console.log("UTTERANCE ON END: ", chunks)
        mediaRecorder.stop();
        audioContext.close();
      };
    } else {
      alert('Please upload an audio file or enter a transcript first.');
    }
  };

  const updateCanvas = (text: string) => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.fillText(text, 10, 50);
    }
  };

  return (
    <div className="podcast-generator">
      <button className="generate-button" onClick={handleGeneratePodcast}>Generate Podcast</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
      {videoUrl && <video ref={videoRef} src={videoUrl} controls />}
    </div>
  );
};

export default PodcastGenerator;

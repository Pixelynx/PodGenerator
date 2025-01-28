import React, { useRef, useState } from 'react';
import '../App.css';

const Player = ({  }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <audio />
      <button>{isPlaying ? 'Pause' : 'Play'}</button>
      <button>Stop</button>
    </div>
  );
};

export default Player;

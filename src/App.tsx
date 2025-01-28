import React, { useState } from 'react';

const App: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerateAudio = (url: string) => {
    setAudioUrl(url);
  };

  return (
    <div className="App">
    </div>
  );
};

export default App;

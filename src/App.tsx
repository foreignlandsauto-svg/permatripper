import PermatripperBackground from './PermatripperBackground';
import './App.css';
import { useEffect, useRef, useState } from 'react';

console.log("Permatripper Background Loaded v3");

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.log("Autoplay blocked, waiting for interaction", err);
        }
      }
    };
    playAudio();
  }, [hasInteracted]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Play failed", e));
      }
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent double firing from container click
    setHasInteracted(true);
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="App" onClick={handleInteraction} onTouchStart={handleInteraction}>
      <PermatripperBackground
        isRotate={true}
        mouseInteraction={true}
        color1="#FA8500"
        color2="#FF0000"
        color3="#B4883C"
      />
      <div className="app-container">
        <h1 className="responsive-text">permatripping</h1>
        <button className="play-button" onClick={toggleAudio}>
          {hasInteracted ? "Music Controls" : "Click Here for Music"}
        </button>
      </div>
      <audio ref={audioRef} src="/audio.mp3" loop />
    </div>
  );
}

export default App;

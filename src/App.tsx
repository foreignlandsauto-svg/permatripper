import PermatripperBackground from './PermatripperBackground';
import './App.css';
import { useEffect, useRef, useState } from 'react';

console.log("Permatripper Background Loaded v3");

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = volume;
          await audioRef.current.play();
        } catch (err) {
          console.log("Autoplay blocked, waiting for interaction", err);
        }
      }
    };
    playAudio();
  }, [hasInteracted]); // Keep dependency just on interaction for initial play

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Play failed", e));
      }
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!hasInteracted) {
      setHasInteracted(true);
      // Fire and forget webhook
      fetch("https://nwh.foreignlands.space/webhook/5937ba46-050d-406c-9a1a-d9fb62e339fb", {
        method: "POST",
        body: JSON.stringify({ action: "play_click", timestamp: new Date().toISOString() })
      }).catch(err => console.log("Webhook failed", err));
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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

        {!hasInteracted ? (
          <button className="play-button" onClick={toggleAudio}>
            click here
          </button>
        ) : (
          <div className="volume-control" onClick={(e) => e.stopPropagation()}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        )}
      </div>
      <audio ref={audioRef} src="/audio.mp3" loop />
    </div>
  );
}

export default App;

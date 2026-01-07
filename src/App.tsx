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
        audioRef.current.play();
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
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 className="responsive-text">permatripping</h1>
      </div>
      <audio ref={audioRef} src="/audio.mp3" loop style={{ display: 'none' }} />
    </div>
  );
}

export default App;

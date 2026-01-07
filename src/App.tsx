import PermatripperBackground from './PermatripperBackground';
import './App.css';

console.log("Permatripper Background Loaded v2");

function App() {
  return (
    <div className="App">
      <PermatripperBackground
        isRotate={true}
        mouseInteraction={true}
        color1="#FA8500"
        color2="#FF0000"
        color3="#B4883C"
      />
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 className="psychedelic-text">permatripper</h1>
      </div>
    </div>
  );
}

export default App;

import Balatro from './Balatro';
import './App.css';

function App() {
  return (
    <div className="App">
      <Balatro
        isRotate={true}
        mouseInteraction={true}
        color1="#DE443B"
        color2="#006BB4"
        color3="#162325"
      />
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem' }}>
        <h1>Balatro Background Effect</h1>
        <p>Created with OGL and customized shaders.</p>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Counter: {count}</h1>
        <button onClick={() => setCount(prev => prev+=1)} style={{padding: '12px 24px', borderRadius: '20px', cursor: 'pointer'}}>Increment</button>
        <button onClick={() => setCount(prev => prev-=1)} style={{padding: '12px 24px', borderRadius: '20px', cursor: 'pointer'}}>Decrement</button>
      </header>
    </div>
  );
}

export default App;

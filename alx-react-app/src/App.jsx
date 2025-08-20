import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Hello from './Hello.jsx'; // ✅ إضافة استيراد المكون الجديد

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* شعارات Vite و React */}
      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* عنوان رئيسي */}
      <h1>Vite + React</h1>

      {/* المكون الجديد Hello */}
      <Hello />

      {/* عداد */}
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

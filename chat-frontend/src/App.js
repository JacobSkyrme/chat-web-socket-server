import logo from './logo.svg';
import './App.css';

import { useEffect, useState, useRef } from 'react';

function App() {

  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);
  const [messages, setMessages] = useState([])

  const [clientID, setClientID] = useState(Math.floor(100000 + Math.random() * 900000))


  useEffect(() => {
      //TODO: Change to environment variable.
      ws.current = new WebSocket("ws://127.0.0.1:8080/ws");
      //ws.current.onopen = () => console.log("ws opened");
      //ws.current.onclose = () => console.log("ws closed");

      const wsCurrent = ws.current;

      return () => {
          wsCurrent.close();
      };
  }, []);

  useEffect(() => {
      if (!ws.current) return;

      ws.current.onmessage = e => {
          if (isPaused) return;

          setMessages(messages => [...messages, e.data])
      };
  }, [isPaused]);


  return (
    <div className="App">
        <div>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
            <h1>{clientID}</h1>
            <button onClick={() => ws.current.send(`${clientID}: test Message`)}>Send Message</button>
        </div>

      <div>
        {messages.map(message => <p>{message}</p>)}
      </div>

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';

const Timer = () => {
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [displayTime, setDisplayTime] = useState('');

  const handleStart = () => {
    setStartTime(Date.now());
    setDisplayTime('Wait for green light...');
    setTimeout(() => {
      setDisplayTime('Go!');
    }, Math.random() * 3000 + 2000);
  };

  const handleStop = async () => {
    if (startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setDisplayTime(`Reaction Time: ${time} ms`);
      const token = localStorage.getItem('token');
      try {
        await axios.post(
          'http://localhost:5000/api/timer/submit-reaction-time',
          { time },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Failed to submit reaction time:', error);
      }
    }
  };

  return (
    <div>
      <h2>F1 Reaction Timer</h2>
      <p>{displayTime}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {reactionTime && <p>Your reaction time: {reactionTime} ms</p>}
    </div>
  );
};

export default Timer;

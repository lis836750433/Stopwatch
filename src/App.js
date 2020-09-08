import React, { useState } from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnDisplayComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({ms: 0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0, started =1, stopped/pause = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var upadtedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(upadtedMs === 100){
      updatedS++;
      upadtedMs = 0;
    }
    upadtedMs++;
    return setTime({ms: upadtedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms: 0, s:0, m:0, h:0})
  };

  const resume = () => start();

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time= {time}/>
          <BtnComponent status={status} stop={stop} reset={reset} resume={resume} start={start}/>
        </div>
      </div>
    </div>
  );
}

export default App;

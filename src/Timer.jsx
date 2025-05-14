import style from "./Timer.module.css";
import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [time, setTime] = useState(new Date(0, 0, 0, 0, 0, 0));
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);

  const intervalRef = useRef(null);

  const changeHour = (e) => {
    const value = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
    setHour(value.toString().padStart(2, "0"));
  };
  const decreaseHour = () => {
    const value = Math.max(0, Math.min(23, (parseInt(hour) -1) || 0));
    setHour(value.toString().padStart(2, "0"));
  };
  const inceraseHour = () => {
    const value = Math.max(0, Math.min(23, (parseInt(hour)+1) || 0));
    setHour(value.toString().padStart(2, "0"));
  };

  const changeMinute = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setMinute(value.toString().padStart(2, "0"));
  };
  const decreaseMinute = () => {
    const value = Math.max(0, Math.min(59, (parseInt(minute)-1) || 0));
    setMinute(value.toString().padStart(2, "0"));
  };
  const inceraseMinute = () => {
    const value = Math.max(0, Math.min(59, (parseInt(minute)+1) || 0));
    setMinute(value.toString().padStart(2, "0"));
  };

  const changeSecond = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setSecond(value.toString().padStart(2, "0"));
  };
  const decreaseSecond = () => {
    const value = Math.max(0, Math.min(59, (parseInt(second)-1) || 0));
    setSecond(value.toString().padStart(2, "0"));
  };
  const inceraseSecond = () => {
    const value = Math.max(0, Math.min(59, (parseInt(second)+1) || 0));
    setSecond(value.toString().padStart(2, "0"));
  };

  const startTimer = () => {
    const newTime = new Date(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second));

    if (parseInt(hour) !== 0 || parseInt(minute) !== 0 || parseInt(second) !== 0) {
      setTime(newTime);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);

  };

  const saveHistory = () => {
    const formattedTime = `${hour}:${minute}:${second}`;
    setHistory(prev => [...prev, formattedTime]);

  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = new Date(prevTime.getTime() - 1000);

          if (newTime.getHours() === 0 && newTime.getMinutes() === 0 && newTime.getSeconds() === 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);



  useEffect(() => {
    const h = time.getHours().toString().padStart(2, "0");
    const m = time.getMinutes().toString().padStart(2, "0");
    const s = time.getSeconds().toString().padStart(2, "0");

    setHour(h);
    setMinute(m);
    setSecond(s);
  }, [time]);




  return (
    <div className={style.history_timer}>
      <div className={style.timer}>
        <div className={style.box}>
          <input min={0} max={23} onChange={changeHour} value={hour} type="number" placeholder="saat" />
          <div className={style.change}>
            <button onClick={decreaseHour}>-</button>
            <button onClick={inceraseHour}>+</button>
          </div>
        </div>

        <div className={style.box}>
          <input min={0} max={59} value={minute} onChange={changeMinute} type="number" placeholder="dəqiqə" />
          <div className={style.change}>
            <button onClick={decreaseMinute}>-</button>
            <button onClick={inceraseMinute}>+</button>
          </div>
        </div>

        <div className={style.box}>
          <input min={0} max={59} value={second} onChange={changeSecond} type="number" placeholder="saniyə" />
          <div className={style.change}>
            <button onClick={decreaseSecond}>-</button>
            <button onClick={inceraseSecond}>+</button>
          </div>
        </div>

        <button onClick={isRunning ? stopTimer : startTimer}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={saveHistory}>↻</button>
      </div>
      {history.length > 0 && (
        <div className={style.history}>
          <h1>History:</h1>
          <ul>
            {history.map((h, index) => (
              <li key={index}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

  )
}


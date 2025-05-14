import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./StopWatch.module.css";
import {
    incrementTime,
    resetTime,
    startTimer,
    pauseTimer,
    saveHistory
} from "../redux/stopWatchSlice";

export default function StopWatch() {
    const dispatch = useDispatch();
    const { value: time, isRunning, history } = useSelector(state => state.stopWatchSlice);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                dispatch(incrementTime());
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isRunning, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetTime());
        };
    }, []);


    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");

    return (
        <div className={style.stop_watch}>
            <div className={style.time}>
                <div>{hour} saat</div>
                <div>{minute} dəqiqə</div>
                <div>{second} saniyə</div>
            </div>
            <div className={style.buttons}>
                <button onClick={() => dispatch(startTimer())}>Start</button>
                <button onClick={() => dispatch(pauseTimer())}>Pause</button>
                <button onClick={() => dispatch(resetTime())}>Reset</button>
                <button onClick={() => dispatch(saveHistory())}>↻</button>
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
    );
}

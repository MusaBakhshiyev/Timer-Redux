import { useEffect, useState } from "react"
import style from "./FullTime.module.css"
export default function FullTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval); 
        
    }, []);

    const hour = time.getHours().toString().padStart(2,"0");
    const minute = time.getMinutes().toString().padStart(2,"0");
    const second = time.getSeconds().toString().padStart(2,"0");

    return (
        <div className={style.time}>
            <div>{hour}</div>
            <div>{minute}</div>
            <div>{second}</div>
        </div>
    )
}


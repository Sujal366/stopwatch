import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: ""
  })
  const [start, setStart] = useState(false);
  const intervalRef = useRef();


  const handleChange = (e, unit) => {
    const value = e.target.value.replace(/\D/, "");
    setTime((prev) => ({
      ...prev,
      [unit]: value,
    }));
  }

  const resetTimer = () => {
    setTime({ hour: "", minute: "", second: "" });
    clearInterval(intervalRef.current);
    setStart(false);
  };

  const timer = () => {
    setTime((prev) => {
      let h = prev.hour || 0  
      let m = prev.minute || 0  
      let s = prev.second || 0  

      if(h==0 && m==0 && s==0){
        setStart(false)
        clearInterval(intervalRef.current)
        return { hour: "", minute: "", second: "" };
      }

      if (s > 60) {
        m++;
        s-=60;
      }

      if(m==0 && s>0){
        s--;
      }
      
      if(m>=60){
        h++;
        m-=60;
      }
      if(m>0){
        if (s > 0) {
          s--;
        }
        else if(s==0){
          m--;
          s=59;
        }
      }
      
      if(h>0 && m==0 && s==0){
        h--;
        m=59;
        s=59;
      }

      return {
        hour: h.toString().padStart(2, "0"),
        minute: m.toString().padStart(2, "0"),
        second: s.toString().padStart(2, "0"),
      };
    });
  }

  useEffect(()=>{
    if(start){
      intervalRef.current = setInterval(timer, 1000);
    }
    else{
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  },[start, time])

  return (
    <div>
      <h1>Stopwatch</h1>
      <div className="flex flex-col w-[500px] h-[200px] m-4">
        <div className="flex justify-between text-center text-xl">
          <p>Hours</p>
          <p>Minutes</p>
          <p>Seconds</p>
        </div>
        <div className="flex gap-2 justify-between mt-4 mb-4 items-center">
          <input
            className="w-[90px] h-[70px] text-white text-5xl text-center outline-none"
            type="text"
            placeholder="00"
            value={time.hour}
            maxLength={2}
            onChange={(e) => handleChange(e, "hour")}
          />
          <p className="text-4xl">:</p>
          <input
            className="w-[90px] h-[70px] text-white text-5xl text-center outline-none"
            type="text"
            placeholder="00"
            value={time.minute}
            maxLength={2}
            onChange={(e) => handleChange(e, "minute")}
          />
          <p className="text-4xl">:</p>
          <input
            className="w-[90px] h-[70px] text-white text-5xl text-center outline-none"
            type="text"
            placeholder="00"
            value={time.second}
            maxLength={2}
            onChange={(e) => handleChange(e, "second")}
          />
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="w-full"
            style={{
              backgroundColor:
                time.hour == 0 && time.minute == 0 && time.second == 0
                  ? "oklch(92.5% 0.084 155.995)"
                  : start
                  ? "oklch(57.7% 0.245 27.325)"
                  : "oklch(62.7% 0.194 149.214)",
              fontSize: "1.5rem",
              padding: "10px 20px",
              border: "none",
              cursor:
                time.hour == 0 && time.minute == 0 && time.second == 0
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => setStart(!start)}
            disabled={
              time.hour == 0 && time.minute == 0 && time.second == 0
                ? true
                : false
            }
          >
            {start
              ? "Stop"
              : "Start"}
          </button>
          <button
            className="w-full"
            style={{
              backgroundColor: "oklch(79.5% 0.184 86.047)",
              fontSize: "1.5rem",
              padding: "10px 20px",
              border: "none",
            }}
            onClick={() => resetTimer()}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App

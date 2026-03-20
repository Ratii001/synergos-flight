import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [multiplier, setMultiplier] = useState(1.0);
  const [running, setRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);

  useEffect(() => {
    let interval;

    if (running && !crashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.05;

          if (Math.random() < 0.02 * next) {
            setCrashed(true);
            setRunning(false);
          }

          return next;
        });
      }, 120);
    }

    return () => clearInterval(interval);
  }, [running, crashed]);

  const start = () => {
    setMultiplier(1.0);
    setCrashed(false);
    setCashedOut(false);
    setRunning(true);
  };

  const cashOut = () => {
    if (running && !crashed) {
      setCashedOut(true);
      setRunning(false);
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1 style={{ color: "#00ff88" }}>✈ SYNERGOS FLIGHT</h1>

      <h2 style={{ fontSize: "40px" }}>{multiplier.toFixed(2)}x</h2>

      <div style={{ height: "120px" }}>
        <motion.div
          animate={{ x: running ? 200 : 0 }}
          transition={{ duration: 2 }}
          style={{ fontSize: "40px" }}
        >
          ✈
        </motion.div>
      </div>

      {crashed && <p style={{ color: "red" }}>💥 Crashed</p>}
      {cashedOut && <p style={{ color: "green" }}>✅ Cashed Out</p>}

      <div style={{ marginTop: "20px" }}>
        <button onClick={start} style={{ marginRight: "10px" }}>
          Start
        </button>
        <button onClick={cashOut}>Cash Out</button>
      </div>
      <Analytics />
    </div>
  );
}

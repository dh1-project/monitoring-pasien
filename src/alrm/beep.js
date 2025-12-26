import { useCallback, useRef } from "react";

export function useBeep() {
  const ctxRef = useRef(null);
  const oscRef = useRef(null);

  const start = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    if (oscRef.current) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
  }, []);

  const stop = useCallback(() => {
    const osc = oscRef.current;
    if (!osc) return;
    try {
      osc.stop();
      osc.disconnect();
    } catch {}
    oscRef.current = null;
  }, []);

  return { start, stop };
}

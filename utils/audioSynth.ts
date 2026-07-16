/**
 * Audio Synthesizer Engine (Web Audio API)
 * Menghasilkan suara murni tanpa membebani network (Zero Payload).
 */

export const playTone = (frequency: number, type: OscillatorType, duration: number, vol = 0.1): void => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Web Audio API not supported or blocked.", e);
  }
};

export const playFlipSound = () => playTone(600, "sine", 0.1, 0.05);

export const playMatchSound = () => {
  playTone(523.25, "sine", 0.3, 0.05); // C5
  setTimeout(() => playTone(659.25, "sine", 0.4, 0.05), 100); // E5
  setTimeout(() => playTone(783.99, "sine", 0.5, 0.05), 200); // G5
};

export const playWinSound = () => {
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    setTimeout(() => playTone(freq, "triangle", 0.5, 0.1), i * 150);
  });
};

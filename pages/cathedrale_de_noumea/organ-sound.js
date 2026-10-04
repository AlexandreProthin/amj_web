/*
 * A short organ-like cadence synthesised with the Web Audio API, so the page
 * needs no audio file. Each note adds a few harmonics, like several pipes
 * sounding together. Replace with a real recording if one becomes available.
 */

// Two chords: F major then C major (a "plagal" cadence often heard in churches).
const CHORDS = [
  { notes: [53, 57, 60, 65], start: 0, length: 4 },
  { notes: [48, 55, 60, 64], start: 4, length: 6 },
];
// Relative loudness of the fundamental and its harmonics.
const HARMONICS = [1, 0.5, 0.33, 0.22, 0.12, 0.08];

const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

export function playOrgan() {
  const AudioContext = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContext) return Promise.resolve();

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.12;
  master.connect(context.destination);
  const now = context.currentTime + 0.05;

  for (const chord of CHORDS) {
    const envelope = context.createGain();
    envelope.connect(master);
    const start = now + chord.start;
    const end = start + chord.length;
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(1, start + 0.08);
    envelope.gain.setValueAtTime(1, end - 0.25);
    envelope.gain.linearRampToValueAtTime(0, end);

    for (const note of chord.notes) {
      HARMONICS.forEach((level, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency(note) * (index + 1);
        gain.gain.value = level / chord.notes.length;
        oscillator.connect(gain).connect(envelope);
        oscillator.start(start);
        oscillator.stop(end + 0.05);
      });
    }
  }

  const total = CHORDS.at(-1).start + CHORDS.at(-1).length;
  return new Promise((resolve) => {
    setTimeout(() => {
      context.close();
      resolve();
    }, (total + 0.2) * 1000);
  });
}

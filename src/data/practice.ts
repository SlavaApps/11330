export interface PracticeDrill {
  id: string;
  title: string;
  focus: string;
  level: 'Foundation' | 'Intermediate';
  setup: string;
  steps: string[];
  success: string;
}

export const practiceDrills: PracticeDrill[] = [
  {
    id: 'straight-pot',
    title: 'Straight pot',
    focus: 'Potting',
    level: 'Foundation',
    setup:
      'Place a red about 30 cm from a corner pocket and the cue ball in a straight line behind it, about 30 cm away.',
    steps: [
      'Choose your aiming line before taking your stance.',
      'Use a smooth, centre-ball stroke at a comfortable pace.',
      'Reset both balls to the same positions after every attempt.',
    ],
    success:
      'Count a success when the red is potted and the cue ball stays on the table.',
  },
  {
    id: 'stop-shot',
    title: 'Stop-shot control',
    focus: 'Cue-ball control',
    level: 'Foundation',
    setup:
      'Set up a straight red to a corner pocket, with the cue ball about 45 cm behind the red.',
    steps: [
      'Aim to stop the cue ball at the point of contact.',
      'Keep the bridge steady and experiment with a slightly lower cue-ball contact.',
      'Reset the layout each time; keep the distance consistent for the whole set.',
    ],
    success:
      'Count a success when you pot the red and the cue ball stops within one ball width of the contact point.',
  },
  {
    id: 'position-zone',
    title: 'Position zone',
    focus: 'Position play',
    level: 'Intermediate',
    setup:
      'Choose a comfortable angled red to a corner pocket. Choose a target area for the cue ball, about two ball widths across, away from the potting line.',
    steps: [
      'Pick the intended cue-ball route before the shot.',
      'Pot the red while controlling pace to reach your target area.',
      'Reset both balls and use the same target throughout the set.',
    ],
    success:
      'Count a success only when you pot the red and the cue ball finishes inside your chosen area.',
  },
  {
    id: 'long-pot',
    title: 'Long-pot confidence',
    focus: 'Potting',
    level: 'Intermediate',
    setup:
      'Place a red about 30 cm from a corner pocket. Place the cue ball on the potting line at least half a table away.',
    steps: [
      'Stand behind the shot and settle on your aiming line.',
      'Keep your head still through a smooth delivery.',
      'Reset the same layout after each shot; shorten the distance next set if needed.',
    ],
    success:
      'Count a success when the red is potted without potting the cue ball.',
  },
];

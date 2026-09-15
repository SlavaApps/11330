import { QuizRound } from '../types';

interface RawRound {
  title: string;
  pairs: [statement: string, answer: string][];
  options: string[];
}

const raw: RawRound[] = [
  {
    title: 'Match the scoring terms',
    pairs: [
      ['Points scored during one uninterrupted visit to the table.', 'Break'],
      ['A break of at least 100 points.', 'Century break'],
      ['The standard highest possible break in normal play.', 'Maximum break'],
    ],
    options: ['Century break', 'Frame score', 'Maximum break', 'Break'],
  },
  {
    title: 'Match the cue-ball techniques',
    pairs: [
      ['Causes the cue ball to continue forward after striking the object ball.', 'Follow'],
      ['Can make the cue ball return toward the player after contact.', 'Draw'],
      ["Changes the cue ball's behaviour when it reaches a cushion.", 'Side spin'],
    ],
    options: ['Follow', 'Side spin', 'Stun shot', 'Draw'],
  },
  {
    title: 'Match the table positions',
    pairs: [
      ['The semicircular area used when the cue ball is played from in-hand.', 'D'],
      ['The marked position normally occupied by the blue ball.', 'Centre spot'],
      ['The line across the table on which the yellow, brown, and green spots are located.', 'Baulk line'],
    ],
    options: ['Centre spot', 'Baulk line', 'Pink spot', 'D'],
  },
  {
    title: 'Match the foul situations',
    pairs: [
      ['The cue ball enters a pocket.', 'In-off'],
      ['The cue tip contacts the cue ball more than once during one stroke.', 'Double hit'],
      ['The cue tip remains in contact with the cue ball for too long during the stroke.', 'Push shot'],
    ],
    options: ['Push shot', 'Double hit', 'In-off', 'Touching ball'],
  },
  {
    title: 'Match the tactical concepts',
    pairs: [
      ['A shot designed mainly to leave the opponent without an easy attacking opportunity.', 'Safety'],
      ['A situation where the direct path to the required ball is blocked.', 'Snooker'],
      ['Choosing between attacking and defensive options based on difficulty, position, and risk.', 'Shot selection'],
    ],
    options: ['Shot selection', 'Snooker', 'Safety', 'Clearance'],
  },
  {
    title: 'Match the equipment',
    pairs: [
      ['Supports the cue when the cue ball cannot comfortably be reached by hand.', 'Rest'],
      ['Raises the cue above obstructing balls.', 'Spider'],
      ['Improves contact between the cue tip and cue ball.', 'Chalk'],
    ],
    options: ['Chalk', 'Spider', 'Triangle', 'Rest'],
  },
  {
    title: 'Match the types of contact',
    pairs: [
      ['The cue ball strikes the object ball almost directly through its centre.', 'Full-ball contact'],
      ['Only a small part of the cue ball contacts the edge of the object ball.', 'Thin contact'],
      ['Roughly half of the cue ball overlaps the object ball at impact.', 'Half-ball contact'],
    ],
    options: ['Half-ball contact', 'Full-ball contact', 'Thin contact', 'Double'],
  },
  {
    title: 'Match the advanced rule situations',
    pairs: [
      ['Another ball may temporarily be nominated to act as the ball-on after certain fouls.', 'Free ball'],
      ['The black is placed back on its spot to decide a tied frame.', 'Respotted black'],
      ['A frame is restarted with all balls returned to their opening positions.', 'Re-rack'],
    ],
    options: ['Re-rack', 'Free ball', 'Respotted black', 'Re-spot'],
  },
  {
    title: 'Match the positional concepts',
    pairs: [
      ['Controlling where the cue ball finishes to prepare for the next shot.', 'Position play'],
      ['A mistake that leaves the cue ball in a poor position for the following shot.', 'Positional error'],
      ['A difficult shot used to regain useful position after something has gone wrong.', 'Recovery shot'],
    ],
    options: ['Recovery shot', 'Position play', 'Positional error', 'Break-off'],
  },
  {
    title: 'Match the shot types',
    pairs: [
      ['The object ball rebounds from a cushion before entering a pocket.', 'Double'],
      ['One object ball is driven into another object ball to pot it.', 'Plant'],
      ['The cue ball contacts two object balls during the same stroke.', 'Cannon'],
    ],
    options: ['Cannon', 'Plant', 'Double', 'Long pot'],
  },
  {
    title: 'Match the end-of-frame concepts',
    pairs: [
      ['The six colours are played in ascending value after the reds phase is complete.', 'Colour clearance'],
      ['A player is behind by more points than are normally available on the table.', 'Snookers required'],
      ['A pot gives a player a lead that is unlikely to be overcome without penalty points.', 'Frame ball'],
    ],
    options: ['Frame ball', 'Colour clearance', 'Snookers required', 'Century break'],
  },
  {
    title: 'Match the cue-action terms',
    pairs: [
      ['Small practice movements made before the final stroke.', 'Feathering'],
      ['The backward movement of the cue before delivery.', 'Backswing'],
      ['The continued forward movement of the cue after it strikes the cue ball.', 'Follow-through'],
    ],
    options: ['Follow-through', 'Feathering', 'Backswing', 'Alignment'],
  },
  {
    title: 'Match the strategic situations',
    pairs: [
      ["The player intentionally avoids an ambitious pot to reduce the opponent's chances.", 'Containing safety'],
      ['The player opens a group of tightly packed reds while trying to retain position.', 'Cluster break'],
      ['Both players repeatedly choose defensive shots while waiting for an opportunity.', 'Safety exchange'],
    ],
    options: ['Safety exchange', 'Cluster break', 'Containing safety', 'Maximum break'],
  },
  {
    title: 'Match the colour values',
    pairs: [
      ['This colour is worth 6 points.', 'Pink'],
      ['This colour is worth 4 points.', 'Brown'],
      ['This colour is worth 3 points.', 'Green'],
    ],
    options: ['Green', 'Blue', 'Brown', 'Pink'],
  },
  {
    title: 'Match the match terminology',
    pairs: [
      ['One complete game within a larger contest.', 'Frame'],
      ['A contest consisting of one or more frames.', 'Match'],
      ['The final frame used to determine the winner when the match is level.', 'Deciding frame'],
    ],
    options: ['Session', 'Match', 'Deciding frame', 'Frame'],
  },
  {
    title: 'Match the cue-ball reactions',
    pairs: [
      ['The cue ball continues forward after contacting the object ball.', 'Follow'],
      ['The cue ball stops or nearly stops after impact.', 'Stun'],
      ['The cue ball travels backward after contacting the object ball.', 'Draw'],
    ],
    options: ['Draw', 'Follow', 'Stun', 'Side spin'],
  },
  {
    title: 'Match the table areas',
    pairs: [
      ['The area between the baulk line and the bottom cushion.', 'Baulk'],
      ['The semicircular marking used for cue-ball placement from in-hand.', 'D'],
      ['The central marked position where the blue begins.', 'Centre spot'],
    ],
    options: ['D', 'Baulk', 'Centre spot', 'Pink spot'],
  },
  {
    title: 'Match the defensive goals',
    pairs: [
      ['Make the opponent play from a long distance.', 'Distance safety'],
      ['Block the direct path to the ball-on.', 'Snooker'],
      ['Leave the opponent without a comfortable attacking shot.', 'Containing safety'],
    ],
    options: ['Containing safety', 'Distance safety', 'Snooker', 'Break building'],
  },
  {
    title: 'Match the advanced cueing concepts',
    pairs: [
      ['The body and cue are positioned along the intended shot line.', 'Alignment'],
      ['Small warm-up movements of the cue are made before delivery.', 'Feathering'],
      ['The cue continues moving forward after striking the cue ball.', 'Follow-through'],
    ],
    options: ['Follow-through', 'Alignment', 'Feathering', 'Backswing'],
  },
  {
    title: 'Match the shot geometry',
    pairs: [
      ['The cue ball contacts the object ball almost directly through its centre.', 'Full-ball contact'],
      ['Only a small portion of the object ball is contacted.', 'Thin contact'],
      ['The object ball must travel at an angle rather than straight ahead.', 'Cut shot'],
    ],
    options: ['Cut shot', 'Thin contact', 'Full-ball contact', 'Cannon'],
  },
  {
    title: 'Match the scoring situations',
    pairs: [
      ['The total accumulated by a player in one visit.', 'Break'],
      ['The score of both players during the current frame.', 'Frame score'],
      ['The maximum normal scoring value still available from balls remaining.', 'Points remaining'],
    ],
    options: ['Points remaining', 'Break', 'Frame score', 'Century'],
  },
  {
    title: 'Match the fouls',
    pairs: [
      ['The cue ball is potted.', 'In-off'],
      ['The cue tip strikes the cue ball twice during the same stroke.', 'Double hit'],
      ['The cue is still pushing the cue ball rather than delivering a clean strike.', 'Push shot'],
    ],
    options: ['Double hit', 'In-off', 'Push shot', 'Re-rack'],
  },
  {
    title: 'Match the colour positions',
    pairs: [
      ['Normally placed near the pack of reds.', 'Pink'],
      ['Normally placed near the top cushion.', 'Black'],
      ['Normally placed in the centre of the table.', 'Blue'],
    ],
    options: ['Blue', 'Black', 'Pink', 'Brown'],
  },
  {
    title: 'Match the equipment uses',
    pairs: [
      ['Helps prevent the cue tip from slipping on impact.', 'Chalk'],
      ['Supports the cue when the player cannot comfortably reach.', 'Rest'],
      ['Raises the cue above obstructing balls.', 'Spider'],
    ],
    options: ['Spider', 'Chalk', 'Rest', 'Triangle'],
  },
  {
    title: 'Match the match structure',
    pairs: [
      ['One complete individual game of snooker.', 'Frame'],
      ['A contest made up of several frames.', 'Match'],
      ['A scheduled period within a long match.', 'Session'],
    ],
    options: ['Frame', 'Session', 'Match', 'Visit'],
  },
  {
    title: 'Match the endgame terms',
    pairs: [
      ['The colours are potted in ascending value after the reds are gone.', 'Colour clearance'],
      ['The final black is replaced to settle a tied frame.', 'Respotted black'],
      ['A player needs penalty points because the normal points remaining are insufficient.', 'Snookers required'],
    ],
    options: ['Respotted black', 'Snookers required', 'Colour clearance', 'Free ball'],
  },
  {
    title: 'Match the positional errors and recovery',
    pairs: [
      ['The cue ball finishes badly for the next shot.', 'Positional error'],
      ['A difficult shot is used to regain a useful position.', 'Recovery shot'],
      ['The cue ball is deliberately controlled for the next scoring opportunity.', 'Position play'],
    ],
    options: ['Recovery shot', 'Position play', 'Positional error', 'Break-off'],
  },
  {
    title: 'Match the tactical decisions',
    pairs: [
      ['A high-success option is chosen instead of a low-percentage attempt.', 'Percentage shot'],
      ['A player chooses the best shot after considering risk, position, and difficulty.', 'Shot selection'],
      ['A defensive shot is used to force the opponent into a difficult reply.', 'Safety'],
    ],
    options: ['Shot selection', 'Percentage shot', 'Safety', 'Maximum break'],
  },
  {
    title: 'Match the break-building situations',
    pairs: [
      ['Several reds are tightly grouped and difficult to pot.', 'Cluster'],
      ['The cue ball is deliberately sent into that group to create new options.', 'Split'],
      ['The player continues scoring while maintaining position for the next ball.', 'Break building'],
    ],
    options: ['Cluster', 'Break building', 'Split', 'Safety exchange'],
  },
  {
    title: 'Match the cushion techniques',
    pairs: [
      ['The cue ball uses one cushion to reach a target indirectly.', 'One-cushion escape'],
      ['Spin is used to widen or alter the natural rebound from a cushion.', 'Side spin'],
      ['The cue ball travels around several cushions to reach position.', 'Multi-cushion route'],
    ],
    options: ['Side spin', 'One-cushion escape', 'Multi-cushion route', 'Straight pot'],
  },
  {
    title: 'Match the free-ball concepts',
    pairs: [
      ['A ball is temporarily nominated to act as the legal target.', 'Free ball'],
      ['The legal target that should normally be struck first.', 'Ball-on'],
      ['A colour is returned to its designated position during the reds phase.', 'Re-spot'],
    ],
    options: ['Ball-on', 'Free ball', 'Re-spot', 'Re-rack'],
  },
  {
    title: 'Match the bridge and stance concepts',
    pairs: [
      ['The hand supports and guides the cue.', 'Bridge hand'],
      ['The body is positioned to create balance and stability.', 'Stance'],
      ['The cue rests in an open groove formed by the hand.', 'Open bridge'],
    ],
    options: ['Stance', 'Open bridge', 'Bridge hand', 'Follow-through'],
  },
  {
    title: 'Match the potting techniques',
    pairs: [
      ['One object ball is used to send another into a pocket.', 'Plant'],
      ['The object ball rebounds from a cushion before being potted.', 'Double'],
      ['A pot is attempted over a large distance.', 'Long pot'],
    ],
    options: ['Long pot', 'Double', 'Plant', 'Cannon'],
  },
  {
    title: 'Match the spin types',
    pairs: [
      ['Striking above centre creates this effect.', 'Topspin'],
      ['Striking below centre creates this effect.', 'Backspin'],
      ['Striking left or right of centre creates this effect.', 'Side spin'],
    ],
    options: ['Side spin', 'Topspin', 'Backspin', 'Stun'],
  },
  {
    title: 'Match the pressure situations',
    pairs: [
      ['Both players repeatedly exchange defensive shots.', 'Safety exchange'],
      ['A player is behind and needs the opponent to commit fouls.', 'Snookers required'],
      ['A pot may effectively secure the frame unless fouls are gained.', 'Frame ball'],
    ],
    options: ['Frame ball', 'Safety exchange', 'Snookers required', 'Century break'],
  },
];

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const quizRounds: QuizRound[] = raw.map((round, roundIndex) => {
  const options = round.options.map(label => ({
    id: `r${roundIndex + 1}-${slug(label)}`,
    label,
  }));

  return {
    id: `round-${roundIndex + 1}`,
    title: round.title,
    options,
    statements: round.pairs.map(([text, answer], statementIndex) => {
      const option = options.find(entry => entry.label === answer);
      if (!option) {
        throw new Error(`Quiz round ${roundIndex + 1} is missing option "${answer}"`);
      }
      return {
        id: `round-${roundIndex + 1}-s${statementIndex + 1}`,
        text,
        answerId: option.id,
      };
    }),
  };
});

export const QUIZ_ROUNDS_PER_GAME = 10;
export const QUIZ_POINTS_PER_MATCH = 40;

export function buildQuizSet(count = QUIZ_ROUNDS_PER_GAME): QuizRound[] {
  const pool = [...quizRounds];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length)).map(round => ({
    ...round,
    options: shuffle(round.options),
    statements: shuffle(round.statements),
  }));
}

function shuffle<T>(input: T[]): T[] {
  const next = [...input];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

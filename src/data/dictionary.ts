import { DictionaryCategory, DictionaryTerm } from '../types';

type RawTerm = [string, DictionaryCategory, string];

const raw: RawTerm[] = [
  ['Baulk line', 'Table', 'The line drawn across the table 29 inches from the bottom cushion; the D sits on it.'],
  ['Break', 'Scoring', 'The points scored by a player during one uninterrupted visit to the table.'],
  ['Ball-on', 'Rules', 'The ball or group of balls that the player is legally required to hit first.'],
  ['Baulk', 'Table', 'The area of the table between the baulk line and the bottom cushion.'],
  ['Black', 'Scoring', 'The highest-value colour in snooker, worth 7 points.'],
  ['Blue', 'Scoring', 'A colour ball worth 5 points and normally placed on the centre spot.'],
  ['Brown', 'Scoring', 'A colour ball worth 4 points and normally placed at the centre of the baulk line.'],
  ['Century break', 'Scoring', 'A break of 100 points or more made during a single visit.'],
  ['Clearance', 'Scoring', 'Potting the remaining balls on the table in the required sequence.'],
  ['Colour', 'Rules', 'Any of the six coloured balls: yellow, green, brown, blue, pink, or black.'],
  ['Colour spot', 'Table', 'A marked position where a specific colour ball is placed or re-spotted.'],
  ['Cue', 'Equipment', 'The stick used to strike the cue ball.'],
  ['Cue ball', 'Equipment', 'The white ball that the player strikes with the cue.'],
  ['Cue tip', 'Equipment', 'The small leather tip at the end of the cue that contacts the cue ball.'],
  ['Cushion', 'Table', 'The raised padded edge surrounding the playing surface of the table.'],
  ['D', 'Table', 'The semicircle in the baulk area where the cue ball may be placed when played from in-hand.'],
  ['Double', 'Technique', 'A shot where the object ball rebounds from a cushion before entering a pocket.'],
  ['Draw', 'Technique', 'Backspin applied to the cue ball so it moves backward after contacting another ball.'],
  ['Free ball', 'Rules', 'A ball nominated to act as the ball-on after certain fouls when the incoming player is snookered.'],
  ['Foul', 'Rules', 'An illegal shot or action that awards penalty points to the opponent.'],
  ['Frame', 'Scoring', 'One complete game of snooker within a match.'],
  ['Frame ball', 'Strategy', 'A pot that gives a player enough points to make a comeback unlikely without snookers.'],
  ['Follow', 'Technique', 'Topspin that causes the cue ball to continue forward after contact.'],
  ['Green', 'Scoring', 'A colour ball worth 3 points.'],
  ['In-hand', 'Rules', 'A situation where the player may place the cue ball within the D before playing.'],
  ['In-off', 'Rules', 'A foul that occurs when the cue ball enters a pocket.'],
  ['Kiss', 'Technique', 'Unexpected contact between balls after the initial collision.'],
  ['Maximum break', 'Scoring', 'A standard maximum break of 147 points made by potting 15 reds with 15 blacks, followed by all six colours.'],
  ['Miss', 'Rules', 'A referee decision that may be called after a foul when the player has not made a sufficient attempt to hit the ball-on.'],
  ['Object ball', 'Technique', 'Any ball other than the cue ball that is being targeted during a shot.'],
  ['Pack', 'Table', 'The group of reds clustered together, especially near their starting position.'],
  ['Pink', 'Scoring', 'A colour ball worth 6 points.'],
  ['Plant', 'Technique', 'A shot where one object ball is struck into another to pot the second ball.'],
  ['Pocket', 'Table', 'One of the six openings around the table into which balls are potted.'],
  ['Pot', 'Technique', 'To legally send an object ball into a pocket.'],
  ['Red', 'Scoring', 'One of the 15 red balls, each worth 1 point.'],
  ['Re-spot', 'Rules', 'To return a colour ball to its designated spot after it has been legally potted during the reds phase.'],
  ['Rest', 'Equipment', 'A support tool used when the cue ball is too far away for a comfortable normal stance.'],
  ['Safety', 'Strategy', 'A defensive shot intended to leave the opponent with a difficult next shot.'],
  ['Screw shot', 'Technique', 'A shot played with backspin so the cue ball moves backward after impact.'],
  ['Side spin', 'Technique', 'Spin applied by striking the cue ball to the left or right of centre.'],
  ['Snooker', 'Strategy', 'A position where the direct path to the ball-on is blocked by one or more other balls.'],
  ['Spider', 'Equipment', 'A raised cue support used when another ball prevents the cue from being played comfortably.'],
  ['Spot', 'Table', 'A designated position on the table used for placing a colour ball.'],
  ['Stance', 'Technique', 'The body position a player uses while preparing and delivering a shot.'],
  ['Stun shot', 'Technique', 'A shot played so the cue ball has little or no forward or backward spin at impact.'],
  ['Tactical play', 'Strategy', 'Using safety, positioning, and risk management instead of focusing only on potting.'],
  ['Touching ball', 'Rules', 'A situation where the cue ball is already in contact with another ball before the shot begins.'],
  ['Triangle', 'Equipment', 'The frame used to arrange the 15 red balls at the start of a frame.'],
  ['Yellow', 'Scoring', 'The lowest-value colour ball, worth 2 points.'],
  ['Break-off', 'Technique', 'The opening shot used to begin a frame.'],
  ['Cannon', 'Technique', 'A shot where the cue ball contacts two object balls during the same stroke.'],
  ['Centre ball', 'Technique', 'A cue-ball strike close to its centre, producing little intentional spin.'],
  ['Cut shot', 'Technique', 'A shot where the cue ball strikes the object ball at an angle rather than straight on.'],
  ['Long pot', 'Technique', 'A pot attempted over a relatively long distance across the table.'],
  ['Position play', 'Strategy', 'Controlling where the cue ball finishes to prepare for the next shot.'],
  ['Recovery shot', 'Strategy', 'A difficult shot used to regain good position after the cue ball finishes poorly.'],
  ['Shot clock', 'Rules', 'A time limit used in some snooker formats requiring a player to play within a set period.'],
  ['Straight pot', 'Technique', 'A shot where the cue ball, object ball, and pocket are positioned nearly in one line.'],
  ['Visit', 'Scoring', 'The period when one player remains at the table until their turn ends.'],
  ['Break building', 'Strategy', 'The process of scoring several pots in one visit while keeping the cue ball in useful positions.'],
  ['Bridge hand', 'Technique', 'The hand position that supports and guides the cue during a shot.'],
  ['Closed bridge', 'Technique', 'A bridge where the fingers form a more enclosed guide around the cue.'],
  ['Open bridge', 'Technique', 'A bridge where the cue rests in a groove formed by the thumb and hand.'],
  ['Cue action', 'Technique', 'The complete movement of the cue before, during, and after striking the cue ball.'],
  ['Follow-through', 'Technique', 'The forward movement of the cue after contact with the cue ball.'],
  ['Feathering', 'Technique', 'Small practice movements of the cue before the final stroke.'],
  ['Pause', 'Technique', 'A brief stop at the end of the backswing before the cue moves forward.'],
  ['Backswing', 'Technique', 'The backward movement of the cue immediately before the final forward stroke.'],
  ['Cueing', 'Technique', 'The controlled movement used to strike the cue ball accurately.'],
  ['Alignment', 'Technique', 'Positioning the body, cue, and eyes correctly along the intended shot line.'],
  ['Aim line', 'Technique', 'The intended direction of the cue before striking the cue ball.'],
  ['Contact point', 'Technique', 'The exact point where the cue ball must strike the object ball to create the desired result.'],
  ['Potting angle', 'Technique', 'The angle required to send an object ball toward a chosen pocket.'],
  ['Half-ball contact', 'Technique', 'A shot where roughly half of the cue ball overlaps the object ball at impact.'],
  ['Thin contact', 'Technique', 'A light contact near the edge of an object ball.'],
  ['Full-ball contact', 'Technique', 'A shot where the cue ball strikes the object ball almost directly in the centre.'],
  ['Topspin', 'Technique', 'Forward spin applied by striking the cue ball above its centre.'],
  ['Backspin', 'Technique', 'Backward spin applied by striking the cue ball below its centre.'],
  ['Running side', 'Technique', 'Side spin that helps the cue ball travel naturally around a cushion.'],
  ['Check side', 'Technique', "Side spin used to reduce or alter the cue ball's natural rebound from a cushion."],
  ['Swerve', 'Technique', 'A curved cue-ball path created by spin and cue elevation.'],
  ['Massé', 'Technique', 'An advanced shot using a steeply elevated cue to create a strongly curved cue-ball path.'],
  ['Jump shot', 'Rules', 'A shot where the cue ball leaves the table surface to pass over another ball; generally not permitted as a deliberate technique in snooker.'],
  ['Push shot', 'Rules', 'A foul where the cue tip remains in contact with the cue ball for too long during the stroke.'],
  ['Double hit', 'Rules', 'A foul where the cue tip contacts the cue ball more than once during the same stroke.'],
  ['Jumped ball', 'Rules', 'A ball that leaves the playing surface during a shot.'],
  ['Penalty points', 'Scoring', 'Points awarded to the opponent after a foul.'],
  ['Foul and a miss', 'Rules', 'A referee call used in certain situations when a player fouls and is judged not to have made a sufficient attempt to hit the ball-on.'],
  ['Conceded frame', 'Rules', 'A frame that ends when a player accepts that they are unlikely to win and formally concedes.'],
  ['Re-rack', 'Rules', 'Restarting a frame with all balls returned to their opening positions.'],
  ['Respotted black', 'Rules', 'A deciding situation where the black is placed back on its spot after the scores become level at the end of a frame.'],
  ['Tie', 'Scoring', 'A situation where both players have the same score.'],
  ['Best of frames', 'Match', 'A match format where the first player to win more than half of the scheduled frames wins the match.'],
  ['Match', 'Match', 'A contest made up of one or more frames between players.'],
  ['Session', 'Match', 'A scheduled period in which part of a longer snooker match is played.'],
  ['Deciding frame', 'Match', 'The final frame played when the match score is level before the last available frame.'],
  ['Frame score', 'Scoring', 'The total number of points scored by each player during the current frame.'],
  ['Points remaining', 'Scoring', 'The maximum number of normal scoring points still available from the balls left on the table.'],
  ['Snookers required', 'Strategy', 'A situation where a player is behind by more points than remain available and needs the opponent to concede penalty points.'],
  ['Safe area', 'Strategy', "A part of the table where the cue ball can be left to reduce the opponent's attacking options."],
  ['Containing safety', 'Strategy', 'A defensive shot designed mainly to leave the opponent without an easy pot.'],
  ['Attacking safety', 'Strategy', "A safety shot intended to create pressure while also improving the player's future attacking position."],
  ['Safety exchange', 'Strategy', 'A sequence where both players repeatedly play defensive shots while waiting for an opening.'],
  ['Shot selection', 'Strategy', 'The process of choosing the best available shot based on difficulty, position, and risk.'],
  ['Percentage shot', 'Strategy', 'A shot chosen because it offers a relatively high chance of success with manageable risk.'],
  ['Positional error', 'Strategy', 'A mistake where the cue ball finishes in a poor position for the next shot.'],
  ['Recovery', 'Strategy', 'Returning to a useful position after a difficult or poorly positioned shot.'],
  ['Baulk colour', 'Table', 'One of the yellow, green, or brown balls positioned on the baulk line.'],
  ['Centre spot', 'Table', 'The marked point in the centre of the table where the blue ball is placed.'],
  ['Pink spot', 'Table', 'The designated position for the pink ball near the pack of reds.'],
  ['Black spot', 'Table', 'The designated position for the black ball near the top cushion.'],
  ['Top cushion', 'Table', 'The short cushion at the end of the table nearest the black spot.'],
  ['Bottom cushion', 'Table', 'The short cushion at the baulk end of the table.'],
  ['Side cushion', 'Table', 'Either of the two long cushions running along the sides of the table.'],
  ['Corner pocket', 'Table', 'One of the four pockets located at the corners of the table.'],
  ['Middle pocket', 'Table', 'One of the two pockets positioned halfway along the side cushions.'],
  ['Playing surface', 'Table', 'The cloth-covered area of the table on which the balls move.'],
  ['Cloth', 'Equipment', 'The fabric covering the playing surface and cushions of the snooker table.'],
  ['Chalk', 'Equipment', 'Material applied to the cue tip to improve grip and reduce unwanted slipping when striking the cue ball.'],
];

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const dictionary: DictionaryTerm[] = raw
  .map(([term, category, definition]) => ({
    id: `term-${slug(term)}`,
    term,
    category,
    definition,
  }))
  .sort((a, b) => a.term.localeCompare(b.term));

export const dictionaryCategories: (DictionaryCategory | 'All')[] = [
  'All',
  'Scoring',
  'Rules',
  'Technique',
  'Strategy',
  'Equipment',
  'Table',
  'Match',
];

export interface DictionarySection {
  letter: string;
  data: DictionaryTerm[];
}

export function groupByLetter(terms: DictionaryTerm[]): DictionarySection[] {
  const map = new Map<string, DictionaryTerm[]>();
  terms.forEach(item => {
    const letter = item.term.charAt(0).toUpperCase();
    const bucket = map.get(letter);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(letter, [item]);
    }
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([letter, data]) => ({ letter, data }));
}

export function searchDictionary(query: string, terms = dictionary): DictionaryTerm[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return [];
  }
  const startsWith: DictionaryTerm[] = [];
  const contains: DictionaryTerm[] = [];
  const inDefinition: DictionaryTerm[] = [];

  terms.forEach(item => {
    const term = item.term.toLowerCase();
    if (term.startsWith(trimmed)) {
      startsWith.push(item);
    } else if (term.includes(trimmed)) {
      contains.push(item);
    } else if (item.definition.toLowerCase().includes(trimmed)) {
      inDefinition.push(item);
    }
  });

  return [...startsWith, ...contains, ...inDefinition];
}

import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'lesson-01',
    index: 1,
    tag: 'Basics',
    listTitle: 'Getting to know the table',
    title: 'The snooker table',
    intro:
      'Learn where the balls begin, what each marking means, and how the layout of the table shapes every shot you play.',
    factsTitle: 'Table setup',
    facts: [
      { label: 'Cue ball', value: 'White', ball: 'white' },
      { label: 'Reds', value: '15 balls', ball: 'red' },
      { label: 'Yellow', value: '2 points', ball: 'yellow' },
      { label: 'Green', value: '3 points', ball: 'green' },
      { label: 'Brown', value: '4 points', ball: 'brown' },
      { label: 'Blue', value: '5 points', ball: 'blue' },
      { label: 'Pink', value: '6 points', ball: 'pink' },
      { label: 'Black', value: '7 points', ball: 'black' },
    ],
    bodyHeading: 'The main areas of the table',
    body: [
      {
        paragraphs: [
          'A full-size snooker table has six pockets: one at each corner and one at the centre of each long cushion. Several markings help determine where balls are placed and where play begins.',
          'The baulk line runs across the table near one end. Inside it sits the semicircular D, where the cue ball is placed for the opening shot and after certain fouls.',
          'The six coloured balls begin on designated spots. The fifteen reds are arranged in a triangle between the pink and black areas of the table.',
          'Knowing the layout is important because good snooker is not only about potting. Players constantly think about where the cue ball will finish and what shot will be available next.',
        ],
      },
    ],
    takeaways: [
      'Snooker uses 22 balls at the start of a frame.',
      'Every colour has its own starting spot.',
      'The D is used when playing the cue ball from in-hand.',
      'Table position influences both attacking and defensive decisions.',
    ],
    checklist: ['Main table areas identified', 'Ball positions understood', 'Colour spots memorised'],
  },
  {
    id: 'lesson-02',
    index: 2,
    tag: 'Basics',
    listTitle: 'Starting a frame',
    title: 'The break-off shot',
    intro:
      'Every frame begins with one careful decision. Learn how the opening shot works and why control matters more than power.',
    factsTitle: 'Opening setup',
    facts: [
      { label: 'Cue ball', value: 'Inside the D', ball: 'white' },
      { label: 'Target', value: 'A red ball', ball: 'red' },
      { label: 'Main goal', value: 'Leave a difficult reply' },
    ],
    bodyHeading: 'How the break-off works',
    body: [
      {
        paragraphs: [
          'At the beginning of a frame, the cue ball can be placed anywhere inside the D. The player must strike a red first.',
          'Unlike a break in pool, the objective is usually not to scatter the reds across the table. A typical break-off is controlled and defensive.',
          'Players often contact a red near the edge of the pack and send the cue ball back toward the baulk end of the table. This increases the distance between the opponent and the reds.',
          'A good break-off balances three things: legal contact, cue-ball control, and safety.',
        ],
      },
    ],
    takeaways: [
      'The cue ball starts inside the D.',
      'A red must be contacted first.',
      'Power is less important than position.',
      'A strong break-off can immediately create tactical pressure.',
    ],
    checklist: [
      'Starting position understood',
      'First legal target remembered',
      'Basic break-off practised',
    ],
  },
  {
    id: 'lesson-03',
    index: 3,
    tag: 'Technique',
    listTitle: 'Potting fundamentals',
    title: 'Finding the potting angle',
    intro:
      'Understand the relationship between the cue ball, object ball, and pocket before adding speed or spin to your game.',
    factsTitle: 'Shot components',
    facts: [
      { label: 'Cue ball', value: 'The ball you strike', ball: 'white' },
      { label: 'Object ball', value: 'The ball you pot', ball: 'red' },
      { label: 'Potting line', value: 'Object ball to pocket' },
      { label: 'Contact point', value: 'Where the balls meet' },
    ],
    bodyHeading: 'Building a simple pot',
    body: [
      {
        paragraphs: [
          'Start by imagining a straight line from the centre of the object ball to the centre of the pocket.',
          'Then identify the point on the object ball that the cue ball must contact to send it along that line.',
          "The thinner the contact, the larger the angle between the cue ball's original path and the direction of the object ball.",
          'Beginners often focus only on the pocket. A more reliable approach is to think about the contact point first, then align the cue through the centre of the cue ball toward that point.',
          'Keep the cue action smooth. Extra force rarely fixes poor alignment.',
        ],
      },
    ],
    takeaways: [
      "Visualise the object ball's path before aiming.",
      'Focus on the correct contact point.',
      'Keep your head and cue stable during delivery.',
      'Accuracy should come before power.',
    ],
    checklist: ['Potting line understood', 'Contact point identified', 'Straight pots practised'],
  },
  {
    id: 'lesson-04',
    index: 4,
    tag: 'Technique',
    listTitle: 'Controlling the cue ball',
    title: 'Position after the pot',
    intro:
      'A successful shot is not only about what goes into the pocket. Where the cue ball stops often decides what happens next.',
    factsTitle: 'Basic contact',
    facts: [
      { label: 'Centre', value: 'Natural forward movement' },
      { label: 'Above centre', value: 'Follow' },
      { label: 'Below centre', value: 'Draw / screw' },
      { label: 'Left or right', value: 'Side spin' },
    ],
    bodyHeading: 'Thinking one shot ahead',
    body: [
      {
        paragraphs: [
          'A player building a break must consider the next shot before striking the current one.',
          'When the cue ball is struck around its centre, it follows a relatively natural path after contacting the object ball. Hitting above or below centre changes how it travels after impact.',
          'Follow encourages the cue ball to continue forward after contact.',
          'Draw, often called screw in snooker, can make the cue ball slow, stop, or return toward the player depending on the shot.',
          "Side spin changes the cue ball's behaviour, especially when it reaches a cushion, but it also makes aiming more difficult. Beginners should develop reliable centre-ball control before using large amounts of side.",
        ],
      },
    ],
    takeaways: [
      'Plan the next shot before playing the current one.',
      'Follow moves the cue ball forward after contact.',
      'Draw can bring the cue ball back.',
      'Side spin adds control but also increases difficulty.',
    ],
    checklist: ['Follow understood', 'Draw understood', 'Basic position routes practised'],
  },
  {
    id: 'lesson-05',
    index: 5,
    tag: 'Strategy',
    listTitle: 'Safety play',
    title: 'Winning without potting',
    intro:
      'Sometimes the strongest shot is the one that leaves nothing easy. Safety play is a central part of snooker strategy.',
    factsTitle: 'Safety goals',
    facts: [
      { label: 'Distance', value: 'Cue ball far from target' },
      { label: 'Cover', value: 'Hide balls behind others' },
      { label: 'Cushion', value: 'Leave the cue ball tight' },
      { label: 'Control', value: 'Avoid leaving an easy pot' },
    ],
    bodyHeading: 'What makes a good safety',
    body: [
      {
        paragraphs: [
          "A safety shot is designed to reduce the opponent's attacking options.",
          'One simple strategy is to send the object ball toward one end of the table while returning the cue ball toward the opposite end. The greater distance makes accurate potting more difficult.',
          'Another option is to leave the cue ball behind another ball so that the opponent cannot directly see the required target. This situation is commonly referred to as being snookered.',
          'Safety play becomes especially important when no high-percentage pot is available. Attempting a difficult pot and leaving the table open can be much more costly than choosing a controlled defensive shot.',
        ],
      },
    ],
    takeaways: [
      'You do not need to pot on every visit.',
      "Distance can make the opponent's next shot harder.",
      'A snooker blocks the direct path to the required ball.',
      'Good safety play limits risk while creating pressure.',
    ],
    checklist: [
      'Purpose of safety understood',
      'Basic safety options identified',
      'Defensive shots practised',
    ],
  },
  {
    id: 'lesson-06',
    index: 6,
    tag: 'Rules',
    listTitle: 'Fouls and penalties',
    title: 'When a shot goes wrong',
    intro:
      'Learn the most common fouls, how penalty points work, and why knowing the correct ball-on matters on every shot.',
    factsTitle: 'Common fouls',
    facts: [
      { label: 'Wrong ball first', value: 'Foul' },
      { label: 'Cue ball potted', value: 'In-off' },
      { label: 'No legal contact', value: 'Foul' },
      { label: 'Ball touched illegally', value: 'Foul' },
      { label: 'Ball leaves the table', value: 'Foul' },
    ],
    bodyHeading: 'Understanding penalty points',
    body: [
      {
        paragraphs: [
          'A foul normally awards the opponent at least four points.',
          'The penalty can be higher when a higher-value colour is involved. Depending on the foul, the value of the ball concerned may determine the penalty, up to seven points.',
          'For example, contacting the black first when a red is required can result in a seven-point penalty.',
          'Potting the cue ball is called an in-off. Touching a ball with clothing, a hand, or equipment can also constitute a foul.',
          'Learning which ball is currently on is one of the simplest ways for beginners to avoid unnecessary penalties.',
        ],
      },
    ],
    takeaways: [
      'A foul usually costs at least four points.',
      'Penalties can rise to seven points.',
      'The required legal target is called the ball-on.',
      'Potting the cue ball is an in-off.',
    ],
    checklist: [
      'Minimum foul value remembered',
      'Ball-on concept understood',
      'Common fouls recognised',
    ],
  },
  {
    id: 'lesson-07',
    index: 7,
    tag: 'Strategy',
    listTitle: 'Building a break',
    title: 'Turning one pot into several',
    intro:
      'A break grows when successful pots are connected through good cue-ball position and sensible shot selection.',
    factsTitle: 'Break example',
    facts: [
      { label: 'Red', value: '1', ball: 'red' },
      { label: 'Black', value: '7', ball: 'black' },
      { label: 'Red', value: '1', ball: 'red' },
      { label: 'Black', value: '7', ball: 'black' },
      { label: 'Red', value: '1', ball: 'red' },
      { label: 'Black', value: '7', ball: 'black' },
    ],
    factsFooter: 'Running total — 24',
    bodyHeading: 'How breaks develop',
    body: [
      {
        paragraphs: [
          'A break is the number of points scored by one player during a single uninterrupted visit to the table.',
          'While reds remain, a player normally pots a red and then attempts a colour. After a colour is legally potted during this phase, it is returned to its designated spot.',
          'Strong break-building is based on position rather than spectacular shots. Players try to leave the cue ball at an angle that makes the next pot comfortable while also keeping access to another red.',
          'For beginners, a break of only a few balls connected together is already useful progress. Consistency comes before high numbers.',
        ],
      },
    ],
    takeaways: [
      'A break continues during one uninterrupted visit.',
      'Reds and colours alternate while reds remain.',
      'Position is the foundation of break-building.',
      'Small controlled breaks are valuable for beginners.',
    ],
    checklist: [
      'Break definition understood',
      'Red-colour pattern remembered',
      'Three-ball sequence practised',
    ],
  },
  {
    id: 'lesson-08',
    index: 8,
    tag: 'Rules',
    listTitle: 'The colour clearance',
    title: 'Finishing the frame',
    intro:
      'Once the reds are gone, the pattern changes. The six colours must now be played in a fixed order.',
    factsTitle: 'Clearance order',
    facts: [
      { label: 'Yellow', value: '2', ball: 'yellow' },
      { label: 'Green', value: '3', ball: 'green' },
      { label: 'Brown', value: '4', ball: 'brown' },
      { label: 'Blue', value: '5', ball: 'blue' },
      { label: 'Pink', value: '6', ball: 'pink' },
      { label: 'Black', value: '7', ball: 'black' },
    ],
    factsFooter: 'Total available — 27 points',
    bodyHeading: 'After the final red',
    body: [
      {
        paragraphs: [
          'Once the last red has been legally potted, the player may still play a colour as the next scoring ball.',
          'After that colour, the final phase begins.',
          'The colours are then played in ascending point value: yellow, green, brown, blue, pink, black.',
          'Unlike earlier in the frame, each legally potted colour now remains off the table.',
          'The final six colours are worth 27 points in total, which means a frame can sometimes change dramatically near the end.',
        ],
      },
    ],
    takeaways: [
      'The colour order becomes fixed after the reds phase.',
      'Colours are no longer re-spotted during the final clearance.',
      'The six colours are worth 27 points altogether.',
      'Knowing the remaining points helps with tactical decisions.',
    ],
    checklist: [
      'Clearance order memorised',
      'Total colour value remembered',
      'Endgame scoring understood',
    ],
  },
  {
    id: 'lesson-09',
    index: 9,
    tag: 'Strategy',
    listTitle: 'Choosing the right shot',
    title: 'Attack or defend?',
    intro:
      'Good snooker is built on decisions. Learn when a pot is worth attempting and when safety is the smarter option.',
    factsTitle: 'Before every shot',
    facts: [
      { label: 'Pot difficulty', value: 'How likely is success?' },
      { label: 'Position', value: 'Where will the white finish?' },
      { label: 'Risk', value: 'What happens if you miss?' },
      { label: 'Safety', value: 'Can you leave trouble?' },
    ],
    bodyHeading: 'Think beyond the current shot',
    body: [
      {
        paragraphs: [
          'Beginners often choose a shot simply because a ball can be potted. More experienced players also consider what happens immediately afterwards.',
          'A difficult pot may offer several points, but a miss could leave the opponent with an open table.',
          'A slightly easier pot that naturally gives good cue-ball position is often the better attacking choice.',
          'When no reliable attacking option exists, a safety may be the strongest decision. The goal is not to attack constantly; it is to control the frame.',
        ],
      },
    ],
    takeaways: [
      'Judge both reward and risk.',
      'Consider cue-ball position before committing to a pot.',
      'Difficult shots are not automatically good shots.',
      'Safety is an active strategic choice.',
    ],
    checklist: [
      'Shot risk considered',
      'Position included in decisions',
      'Attack-vs-safety choices practised',
    ],
  },
  {
    id: 'lesson-10',
    index: 10,
    tag: 'Club guide',
    listTitle: 'Table etiquette',
    title: 'Playing with confidence',
    intro:
      'Snooker has a strong tradition of courtesy and concentration. A few simple habits make every frame better for everyone at the table.',
    factsTitle: 'Good table habits',
    facts: [
      { label: 'Stay still', value: 'While the other player is down' },
      { label: 'Keep quiet', value: 'During cue delivery' },
      { label: 'Give space', value: 'Avoid the line of sight' },
      { label: 'Respect equipment', value: 'Handle cues and rests with care' },
    ],
    bodyHeading: 'Respecting the game',
    body: [
      {
        paragraphs: [
          'When your opponent is preparing to play, avoid unnecessary movement or conversation close to the table.',
          'Do not stand directly in their line of sight if another position is available. Allow enough room around the table for a comfortable stance and cue action.',
          'If you commit a foul that is not immediately obvious, good sporting etiquette is to acknowledge it.',
          'Equipment should also be treated carefully. Avoid placing drinks or personal belongings on the table and do not sit on the cushions.',
          'Snooker is competitive, but good club play should remain respectful and enjoyable for everyone.',
        ],
      },
    ],
    takeaways: [
      "Stay quiet and still during an opponent's shot.",
      'Give players enough physical and visual space.',
      'Respect the table and club equipment.',
      'Good etiquette is part of good snooker.',
    ],
    checklist: [
      'Basic etiquette understood',
      'Table behaviour remembered',
      'Ready for club play',
    ],
  },
  {
    id: 'lesson-11',
    index: 11,
    tag: 'Technique',
    listTitle: 'Using the cushions',
    title: 'Playing off the cushions',
    intro:
      'Cushions are not only boundaries. They can help control the cue ball, escape difficult positions, and create better angles for the next shot.',
    factsTitle: 'Basic cushion ideas',
    facts: [
      { label: 'One cushion', value: 'Simple rebound' },
      { label: 'Two cushions', value: 'Wider positional route' },
      { label: 'Three cushions', value: 'Advanced control' },
      { label: 'Side spin', value: 'Changes rebound angle' },
    ],
    bodyHeading: 'Understanding rebound angles',
    body: [
      {
        paragraphs: [
          'When the cue ball reaches a cushion, it changes direction according to the angle and speed of the shot.',
          'With a simple centre-ball strike and moderate speed, the rebound is often predictable. As more side spin is added, the cue ball can leave the cushion at a noticeably different angle.',
          'Cushions are commonly used for positional play. Instead of stopping the cue ball directly near the next object ball, players may deliberately send it into one or more cushions to reach a better area of the table.',
          'For beginners, the most important step is learning simple one-cushion routes before experimenting with strong side spin.',
        ],
      },
    ],
    takeaways: [
      'Cushions can improve cue-ball position.',
      'Speed affects how far the cue ball travels.',
      'Side spin changes the rebound.',
      'Simple one-cushion routes are the best place to start.',
    ],
    checklist: [
      'Basic rebound understood',
      'One-cushion route identified',
      'Cushion control practised',
    ],
  },
  {
    id: 'lesson-12',
    index: 12,
    tag: 'Equipment',
    listTitle: 'Using the rest',
    title: 'Reaching difficult shots',
    intro:
      'Not every shot can be played comfortably by hand. Learn when to use the rest and how to keep your cue action controlled.',
    factsTitle: 'Common rest equipment',
    facts: [
      { label: 'Rest', value: 'Standard support' },
      { label: 'Spider', value: 'Raises the cue over balls' },
      { label: 'Extended rest', value: 'Helps with longer reach' },
      { label: 'Cue extension', value: 'Adds extra cue length' },
    ],
    bodyHeading: 'When the rest is needed',
    body: [
      {
        paragraphs: [
          'The rest is used when the cue ball is too far away to reach comfortably with a normal bridge hand.',
          'Place the rest head firmly on the cloth and position the cue inside the appropriate groove. Your grip should remain relaxed, and the cue should move smoothly through the rest.',
          'Avoid stretching too far across the table. An unstable stance makes it much harder to control both aim and speed.',
          'Using the rest is not a last resort. Even experienced players choose it whenever it provides a more stable and accurate shot.',
        ],
      },
    ],
    takeaways: [
      'Use the rest when a normal stance is uncomfortable.',
      'Stability is more important than stretching.',
      'Keep the cue action smooth and controlled.',
      'Different rest tools help solve different positions.',
    ],
    checklist: [
      'Standard rest recognised',
      'Correct purpose understood',
      'Rest shots practised',
    ],
  },
  {
    id: 'lesson-13',
    index: 13,
    tag: 'Technique',
    listTitle: 'Understanding angles',
    title: 'Reading the shot',
    intro:
      'Every pot begins with geometry. Learning to recognise angles makes aiming more consistent and positional play much easier.',
    factsTitle: 'Angle types',
    facts: [
      { label: 'Straight', value: 'Full contact' },
      { label: 'Slight cut', value: 'Small potting angle' },
      { label: 'Medium cut', value: 'More precise contact' },
      { label: 'Thin cut', value: 'Fine contact required' },
    ],
    bodyHeading: 'How contact changes direction',
    body: [
      {
        paragraphs: [
          'A straight pot requires the cue ball to contact the object ball almost directly along the line to the pocket.',
          'As the angle increases, the cue ball must strike more toward the side of the object ball.',
          'A thinner contact sends the object ball across a sharper angle, but it also requires greater accuracy.',
          "The cue ball's path after impact changes too. This is why understanding angles is useful not only for potting, but also for predicting where the cue ball will finish.",
          'Start by practising simple straight and half-ball style contacts before moving to thinner cuts.',
        ],
      },
    ],
    takeaways: [
      'Larger cut angles require thinner contact.',
      'Potting angle affects cue-ball movement.',
      'Straight shots are best for basic alignment practice.',
      'Angle recognition improves with repetition.',
    ],
    checklist: [
      'Straight contact understood',
      'Cut shots recognised',
      'Different angles practised',
    ],
  },
  {
    id: 'lesson-14',
    index: 14,
    tag: 'Technique',
    listTitle: 'Shot speed',
    title: 'Controlling pace',
    intro:
      'The same line can produce very different results depending on speed. Good players control not only direction, but distance.',
    factsTitle: 'Speed levels',
    facts: [
      { label: 'Soft', value: 'Short cue-ball travel' },
      { label: 'Medium', value: 'Controlled positional play' },
      { label: 'Firm', value: 'Greater distance' },
      { label: 'Power', value: 'Used selectively' },
    ],
    bodyHeading: 'Why speed matters',
    body: [
      {
        paragraphs: [
          'A soft shot gives the cue ball less energy and usually makes position easier to control over short distances.',
          'Medium-paced shots are common in break-building because they provide enough movement without making the cue ball difficult to predict.',
          'Firm shots may be useful when the cue ball needs to travel around the table or separate balls from a cluster.',
          'Power should be used carefully. Hitting harder increases the consequences of small aiming errors and can make cue-ball control less predictable.',
          'A useful beginner exercise is to play the same shot several times using different speeds and compare where the cue ball finishes.',
        ],
      },
    ],
    takeaways: [
      'Speed affects both accuracy and position.',
      'Softer shots are often easier to control.',
      'Power is not automatically better.',
      'Consistent pace improves positional play.',
    ],
    checklist: [
      'Speed differences understood',
      'Medium pace controlled',
      'Distance control practised',
    ],
  },
  {
    id: 'lesson-15',
    index: 15,
    tag: 'Rules',
    listTitle: 'Playing from the D',
    title: 'Cue ball in hand',
    intro:
      'When the cue ball must be played from the D, placement becomes part of the strategy. A small change in starting position can create a much better angle.',
    factsTitle: 'The D area',
    facts: [
      { label: 'Left side', value: 'Changes approach angle' },
      { label: 'Centre', value: 'Neutral starting line' },
      { label: 'Right side', value: 'Opens alternative routes' },
      { label: 'Baulk line', value: 'Defines the D boundary' },
    ],
    bodyHeading: 'Choosing where to place the cue ball',
    body: [
      {
        paragraphs: [
          'When playing from in-hand, the cue ball is placed inside or on the lines of the D according to the situation.',
          'Do not automatically place it in the centre.',
          'Moving the cue ball slightly left or right may create a clearer view of the ball-on, a better safety angle, or an easier attacking opportunity.',
          'Before choosing the position, consider both the first contact and where the cue ball may finish after the shot.',
          'This simple decision can significantly change the difficulty of the next few seconds of play.',
        ],
      },
    ],
    takeaways: [
      'Cue-ball placement affects the entire shot.',
      'The centre of the D is not always the best option.',
      'Look for both attacking and safety angles.',
      'Small positional changes can create easier routes.',
    ],
    checklist: [
      'D placement understood',
      'Alternative starting positions considered',
      'In-hand decisions practised',
    ],
  },
  {
    id: 'lesson-16',
    index: 16,
    tag: 'Strategy',
    listTitle: 'Snookers and escapes',
    title: 'Getting out of trouble',
    intro:
      'When the direct path to the required ball is blocked, the challenge becomes finding a legal route without giving away unnecessary points.',
    factsTitle: 'Escape options',
    facts: [
      { label: 'One cushion', value: 'Simple indirect route' },
      { label: 'Multiple cushions', value: 'Advanced escape' },
      { label: 'Swerve', value: 'Curved cue-ball path' },
      { label: 'Safety return', value: 'Escape with control' },
    ],
    bodyHeading: 'Escaping a snooker',
    body: [
      {
        paragraphs: [
          'A player is snookered when the required ball cannot be contacted directly in the necessary way because another ball blocks the path.',
          'The simplest escape often uses a cushion.',
          'Estimate the rebound angle, choose the required speed, and aim for a legal contact with the ball-on.',
          'The goal is not always to pot. In many situations, simply making legal contact and leaving the cue ball safe is already a successful result.',
          'Repeated failed escape attempts can become costly, so beginners should focus first on reliable contact rather than ambitious positional outcomes.',
        ],
      },
    ],
    takeaways: [
      'A snooker blocks the direct route to the ball-on.',
      'Cushions are commonly used to escape.',
      'Legal contact is the first priority.',
      'A controlled escape is better than a risky one.',
    ],
    checklist: [
      'Snooker position recognised',
      'One-cushion escape understood',
      'Escape angles practised',
    ],
  },
  {
    id: 'lesson-17',
    index: 17,
    tag: 'Rules',
    listTitle: 'The free ball',
    title: 'An extra option after a foul',
    intro:
      'A free ball can change the structure of a visit. Learn what it means and why the nominated ball temporarily takes the role of the ball-on.',
    factsTitle: 'Free ball idea',
    facts: [
      { label: 'Foul occurs', value: 'Opponent gains points' },
      { label: 'Snooker remains', value: 'Referee may call free ball' },
      { label: 'Player nominates', value: 'Another ball' },
      { label: 'Temporary value', value: 'Same as the ball-on' },
    ],
    bodyHeading: 'How a free ball works',
    body: [
      {
        paragraphs: [
          'A free ball may be awarded when, after a foul, the incoming player is snookered on all legal balls-on.',
          'The player may then nominate another ball as a substitute for the current ball-on.',
          'If a red is the ball-on, the nominated free ball is treated as a red for that shot and scores one point if legally potted.',
          'Afterward, the normal sequence continues.',
          'The nominated ball normally returns to its appropriate position if required by the rules.',
          'Free-ball situations can be confusing at first, so the key idea is simple: another ball temporarily acts as the legal target.',
        ],
      },
    ],
    takeaways: [
      'A free ball can follow certain foul situations.',
      'Another ball temporarily becomes the ball-on.',
      'Its scoring value matches the current ball-on.',
      'Normal play continues after the free-ball shot.',
    ],
    checklist: [
      'Free-ball concept understood',
      'Temporary ball-on role remembered',
      'Example situation reviewed',
    ],
  },
  {
    id: 'lesson-18',
    index: 18,
    tag: 'Strategy',
    listTitle: 'Frame strategy',
    title: 'Playing the score',
    intro:
      'The best shot can change depending on the score. Learn to think about points remaining, risk, and what your opponent still needs.',
    factsTitle: 'Check before playing',
    facts: [
      { label: 'Current score', value: 'Who leads?' },
      { label: 'Points remaining', value: 'How many are available?' },
      { label: 'Risk level', value: 'What happens after a miss?' },
      { label: 'Safety value', value: 'Can you force an error?' },
    ],
    bodyHeading: 'Why the score matters',
    body: [
      {
        paragraphs: [
          'Snooker strategy changes as the frame develops.',
          'When you are behind, attacking opportunities may become more important because you need points.',
          'When you are ahead, unnecessary risk can allow the opponent back into the frame.',
          'Players also consider how many points remain on the table. If the deficit is greater than the available scoring value, additional points may need to come from opponent fouls.',
          'This is why snooker is not only a potting game. Good frame management depends on understanding both the table and the scoreboard.',
        ],
      },
    ],
    takeaways: [
      'Strategy should reflect the current score.',
      'Points remaining influence shot selection.',
      'Leading players can often choose lower-risk options.',
      'Fouls can become important late in a frame.',
    ],
    checklist: [
      'Score considered before shot',
      'Points remaining understood',
      'Late-frame decisions practised',
    ],
  },
  {
    id: 'lesson-19',
    index: 19,
    tag: 'Strategy',
    listTitle: 'Breaking clusters',
    title: 'Opening the reds',
    intro:
      'Reds often remain grouped together. Learn how controlled contact can create new scoring opportunities without losing cue-ball position.',
    factsTitle: 'Cluster options',
    facts: [
      { label: 'Gentle contact', value: 'Opens one or two reds' },
      { label: 'Side contact', value: 'Separates edge reds' },
      { label: 'Cannon', value: 'Cue ball contacts another ball' },
      { label: 'Power split', value: 'Higher-risk option' },
    ],
    bodyHeading: 'Creating new opportunities',
    body: [
      {
        paragraphs: [
          'A cluster is a group of balls positioned so closely that few or none are available to pot.',
          'During a break, players often use a positional shot on a colour to send the cue ball into the pack of reds.',
          'The aim is not simply to scatter everything.',
          'A controlled split should create one or more available reds while keeping the cue ball in a useful area.',
          'Too much power can leave the cue ball far from the action or create easy opportunities if the break ends.',
          'For beginners, gentle cluster opening is usually safer and easier to predict.',
        ],
      },
    ],
    takeaways: [
      'Clusters restrict scoring options.',
      'Controlled contact is usually better than excessive power.',
      'Plan the cue-ball route before opening the pack.',
      'The goal is to create the next pot, not maximum movement.',
    ],
    checklist: [
      'Cluster recognised',
      'Controlled split understood',
      'Gentle opening shot practised',
    ],
  },
  {
    id: 'lesson-20',
    index: 20,
    tag: 'Training',
    listTitle: 'Beginner practice routine',
    title: 'Building consistency',
    intro:
      'Progress comes faster when practice has a purpose. Use a simple routine to improve accuracy, cue-ball control, and confidence step by step.',
    factsTitle: 'Practice blocks',
    facts: [
      { label: 'Straight pots', value: '10 minutes' },
      { label: 'Basic angles', value: '10 minutes' },
      { label: 'Cue-ball control', value: '10 minutes' },
      { label: 'Safety shots', value: '10 minutes' },
      { label: 'Short match', value: 'Final practice' },
    ],
    bodyHeading: 'A simple training session',
    body: [
      {
        paragraphs: [
          'Begin with easy straight pots. The goal is not speed, but repeating the same stance, cue action, and follow-through.',
          'Next, move to simple angled pots from both sides of the table.',
          'Then practise cue-ball control by trying to stop the white inside specific areas after each shot.',
          'Add several basic safety shots, focusing on leaving distance between the cue ball and object balls.',
          'Finish with a short frame or simplified game. This helps combine technique, scoring, and decision-making in a more realistic situation.',
          'Record what felt difficult and repeat that area during the next session.',
        ],
      },
    ],
    takeaways: [
      'Structured practice is more effective than random shooting.',
      'Begin with simple, repeatable shots.',
      'Combine technique with positional control.',
      'Track weak areas and revisit them regularly.',
    ],
    checklist: [
      'Practice routine understood',
      'Core drills completed',
      'Progress recorded',
    ],
  },
];

export const lessonFilters = [
  'All',
  'Basics',
  'Rules',
  'Technique',
  'Strategy',
  'Equipment',
  'Training',
  'Club guide',
] as const;

export type LessonFilter = (typeof lessonFilters)[number];

export function lessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

export function nextLesson(id: string): Lesson | undefined {
  const at = lessons.findIndex(lesson => lesson.id === id);
  if (at < 0 || at === lessons.length - 1) {
    return undefined;
  }
  return lessons[at + 1];
}

export function previousLesson(id: string): Lesson | undefined {
  const at = lessons.findIndex(lesson => lesson.id === id);
  if (at <= 0) {
    return undefined;
  }
  return lessons[at - 1];
}

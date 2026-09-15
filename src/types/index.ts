export type LessonTag =
  | 'Basics'
  | 'Technique'
  | 'Strategy'
  | 'Rules'
  | 'Equipment'
  | 'Training'
  | 'Club guide';

export interface LessonFactRow {
  label: string;
  value: string;
  ball?: string;
}

export interface LessonBodyBlock {
  heading?: string;
  paragraphs: string[];
}

export interface Lesson {
  id: string;
  index: number;
  tag: LessonTag;
  listTitle: string;
  title: string;
  intro: string;
  factsTitle: string;
  facts: LessonFactRow[];
  factsFooter?: string;
  bodyHeading: string;
  body: LessonBodyBlock[];
  takeaways: string[];
  checklist: string[];
}

export type DictionaryCategory =
  | 'Scoring'
  | 'Rules'
  | 'Technique'
  | 'Strategy'
  | 'Equipment'
  | 'Table'
  | 'Match';

export interface DictionaryTerm {
  id: string;
  term: string;
  category: DictionaryCategory;
  definition: string;
}

export interface QuizAnswerOption {
  id: string;
  label: string;
}

export interface QuizRound {
  id: string;
  title: string;
  statements: { id: string; text: string; answerId: string }[];
  options: QuizAnswerOption[];
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  correct: number;
  total: number;
  accuracy: number;
  durationSeconds: number;
}

export interface QuizStats {
  bestScore: number;
  bestScoreDate: string | null;
  attempts: QuizAttempt[];
}

export type EventCategory =
  | 'Promotion'
  | 'Special event'
  | 'Member event'
  | 'Tournament'
  | 'Finale'
  | 'Live music'
  | 'Club night'
  | 'Social';

export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  badge?: string;
  dateLabel: string;
  isoDate: string;
  timeLabel: string;
  venue: string;
  detail: string;
  description: string;
  format?: string;
  tournament: boolean;
}

export type PlanState = 'going' | 'interested';

export type EventPlans = Record<string, PlanState>;

export type MenuCategory =
  | 'Starters'
  | 'Sides'
  | 'Soups'
  | 'Salads'
  | 'Burgers'
  | 'Mains'
  | 'Pasta'
  | 'Flatbreads'
  | 'Desserts'
  | 'Coffee & tea'
  | 'Cold drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image?: string;
}

export interface CartLine {
  itemId: string;
  quantity: number;
}

export interface SubmittedRequest {
  id: string;
  reference: string;
  table: string;
  createdAt: string;
  lines: { name: string; quantity: number; price: number }[];
  total: number;
}

export type MemberTier = 'Classic' | 'Silver' | 'Gold' | 'Platinum';

export type ActivationState = 'none' | 'pending' | 'active';

export interface Profile {
  name: string;
  memberNumber: string;
  tier: MemberTier;
  validTo: string;
  activation: ActivationState;
  activatedAt: string | null;
}

export interface LessonProgress {
  checkedSections: string[];
  completed: boolean;
  lastSectionIndex: number;
}

export type LessonProgressMap = Record<string, LessonProgress>;

export interface BallEvent {
  id: string;
  player: 1 | 2;
  points: number;
  label: string;
  foul: boolean;
  at: number;
}

export interface MatchState {
  playerOne: string;
  playerTwo: string;
  bestOf: number;
  table: string;
  frameNumber: number;
  scoreOne: number;
  scoreTwo: number;
  framesOne: number;
  framesTwo: number;
  events: BallEvent[];
  startedAt: number | null;
  currentBreak: number;
  currentBreakPlayer: 1 | 2 | null;
  highestBreak: number;
  highestBreakPlayer: 1 | 2 | null;
}

export interface SavedMatch {
  id: string;
  playedAt: string;
  durationMinutes: number;
  playerOne: string;
  playerTwo: string;
  scoreOne: number;
  scoreTwo: number;
  framesOne: number;
  framesTwo: number;
  winner: string;
  highestBreak: number;
}

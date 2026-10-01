export type AgeGroup = '10-14' | '15-19' | '20-24' | '25-29' | '30-35' | '35 Above';

export type Sex = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export type AthleteLevel = 
  | 'Grassroots / School'
  | 'District / Club'
  | 'State / Regional'
  | 'National'
  | 'International / Elite';

export interface UserProfile {
  name: string;
  dob: string; // YYYY-MM-DD
  age: number | null;
  ageGroup: AgeGroup | null;
  city: string;
  sex: Sex;
  isAthlete: boolean;
  // Athlete-specific fields
  sport?: string;
  athleteLevel?: AthleteLevel;
  yearsOfTraining?: number;
}

export type FactorId = 
  | 'anxiety'
  | 'stress'
  | 'emotion_regulation'
  | 'motivation'
  | 'self_confidence'
  | 'concentration_focus'
  | 'mental_toughness'
  | 'aggression_anger'
  | 'intelligence_learning'
  | 'mood_wellbeing';

export interface FactorDefinition {
  id: FactorId;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    bar: string;
  };
  // Whether high score indicates distress (e.g. Anxiety, Stress, Aggression) or capability (e.g. Motivation, Confidence)
  isDistressMeasure: boolean;
  // 3 Matched Psychological Skills
  matchedSkills: PstSkill[];
  // Age-specific coaching tips
  ageTips: Record<AgeGroup, string>;
}

export interface Question {
  id: string;
  factorId: FactorId;
  text: string;
  isAthleteSpecific?: boolean;
}

export interface PstSkill {
  name: string;
  category: string;
  tagline: string;
  description: string;
  howToPractice: string[];
  duration: string;
  evidenceBase: string;
  exerciseType?: 'breathing' | 'reframing' | 'visualization' | 'goal_setting' | 'standard';
}

export interface FactorScoreResult {
  factorId: FactorId;
  title: string;
  rawScore: number;
  maxScore: number;
  scorePercentage: number;
  // Normalized 0-100 where higher is always better/healthier
  healthIndex: number;
  needsAttention: boolean;
  attentionPriority: number; // Higher number = more urgent attention needed
  severityLabel: 'High Need' | 'Moderate Need' | 'Balanced' | 'Strong Asset';
  matchedSkills: PstSkill[];
  ageTip: string;
}

export interface TargetPlanItem {
  id: string;
  factorId: FactorId;
  factorTitle: string;
  currentHealthScore: number;
  targetHealthScore: number;
  primarySkill: string;
  weeklyTargetRoutine: string;
  fourWeekTargetGoal: string;
  isCustom?: boolean;
}

export type AppStep = 'profile' | 'factors_overview' | 'questionnaire' | 'pst_plan' | 'target';

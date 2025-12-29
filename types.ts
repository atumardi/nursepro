
export type NavigationTab = 'askep' | 'sbar' | 'calc' | 'expert' | 'profile' | 'about' | 'privacy';

export interface AppUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  lastLogin: number;
}

export interface AskepDiagnosis {
  code: string;
  name: string;
  category: string;
  definition: string;
  causes: string[];
  signs: {
    major: string[];
    minor: string[];
  };
  timestamp?: number;
}

export interface SBARData {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizSet {
  id: string;
  title: string;
  sourceType: 'topic' | 'document';
  createdAt: number;
  questions: QuizQuestion[];
}

export interface QuizHistory {
  id: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: number;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  category: string;
  thumbnail: string;
}

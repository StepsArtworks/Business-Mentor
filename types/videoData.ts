export interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  transcript: string;
  nextVideoId?: string;
  previousVideoId?: string;
  isCompleted: boolean;
  context: string;
  setting: string;
}

export interface Question {
  id: string;
  videoId: string;
  question: string;
  answer: string;
  timestamp: number;
}

export interface QuestionHistoryItem {
  id: string;
  videoId: string;
  question: string;
  answer: string;
  timestamp: Date;
}
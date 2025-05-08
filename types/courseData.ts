export interface Topic {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  transcript: string;
  isCompleted: boolean;
  order: number; // 1-10 for ordering within topic
  topicId: string;
  nextVideoId?: string;
  previousVideoId?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}
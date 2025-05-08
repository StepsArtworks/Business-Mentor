import { Category } from '@/types/courseData';

// Helper function to create video objects with meaningful titles
function createVideo(id: string, title: string, description: string, order: number, topicId: string): Video {
  return {
    id,
    title,
    description,
    duration: 20, // 20 seconds per video
    thumbnail: `https://images.pexels.com/photos/${3182750 + order}/pexels-photo-${3182750 + order}.jpeg`,
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    transcript: `Transcript for ${title}`,
    isCompleted: false,
    order,
    topicId
  };
}

export const categories: Category[] = [
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Small Business Tips',
    description: 'Essential knowledge for starting and growing your business with limited resources.',
    topics: [
      {
        id: 'start-business',
        title: 'How to start a business with minimal capital',
        description: 'Learn how to start and grow a successful business with limited resources.',
        videos: [
          createVideo('start-1', 'Introduction', 'Overview of starting a business with minimal capital', 1, 'start-business'),
          createVideo('start-2', 'Choose a Low-Cost Business Idea', 'How to identify and evaluate low-cost business opportunities', 2, 'start-business'),
          createVideo('start-3', 'Bootstrap Your Business', 'Strategies for bootstrapping your business effectively', 3, 'start-business'),
          createVideo('start-4', 'Leverage Free Tools', 'Essential free tools and resources for your business', 4, 'start-business'),
          createVideo('start-5', 'Validate Your Business Idea Without Spending', 'Cost-effective ways to validate your business concept', 5, 'start-business'),
          createVideo('start-6', 'The Power of Networking', 'Building valuable connections without spending money', 6, 'start-business'),
          createVideo('start-7', 'Barter and Trade Services to Get Started', 'Using barter and trade to grow your business', 7, 'start-business'),
          createVideo('start-8', 'Marketing Strategies with Zero Budget', 'Free and effective marketing techniques', 8, 'start-business'),
          createVideo('start-9', 'Side Hustling to Fund Your Business', 'Using side gigs to finance your main business', 9, 'start-business'),
          createVideo('start-10', 'Funding Options for Businesses', 'Understanding various funding options available', 10, 'start-business')
        ]
      },
      {
        id: 'business-plan',
        title: 'Key steps to creating a business plan',
        description: 'Create a practical, actionable business plan that works in the real world.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`plan-${i+1}`, `Business Plan Step ${i+1}`, `Essential step in creating your business plan`, i+1, 'business-plan')
        )
      },
      {
        id: 'common-mistakes',
        title: 'Common mistakes new entrepreneurs make',
        description: 'Learn from others\' failures to avoid costly mistakes in your business journey.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`mistakes-${i+1}`, `Common Mistake ${i+1}`, `Understanding and avoiding critical business mistakes`, i+1, 'common-mistakes')
        )
      },
      {
        id: 'cash-flow',
        title: 'How to manage cash flow for small businesses',
        description: 'Master the art of managing money in your business effectively.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`cash-${i+1}`, `Cash Flow Management ${i+1}`, `Essential cash flow management techniques`, i+1, 'cash-flow')
        )
      },
      {
        id: 'scaling',
        title: 'Scaling your business: When and how',
        description: 'Learn when and how to grow your business sustainably.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`scale-${i+1}`, `Scaling Strategy ${i+1}`, `Key aspects of scaling your business`, i+1, 'scaling')
        )
      },
      {
        id: 'first-customers',
        title: 'How to find your first customers',
        description: 'Strategies to acquire your first paying customers without a marketing budget.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`customers-${i+1}`, `Customer Acquisition ${i+1}`, `Strategies for finding and keeping customers`, i+1, 'first-customers')
        )
      },
      {
        id: 'branding',
        title: 'The importance of branding for small businesses',
        description: 'Build a strong brand identity on a bootstrap budget.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`brand-${i+1}`, `Branding Strategy ${i+1}`, `Essential branding techniques for small businesses`, i+1, 'branding')
        )
      },
      {
        id: 'first-year',
        title: 'Business lessons learned from my first year',
        description: 'Real-world lessons from the crucial first year in business.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`lessons-${i+1}`, `First Year Lesson ${i+1}`, `Critical lessons from the first year in business`, i+1, 'first-year')
        )
      },
      {
        id: 'pivot',
        title: 'How to pivot your business during tough times',
        description: 'Learn to adapt and survive when market conditions change.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`pivot-${i+1}`, `Business Pivot ${i+1}`, `Strategies for pivoting your business`, i+1, 'pivot')
        )
      },
      {
        id: 'networking',
        title: 'The power of networking for business growth',
        description: 'Build valuable business relationships that drive growth.',
        videos: Array(10).fill(null).map((_, i) => 
          createVideo(`network-${i+1}`, `Networking Strategy ${i+1}`, `Essential networking techniques`, i+1, 'networking')
        )
      }
    ]
  }
];

export const getVideoById = (id: string): Video | undefined => {
  for (const category of categories) {
    for (const topic of category.topics) {
      const video = topic.videos.find(v => v.id === id);
      if (video) return video;
    }
  }
  return undefined;
};

export const getNextVideo = (currentVideoId: string): Video | undefined => {
  const currentVideo = getVideoById(currentVideoId);
  if (!currentVideo) return undefined;
  
  for (const category of categories) {
    for (const topic of category.topics) {
      const videoIndex = topic.videos.findIndex(v => v.id === currentVideoId);
      if (videoIndex !== -1 && videoIndex < topic.videos.length - 1) {
        return topic.videos[videoIndex + 1];
      }
    }
  }
  return undefined;
};

export const getPreviousVideo = (currentVideoId: string): Video | undefined => {
  const currentVideo = getVideoById(currentVideoId);
  if (!currentVideo) return undefined;
  
  for (const category of categories) {
    for (const topic of category.topics) {
      const videoIndex = topic.videos.findIndex(v => v.id === currentVideoId);
      if (videoIndex > 0) {
        return topic.videos[videoIndex - 1];
      }
    }
  }
  return undefined;
};
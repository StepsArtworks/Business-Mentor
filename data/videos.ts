import { VideoData } from '@/types/videoData';

export const videos: VideoData[] = [
  {
    id: 'v1',
    title: 'Can You Start a Business with Little to No Money?',
    description: 'Learn how to start a business with minimal capital and discover the mindset needed for success.',
    duration: 180, // 3 minutes
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Sample video from Expo
    transcript: "So, you think you can't start a business without a pocket full of cash, huh? Heh, listen here, kid... you don't need a fortune, just a sharp mind and a spine of steel. I've seen people rise from nothing but the dirt under their nails. Don't you ever let money be an excuse. If you're hungry enough, if you've got the guts, you'll find a way. Stick with me, and I'll show you how to claw your way to the top without spending a king's ransom. But remember... this isn't a game. You either move with purpose, or you don't move at all.",
    nextVideoId: 'v2',
    isCompleted: false,
    context: "Introduce the concept of starting a business with minimal capital and reassure viewers that it's possible. Give a brief overview of what they will learn in this series of videos, featuring a wise, old mentor figure who's seen it all and doesn't sugarcoat the truth. His tone is authoritative, a little rough around the edges, but full of hard-earned wisdom.",
    setting: "The old man is standing at the edge of a crumbling city street, the backdrop a city that has seen hard times. It symbolizes struggle and the grit needed to rise above it. Dusty, worn signs of shops hang in the distance. He's ready to talk about fighting against the odds."
  },
  {
    id: 'v2',
    title: 'Finding Your First Customers',
    description: 'Strategies to acquire your first customers without expensive marketing campaigns.',
    duration: 240, // 4 minutes
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Sample video from Expo
    transcript: "Your first customers won't come knocking at your door, kid. You gotta hunt 'em down. Talk to people. Real people. Not behind some fancy screen, but face to face. Eyes locked, intentions clear. Everybody's looking for solutions to their problems. Your job? Find out what keeps 'em up at night and show 'em how you fix it. Simple as that. No fancy marketing campaigns, no throwing money at billboards. Just pure, honest value. Remember, a satisfied customer doesn't just pay your bills—they bring you more customers. Treat 'em right, and they'll do your marketing for you.",
    previousVideoId: 'v1',
    nextVideoId: 'v3',
    isCompleted: false,
    context: "This video focuses on bootstrapped customer acquisition strategies that rely on relationship building rather than financial investment. The mentor emphasizes the importance of solving real problems and delivering exceptional value.",
    setting: "The mentor is walking through a bustling farmers market, nodding to vendors who greet him by name. He stops occasionally to chat with stall owners, demonstrating the power of community connection and word-of-mouth business."
  },
  {
    id: 'v3',
    title: 'Bootstrapping Your Operations',
    description: 'How to run lean and efficient operations when cash is tight.',
    duration: 210, // 3.5 minutes
    thumbnail: 'https://images.pexels.com/photos/7666131/pexels-photo-7666131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Sample video from Expo
    transcript: "Listen up. Most businesses don't fail 'cause their idea was bad. They fail 'cause they bleed money on things they don't need. You want fancy offices? Expensive equipment? Save it for when you're actually turning a profit. Start in your garage. Use what you've got. Barter. Trade skills. You need to stretch every dollar until it screams for mercy. And for heaven's sake, don't quit your day job until your business can actually feed you. Pride doesn't pay the bills, kid. Survival first, luxury later.",
    previousVideoId: 'v2',
    isCompleted: false,
    context: "This lesson teaches practical approaches to minimizing operational costs while maximizing efficiency. The mentor provides actionable advice on how to prioritize spending and make the most of limited resources.",
    setting: "The mentor is in a modest workshop filled with repurposed materials and self-built equipment. Tools are meticulously organized, demonstrating that resourcefulness matters more than expensive gear."
  }
];

export const getVideoById = (id: string): VideoData | undefined => {
  return videos.find(video => video.id === id);
};

export const getNextVideo = (currentVideoId: string): VideoData | undefined => {
  const currentVideo = getVideoById(currentVideoId);
  if (currentVideo?.nextVideoId) {
    return getVideoById(currentVideo.nextVideoId);
  }
  return undefined;
};

export const getPreviousVideo = (currentVideoId: string): VideoData | undefined => {
  const currentVideo = getVideoById(currentVideoId);
  if (currentVideo?.previousVideoId) {
    return getVideoById(currentVideo.previousVideoId);
  }
  return undefined;
};
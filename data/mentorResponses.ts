import { Question } from '@/types/courseData';

export const commonResponses = [
  "Listen here, kid. That's not how the real world works.",
  "You're thinking too small. Let me show you a better way.",
  "I've seen a hundred businesses fail making that exact mistake.",
  "Now you're starting to think like an entrepreneur.",
  "The difference between success and failure is right there in your question.",
  "That's the kind of thinking that separates the winners from the wannabes.",
  "Hold on. You're missing the point entirely.",
  "Smart question. Most people never even think to ask that.",
  "Let me tell you a story about how I learned this lesson the hard way...",
  "This is exactly the kind of thinking that will set you apart.",
  "You're asking the right questions, but for the wrong reasons.",
  "Most people never figure this out. You're ahead of the game."
];

export const fallbackResponses = [
  "Look, I can only help you with business questions related to what we've covered. Let's stay focused on your journey.",
  "That's not what we're here to discuss. If you want my help, stick to questions about building your business.",
  "I'm your business mentor, not a crystal ball. Let's keep our conversation on track with what matters.",
  "I appreciate your curiosity, but let's focus on the business challenges at hand.",
  "I've built businesses, not answered random questions. What business problem are you trying to solve?",
  "I'm here to guide your business journey, not entertain tangents. What specific business challenge do you need help with?"
];

export const faqResponses: Question[] = [
  {
    id: 'q1',
    videoId: 'start-business-1',
    question: "Do I need a business plan if I'm starting with no money?",
    answer: "A business plan? Sure, but not the fancy kind that collects dust. You need a battle plan—one page that answers: What are you selling? Who's buying it? How will you reach them? What will it cost? How will you make money? Skip the 50-page nonsense and focus on action. Your plan will change weekly anyway. The best entrepreneurs adapt fast.",
    timestamp: 30
  },
  {
    id: 'q2',
    videoId: 'start-business-1',
    question: "What business can I start with less than $100?",
    answer: "Services, kid. Services. Sell what's already between your ears or in your hands. Consulting. Freelancing. Dog walking. House cleaning. Lawn care. Social media management. The list goes on. No inventory, no overhead, just your time and skill. Start there, build a customer base, then expand. I started with nothing but a toolbox and determination. Your first business doesn't need to be your dream business—it just needs to generate cash flow.",
    timestamp: 60
  },
  {
    id: 'q3',
    videoId: 'start-business-2',
    question: "How do I know if my business idea is good?",
    answer: "You don't. Not until you test it in the real world. But here's what you can do: Find five potential customers. Not friends or family—real customers. Tell them your idea. If they pull out their wallet right there, you might have something. If they give you excuses, keep looking. The market doesn't care about your feelings, it cares about value. Test fast, fail fast, adjust faster.",
    timestamp: 120
  },
  {
    id: 'q4',
    videoId: 'start-business-3',
    question: "How do I bootstrap when I have bills to pay?",
    answer: "Keep your day job, kid. Too many entrepreneurs jump ship too early and drown. Start your business on the side. Work 9-5 to pay the bills, 6-midnight to build your dream. Yes, it's hard. Yes, you'll be tired. But you know what's harder? Going bankrupt. Build your business until it makes enough to replace your salary. Then, and only then, think about quitting your job.",
    timestamp: 180
  }
];

export const getResponseForQuestion = (question: string, videoId: string): string => {
  // First, try to match with FAQ
  const faqMatch = faqResponses.find(
    faq => faq.videoId === videoId && 
    (faq.question.toLowerCase().includes(question.toLowerCase()) || 
    question.toLowerCase().includes(faq.question.toLowerCase()))
  );
  
  if (faqMatch) {
    return faqMatch.answer;
  }
  
  // Check if question is related to business
  const businessKeywords = [
    'business', 'money', 'start', 'customer', 'market', 'sell', 'product', 
    'service', 'profit', 'entrepreneur', 'strategy', 'funding', 'invest', 
    'growth', 'plan', 'competition', 'pricing', 'idea', 'bootstrap', 'cost',
    'revenue', 'sales', 'marketing', 'client', 'startup', 'scale', 'grow'
  ];
  
  const isBusinessRelated = businessKeywords.some(keyword => 
    question.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (isBusinessRelated) {
    // Return a random common response for business-related questions
    return commonResponses[Math.floor(Math.random() * commonResponses.length)];
  } else {
    // Return a fallback for non-business questions
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};
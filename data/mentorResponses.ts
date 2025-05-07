import { Question } from '@/types/videoData';

export const commonResponses = [
  "Listen here, kid. That's not how the real world works.",
  "You're thinking too small. Let me show you a better way.",
  "I've seen a hundred businesses fail making that exact mistake.",
  "Now you're starting to think like an entrepreneur.",
  "The difference between success and failure is right there in your question.",
  "That's the kind of thinking that separates the winners from the wannabes.",
  "Hold on. You're missing the point entirely.",
  "Smart question. Most people never even think to ask that."
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
    videoId: 'v1',
    question: "Do I need a business plan if I'm starting with no money?",
    answer: "A business plan? Sure, but not the fancy kind that collects dust. You need a battle plan—one page that answers: What are you selling? Who's buying it? How will you reach them? What will it cost? How will you make money? Skip the 50-page nonsense and focus on action. Your plan will change weekly anyway. The best entrepreneurs adapt fast.",
    timestamp: 30
  },
  {
    id: 'q2',
    videoId: 'v1',
    question: "What business can I start with less than $100?",
    answer: "Services, kid. Services. Sell what's already between your ears or in your hands. Consulting. Freelancing. Dog walking. House cleaning. Lawn care. Social media management. The list goes on. No inventory, no overhead, just your time and skill. Start there, build a customer base, then expand. I started with nothing but a toolbox and determination. Your first business doesn't need to be your dream business—it just needs to generate cash flow.",
    timestamp: 60
  },
  {
    id: 'q3',
    videoId: 'v1',
    question: "How do I fund my business growth without loans?",
    answer: "Customer money. The best funding you'll ever get. Sell first, build second. Take pre-orders. Offer services before products. Find clients who'll pay upfront. Each dollar from customers is worth ten from investors because it proves your idea works. Grow at the pace your profits allow. It's slower, sure, but you'll own 100% of your business. No shark takes a bite. Remember—debt is a tool, but also a chain. Use it carefully, if at all.",
    timestamp: 90
  },
  {
    id: 'q4',
    videoId: 'v2',
    question: "How do I find my first customers without a marketing budget?",
    answer: "Start with who you know—friends, family, former colleagues. But don't stop there. Go where your potential customers already gather. Online forums, community events, Facebook groups, industry meetings. Contribute value first, offer your service second. Cold outreach works too—identify 10 dream clients and contact them personally. Not with some generic pitch, but with specific ideas for their business. One good client leads to three more if you do exceptional work. The money you don't have for marketing? Replace it with hustle and creativity.",
    timestamp: 45
  },
  {
    id: 'q5',
    videoId: 'v2',
    question: "Should I offer discounts to get my first customers?",
    answer: "Discounts? No. Free? Maybe. If you discount, you're just the cheap option—a race to the bottom. Instead, offer your normal price but deliver extraordinary value. Or give something completely free to a select few influencers who can send you business. Don't devalue what you do. If you're solving a real problem, charge accordingly. Remember, a paying customer respects your work more than someone getting a handout. Your early pricing sets expectations for years to come. Choose wisely.",
    timestamp: 120
  },
  {
    id: 'q6',
    videoId: 'v3',
    question: "What expenses should I absolutely avoid when starting out?",
    answer: "Avoid anything that doesn't directly generate revenue or serve customers. Fancy offices, premium software when free versions exist, expensive branding, business cards nobody reads, unnecessary travel, bloated inventory, hiring too soon. Be ruthless about this. I've seen more businesses die from overspending than underearning. Ask yourself: 'If I cut this expense, would my customers notice or care?' If the answer is no, it's probably fat you can trim. Run lean until you've proven your model works.",
    timestamp: 60
  },
  {
    id: 'q7',
    videoId: 'v3',
    question: "How do I compete with bigger companies that have more resources?",
    answer: "You don't compete on their terms—that's suicide. You compete where they can't: speed, personalization, and specialized knowledge. Big companies move like aircraft carriers; you're a speedboat. Make decisions in minutes that take them weeks. Know your customers by name when they treat people like account numbers. Solve specific problems they consider too small or niche. Remember, David didn't try to outmuscle Goliath—he used a different weapon entirely. Find your slingshot.",
    timestamp: 150
  }
];

export const getResponseForQuestion = (question: string, videoId: string): string => {
  // First, try to match with FAQ
  const faqMatch = faqResponses.find(
    faq => faq.videoId === videoId && 
    faq.question.toLowerCase().includes(question.toLowerCase()) || 
    question.toLowerCase().includes(faq.question.toLowerCase())
  );
  
  if (faqMatch) {
    return faqMatch.answer;
  }
  
  // Check if question is related to business
  const businessKeywords = [
    'business', 'money', 'start', 'customer', 'market', 'sell', 'product', 
    'service', 'profit', 'entrepreneur', 'strategy', 'funding', 'invest', 
    'growth', 'plan', 'competition', 'pricing'
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
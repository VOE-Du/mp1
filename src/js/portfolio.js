import portrait from '../assets/portrait.jpg';
import resume from '../assets/Jiahui-Du-Resume.pdf';
import rbacImage from '../assets/project-rbac.png';
import routeImage from '../assets/project-route.png';
import visionImage from '../assets/project-vision.png';
import video from '../assets/showreel.mp4';
import poster from '../assets/showreel-poster.png';
import background from '../assets/background.png';

export const media = {
  portrait,
  background,
  video,
  poster,
  resume,
};
export const projects = [
  {
    id: 'rbac',
    title: 'Access, by design.',
    category: 'FULL-STACK ENGINEERING',
    mark: 'RBAC',
    caption: 'USER → ADMIN → SUPER ADMIN',
    image: rbacImage,
    repository: '',
    demo: '',
    tags: ['Vue 3', 'Spring Boot', 'MySQL', 'JWT'],
    summary: 'A role-based access-control system within a collaborative music resource management platform.',
    result: '3 permission levels. Protection across every layer.',
    details: [
      ['The project', 'A nine-person software engineering project supporting music upload, playback, search, moderation, and account management.'],
      ['My contribution', 'Independently designed and implemented the RBAC module, from requirements and acceptance criteria through frontend, backend, and database design.'],
      ['Engineering decisions', 'Combined role-aware UI visibility, backend permission verification, and database safeguards. Database triggers protected the immutable Super Administrator account.'],
      ['Collaboration', 'Integrated with authentication, user management, and music management across three Scrum Sprints.']]
  },
  {
    id: 'route',
    title: 'A better route forward.',
    category: 'ALGORITHMS & SYSTEM DESIGN',
    mark: 'A → B',
    caption: 'GRAPH THEORY / REAL-WORLD JOURNEYS',
    image: routeImage,
    repository: '',
    demo: '',
    tags: ['Java', 'Graph algorithms', 'Dynamic programming'],
    summary: 'A Java road-trip planner finding minimum-distance journeys through user-selected attractions across a U.S. road network.',
    result: 'From factorial search to state-compressed dynamic programming.',
    details: [
      ['The problem', 'Find a route between an origin and destination while choosing an efficient visiting order for intermediate attractions.'],
      ['My contribution', 'Led system architecture and core algorithm implementation in a co-developed Java application with a Swing interface.'],
      ['Engineering decisions', 'Implemented Dijkstra, Floyd–Warshall, and Bellman–Ford for shortest paths. Used brute force and state-compressed dynamic programming for attraction ordering. Organised replaceable algorithms through the Strategy Pattern.'],
      ['Result', 'Reduced attraction-order optimisation complexity from O(n! · n) to O(n² · 2ⁿ). Algorithm selection considered graph properties, negative edges, and attraction count.']]
  },
  {
    id: 'vision',
    title: 'Learning to see better.',
    category: 'MACHINE LEARNING',
    mark: '79.7%',
    caption: 'CIFAR-10 / TEST ACCURACY',
    image: visionImage,
    repository: '',
    demo: '',
    tags: ['Python', 'PyTorch', 'ResNet-50'],
    summary: 'An image-classification study exploring baseline CNNs, training choices, and transfer learning with ResNet-50.',
    result: '56.9% → 79.7% test accuracy on CIFAR-10.',
    details: [
      ['The project', 'Implemented a complete image-classification pipeline, including normalisation, mini-batch training, inference, and class-wise error analysis.'],
      ['My contribution', 'Evaluated accuracy, precision, recall, Macro F1, confusion matrices, and misclassified samples to understand confusion between similar categories.'],
      ['Experiments', 'Progressively changed SGD to Adam, increased training from 3 to 50 epochs, adjusted data loading, and replaced a shallow CNN with an ImageNet-pretrained ResNet-50.'],
      ['Results in context', 'Across these changes, test accuracy increased from 56.9% to 79.7%, and Macro F1 from approximately 0.57 to 0.80. These are project-specific CIFAR-10 evaluation results.']
    ]
  },
  {
    id: 'aigc',
    title: 'Mapping the AIGC job market.',
    category: 'DATA ANALYSIS',
    tags: ['Python', 'Data cleaning', 'Visualisation'],
    repository: '', demo: '',
    summary: 'A comparative study of AIGC and traditional IT companies for a business analytics competition.',
    details: [
      ['My contribution', 'Owned the coding and data workflow: recruitment data collection, company-profile enrichment, cleaning, and integration.'], 
      ['Scope', 'Built a balanced dataset of 234 AIGC companies and 234 traditional IT companies. Compared salary, skills, education, experience, company characteristics, and geography.'], 
      ['Outcome', 'Extended analysis to product and service descriptions to support the team’s business recommendations.']
    ]
  },
  {
    id: 'vr',
    title: 'One story, many viewpoints.',
    category: 'SURF RESEARCH',
    tags: ['VR', 'AI', 'System integration'],
    repository: '',
    demo: '',
    summary: 'An AI-driven VR storytelling research project exploring narratives from multiple characters and viewpoints.',
    details: [
      ['My contribution', 'Participated from literature review and conceptualisation through implementation, later serving as technical/team lead.'], 
      ['Research direction', 'Explored viewpoint reconstruction, character transitions, speech generation, and inference for missing narrative events.'],
      ['Recognition', 'Selected from 585 submissions; received Excellent Poster, School Winner, and Student-Nominated Winner awards.']
    ]
  },
  {
    id: 'wander',
    title: 'Travel, with people in mind.',
    category: 'HUMAN-CENTRED DESIGN',
    tags: ['UX research', 'Prototyping', 'User testing'],
    repository: '',
    demo: '',
    summary: 'Wander Genius: an AI-assisted travel application designed through a user-centred HCI process.',
    details: [
      ['Research', 'Contributed to the analysis of 239 valid questionnaire responses across age groups in a five-person team.'], 
      ['My contribution', 'Served as prototype-design lead through four major design iterations, using interviews, feedback, usability heuristics, and preference testing.'], 
      ['Design focus', 'Translated user needs into personalised itineraries, voice interaction, sharing, and accessibility-oriented features.']
    ]
  },
];

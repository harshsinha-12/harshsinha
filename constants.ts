import { PortfolioItem, SectionType } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'intro',
    type: SectionType.INTRO,
    title: 'Harsh Sinha',
    subtitle: 'CS & Data Analytics @ IIT Patna',
    shortDescription: 'Building at the intersection of Finance, AI, and Engineering.',
    colorTheme: 'bg-slate-50',
    description: "I'm a final year undergraduate specializing in Computer Science and Data Analytics. Currently exploring WebGL, creative dev, backend systems, and high fidelity UX."
  },
  {
    id: 'exp-multibagg',
    type: SectionType.EXPERIENCE,
    title: 'Multibagg AI',
    subtitle: "Founder's Office & AI Engineer",
    year: '2025',
    client: 'Multibagg AI',
    techStack: ['Python', 'Azure', 'RAG', 'Pinecone', 'Next.js', 'PostHog'],
    colorTheme: 'bg-blue-50',
    shortDescription: 'Analyzed 60+ IPOs and built automated financial insight pipelines.',
    description: "Engineered an AI pipeline converting RHP PDFs to Zod schemas via GPT-4o/Gemini using Azure Queues. Reduced manual analysis from hours to minutes. Built an AI Screener Agent translating natural language to SQL, achieving 90% faster response times.",
    stats: [
      { label: 'Impressions', value: '13x in 3mo' },
      { label: 'Storage Savings', value: '80%' }
    ]
  },
  {
    id: 'proj-tinycats',
    type: SectionType.PROJECT,
    title: 'Tiny Cats',
    subtitle: 'Interactive AI Explanations',
    year: 'May 2025',
    techStack: ['TypeScript', 'Next.js', 'Gemini API', 'Vercel'],
    colorTheme: 'bg-orange-50',
    shortDescription: 'Explaining complex concepts with adorable feline metaphors.',
    description: "Built a Vercel-deployed web app using Gemini API with dual agents that explains complex concepts via interactive cat-themed slides. Implemented a dynamic front-end enabling real-time generation of explanations.",
    link: 'https://github.com/harshsinha-12'
  },
  {
    id: 'proj-stock',
    type: SectionType.PROJECT,
    title: 'Stock Predictor',
    subtitle: 'ML Forecasting Engine',
    year: 'July 2025',
    techStack: ['Python', 'Flask', 'Streamlit', 'Scikit-learn', 'Docker'],
    colorTheme: 'bg-green-50',
    shortDescription: 'Random Forest system to predict daily stock movements.',
    description: "Developed a Random Forest–based system to predict daily stock price movement with custom model training and visualization dashboards. Dockerized for deployment with a dual architecture (Flask backend + Streamlit UI).",
    github: 'https://github.com/harshsinha-12'
  },
  {
    id: 'proj-candle',
    type: SectionType.PROJECT,
    title: 'Candlestick AI',
    subtitle: 'Technical Analysis Automation',
    year: 'March 2025',
    techStack: ['Python', 'Plotly', 'yfinance', 'Gemini Gen AI'],
    colorTheme: 'bg-red-50',
    shortDescription: 'AI-driven interpretation of bullish/bearish patterns.',
    description: "Created a Streamlit app that fetches live stock data, visualizes candlestick charts, and uses Gemini AI to interpret patterns. Automated end-to-end pipeline enabling instant technical insights.",
    github: 'https://github.com/harshsinha-12'
  },
  {
    id: 'about',
    type: SectionType.ABOUT,
    title: 'About Me',
    subtitle: 'The person behind the code',
    colorTheme: 'bg-purple-50',
    shortDescription: 'Data Geek. Creative Developer. Problem Solver.',
    description: "I love programming 3D and 2D websites with good design and beautiful animations. National Finalist at India Fintech Forum 2024. 'If my code doesn’t crash once while building it, was it even learning?'"
  },
  {
    id: 'contact',
    type: SectionType.CONTACT,
    title: 'Get in Touch',
    subtitle: 'Let\'s build something together',
    colorTheme: 'bg-slate-100',
    shortDescription: 'sinha.harshsep@gmail.com',
    description: "Open to opportunities in Software Engineering, AI/ML, and Creative Development.",
    link: 'mailto:sinha.harshsep@gmail.com'
  }
];

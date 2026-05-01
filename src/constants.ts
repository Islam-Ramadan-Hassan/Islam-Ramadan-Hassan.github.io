import React from 'react';

export interface Command {
  id: string;
  label: string;
  icon?: string;
}

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  content?: React.ReactNode;
  timestamp: Date;
  typing?: boolean;
}

export const INITIAL_GREETING = "Hello. I am the Islam.AI Interface—a specialized intelligence terminal designed to provide deep insight into Islam's professional data landscape. How shall we begin our inquiry?";

export const COMMANDS: Command[] = [
  { id: 'about', label: 'Access Biography', icon: 'User' },
  { id: 'skills', label: 'Query Tech Stack', icon: 'Code2' },
  { id: 'projects', label: 'Inspect Artifacts', icon: 'BarChart3' },
  { id: 'experience', label: 'Timeline Audit', icon: 'History' },
  { id: 'contact', label: 'Initialize Contact', icon: 'Mail' },
];

export const RESPONSE_DATA = {
  about: {
    text: "I'm Islam, a Junior Data Analyst skilled in Python, SQL, and Power BI, turning complex data into clear, actionable business insights.",
    details: "I am based in Cairo, Egypt. Currently completing a Postgraduate Diploma in Computer Science at Cairo University and specializing in AI & Data Analytics through the Digilians initiative.",
    nextCommands: ['cv', 'experience', 'skills']
  },
  skills: {
    text: "I leverage a modern data stack to extract insights and build predictive models that drive business strategy.",
    sections: [
      {
        title: "Programming & Data",
        icon: "Code2",
        items: [
          { name: "Python (Pandas, NumPy)", rating: 5 },
          { name: "SQL", rating: 5 },
          { name: "Scikit-learn", rating: 4 },
          { name: "R Programming", rating: 3 }
        ]
      },
      {
        title: "BI & Visualization",
        icon: "PieChart",
        items: [
          { name: "Power BI (DAX)", rating: 5 },
          { name: "Tableau", rating: 4 },
          { name: "Excel (Power Pivot)", rating: 5 },
          { name: "Matplotlib / Seaborn", rating: 4 }
        ]
      },
      {
        title: "Data Science",
        icon: "Brain",
        items: [
          { name: "Machine Learning", rating: 4 },
          { name: "Statistical Modeling", rating: 4 },
          { name: "ETL Processes", rating: 5 },
          { name: "Deep Learning", rating: 3 }
        ]
      }
    ],
    nextCommands: ['projects', 'experience']
  },
  projects: [
    {
      title: "Kickstarter Performance",
      description: "Interactive Power BI dashboard analyzing 379K+ projects and $2.64B pledged globally to pinpoint high-success niches.",
      tech: "Power BI, DAX, Data Modeling",
      highlights: ["Visualized success/failure rates by category", "Created geographic maps for global trends", "Enabled dynamic filtering by project state"],
      metrics: "379K+ Projects, 40M Backers",
      deepDive: {
        description: "A comprehensive analysis of global crowdfunding trends, focusing on category performance and regional investment patterns.",
        challenges: "Managing a massive dataset with non-standardized currency values and fragmented geographic data.",
        solutions: "Implemented complex DAX measures for real-time currency conversion and created a robust data cleaning pipeline using Power Query."
      },
      link: "#",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      title: "Sales & Profitability Analysis",
      description: "Analyzed 10.6M+ revenue dataset, identifying geographic profit drivers and product categories with negative margins.",
      tech: "Excel, Pivot Tables, Conditional Formatting",
      highlights: ["Calculated profit margins (2.65%)", "Identified loss-making regions (Portugal, Sweden)", "Isolated negative profit product categories"],
      metrics: "$10.6M Revenue, 283K Profit",
      deepDive: {
        description: "An end-to-end profitability audit of a multinational retail dataset to identify hidden operational leaks.",
        challenges: "Identifying the root cause of negative profitability in specific European markets despite high sales volume.",
        solutions: "Used advanced pivot table grouping and conditional formatting heatmaps to isolate high-discount transactions as the primary profit drain."
      },
      link: "#",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      title: "Pizza Sales Insights",
      description: "Built an interactive sales dashboard in Excel, integrating multiple data sources to analyze order performance.",
      tech: "Excel, Power Pivot, DAX",
      highlights: ["Integrated multiple data sources", "Analyzed orders, revenue, and performance", "Developed actionable inventory insights"],
      metrics: "100% Schema Efficiency",
      deepDive: {
        description: "A business intelligence tool designed for restaurant owners to optimize inventory based on hourly sales patterns.",
        challenges: "Syncing inventory tracking with varied pricing models and high-frequency transaction data.",
        solutions: "Engineered a Power Pivot data model that connected sales records directly with inventory logs for real-time stock-out warnings."
      },
      link: "#"
    }
  ],
  experience: [
    {
      role: "Data Analyst Trainee",
      company: "Digilians - الرواد الرقميون",
      period: "Dec 2025 - Present",
      description: "Designing relational database schemas, authoring advanced SQL queries, and building interactive dashboards for decision-making."
    },
    {
      role: "AI & Data Analytics Training",
      company: "Digilians Initiative",
      period: "2025 - 2026",
      description: "Specializing in Data Analytics, Artificial Intelligence, and Business Intelligence through a government-sponsored scholarship."
    }
  ],
  contact: {
    text: "I'm ready to help organizations harness the power of their data. Let's connect!",
    email: "islamramadanh@gmail.com",
    socials: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/islam-ramadan-hassan" },
      { platform: "GitHub", link: "#" },
      { platform: "Location", link: "Cairo, Egypt" }
    ]
  },
  languages: {
    text: "I am proficient in the following languages:",
    items: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Professional" }
    ]
  },
  education: {
    text: "My academic background combines technical expertise with a foundation in history and civilization.",
    items: [
      {
        degree: "Postgraduate Diploma in Computer Science",
        school: "Cairo University",
        period: "2024 - Present"
      },
      {
        degree: "Applied AI & Data Analytics",
        school: "Digilians, Egypt",
        period: "2025 - 2026"
      },
      {
        degree: "Bachelor in History and Civilization",
        school: "Al-Azhar University",
        period: "2020 - 2024"
      }
    ]
  },
  awards: {
    text: "Certifications and professional recognition:",
    items: [
      "Google Data Analytics Professional Certificate",
      "AI & Data Analytics (Government Scholarship)",
      "Relational Database Schema Design Specialist"
    ]
  }
};

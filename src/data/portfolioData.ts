export interface WorkflowStage {
  id: string;
  index: string;
  stageLabel: string;
  title: string;
  summary: string;
  items: string[];
}

export interface ToolkitGroup {
  category: string;
  tools: string[];
}

export interface TechnicalToolkit {
  label: string;
  badge: string;
  title: string;
  groups: ToolkitGroup[];
}

export interface AcademicEntry {
  institution: string;
  program: string;
  period: string;
  status: 'In Progress' | 'Completed';
  focus: string;
}

export interface TrainingEntry {
  organization: string;
  program: string;
  period: string;
  classification: 'Specialized Training' | 'Practical Training';
  intro: string;
  topics: string[];
}

export type JourneyTrack = 'all' | 'education' | 'training';

export interface JourneyMilestone {
  id: string;
  index: string;
  period: string;
  track: Exclude<JourneyTrack, 'all'>;
  categoryLabel: string;
  statusLabel: string;
  isCurrent?: boolean;
  title: string;
  organization: string;
  brief: string;
  context: string;
  highlightsLabel: string;
  highlights: string[];
  progressionNote: string;
  relatedProject?: {
    title: string;
    subtitle: string;
  };
}

export interface CertificationEntry {
  issuer: string;
  credentialTag: string;
  name: string;
  status: string;
}

export type ProjectCategory =
  | 'All'
  | 'E-Commerce & Retail'
  | 'Urban Operations'
  | 'Healthcare & Data Quality';

export interface ProjectCaseStudy {
  context: string;
  businessChallenge: string;
  roleAndContribution: string;
  approachAndTechnologies: string;
  verifiedFindings: string[];
  businessRelevance: string;
  limitationsAndEvidence: string;
}

export interface FeaturedProject {
  id: 'marketpulse' | 'urbanpulse' | 'hospital-management' | 'europe-sales';
  index: string;
  title: string;
  headline: string;
  subtitle: string;
  categoryLabel: string;
  category: Exclude<ProjectCategory, 'All'>;
  projectContextLabel?: string;
  theme: 'dark' | 'light';
  role: string;
  description: string;
  kpiHighlights: string[];
  technologies: string[];
  caseStudy: ProjectCaseStudy;
  domainGovernanceNote?: string;
  isConceptPreview: boolean;
  previewCaption: string;
  githubUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  walkthroughUrl?: string;
  walkthroughLabel?: string;
}

export const PROFILE = {
  name: 'Islam Ramadan Hassan',
  shortName: 'Islam Ramadan',
  title: 'Data Analyst | BI Analyst | SQL Server | Power BI | Python',
  location: 'Cairo, Egypt',
  email: 'islamramadanh@gmail.com',
  linkedin: 'https://linkedin.com/in/islam-ramadan-hassan',
  github: 'https://github.com/Islam-Ramadan-Hassan',
  githubUsername: 'Islam-Ramadan-Hassan',
  websiteUrl: 'https://islam-ramadan-hassan.github.io/',
  heroHeadline: 'I turn business data into clearer answers.',
  heroSummary:
    "I'm a Data Analyst focused on understanding business performance, investigating operational challenges, and translating complex datasets into reliable analytical insights. Using SQL Server, Power BI, Python, and Excel, I work across data preparation, analytical modeling, performance reporting, and exploratory analysis.",
  heroEvidence:
    'From examining 99K+ marketplace orders to investigating 6.68M NYC service requests, my projects focus on asking the right questions, validating the evidence, and explaining what the data reveals.',
  aboutLead:
    'I build analytical data models, Power BI dashboards, and evidence-based reports across e-commerce, healthcare, urban operations, and retail analytics.',
  aboutBody:
    'My work pairs structured data preparation in SQL Server and Excel with exploratory analysis in Python to investigate operational and financial patterns. Academically, I am pursuing a Postgraduate Diploma in Computer Science at Cairo University (FGSSR), building on a Bachelor of History and Civilization from Al-Azhar University and specialized training in Applied AI & Data Analytics.',
  aboutTechnical:
    'My work pairs structured data preparation in SQL Server and Excel with exploratory analysis in Python to investigate operational and financial patterns.',
  aboutAcademic:
    'Academically, I am pursuing a Postgraduate Diploma in Computer Science at Cairo University (FGSSR), building on a Bachelor of History and Civilization from Al-Azhar University and specialized training in Applied AI & Data Analytics.',
  aboutDirection:
    'I am focused on Data Analyst, BI Analyst, and Business Performance Analyst roles where clear data modeling and honest reporting help teams make better-informed decisions.',
  languages: [
    { name: 'Arabic', proficiency: 'Native' },
    { name: 'English', proficiency: 'Professional Working Proficiency' },
  ],
  cv: {
    available: false,
    filename: 'Islam_Ramadan_Hassan_CV.pdf',
    path: './cv/Islam_Ramadan_Hassan_CV.pdf',
    unavailableNote: 'CV PDF will be enabled once the final approved document is uploaded.',
  },
} as const;

export const STORY_CHAPTERS = {
  chapter01: {
    heroKicker: 'Chapter 01 · The Analyst',
    aboutKicker: 'Chapter 01 · About',
    aboutHeading: 'The Analyst Behind the Work',
  },
  chapter02: {
    kicker: 'Chapter 02 · How I Approach Data',
    heading: 'Good analysis starts with the right question.',
    subtitle:
      'I approach analytical work as a connected process: understand the business problem, prepare trustworthy data, investigate what is happening, and communicate the findings clearly.',
    transitionLabel: 'See this workflow applied across four projects →',
  },
  chapter03: {
    kicker: 'Chapter 03 · Selected Projects',
    heading: 'Four Projects. Four Different Analytical Challenges.',
    subtitle:
      'From marketplace performance and urban operations to healthcare data quality and retail profitability, each project demonstrates a different way of investigating data and turning findings into useful business insight.',
    transitionLabel: 'Explore the academic and training foundation behind this work →',
  },
  chapter04: {
    kicker: 'Chapter 04 · My Background',
    heading: 'Building My Analytical Foundation.',
    subtitle:
      'My background combines academic research, computer science study, and applied analytics training.',
    transitionLabel: 'Ready to discuss Data Analyst & BI Analyst roles →',
  },
  chapter05: {
    kicker: 'Chapter 05 · Contact',
    heading: 'Ready for the Next Analytical Challenge?',
    bodyPrimary:
      "I'm exploring Data Analyst and Business Intelligence Analyst opportunities where SQL-based analysis, Power BI reporting, and Python can help teams understand performance and make better-informed decisions.",
    bodySecondary:
      "If you're looking for someone who approaches data with curiosity, structure, and attention to evidence, I'd be glad to connect.",
    ctaLabel: "Let's Connect",
  },
} as const;

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'understand',
    index: '01',
    stageLabel: 'Stage 01',
    title: 'Understand the Problem',
    summary:
      'Define the business question, identify relevant measures, and establish the scope of the analysis before working with the data.',
    items: [
      'Business Problem Framing',
      'KPI Definition',
      'Analytical Scope',
      'Domain Understanding',
    ],
  },
  {
    id: 'prepare',
    index: '02',
    stageLabel: 'Stage 02',
    title: 'Prepare Reliable Data',
    summary:
      'Structure relational data, perform transformations, and validate data quality to establish a dependable foundation for analysis.',
    items: [
      'SQL Server',
      'T-SQL',
      'Relational Database Design',
      'Data Modeling',
      'ETL',
      'Power Query',
    ],
  },
  {
    id: 'investigate',
    index: '03',
    stageLabel: 'Stage 03',
    title: 'Investigate the Evidence',
    summary:
      'Explore patterns, compare performance, identify anomalies, and evaluate analytical or predictive approaches where appropriate.',
    items: [
      'Python',
      'Pandas',
      'NumPy',
      'Exploratory Data Analysis',
      'DAX',
      'Statistical Analysis',
      'Machine Learning Evaluation',
    ],
  },
  {
    id: 'communicate',
    index: '04',
    stageLabel: 'Stage 04',
    title: 'Communicate the Findings',
    summary:
      'Translate analytical results into clear dashboards, reports, and evidence-based explanations.',
    items: [
      'Power BI',
      'Excel',
      'Data Visualization',
      'KPI Reporting',
      'Analytical Storytelling',
    ],
  },
];

export const CORE_TECHNICAL_TOOLKIT: TechnicalToolkit = {
  label: 'Supporting Toolkit',
  badge: 'Technical Stack',
  title: 'Technical Toolkit',
  groups: [
    {
      category: 'Databases',
      tools: ['SQL Server', 'T-SQL', 'Relational Database Design', 'SQL Views'],
    },
    {
      category: 'Business Intelligence',
      tools: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'KPI Development'],
    },
    {
      category: 'Programming & Analysis',
      tools: ['Python', 'Pandas', 'NumPy'],
    },
    {
      category: 'Machine Learning',
      tools: ['Scikit-learn', 'LightGBM', 'Model Training & Evaluation'],
    },
    {
      category: 'Reporting & Productivity',
      tools: ['Excel', 'Power Pivot', 'PivotTables', 'Tableau (Basic)'],
    },
    {
      category: 'Workflow & Tools',
      tools: ['ETL', 'Jupyter Notebook', 'Git', 'GitHub'],
    },
  ],
};

export const ACADEMIC_EDUCATION: AcademicEntry[] = [
  {
    institution: 'Faculty of Graduate Studies for Statistical Research (FGSSR), Cairo University',
    program: 'Postgraduate Diploma in Computer Science',
    period: '2024–Present',
    status: 'In Progress',
    focus:
      'Graduate-level computer science coursework strengthening database systems, structured problem solving, and analytical foundations.',
  },
  {
    institution: 'Faculty of Arabic Language, Al-Azhar University',
    program: 'Bachelor of History and Civilization',
    period: '2020–2024',
    status: 'Completed',
    focus:
      'Built disciplined source verification, comparative research synthesis, and clear structured writing.',
  },
];

export const SPECIALIZED_TRAINING: TrainingEntry[] = [
  {
    organization: 'Digital Pioneers (DigiLians)',
    program: 'Specialized Program in Applied AI & Data Analytics',
    period: '2025–2026',
    classification: 'Specialized Training',
    intro: 'Project-based specialized training covering:',
    topics: [
      'SQL Analytics',
      'Data Modeling',
      'Business Intelligence',
      'Python Workflows',
      'Applied Machine Learning',
    ],
  },
];

export const PRACTICAL_TRAINING: TrainingEntry[] = [
  {
    organization: 'Administrative Capital for Urban Development (ACUD)',
    program: 'ACUD Practical Training',
    period: '2026',
    classification: 'Practical Training',
    intro: 'Team-based project experience in:',
    topics: [
      'Urban Analytics',
      'NYC 311 Analysis',
      'Smart City Forecasting',
      'Platform Development',
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'acud-practical-training',
    index: '01',
    period: '2026',
    track: 'training',
    categoryLabel: 'Practical Training · Non-Employment',
    statusLabel: 'Completed',
    title: 'ACUD Practical Training',
    organization: 'Administrative Capital for Urban Development (ACUD)',
    brief:
      'Team-based project experience across urban analytics, NYC 311 service analysis, smart city forecasting, and platform development.',
    context:
      'Completed team-based applied analytics training focused on urban operations and predictive modeling. Served as Team Leader in a four-member team on the UrbanPulse graduation project—directly leading NYC 311 service request analysis (6.68M records), synthetic Smart City LightGBM forecasting, and end-to-end platform UI/UX.',
    highlightsLabel: 'Key Focus Areas',
    highlights: [
      'Urban Analytics',
      'NYC 311 Analysis',
      'Smart City Forecasting',
      'Platform Development',
    ],
    progressionNote:
      'Practical non-employment training separate from DigiLians and formal employment, extending my SQL and Python work into multi-domain analytics platform delivery.',
    relatedProject: {
      title: 'UrbanPulse',
      subtitle: 'Graduation Project · Urban Operations & Predictive Analytics',
    },
  },
  {
    id: 'digilians-applied-ai',
    index: '02',
    period: '2025–2026',
    track: 'training',
    categoryLabel: 'Specialized Training',
    statusLabel: 'Completed',
    title: 'Specialized Program in Applied AI & Data Analytics',
    organization: 'Digital Pioneers (DigiLians)',
    brief:
      'Project-based specialized training covering SQL analytics, data modeling, business intelligence, Python workflows, and applied machine learning.',
    context:
      'Intensive project-based specialized training uniting relational warehousing, Power BI reporting, and Python analysis. Culminated in the MarketPulse graduation capstone, where I led a five-member team and owned the Olist Marketplace analytical domain (99,441 orders, 7 dimension & 3 fact tables, 31 business KPIs, and a six-page Power BI dashboard).',
    highlightsLabel: 'Core Curriculum',
    highlights: [
      'SQL Analytics',
      'Data Modeling',
      'Business Intelligence',
      'Python Workflows',
      'Applied Machine Learning',
    ],
    progressionNote:
      'Turned foundational study into repeatable end-to-end analytics execution—from SQL Server dimensional modeling to executive Power BI storytelling.',
    relatedProject: {
      title: 'MarketPulse',
      subtitle: 'Graduation Capstone · E-Commerce & Marketplace Analytics',
    },
  },
  {
    id: 'cairo-university-fgssr',
    index: '03',
    period: '2024–Present',
    track: 'education',
    categoryLabel: 'Academic Education',
    statusLabel: 'In Progress',
    isCurrent: true,
    title: 'Postgraduate Diploma in Computer Science',
    organization: 'Faculty of Graduate Studies for Statistical Research (FGSSR), Cairo University',
    brief:
      'Graduate-level computer science coursework strengthening database systems, structured problem solving, and analytical foundations.',
    context:
      'Graduate-level computer science coursework strengthening database systems, structured problem solving, and analytical foundations. Formalizes the relational architecture, algorithmic thinking, and statistical grounding behind my SQL Server, Python, and Power BI workflows.',
    highlightsLabel: 'Academic Focus',
    highlights: [
      'Database Systems',
      'Structured Problem Solving',
      'Analytical Foundations',
    ],
    progressionNote:
      'Bridges humanities-trained research rigor with formal graduate-level computer science and statistical study.',
  },
  {
    id: 'al-azhar-history',
    index: '04',
    period: '2020–2024',
    track: 'education',
    categoryLabel: 'Academic Education',
    statusLabel: 'Completed',
    title: 'Bachelor of History and Civilization',
    organization: 'Faculty of Arabic Language, Al-Azhar University',
    brief:
      'Built disciplined source verification, comparative research synthesis, and clear structured writing.',
    context:
      'Built disciplined source verification, comparative research synthesis, and clear structured writing. Trained me to interrogate primary evidence critically, separate verified facts from assumptions, and present complex narratives with clarity.',
    highlightsLabel: 'Transferable Foundation',
    highlights: [
      'Source Verification',
      'Comparative Research Synthesis',
      'Structured Analytical Writing',
    ],
    progressionNote:
      'Established the investigative discipline and evidence-first mindset that guides how I audit data quality and communicate findings today.',
  },
];

export const COMPLETED_CERTIFICATIONS: CertificationEntry[] = [
  {
    issuer: 'Microsoft',
    credentialTag: 'PL-300',
    name: 'Microsoft Certified: Power BI Data Analyst Associate',
    status: 'Completed, 2026',
  },
  {
    issuer: 'Microsoft',
    credentialTag: 'DP-900',
    name: 'Microsoft Certified: Azure Data Fundamentals',
    status: 'Completed',
  },
  {
    issuer: 'Google',
    credentialTag: 'Google',
    name: 'Google Advanced Data Analytics Professional Certificate',
    status: 'Completed',
  },
  {
    issuer: 'Google',
    credentialTag: 'Google',
    name: 'Google Data Analytics Professional Certificate',
    status: 'Completed',
  },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'marketpulse',
    index: '01',
    title: 'MarketPulse',
    headline: 'Understanding marketplace performance at scale.',
    subtitle: 'E-Commerce & Marketplace Analytics',
    categoryLabel: 'E-Commerce & Marketplace Analytics',
    category: 'E-Commerce & Retail',
    projectContextLabel:
      'Graduation Capstone Project — Digital Pioneers (DigiLians), Applied AI & Data Analytics Specialized Program',
    theme: 'dark',
    role: 'Team Leader & Olist Marketplace Domain Owner',
    description:
      'A multi-domain e-commerce analytics project where I led team coordination and owned the Olist Marketplace analytical domain, building a structured SQL Server warehouse and a six-page Power BI dashboard.',
    kpiHighlights: [
      '99,441 Orders · 112,650 Items',
      '31 Business KPIs',
      'R$13.59M Revenue',
      '93.2% On-Time · 4.09/5 Review',
    ],
    technologies: ['SQL Server', 'T-SQL', 'Power BI', 'DAX', 'Python', 'Pandas'],
    caseStudy: {
      context:
        'Graduation Capstone Project for the Digital Pioneers (DigiLians) Applied AI & Data Analytics Specialized Program. MarketPulse is a collaborative multi-domain e-commerce analytics initiative designed to examine marketplace performance, customer behavior, marketing effectiveness, and operational patterns.',
      businessChallenge:
        'Marketplace operations generate large volumes of order, customer, seller, product, and delivery data. Evaluating performance requires structured data models and consistent business measures.',
      roleAndContribution:
        'Led a five-member team and owned the Olist Marketplace analytical domain covering sales, customers, sellers, products, and delivery. Responsible for developing the analytical foundation and marketplace reporting layer, while teammates owned the remaining project domains.',
      approachAndTechnologies:
        'Built a SQL Server dimensional warehouse with 7 dimension tables and 3 fact tables covering 99,441 orders and 112,650 order items, defined 31 business KPIs, developed a six-page Power BI dashboard, and contributed Python-based customer churn classification work. Technologies: SQL Server, T-SQL, Power BI, DAX, Python, Pandas, Jupyter Notebook.',
      verifiedFindings: [
        'Structured 99,441 orders and 112,650 order items into 7 dimension tables, 3 fact tables, and 31 business KPIs.',
        'R$13.59M recorded marketplace revenue across the analyzed Olist dataset.',
        '93.2% on-time delivery performance across fulfilled marketplace orders.',
        '4.09/5 average customer review score.',
      ],
      businessRelevance:
        'The warehouse and KPI layer provide a structured view of marketplace performance, helping users examine sales, delivery, and customer experience through consistent measures.',
      limitationsAndEvidence:
        'The project contains multiple independent analytical domains. My direct ownership was the Olist Marketplace domain, and other team domains are not treated as a unified dataset or combined through unsupported relationships. The reported figures describe the analyzed project data, not live marketplace performance. Visual preview shows Page 1 (Executive Overview) of the Olist Marketplace Power BI dashboard.',
    },
    isConceptPreview: false,
    previewCaption: 'Olist Marketplace Dashboard — Page 1: Executive Overview (Power BI)',
  },
  {
    id: 'urbanpulse',
    index: '02',
    title: 'UrbanPulse',
    headline: 'Investigating urban service patterns and evaluating predictive performance.',
    subtitle: 'Urban Operations & Predictive Analytics',
    categoryLabel: 'Urban Operations & Predictive Analytics',
    category: 'Urban Operations',
    projectContextLabel:
      'Graduation Project — Administrative Capital for Urban Development (ACUD) Practical Training',
    theme: 'light',
    role: 'Team Leader · NYC 311 Analyst · Smart City Forecaster · Platform UI/UX Owner',
    description:
      'A multi-domain urban analytics platform where I directly handled NYC 311 analysis and Smart City forecasting (synthetic dataset), led a four-member team, and owned end-to-end platform UI/UX.',
    kpiHighlights: [
      '6.68M NYC 311 Records',
      '65.28% NYPD & HPD Share',
      'Heating Peak: 3.06× 24-Month Average (Dec 2024)',
      'LightGBM MAE: 7.78 MWh · R²: 0.9964 (~19% Lower Error · Synthetic, 2025 Test)',
    ],
    technologies: ['Python', 'SQL', 'LightGBM', 'Data Analysis', 'Platform UI/UX'],
    domainGovernanceNote:
      'Domain & Ownership Boundary: Smart City forecasting uses a synthetic dataset evaluated on 2025 test data—not live city operations. Buildings, Energy, NYC 311, and Smart City remain separate analytical domains with no unsupported cross-domain joins. Buildings and Energy analyses were completed by other team members (follow-up and review only).',
    caseStudy: {
      context:
        'Graduation Project for the Administrative Capital for Urban Development (ACUD) Practical Training. UrbanPulse is a multi-domain urban analytics platform designed to examine different urban operational datasets through independent analytical workspaces.',
      businessChallenge:
        'Urban operations data can reveal service-demand patterns and operational pressure, but different datasets require clear analytical boundaries and careful interpretation.',
      roleAndContribution:
        "Served as Team Leader in a four-member team. My direct analytical work covered NYC 311 service request analysis and Smart City forecasting using synthetic data, and I owned the platform's end-to-end UI/UX design. Buildings and Energy analyses were completed by other team members; my involvement in those domains was follow-up and review.",
      approachAndTechnologies:
        'NYC 311: analyzed 6.68 million service request records across agency distribution and heating complaint patterns. Smart City: trained a LightGBM forecasting model evaluated using MAE and R², compared against a baseline model on 2025 test data. Technologies: Python, SQL, LightGBM, Data Analysis, Platform UI/UX.',
      verifiedFindings: [
        'NYC 311 (Analytical Finding): NYPD and HPD accounted for 65.28% of service requests across 6.68M analyzed records.',
        'NYC 311 (Analytical Finding): Heating complaints peaked at 3.06 times their 24-month average in December 2024.',
        'Smart City (Analytical Finding — Synthetic Dataset, 2025 Test Data): LightGBM achieved MAE: 7.78 MWh and R²: 0.9964—approximately 19% lower error than the baseline.',
      ],
      businessRelevance:
        'The NYC 311 analysis highlights service-demand patterns that can inform further operational investigation. The forecasting experiment evaluates the potential of predictive modeling under the conditions of the synthetic dataset.',
      limitationsAndEvidence:
        'The Smart City dataset is synthetic and does not represent live city operations. Buildings, Energy, NYC 311, and Smart City remain separate analytical domains with no unsupported cross-domain joins or combined metrics. Missing or inconsistent NYC 311 closure timestamps limit reliable SLA and resolution-time conclusions. The findings are analytical observations, not evidence of implemented operational improvements. Visual preview is a Concept Preview illustration.',
    },
    isConceptPreview: true,
    previewCaption: 'Concept Preview — Independent analytical domains (Buildings, Energy, NYC 311; Smart City kept separate)',
  },
  {
    id: 'hospital-management',
    index: '03',
    title: 'Hospital Management Analytics System',
    headline: 'Looking beyond hospital records to identify collection and data-quality gaps.',
    subtitle: 'Healthcare Analytics & Data Quality',
    categoryLabel: 'Healthcare Analytics & Data Quality',
    category: 'Healthcare & Data Quality',
    theme: 'dark',
    role: 'SQL Server Database Designer & Healthcare Data Analyst',
    description:
      'A SQL Server healthcare analytics solution designed to organize relational records, support billing analysis, and identify operational and data-quality issues.',
    kpiHighlights: [
      '10 SQL Tables · 10+ Views',
      '36% Uncollected Invoices',
      '5× Physician Workload Gap',
      '40+ Missing Chronic Diagnoses',
    ],
    technologies: ['SQL Server', 'T-SQL', 'Relational Modeling', 'ETL', 'SQL Views', 'Power BI'],
    caseStudy: {
      context:
        'A healthcare analytics solution designed to organize hospital operational and financial records.',
      businessChallenge:
        'Healthcare and financial records need a consistent structure to support analysis of billing, payments, physician workload, and patient information quality.',
      roleAndContribution:
        'Designed and developed the hospital analytics solution, organizing relational data and creating reusable SQL-based analytical structures.',
      approachAndTechnologies:
        'Built a normalized SQL Server database with 10 interconnected tables, implemented ETL workflows, authored more than 10 reusable SQL views, and supported analytical reporting. Technologies: SQL Server, T-SQL, Relational Data Modeling, ETL, SQL Views, Power BI.',
      verifiedFindings: [
        '36% of invoices remained uncollected in the analyzed records.',
        'A 5× workload difference between the highest and lowest recorded physician workloads.',
        'More than 40 chronic patient records were missing diagnosis information.',
      ],
      businessRelevance:
        'These findings identify areas that may require further review, including billing collection, workload distribution, and completeness of patient records.',
      limitationsAndEvidence:
        'The findings describe the analyzed records and should not be interpreted as proof of the causes behind collection gaps, workload differences, or missing diagnoses. Further operational validation would be required before drawing causal conclusions. Visual preview is a Concept Preview illustration.',
    },
    isConceptPreview: true,
    previewCaption: 'Concept Preview — Original 10-table relational & ETL visual illustration',
  },
  {
    id: 'europe-sales',
    index: '04',
    title: 'European Sales Analytics',
    headline: 'When higher sales do not necessarily mean higher profitability.',
    subtitle: 'Retail Performance & Profitability',
    categoryLabel: 'Retail Performance & Profitability',
    category: 'E-Commerce & Retail',
    theme: 'light',
    role: 'Solo Data Analyst',
    description:
      'An individual retail performance analysis using Excel-based modeling to investigate sales, profit margins, market performance, discount patterns, and shipping.',
    kpiHighlights: [
      '€10.67M Total Sales',
      '4,117 Orders · 792 Customers',
      '€283K Profit · 2.65% Margin',
      '3.97-Day Average Shipping',
    ],
    technologies: ['Microsoft Excel', 'Power Pivot', 'PivotTables', 'DAX', 'Conditional Formatting'],
    caseStudy: {
      context:
        'A standalone European retail performance and profitability analysis covering 2011–2014.',
      businessChallenge:
        'Sales volume alone does not explain business performance. Profitability, discounting, product categories, and shipping patterns provide additional context for evaluating retail results.',
      roleAndContribution:
        'Completed an individual European retail performance and profitability analysis using Excel-based analytical modeling and reporting.',
      approachAndTechnologies:
        'Built an interactive Excel dashboard with pivot-based performance analysis, market and product profitability comparisons, and discount and shipping pattern analysis. Technologies: Microsoft Excel, Power Pivot, PivotTables, DAX, Conditional Formatting.',
      verifiedFindings: [
        '€10.67M total sales across 4,117 orders and 792 customers.',
        'Approximately €283K profit with an overall margin of 2.65%.',
        'Portugal, the Netherlands, and Sweden were loss-making markets.',
        'Discounts of up to 50% were associated with profit erosion.',
        'Average shipping time was 3.97 days.',
      ],
      businessRelevance:
        'The analysis helps distinguish sales growth from profitable performance and highlights markets, products, and discount patterns that deserve closer review.',
      limitationsAndEvidence:
        'The findings are based on the analyzed historical dataset covering 2011–2014. Observed discount and profitability patterns indicate associations, not proof that discounts alone caused losses. Supported by the verified European-Sales-Analytics GitHub repository and dashboard walkthrough.',
    },
    isConceptPreview: false,
    previewCaption: 'Editorial Visual · Verified GitHub repository and dashboard video walkthrough available',
    githubUrl: 'https://github.com/Islam-Ramadan-Hassan/European-Sales-Analytics',
    walkthroughUrl: 'https://drive.google.com/file/d/10lU1HE4wVV_CiGhR8Cbrzi_4302T3AIQ/preview',
    walkthroughLabel: 'Watch Dashboard Walkthrough',
  },
];

export const PRIORITY_GITHUB_REPOS = [
  'European-Sales-Analytics',
  'Kickstarter-Pulse',
  'Pizza_Sales_2022',
  'MarketPulse',
  'UrbanPulse',
  'Hospital-Management-Analytics-System',
];

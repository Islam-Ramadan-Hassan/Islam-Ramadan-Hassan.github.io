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
    heading: 'Four Projects. Four Analytical Stories.',
    subtitle:
      'Each project tells a distinct story—from the business question and analytical approach to the findings, practical value, and limitations.',
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
    categoryLabel: 'Practical Training',
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
      'Practical training separate from DigiLians, extending my SQL and Python work into multi-domain analytics platform delivery.',
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
    headline: 'From scattered marketplace data to a clearer picture of business performance.',
    subtitle: 'Multi-Domain E-Commerce Intelligence Platform',
    categoryLabel: 'E-Commerce & Marketplace Analytics',
    category: 'E-Commerce & Retail',
    projectContextLabel:
      'Graduation Capstone Project — Digital Pioneers (DigiLians), Applied AI & Data Analytics Specialized Program',
    theme: 'dark',
    role: 'Team Leader & Olist Marketplace Domain Owner',
    description:
      'As Team Leader, I led a five-member team in developing MarketPulse, a business intelligence platform built around four independent e-commerce analytical domains. I was directly responsible for the Olist Marketplace domain, where I worked on organizing the data and turning it into a consistent view of marketplace performance.',
    kpiHighlights: [
      '99,441 Orders · 112,650 Items',
      '31 Business KPIs',
      'R$13.59M Revenue',
      '93.2% On-Time · 4.09/5 Review',
    ],
    technologies: ['SQL Server', 'T-SQL', 'Power BI', 'DAX', 'Python', 'Pandas'],
    caseStudy: {
      context:
        'MarketPulse was our graduation capstone for the Digital Pioneers (DigiLians) Applied AI & Data Analytics Specialized Program.\n\nThe project explored different aspects of e-commerce, from marketplace performance and marketing effectiveness to purchasing behavior and customer reviews. Each domain had its own dataset and analytical workflow, allowing us to investigate its business questions independently.',
      businessChallenge:
        'For the Olist Marketplace, understanding performance meant looking beyond sales figures alone.\n\nOrders, customers, sellers, products, payments, and deliveries were stored across separate data tables. Looking at each source in isolation made it difficult to build a consistent picture of how the marketplace was performing.\n\nThe challenge was to bring these records into a reliable analytical structure and connect commercial performance with delivery outcomes and customer feedback.',
      roleAndContribution:
        'I led the five-member team and took direct ownership of the Olist Marketplace domain.\n\nMy work covered the analytical process from structuring the marketplace data and defining its performance measures to developing the Power BI dashboard. I also worked on customer churn classification using Python.\n\nThe other three domains were handled independently by their respective team members.',
      approachAndTechnologies:
        'I organized the Olist data into a SQL Server dimensional model, creating a foundation for consistent reporting across the marketplace.\n\nOn top of this structure, I developed reusable performance measures and a six-page Power BI dashboard. The dashboard brought together different views of the business, helping users explore sales, product categories, delivery performance, and customer feedback.\n\nThe underlying model covered 99,441 orders and 112,650 order items, supported by seven dimension tables and three fact tables.',
      verifiedFindings: [
        'R$13.59M in revenue across the analyzed Olist dataset, showing the commercial scale of the marketplace.',
        '93.2% on-time delivery rate, offering an indication of delivery reliability.',
        '4.09/5 average review score, adding the customer perspective to the performance picture.',
      ],
      businessRelevance:
        'MarketPulse turns separate marketplace records into a more coherent reporting experience.\n\nInstead of relying on disconnected spreadsheets or comparing figures from different reports, decision-makers can explore key performance indicators through a consistent analytical view.\n\nThis makes it easier to identify performance patterns, examine areas that need attention, and understand how different aspects of marketplace operations relate to one another.',
      limitationsAndEvidence:
        'MarketPulse covers four independent analytical domains. My direct analytical ownership was the Olist Marketplace domain; the other domains retained their own datasets and workflows.\n\nThe findings presented here describe the analyzed historical Olist data. They should not be interpreted as live marketplace performance or as evidence of causal relationships.\n\nThe project demonstrates an analytical reporting solution, not a live commercial marketplace system.',
    },
    isConceptPreview: false,
    previewCaption: 'Olist Marketplace Dashboard — Page 1: Executive Overview (Power BI)',
  },
  {
    id: 'urbanpulse',
    index: '02',
    title: 'UrbanPulse',
    headline: 'Different urban datasets. One governed analytical experience.',
    subtitle: 'Intelligent Analytics for Smarter Urban Operations',
    categoryLabel: 'Urban Operations & Predictive Analytics',
    category: 'Urban Operations',
    projectContextLabel: 'ACUD Practical Training · Graduation Project · 2026',
    theme: 'light',
    role: 'Team Leader · Platform UI/UX Owner · NYC 311 Analyst · Smart City Forecaster',
    description:
      "UrbanPulse was developed as our graduation project during the ACUD Practical Training program in 2026.\n\nI served as Team Leader of a four-member team and owned the platform's end-to-end UI/UX design. My direct analytical work focused on NYC 311 service requests and Smart City forecasting, while the Buildings and Energy analyses remained team-owned.\n\nThe project brought these different areas into a multi-workspace analytical experience, with clear boundaries between independent datasets, carefully governed integration, and a separate synthetic forecasting environment.",
    kpiHighlights: [
      '6.68M NYC 311 Records',
      '65.28% NYPD & HPD Share',
      'Heating Peak: 3.06× 24-Month Average (Dec 2024)',
      'LightGBM MAE: 7.78 MWh · R²: 0.9964 (~19% Lower Error · Synthetic, 2025 Test)',
    ],
    technologies: ['Python', 'SQL', 'LightGBM', 'Data Analysis', 'Platform UI/UX'],
    domainGovernanceNote:
      'Domain & Ownership Boundary: Buildings Performance, Energy Intelligence, and NYC 311 Operations are independent analytical domains. Buildings & Energy is a dedicated team-owned integration workspace targeting property_id + report_year, requiring annual aggregation, key validity, and cardinality checks. Smart City is an isolated synthetic Kaggle digital twin sandbox (2025 test data)—never live city operations and never merged with other domains.',
    caseStudy: {
      context:
        'UrbanPulse was created to explore how different urban datasets can support a clearer understanding of city operations.\n\nThe project covered building performance, energy intelligence, public service requests, and a separate Smart City forecasting sandbox.\n\nEach area had its own data structure and analytical purpose. Rather than treating them as parts of one unified dataset, we organized them into dedicated workspaces with clearly defined responsibilities and boundaries.',
      businessChallenge:
        'The main challenge was not simply bringing more data into one platform. It was making sure that every analytical view remained trustworthy.\n\nBuildings, Energy, and NYC 311 describe different aspects of urban operations, but that does not automatically make their records compatible.\n\nConnecting datasets without checking their level of detail, keys, and relationships can produce misleading results. At the same time, the Smart City forecasting dataset was synthetic and needed to remain separate from the historical urban records.\n\nUrbanPulse therefore needed a structure that made information accessible without sacrificing analytical integrity.',
      roleAndContribution:
        "I led a four-member team and took end-to-end ownership of the platform's UI/UX design, including how users navigate between workspaces and understand the available analytical views.\n\nMy direct analytical responsibilities covered NYC 311 Operations (analyzing historical service request records for agency distribution and seasonal patterns) and Smart City Forecasting (developing and evaluating a LightGBM forecasting model using a synthetic Kaggle digital twin dataset).\n\nBuildings Performance and Energy Intelligence were analyzed by teammates. The Buildings & Energy integration workspace was also team-owned, with my involvement limited to leadership, follow-up, and review.",
      approachAndTechnologies:
        'UrbanPulse was organized around separate workspaces rather than one automatically merged urban dataset.\n\nFor NYC 311, I examined 6.68 million historical service request records to understand how requests were distributed across agencies and how certain complaint types changed over time.\n\nFor the Smart City sandbox, I worked with synthetic traffic and related environmental data to develop a LightGBM forecasting model and evaluate its performance against a baseline.\n\nThe platform also included a Buildings & Energy integration workspace with a defined validation boundary: annual aggregation, valid property and reporting-year keys, and cardinality checks before integration could be trusted.\n\nThis structure allowed the platform to present different analytical perspectives while keeping unsupported relationships and conclusions out of the reporting experience.',
      verifiedFindings: [
        'NYC 311 (Historical Service Records): 6.68 million service requests analyzed; 65.28% combined NYPD and HPD share; 3.06× seasonal heating peak vs. 24-month average in December 2024.',
        'Smart City (Synthetic Forecasting Sandbox): 7.78 MWh MAE on the 2025 test split, 0.9964 R² on the synthetic dataset, and approximately 19% lower error compared with the baseline.',
      ],
      businessRelevance:
        "UrbanPulse demonstrates that a useful urban analytics platform is not defined by how many datasets it combines, but by how responsibly it handles them.\n\nThe NYC 311 analysis helps reveal where public service demand concentrates and when seasonal patterns become more pronounced.\n\nThe platform's workspace structure makes these findings easier to explore while keeping unrelated datasets separate. The synthetic forecasting experiment also provides a controlled environment for evaluating a predictive approach without presenting simulated results as real city outcomes.\n\nTogether, these elements show how clear analytical boundaries and accessible reporting can support more informed exploration of urban data.",
      limitationsAndEvidence:
        "UrbanPulse does not treat all its datasets as one unified source.\n\nBuildings Performance, Energy Intelligence, and NYC 311 remain independent analytical domains. No unsupported cross-domain joins or filtering are used.\n\nThe Buildings & Energy workspace targets integration at the property and reporting-year level. This requires annual aggregation, valid keys, and cardinality checks before the resulting data can be considered reliable. The presence of a relationship does not establish causation.\n\nThe Smart City forecasting experiment uses a synthetic Kaggle digital twin dataset. It is isolated from NYC 311, Buildings, and Energy and does not represent live city operations.\n\nNYC 311 service-level and resolution-time conclusions also remain limited because closure timestamps are missing or inconsistent.\n\nThese boundaries are part of the project's analytical design, not details to hide.",
    },
    isConceptPreview: false,
    previewCaption:
      'Executive Overview · Actual application interface showing separated domain figures (Buildings, Energy, and NYC 311)',
  },
  {
    id: 'hospital-management',
    index: '03',
    title: 'Hospital Management Analytics System',
    headline: 'Making hospital records easier to organize, examine, and act on.',
    subtitle: 'Healthcare Analytics & Data Quality',
    categoryLabel: 'Healthcare Analytics & Data Quality',
    category: 'Healthcare & Data Quality',
    theme: 'dark',
    role: 'SQL Server Database Designer & Healthcare Data Analyst',
    description:
      'This project focused on building a practical analytics solution that organizes hospital data and makes important patterns easier to identify. Working with eight months of billing and payment records, I developed the database structure, data preparation workflows, reusable SQL views, and Power BI reporting layer.',
    kpiHighlights: [
      '10 Related SQL Tables · 10+ Reusable SQL Views',
      '36% Uncollected Invoices (8-Month Billing Data)',
      '5× Physician Workload Difference',
      '40+ Chronic Patient Records Missing Diagnosis Information',
    ],
    technologies: ['SQL Server', 'T-SQL', 'Power BI', 'Data Modeling', 'ETL'],
    caseStudy: {
      context:
        'Hospital operations generate different types of information, from billing and payments to physician activity and patient records.\n\nWhen these records are difficult to navigate or examine consistently, important issues can remain hidden. Financial follow-up becomes harder, workload differences are less visible, and missing information in patient records can go unnoticed.\n\nThe project aimed to create a structured analytical foundation for examining these areas through SQL Server and Power BI.',
      businessChallenge:
        'The challenge was to turn related but differently structured hospital records into data that could support meaningful analysis.\n\nThe solution needed to organize the underlying information, prepare it for reporting, and make it possible to examine financial performance, physician workloads, and patient-record completeness.\n\nThis required more than building charts. It required a reliable database structure and reusable queries that could support consistent analysis.',
      roleAndContribution:
        'I built the normalized SQL Server database, developed the ETL preparation workflows, created reusable SQL views, and built the Power BI reporting layer.\n\nThe work connected the data preparation process with the final analytical experience, providing a structured way to examine billing, workload, and record-quality patterns.',
      approachAndTechnologies:
        'I organized the hospital data into a normalized database containing 10 related tables.\n\nI then developed ETL workflows to prepare and transform the records, followed by more than 10 reusable SQL views to support the analysis.\n\nPower BI was used to present the resulting information in a reporting experience focused on financial and operational questions. The billing and payment analysis covered an eight-month period.\n\nThis structure made it possible to examine different aspects of hospital operations using a more consistent foundation.',
      verifiedFindings: [
        '36% of invoices were uncollected across the analyzed eight-month billing and payment records, highlighting an area for financial follow-up.',
        'A 5× difference in recorded physician workload between the highest and lowest workloads, pointing to a potential need for further workload review.',
        'More than 40 chronic patient records were missing diagnosis information, revealing a gap in record completeness.',
      ],
      businessRelevance:
        'The value of this solution is not simply presenting hospital figures in a dashboard. It is making specific areas easier to examine.\n\nThe uncollected invoices point to a need for closer financial follow-up. The workload difference provides a reason to review how physician activity is distributed. Missing diagnosis information highlights records that may require documentation checks.\n\nBy organizing the data and presenting these findings together, the solution gives users a clearer starting point for further investigation and operational review.',
      limitationsAndEvidence:
        'The analysis covered eight months of billing and payment data, alongside the related records used for workload and data-quality checks.\n\nThe reported findings describe patterns observed in the analyzed records. They do not independently establish why invoices remained uncollected, what caused workload differences, or why diagnosis information was missing.\n\nThe project identifies areas for review; determining their underlying causes would require additional investigation and context.',
    },
    isConceptPreview: false,
    previewCaption: 'Hospital Management Analytics System — Billing, Claims, Payments & Revenue Reporting Visual',
  },
  {
    id: 'europe-sales',
    index: '04',
    title: 'European Sales Analytics',
    headline: 'When higher sales do not necessarily mean higher profitability.',
    subtitle: 'Retail Performance & Profitability',
    categoryLabel: 'Retail Performance & Profitability',
    category: 'E-Commerce & Retail',
    projectContextLabel: '2011–2014',
    theme: 'light',
    role: 'Data Analyst',
    description:
      'This individual project examined European retail performance between 2011 and 2014. Using an interactive Excel dashboard, I explored how revenue translated into profit across countries and products, while examining discount patterns and shipping performance to understand what the headline sales figures alone could not reveal.',
    kpiHighlights: [
      '€10.67M Total Sales',
      '4,117 Orders · 792 Customers',
      '~€283K Profit · 2.65% Margin',
      '3.97-Day Average Shipping',
    ],
    technologies: ['Microsoft Excel', 'Power Pivot', 'PivotTables', 'DAX', 'Conditional Formatting'],
    caseStudy: {
      context:
        'The analysis covered 4,117 retail orders from 792 customers across European markets between 2011 and 2014.\n\nAlthough total sales provided a strong view of commercial activity, revenue alone did not explain how much profit the business actually retained or which markets contributed positively to its financial performance.',
      businessChallenge:
        'The central question was not simply where the business sold more, but where it remained profitable.\n\nUnderstanding that difference required looking beyond total sales to compare country-level profitability, examine product performance, explore discount patterns, and consider shipping behavior.',
      roleAndContribution:
        'As the sole Data Analyst, I handled the project end to end, from organizing the analytical model and defining DAX measures to building an interactive Microsoft Excel dashboard.',
      approachAndTechnologies:
        'I used Excel and Power Pivot to organize the data for analysis, with PivotTables and DAX measures supporting comparisons across markets, products, and time periods.\n\nThe dashboard brought together annual sales and profitability, country-level comparisons, monthly trends, and interactive filters. This made it possible to move from an overall performance view to more focused questions about individual markets, categories, customer segments, and shipping methods.',
      verifiedFindings: [
        '€10.67M in total sales across the analyzed European retail orders.',
        'Approximately €283K in profit, representing an overall profit margin of 2.65%.',
        'Portugal, the Netherlands, and Sweden recorded overall losses despite being part of a business generating substantial total sales.',
        'Discounts of up to 50% were associated with profit erosion in the analyzed dataset.',
        'Average recorded shipping time was 3.97 days.',
      ],
      businessRelevance:
        'The analysis shifts attention from sales volume to the quality of that revenue.\n\nIdentifying loss-making markets gives commercial teams a starting point for reviewing market performance. The observed discount pattern also highlights an area worth investigating further when evaluating pricing and promotional decisions.\n\nThe dashboard makes these comparisons easier to explore, allowing users to move between the overall picture and specific market, product, and time-period views.',
      limitationsAndEvidence:
        'This analysis is based on a historical European retail dataset covering 2011–2014. The findings describe patterns within that period and should not be interpreted as a representation of current market performance.\n\nThe relationship between discounts and profit erosion is an observed association, not proof that discounts alone caused the losses. The analysis also identifies loss-making markets but does not establish the underlying reasons behind their results.\n\nProject Evidence: Interactive Excel dashboard, dashboard walkthrough, and public GitHub repository.',
    },
    isConceptPreview: false,
    previewCaption:
      'Actual Excel Dashboard (Report 1) — Annual Sales & Profitability Growth, European Country Maps, Seasonality & Interactive Slicers',
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

import conceptUrbanpulse from '../assets/images/concept_urbanpulse_1795095693784.jpg';
import conceptHospitalAnalytics from '../assets/images/concept_hospital_analytics_1795095693849.jpg';
import previewEuropeSales from '../assets/images/preview_europe_sales_1795095694180.jpg';
import type { FeaturedProject } from './portfolioData';

/**
 * Isolated project preview image registry.
 * Replace any Concept Preview import with a verified project screenshot later
 * without modifying project card layout code.
 */
export const PROJECT_PREVIEW_ASSETS: Record<
  FeaturedProject['id'],
  { src: string; alt: string; cropClassName?: string }
> = {
  marketpulse: {
    src: './assets/aistudio/image_8156d09b.png',
    alt: 'Original Power BI screenshot of Page 1 (Executive Overview) of the MarketPulse Olist Marketplace Dashboard showing KPI cards, revenue by product category, order volume and delivery performance donuts, and revenue trend',
  },
  urbanpulse: {
    src: conceptUrbanpulse,
    alt: 'Concept preview illustration for UrbanPulse showing separated architectural panels for urban operational domains',
  },
  'hospital-management': {
    src: conceptHospitalAnalytics,
    alt: 'Concept preview illustration for Hospital Management Analytics System depicting ten interconnected relational database tiles and ETL pipelines',
  },
  'europe-sales': {
    src: previewEuropeSales,
    alt: 'Editorial cartographic illustration of Europe with antique gold trade paths on midnight navy for European Sales Analytics',
    cropClassName: 'scale-[1.12]',
  },
};

export const MARKETPULSE_INFOGRAPHIC_ASSET = {
  src: './assets/marketpulse-infographic.png',
  pdfSrc: './assets/MarketPulse-infographic.pdf',
  width: 2880,
  height: 1620,
  title: 'MarketPulse — Project Overview Infographic',
  caption: 'MarketPulse Infographic — System Overview, Four Independent Domains, Team & Technology Stack',
  alt: 'MarketPulse project overview infographic showing the system architecture, four independent e-commerce analytical domains (Olist Marketplace, Olist Marketing Funnel, Instacart, and Amazon Reviews), project team led by Islam Ramadan Hassan, business value, and technology stack',
} as const;

export const URBANPULSE_OVERVIEW_ASSET = {
  src: './assets/urbanpulse-executive-overview.webp',
  width: 2048,
  height: 1006,
  title: 'UrbanPulse — Executive Overview Dashboard',
  caption: 'Executive Overview',
  alt: 'UrbanPulse Executive Overview Dashboard',
} as const;

export const HOSPITAL_MANAGEMENT_ASSET = {
  src: './assets/hospital-management-overview.webp',
  originalSrc: './assets/hospital-management-overview.jpg',
  width: 2048,
  height: 1364,
  title: 'Hospital Management Analytics System — Billing & Operations Overview',
  caption: 'Hospital Management Analytics System — Billing, Claims, Payments & Revenue Reporting Visual',
  alt: 'Hospital Management Analytics System visual showing hospital billing workflow, revenue dashboard, receivables summary, and reporting stages',
} as const;

export const EUROPE_SALES_DASHBOARD_ASSET = {
  src: './assets/europe-sales-dashboard.webp',
  originalSrc: './assets/europe-sales-dashboard.jpg',
  width: 2048,
  height: 860,
  title: 'European Sales Analytics — Interactive Excel Dashboard (Report 1)',
  caption:
    'Actual Excel Dashboard (Report 1) — Annual Sales & Profitability Growth, European Country Maps, Seasonality & Interactive Slicers',
  alt: 'Actual Microsoft Excel dashboard screenshot for European Sales Analytics showing Annual Sales and Profitability Growth from 2011 to 2014, European Profitability and Sales by Country maps, Monthly Revenue and Profit Seasonality chart, and interactive Country, Year, Category, Segment, and Ship Mode slicers',
} as const;

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

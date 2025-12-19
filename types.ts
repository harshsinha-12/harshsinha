export enum SectionType {
  INTRO = "INTRO",
  PROJECT = "PROJECT",
  EXPERIENCE = "EXPERIENCE",
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
  SECTION_HEADER = "SECTION_HEADER",
}

export enum ViewMode {
  ROAD = "ROAD",
  OVERVIEW = "OVERVIEW",
  LIST = "LIST",
}

export interface PortfolioItem {
  id: string;
  type: SectionType;
  title: string;
  subtitle: string;
  year?: string;
  client?: string; // or Company
  techStack?: string[];
  description?: string; // Long description for detail view
  shortDescription?: string; // For the flag
  mbaiImageDescription?: string; // For the flag
  colorTheme: string; // Tailwind class for background gradient
  accentClass?: string; // Text color for the header
  link?: string;
  github?: string;
  ogImage?: string;
  stats?: { label: string; value: string }[];
  bullets?: string[];
}

export interface AppState {
  activeItemId: string | null; // null means we are on the "Road"
  scrollProgress: number;
}

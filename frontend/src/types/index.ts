// === Types for Portfolio Data ===

export interface Profile {
  id: string;
  name: string;
  title: string;
  titleEn?: string;
  bio?: string;
  bioEn?: string;
  age?: number;
  location?: string;
  email?: string;
  website?: string;
  avatarUrl?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName?: string;
}

export interface Experience {
  id: string;
  role: string;
  roleEn?: string;
  company: string;
  type?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  descriptionEn?: string;
}

export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  thumbnailUrl?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  sortOrder?: number;
}

export interface Skill {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  iconName?: string;
  level: number;
  category?: string;
  sortOrder?: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleEn?: string;
  issuer?: string;
  date?: string;
  thumbnailUrl?: string;
  description?: string;
  descriptionEn?: string;
  sortOrder?: number;
}

export type ActivePanel = 'none' | 'projects' | 'skills' | 'achievements';
export type MobilePanel = 'none' | 'about' | 'experience';

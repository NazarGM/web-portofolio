// === Types for Portfolio Data ===

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio?: string;
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
  sortOrder: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  sortOrder: number;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
  level: number;
  category?: string;
  sortOrder: number;
}

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  thumbnailUrl?: string;
  description?: string;
  sortOrder: number;
}

export interface SceneSettings {
  id: string;
  characterModelUrl?: string;
  platformModelUrl?: string;
  platformColor: string;
  ambientColor: string;
  particleColor: string;
  cameraPosition: string;
}

export type ActivePanel = 'none' | 'projects' | 'skills' | 'achievements';
export type MobilePanel = 'none' | 'about' | 'experience';

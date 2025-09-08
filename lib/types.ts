export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'web' | 'mobile' | 'design' | 'backend'
  image: string
  technologies: string[]
  link?: string
  case_study?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  skills: string[]
  social: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image?: string
  tags: string[]
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  budget?: string
}
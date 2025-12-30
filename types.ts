import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
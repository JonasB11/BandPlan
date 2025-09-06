export interface Member {
  id: string;
  name: string;
  instrument: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export interface Song {
  id: string;
  title: string;
  key: string;
  duration: number; // in seconds
  notes?: string;
  lastPlayed?: Date;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  participants: string[]; // Member IDs
  todos: EventTodo[];
  notes?: string;
}

export interface EventTodo {
  id: string;
  text: string;
  completed: boolean;
  assignedTo?: string; // Member ID
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  assignedTo?: string; // Member ID
  priority: 'low' | 'medium' | 'high';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
}

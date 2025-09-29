export interface Job {
  id: string;
  teacherName: string;
  files: string[];
  status: 'Uploading' | 'Parsing' | 'Merging' | 'Sent to Model' | 'Completed' | 'Failed';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
  studentsProcessed?: number;
  mapping?: Record<string, Record<string, string>>;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  riskScore: number;
  avatar?: string;
  lastUpdated: Date;
}

export interface MappingProfile {
  id: string;
  name: string;
  attendance: Record<string, string>;
  marks: Record<string, string>;
  fees: Record<string, string>;
  createdAt: Date;
}

// Mock data
const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', class: '10A', riskScore: 85, lastUpdated: new Date() },
  { id: '2', name: 'Bob Smith', class: '10B', riskScore: 72, lastUpdated: new Date() },
  { id: '3', name: 'Carol Davis', class: '9A', riskScore: 45, lastUpdated: new Date() },
  { id: '4', name: 'David Wilson', class: '10A', riskScore: 90, lastUpdated: new Date() },
  { id: '5', name: 'Eva Brown', class: '11B', riskScore: 38, lastUpdated: new Date() },
  { id: '6', name: 'Frank Miller', class: '9B', riskScore: 78, lastUpdated: new Date() },
  { id: '7', name: 'Grace Lee', class: '10A', riskScore: 55, lastUpdated: new Date() },
  { id: '8', name: 'Henry Taylor', class: '11A', riskScore: 82, lastUpdated: new Date() },
  { id: '9', name: 'Ivy Chen', class: '9A', riskScore: 67, lastUpdated: new Date() },
  { id: '10', name: 'Jack Anderson', class: '10B', riskScore: 41, lastUpdated: new Date() },
];

// In-memory storage
let jobs: Job[] = [];
let mappingProfiles: MappingProfile[] = [];

// Load from localStorage on init
const loadFromStorage = () => {
  try {
    const storedJobs = localStorage.getItem('dropout-jobs');
    if (storedJobs) {
      jobs = JSON.parse(storedJobs).map((job: any) => ({
        ...job,
        createdAt: new Date(job.createdAt),
        completedAt: job.completedAt ? new Date(job.completedAt) : undefined,
        lastUpdated: new Date(job.lastUpdated)
      }));
    }
    
    const storedProfiles = localStorage.getItem('dropout-mapping-profiles');
    if (storedProfiles) {
      mappingProfiles = JSON.parse(storedProfiles).map((profile: any) => ({
        ...profile,
        createdAt: new Date(profile.createdAt)
      }));
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
};

// Save to localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem('dropout-jobs', JSON.stringify(jobs));
    localStorage.setItem('dropout-mapping-profiles', JSON.stringify(mappingProfiles));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
};

// Initialize
loadFromStorage();

export const mockApi = {
  // Job management
  createJob: async (teacherName: string, files: string[], mapping?: Record<string, Record<string, string>>): Promise<Job> => {
    const job: Job = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teacherName,
      files,
      status: 'Uploading',
      progress: 0,
      createdAt: new Date(),
      mapping
    };
    
    jobs.unshift(job);
    saveToStorage();
    
    // Simulate job progression
    simulateJobProgression(job);
    
    return job;
  },
  
  getJobs: async (): Promise<Job[]> => {
    return [...jobs];
  },
  
  getJob: async (id: string): Promise<Job | null> => {
    return jobs.find(job => job.id === id) || null;
  },
  
  cancelJob: async (id: string): Promise<boolean> => {
    const job = jobs.find(job => job.id === id);
    if (job && (job.status === 'Uploading' || job.status === 'Parsing')) {
      job.status = 'Failed';
      job.error = 'Cancelled by user';
      job.completedAt = new Date();
      saveToStorage();
      return true;
    }
    return false;
  },
  
  // Students
  getStudents: async (classFilter?: string, sortBy: 'riskScore' | 'name' = 'riskScore'): Promise<Student[]> => {
    let filtered = [...mockStudents];
    
    if (classFilter) {
      filtered = filtered.filter(student => student.class === classFilter);
    }
    
    if (sortBy === 'riskScore') {
      filtered.sort((a, b) => b.riskScore - a.riskScore);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered.slice(0, 10);
  },
  
  // Mapping profiles
  saveMappingProfile: async (profile: Omit<MappingProfile, 'id' | 'createdAt'>): Promise<MappingProfile> => {
    const newProfile: MappingProfile = {
      ...profile,
      id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    };
    
    mappingProfiles.unshift(newProfile);
    saveToStorage();
    
    return newProfile;
  },
  
  getMappingProfiles: async (): Promise<MappingProfile[]> => {
    return [...mappingProfiles];
  },
  
  // Utility functions
  getRiskColor: (score: number): string => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-green-500';
  },
  
  getRiskLabel: (score: number): string => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Medium Risk';
    return 'Low Risk';
  }
};

// Simulate job progression
const simulateJobProgression = (job: Job) => {
  const stages = [
    { status: 'Uploading' as const, progress: 25, delay: 1000 },
    { status: 'Parsing' as const, progress: 50, delay: 2000 },
    { status: 'Merging' as const, progress: 75, delay: 1500 },
    { status: 'Sent to Model' as const, progress: 90, delay: 3000 },
    { status: 'Completed' as const, progress: 100, delay: 500 }
  ];
  
  let currentStage = 0;
  
  const progressStage = () => {
    if (currentStage >= stages.length) return;
    
    const stage = stages[currentStage];
    job.status = stage.status;
    job.progress = stage.progress;
    
    if (stage.status === 'Completed') {
      job.completedAt = new Date();
      job.studentsProcessed = Math.floor(Math.random() * 500) + 100; // Mock processed count
    }
    
    saveToStorage();
    
    // Trigger custom event for UI updates
    window.dispatchEvent(new CustomEvent('jobUpdate', { detail: job }));
    
    currentStage++;
    if (currentStage < stages.length) {
      setTimeout(progressStage, stage.delay);
    }
  };
  
  setTimeout(progressStage, 500);
};

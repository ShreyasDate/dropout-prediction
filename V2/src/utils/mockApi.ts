// Mock API for simulating backend operations

export interface JobStatus {
  id: string;
  status: 'uploading' | 'parsing' | 'merging' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  files: {
    attendance?: string;
    marks?: string;
    fees?: string;
  };
  timestamp: Date;
  teacher: string;
  studentsProcessed?: number;
  error?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  riskScore: number;
  avatar?: string;
  lastUpdated: Date;
}

let jobs: JobStatus[] = [];
let students: Student[] = [
  {
    id: '1',
    name: 'David Wilson',
    class: 'Class 10A',
    riskScore: 90,
    lastUpdated: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Alice Johnson',
    class: 'Class 9B',
    riskScore: 85,
    lastUpdated: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Henry Taylor',
    class: 'Class 11A',
    riskScore: 82,
    lastUpdated: new Date('2024-01-14'),
  },
  {
    id: '4',
    name: 'Frank Miller',
    class: 'Class 10B',
    riskScore: 78,
    lastUpdated: new Date('2024-01-13'),
  },
  {
    id: '5',
    name: 'Bob Smith',
    class: 'Class 9A',
    riskScore: 72,
    lastUpdated: new Date('2024-01-12'),
  },
  {
    id: '6',
    name: 'Joy Chen',
    class: 'Class 11B',
    riskScore: 67,
    lastUpdated: new Date('2024-01-11'),
  },
  {
    id: '7',
    name: 'Grace Lee',
    class: 'Class 10A',
    riskScore: 55,
    lastUpdated: new Date('2024-01-10'),
  },
  {
    id: '8',
    name: 'Carol Davis',
    class: 'Class 9B',
    riskScore: 45,
    lastUpdated: new Date('2024-01-09'),
  },
  {
    id: '9',
    name: 'Jack Anderson',
    class: 'Class 11A',
    riskScore: 41,
    lastUpdated: new Date('2024-01-08'),
  },
  {
    id: '10',
    name: 'Eva Brown',
    class: 'Class 10B',
    riskScore: 38,
    lastUpdated: new Date('2024-01-07'),
  },
];

export async function uploadFiles(files: {
  attendance?: File;
  marks?: File;
  fees?: File;
}): Promise<JobStatus> {
  const jobId = Math.random().toString(36).substr(2, 9);
  
  const job: JobStatus = {
    id: jobId,
    status: 'uploading',
    progress: 0,
    files: {
      attendance: files.attendance?.name,
      marks: files.marks?.name,
      fees: files.fees?.name,
    },
    timestamp: new Date(),
    teacher: 'Dr. Sarah Johnson',
  };
  
  jobs.unshift(job);
  
  // Simulate upload progress
  const stages = ['uploading', 'parsing', 'merging', 'processing', 'completed'] as const;
  
  for (let i = 0; i < stages.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    job.status = stages[i];
    job.progress = ((i + 1) / stages.length) * 100;
    
    if (job.status === 'completed') {
      job.studentsProcessed = Math.floor(Math.random() * 500) + 100;
      // Add some new at-risk students
      const newStudents = generateRandomStudents(3);
      students = [...newStudents, ...students].slice(0, 10);
    }
  }
  
  return job;
}

export function getJobs(): JobStatus[] {
  return jobs.slice(0, 10);
}

export function getStudents(): Student[] {
  return students;
}

export async function cancelJob(jobId: string): Promise<void> {
  const job = jobs.find(j => j.id === jobId);
  if (job && (job.status === 'uploading' || job.status === 'parsing')) {
    job.status = 'cancelled';
  }
}

function generateRandomStudents(count: number): Student[] {
  const names = ['Emma Smith', 'Liam Jones', 'Olivia Brown', 'Noah Davis', 'Ava Wilson', 'Elijah Taylor'];
  const classes = ['Class 9A', 'Class 9B', 'Class 10A', 'Class 10B', 'Class 11A', 'Class 11B'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    class: classes[Math.floor(Math.random() * classes.length)],
    riskScore: Math.floor(Math.random() * 100),
    lastUpdated: new Date(),
  }));
}

// Persistence
export function saveMappingProfile(name: string, mapping: Record<string, string>): void {
  const profiles = JSON.parse(localStorage.getItem('mappingProfiles') || '{}');
  profiles[name] = mapping;
  localStorage.setItem('mappingProfiles', JSON.stringify(profiles));
}

export function getMappingProfiles(): Record<string, Record<string, string>> {
  return JSON.parse(localStorage.getItem('mappingProfiles') || '{}');
}
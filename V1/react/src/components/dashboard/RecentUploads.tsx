import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  Download, 
  RotateCcw,
  FileText,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { mockApi } from '../../utils/mockApi';
import type { Job } from '../../utils/mockApi';

interface RecentUploadsProps {
  refreshTrigger?: number;
}

export const RecentUploads: React.FC<RecentUploadsProps> = ({ refreshTrigger }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs();
    
    // Listen for job updates
    const handleJobUpdate = () => {
      loadJobs();
    };
    
    window.addEventListener('jobUpdate', handleJobUpdate);
    return () => window.removeEventListener('jobUpdate', handleJobUpdate);
  }, [refreshTrigger]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getJobs();
      setJobs(data.slice(0, 10)); // Show last 10 jobs
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Uploading':
      case 'Parsing':
      case 'Merging':
      case 'Sent to Model':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Failed':
        return 'text-red-600 dark:text-red-400';
      case 'Uploading':
      case 'Parsing':
      case 'Merging':
      case 'Sent to Model':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const handleCancelJob = async (jobId: string) => {
    const success = await mockApi.cancelJob(jobId);
    if (success) {
      loadJobs();
    }
  };

  const handleReRunJob = async (job: Job) => {
    // In a real app, this would re-run the job with the same parameters
    console.log('Re-running job:', job.id);
    // For now, just show a toast or notification
  };

  const handleDownloadReport = async (job: Job) => {
    // In a real app, this would download the actual report
    console.log('Downloading report for job:', job.id);
    // For now, just show a toast or notification
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (start: Date, end?: Date) => {
    const duration = (end || new Date()).getTime() - start.getTime();
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          Recent Uploads
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={loadJobs}
          className="flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        <AnimatePresence>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No uploads yet
            </div>
          ) : (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                        {job.studentsProcessed && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({job.studentsProcessed} students)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="h-3 w-3" />
                        <span>{job.teacherName}</span>
                        <span>•</span>
                        <span>{formatDate(job.createdAt)}</span>
                        {job.completedAt && (
                          <>
                            <span>•</span>
                            <span>{formatDuration(job.createdAt, job.completedAt)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    {job.status === 'Completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(job)}
                        className="flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                    )}
                    
                    {(job.status === 'Failed' || job.status === 'Completed') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReRunJob(job)}
                        className="flex items-center"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Re-run
                      </Button>
                    )}
                    
                    {(job.status === 'Uploading' || job.status === 'Parsing') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelJob(job.id)}
                        className="flex items-center text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>

                {/* Files */}
                <div className="mb-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Files:</div>
                  <div className="flex flex-wrap gap-1">
                    {job.files.map((file, fileIndex) => (
                      <span
                        key={fileIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {file}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                {(job.status === 'Uploading' || job.status === 'Parsing' || job.status === 'Merging' || job.status === 'Sent to Model') && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {job.error && (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    {job.error}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Job Details
                </h3>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedJob.status)}
                      <span className={getStatusColor(selectedJob.status)}>
                        {selectedJob.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Files</h4>
                    <div className="space-y-1">
                      {selectedJob.files.map((file, index) => (
                        <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedJob.mapping && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Field Mapping</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                          {JSON.stringify(selectedJob.mapping, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Timeline</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>Started: {formatDate(selectedJob.createdAt)}</div>
                      {selectedJob.completedAt && (
                        <div>Completed: {formatDate(selectedJob.completedAt)}</div>
                      )}
                      <div>Duration: {formatDuration(selectedJob.createdAt, selectedJob.completedAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={() => setSelectedJob(null)} className="w-full">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

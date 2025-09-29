import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Send, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { FileUploadSlot } from './FileUploadSlot';
import { MappingModal } from './MappingModal';
import { StudentsSnapshot } from './StudentsSnapshot';
import { RecentUploads } from './RecentUploads';
import type { ParsedFile } from '../../utils/csvParser';
import { mockApi } from '../../utils/mockApi';

export const DashboardPage: React.FC = () => {
  const [teacherName] = useState('Dr. Sarah Johnson');
  const [files, setFiles] = useState<{
    attendance: ParsedFile | null;
    marks: ParsedFile | null;
    fees: ParsedFile | null;
  }>({
    attendance: null,
    marks: null,
    fees: null
  });
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFileSelect = (fileType: keyof typeof files) => (file: ParsedFile | null) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const allFilesPresent = files.attendance && files.marks && files.fees;

  const handleMapAndSend = async () => {
    if (!allFilesPresent) return;

    setIsMappingModalOpen(true);
  };

  const handleMappingSave = async (mapping: Record<string, Record<string, string>>) => {
    setIsMappingModalOpen(false);
    setIsUploading(true);

    try {
      const fileNames = [
        files.attendance?.name,
        files.marks?.name,
        files.fees?.name
      ].filter(Boolean) as string[];

      await mockApi.createJob(teacherName, fileNames, mapping);
      
      // Clear files after successful upload
      setFiles({
        attendance: null,
        marks: null,
        fees: null
      });

      // Trigger refresh
      setRefreshTrigger(prev => prev + 1);

      // Show success message (in a real app, use a toast library)
      alert('Files uploaded successfully! Processing started.');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dropout Prediction
                </h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {teacherName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {teacherName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Teacher
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
              <Upload className="h-8 w-8 mr-3 text-blue-500" />
              Upload Student Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Upload attendance, marks, and fees data to analyze student dropout risk
            </p>
          </div>

          {/* File Upload Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <FileUploadSlot
              label="Attendance"
              acceptedTypes={['.csv', '.xlsx']}
              onFileSelect={handleFileSelect('attendance')}
              selectedFile={files.attendance}
              required
            />
            <FileUploadSlot
              label="Marks"
              acceptedTypes={['.csv', '.xlsx']}
              onFileSelect={handleFileSelect('marks')}
              selectedFile={files.marks}
              required
            />
            <FileUploadSlot
              label="Fees"
              acceptedTypes={['.csv', '.xlsx']}
              onFileSelect={handleFileSelect('fees')}
              selectedFile={files.fees}
              required
            />
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleMapAndSend}
              disabled={!allFilesPresent || isUploading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg text-lg font-medium"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="h-5 w-5 mr-3" />
                  Map Fields & Send to Model
                </div>
              )}
            </Button>
            
            {!allFilesPresent && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Please upload all three required files to continue
              </p>
            )}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students Snapshot */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StudentsSnapshot refreshTrigger={refreshTrigger} />
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RecentUploads refreshTrigger={refreshTrigger} />
          </motion.div>
        </div>
      </main>

      {/* Mapping Modal */}
      <MappingModal
        isOpen={isMappingModalOpen}
        onClose={() => setIsMappingModalOpen(false)}
        onSave={handleMappingSave}
        files={files}
      />
    </div>
  );
};

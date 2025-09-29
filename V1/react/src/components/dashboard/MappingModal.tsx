import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import type { ParsedFile } from '../../utils/csvParser';
import { mockApi } from '../../utils/mockApi';
import type { MappingProfile } from '../../utils/mockApi';

interface MappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mapping: Record<string, Record<string, string>>) => void;
  files: {
    attendance: ParsedFile | null;
    marks: ParsedFile | null;
    fees: ParsedFile | null;
  };
}

const CANONICAL_FIELDS = [
  'student_id',
  'name',
  'class',
  'date',
  'status',
  'subject_marks_math',
  'subject_marks_english',
  'subject_marks_science',
  'fee_amount',
  'payment_date'
];

const FIELD_DESCRIPTIONS: Record<string, string> = {
  student_id: 'Unique student identifier',
  name: 'Student full name',
  class: 'Class/grade level',
  date: 'Date of record',
  status: 'Attendance status (Present/Absent)',
  subject_marks_math: 'Mathematics marks',
  subject_marks_english: 'English marks',
  subject_marks_science: 'Science marks',
  fee_amount: 'Fee amount',
  payment_date: 'Payment date'
};

export const MappingModal: React.FC<MappingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  files
}) => {
  const [mapping, setMapping] = useState<Record<string, Record<string, string>>>({
    attendance: {},
    marks: {},
    fees: {}
  });
  const [profileName, setProfileName] = useState('');
  const [savedProfiles, setSavedProfiles] = useState<MappingProfile[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadSavedProfiles();
      autoSuggestMappings();
    }
  }, [isOpen, files]);

  const loadSavedProfiles = async () => {
    const profiles = await mockApi.getMappingProfiles();
    setSavedProfiles(profiles);
  };

  const autoSuggestMappings = () => {
    const newMapping: Record<string, Record<string, string>> = {
      attendance: {},
      marks: {},
      fees: {}
    };

    // Auto-suggest mappings based on common field names
    const fieldMappings: Record<string, string[]> = {
      student_id: ['id', 'student_id', 'studentid', 'student', 'roll_no', 'rollno'],
      name: ['name', 'student_name', 'full_name', 'studentname'],
      class: ['class', 'grade', 'section', 'std'],
      date: ['date', 'attendance_date', 'record_date'],
      status: ['status', 'attendance', 'present', 'absent'],
      subject_marks_math: ['math', 'mathematics', 'maths', 'math_marks'],
      subject_marks_english: ['english', 'eng', 'english_marks'],
      subject_marks_science: ['science', 'sci', 'science_marks'],
      fee_amount: ['amount', 'fee', 'fee_amount', 'total'],
      payment_date: ['payment_date', 'paid_date', 'date_paid']
    };

    Object.entries(files).forEach(([fileType, file]) => {
      if (file) {
        const headers = file.preview.headers.map(h => h.toLowerCase());
        
        Object.entries(fieldMappings).forEach(([canonicalField, possibleNames]) => {
          const matchingHeader = headers.find(header => 
            possibleNames.some(name => 
              header.includes(name) || name.includes(header)
            )
          );
          
          if (matchingHeader) {
            const originalHeader = file.preview.headers.find(h => 
              h.toLowerCase() === matchingHeader
            );
            if (originalHeader) {
              newMapping[fileType][canonicalField] = originalHeader;
            }
          }
        });
      }
    });

    setMapping(newMapping);
  };

  const handleMappingChange = (fileType: string, canonicalField: string, value: string) => {
    setMapping(prev => ({
      ...prev,
      [fileType]: {
        ...prev[fileType],
        [canonicalField]: value
      }
    }));
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) return;

    const profile: Omit<MappingProfile, 'id' | 'createdAt'> = {
      name: profileName.trim(),
      attendance: mapping.attendance,
      marks: mapping.marks,
      fees: mapping.fees
    };

    await mockApi.saveMappingProfile(profile);
    await loadSavedProfiles();
    setProfileName('');
  };

  const handleLoadProfile = (profile: MappingProfile) => {
    setMapping({
      attendance: profile.attendance,
      marks: profile.marks,
      fees: profile.fees
    });
  };

  const handleSave = () => {
    onSave(mapping);
    onClose();
  };

  const handleReset = () => {
    autoSuggestMappings();
  };

  const getAvailableHeaders = (fileType: string): string[] => {
    const file = files[fileType as keyof typeof files];
    return file ? file.preview.headers : [];
  };

  const getUnmappedHeaders = (fileType: string): string[] => {
    const headers = getAvailableHeaders(fileType);
    const mappedHeaders = Object.values(mapping[fileType] || {});
    return headers.filter(header => !mappedHeaders.includes(header));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Map Fields
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Profile Management */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Save Mapping Profile
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Profile name (e.g., Standard Mapping)"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <Button onClick={handleSaveProfile} disabled={!profileName.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              
              {savedProfiles.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Load saved profile:</p>
                  <div className="flex flex-wrap gap-2">
                    {savedProfiles.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => handleLoadProfile(profile)}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {profile.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Field Mappings */}
            <div className="space-y-6">
              {Object.entries(files).map(([fileType, file]) => {
                if (!file) return null;

                return (
                  <div key={fileType} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                      {fileType} File: {file.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {CANONICAL_FIELDS.map((canonicalField) => (
                        <div key={canonicalField} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {canonicalField.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">
                              {FIELD_DESCRIPTIONS[canonicalField]}
                            </span>
                          </label>
                          <select
                            value={mapping[fileType]?.[canonicalField] || ''}
                            onChange={(e) => handleMappingChange(fileType, canonicalField, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select field...</option>
                            {getAvailableHeaders(fileType).map((header) => (
                              <option key={header} value={header}>
                                {header}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    {/* Unmapped fields */}
                    {getUnmappedHeaders(fileType).length > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Unmapped fields: {getUnmappedHeaders(fileType).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Auto-suggest
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Mapping & Continue
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

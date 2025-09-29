import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { mockApi } from '../../utils/mockApi';
import type { Student } from '../../utils/mockApi';

interface StudentsSnapshotProps {
  refreshTrigger?: number;
}

export const StudentsSnapshot: React.FC<StudentsSnapshotProps> = ({ refreshTrigger }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'riskScore' | 'name'>('riskScore');
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  useEffect(() => {
    loadStudents();
  }, [classFilter, sortBy, refreshTrigger]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getStudents(classFilter, sortBy);
      setStudents(data);
      
      // Extract unique classes for filter
      const classes = [...new Set(data.map(s => s.class))].sort();
      setAvailableClasses(classes);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Medium Risk';
    return 'Low Risk';
  };

  const getRiskTextColor = (score: number) => {
    if (score >= 80) return 'text-red-600 dark:text-red-400';
    if (score >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          Students at Risk
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortBy(sortBy === 'riskScore' ? 'name' : 'riskScore')}
            className="flex items-center"
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Sort by {sortBy === 'riskScore' ? 'Name' : 'Risk Score'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        >
          <option value="">All Classes</option>
          {availableClasses.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Students List */}
      <div className="space-y-3">
        <AnimatePresence>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No students found
            </div>
          ) : (
            students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(student.name)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${getRiskColor(student.riskScore)}`} />
                  </div>

                  {/* Student Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {student.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Class {student.class}
                    </p>
                  </div>
                </div>

                {/* Risk Score */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRiskTextColor(student.riskScore)}`}>
                      {student.riskScore}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Risk Score
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getRiskColor(student.riskScore)}`}>
                      {getRiskLabel(student.riskScore)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Updated {student.lastUpdated.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      {students.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {students.filter(s => s.riskScore >= 80).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">High Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {students.filter(s => s.riskScore >= 60 && s.riskScore < 80).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Medium Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {students.filter(s => s.riskScore < 60).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Low Risk</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

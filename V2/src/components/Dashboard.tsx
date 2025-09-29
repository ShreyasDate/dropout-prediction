import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileText, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Eye,
  Filter,
  RefreshCw,
  AlertTriangle,
  Upload as UploadIcon,
  Brain,
  LogOut,
  User,
  Settings,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { toast } from 'sonner';
import { parseCSVPreview, formatFileSize, validateFile } from '../utils/csvParser';
import { uploadFiles, getJobs, getStudents, cancelJob, type JobStatus, type Student } from '../utils/mockApi';

interface FileSlot {
  type: 'attendance' | 'marks' | 'fees';
  label: string;
  file: File | null;
  preview: string[][] | null;
  error: string | null;
}

interface DashboardProps {
  onNavigate?: (page: 'landing' | 'dashboard') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [fileSlots, setFileSlots] = useState<FileSlot[]>([
    { type: 'attendance', label: 'Attendance', file: null, preview: null, error: null },
    { type: 'marks', label: 'Marks', file: null, preview: null, error: null },
    { type: 'fees', label: 'Fees', file: null, preview: null, error: null },
  ]);
  
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [jobs, setJobs] = useState<JobStatus[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentJob, setCurrentJob] = useState<JobStatus | null>(null);
  const [classFilter, setClassFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'risk'>('risk');

  useEffect(() => {
    setJobs(getJobs());
    setStudents(getStudents());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, type: string) => {
    e.preventDefault();
    setIsDragging(type);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: string) => {
    e.preventDefault();
    setIsDragging(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0], type);
    }
  }, []);

  const handleFileSelection = useCallback(async (file: File, type: string) => {
    const error = validateFile(file);
    
    if (error) {
      toast.error(error);
      return;
    }

    // Parse preview for CSV files (simplified for demo)
    let preview: string[][] | null = null;
    if (file.name.endsWith('.csv')) {
      try {
        const content = await file.text();
        preview = parseCSVPreview(content);
      } catch (err) {
        preview = [['Column1', 'Column2', 'Column3'], ['Sample', 'Data', 'Row']];
      }
    } else {
      // Mock preview for XLSX files
      preview = [['StudentID', 'Name', 'Class'], ['001', 'John Doe', '10A'], ['002', 'Jane Smith', '10B']];
    }

    setFileSlots(prev => prev.map(slot => 
      slot.type === type 
        ? { ...slot, file, preview, error: null }
        : slot
    ));

    toast.success(`${file.name} uploaded successfully`);
  }, []);

  const removeFile = useCallback((type: string) => {
    setFileSlots(prev => prev.map(slot => 
      slot.type === type 
        ? { ...slot, file: null, preview: null, error: null }
        : slot
    ));
  }, []);

  const allFilesUploaded = fileSlots.every(slot => slot.file);

  const handleMapAndSend = async () => {
    if (!allFilesUploaded) {
      toast.error('Please upload all three required files');
      return;
    }

    // Show mapping modal first
    toast.info('Field mapping feature coming soon!');
    setShowMappingModal(true);
  };

  const handleSendToModel = async () => {
    setShowMappingModal(false);
    toast.info('AI model integration coming soon!');
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

  const filteredStudents = students
    .filter(student => classFilter === 'all' || student.class === classFilter)
    .sort((a, b) => {
      if (sortBy === 'risk') return b.riskScore - a.riskScore;
      return a.name.localeCompare(b.name);
    });

  const uniqueClasses = [...new Set(students.map(s => s.class))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Dropout Prediction</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-3 hover:bg-secondary/50 rounded-md px-3 py-2 transition-colors">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Teacher</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">SJ</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuLabel className="pb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">Dr. Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">sarah.johnson@school.edu</p>
                    <p className="text-xs text-muted-foreground">Mathematics Department</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info('Profile feature coming soon!')}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Settings feature coming soon!')}>
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onNavigate?.('landing')}
                className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Upload Section */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <UploadIcon className="w-6 h-6 text-primary" />
              <span>Upload Student Data</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Upload attendance, marks, and fee data to analyze student dropout risk
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Upload Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fileSlots.map((slot) => (
                <div key={slot.type} className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    {slot.label} <span className="text-red-400">*</span>
                  </label>
                  
                  {!slot.file ? (
                    <div
                      className={`
                        relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
                        ${isDragging === slot.type 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                        }
                      `}
                      onDragOver={(e) => handleDragOver(e, slot.type)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, slot.type)}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your file here, or
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = '.csv,.xlsx';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileSelection(file, slot.type);
                          };
                          input.click();
                        }}
                      >
                        Choose File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        CSV or XLSX, max 10MB
                      </p>
                    </div>
                  ) : (
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {slot.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(slot.file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(slot.type)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {slot.preview && (
                          <div className="text-xs">
                            <p className="text-muted-foreground mb-2">Preview:</p>
                            <div className="bg-secondary rounded p-2 font-mono">
                              {slot.preview.map((row, i) => (
                                <div key={i} className="truncate">
                                  {row.join(', ')}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleMapAndSend}
                disabled={!allFilesUploaded}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Brain className="w-5 h-5 mr-2" />
                Map Fields & Send to Model
              </Button>
              {!allFilesUploaded && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please upload all three required files to continue
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students at Risk */}
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Students at Risk</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={classFilter} onValueChange={(value) => {
                    setClassFilter(value);
                    toast.info('Class filtering feature coming soon!');
                  }}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {uniqueClasses.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Refresh feature coming soon!')}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No students found
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredStudents.slice(0, 10).map((student) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
                      onClick={() => toast.info('Student details feature coming soon!')}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{student.riskScore}</p>
                          <p className="text-xs text-muted-foreground">Risk Score</p>
                        </div>
                        <Badge className={`${getRiskColor(student.riskScore)} text-white`}>
                          {getRiskLabel(student.riskScore)}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Risk Summary */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">
                    {filteredStudents.filter(s => s.riskScore >= 80).length}
                  </div>
                  <div className="text-xs text-muted-foreground">High Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-400">
                    {filteredStudents.filter(s => s.riskScore >= 60 && s.riskScore < 80).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Medium Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">
                    {filteredStudents.filter(s => s.riskScore < 60).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Low Risk</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>Recent Uploads</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No uploads yet
                </div>
              ) : (
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg bg-secondary/50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Upload #{job.id.substring(0, 8)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job.timestamp.toLocaleString()} • {job.teacher}
                          </p>
                        </div>
                        <Badge 
                          variant={job.status === 'completed' ? 'default' : 'secondary'}
                          className={
                            job.status === 'completed' ? 'bg-green-500' :
                            job.status === 'failed' ? 'bg-red-500' :
                            job.status === 'cancelled' ? 'bg-gray-500' :
                            'bg-blue-500'
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      
                      {(job.status !== 'completed' && job.status !== 'failed' && job.status !== 'cancelled') && (
                        <Progress value={job.progress} className="h-2" />
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex space-x-4">
                          {job.files.attendance && <span>📊 Attendance</span>}
                          {job.files.marks && <span>📝 Marks</span>}
                          {job.files.fees && <span>💰 Fees</span>}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toast.info('View details feature coming soon!')}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toast.info('Download report feature coming soon!')}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toast.info('Re-run feature coming soon!')}
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {job.studentsProcessed && (
                        <p className="text-xs text-green-400">
                          ✅ {job.studentsProcessed} students processed
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mapping Modal */}
      <Dialog open={showMappingModal} onOpenChange={setShowMappingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Map Data Fields</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This is a preview of the field mapping feature. Full functionality coming soon!
            </p>
            
            {/* Simplified mock mapping interface */}
            <div className="space-y-4">
              <div className="p-4 bg-secondary/20 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-2">Auto-detected Mappings</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Attendance: Student ID → student_id, Date → date, Status → status</div>
                  <div>• Marks: Student ID → student_id, Subject → subject, Score → score</div>
                  <div>• Fees: Student ID → student_id, Amount → fee_amount, Date → payment_date</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowMappingModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendToModel} className="bg-gradient-to-r from-blue-500 to-purple-600">
                Continue (Demo Mode)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
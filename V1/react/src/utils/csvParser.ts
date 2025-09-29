import Papa from 'papaparse';

export interface CSVPreview {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

export interface ParsedFile {
  name: string;
  size: number;
  type: string;
  preview: CSVPreview;
  data?: any[];
}

export const parseCSVFile = (file: File): Promise<CSVPreview> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      preview: 3, // Only parse first 3 rows for preview
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
          return;
        }
        
        const data = results.data as string[][];
        if (data.length === 0) {
          reject(new Error('CSV file is empty'));
          return;
        }
        
        const headers = data[0];
        const rows = data.slice(1);
        
        resolve({
          headers,
          rows,
          totalRows: results.data.length
        });
      },
      error: (error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      }
    });
  });
};

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'text/csv',
    'application/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File too large — max 10MB' };
  }
  
  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx)$/i)) {
    return { valid: false, error: 'Invalid file type: only CSV/XLSX allowed' };
  }
  
  return { valid: true };
};

export const getFileIcon = (fileName: string): string => {
  if (fileName.toLowerCase().endsWith('.csv')) {
    return '📊';
  } else if (fileName.toLowerCase().endsWith('.xlsx')) {
    return '📈';
  }
  return '📄';
};

// Simple CSV parser for preview functionality
export function parseCSVPreview(csvContent: string, maxRows: number = 3): string[][] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const result: string[][] = [];
  
  for (let i = 0; i < Math.min(lines.length, maxRows + 1); i++) {
    const line = lines[i];
    const cells = line.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
    result.push(cells);
  }
  
  return result;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validateFile(file: File): string | null {
  const allowedTypes = ['.csv', '.xlsx'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (!allowedTypes.includes(extension)) {
    return 'Invalid file type. Only CSV and XLSX files are allowed.';
  }
  
  if (file.size > maxSize) {
    return 'File too large. Maximum size is 10MB.';
  }
  
  return null;
}
import * as XLSX from 'xlsx';
import * as fs from 'fs';

export class ExcelReader {
  private filepath: string;
  private fileExtension: string;
  private workbook: XLSX.WorkBook | null = null;
  private sheet: XLSX.WorkSheet | null = null;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.fileExtension = filepath.substring(filepath.lastIndexOf('.'));
  }

  async initialize(): Promise<void> {
    try {
      const dataBuffer = fs.readFileSync(this.filepath);
      const data = new Uint8Array(dataBuffer);
      this.workbook = XLSX.read(data, { type: 'array' });
      this.sheet = this.workbook!.Sheets[this.workbook!.SheetNames[0]];
    } catch (error) {
      console.error('Error initializing workbook:', error);
    }
  }

  getRowCount(sheetname: string): number {
    if (!this.sheet) {
      return 0;
    }
    const sheet = this.workbook!.Sheets[sheetname];
    if (!sheet) {
      return 0;
    }

    const range = sheet['!ref'];
    if (!range) {
      return 0;
    }

    const decodedRange = XLSX.utils.decode_range(range);
    return decodedRange.e.r + 1;
  }

  getCellData(sheetname: string, colName: string, rowNum: number): string {
    if (!this.sheet) {
      return '';
    }
    const sheet = this.workbook!.Sheets[sheetname];
    if (!sheet) {
      return '';
    }

    const range = sheet['!ref'];
    if (!range) {
      return '';
    }

    const jsonData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Find the column index by name
    const columnIndex = jsonData[0].indexOf(colName);
    if (columnIndex === -1) {
      return '';
    }

    const rowData = jsonData[rowNum - 1];
    if (rowData === undefined) {
      return '';
    }

    return rowData[columnIndex] || '';
  }
}

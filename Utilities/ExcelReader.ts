import * as XLSX from 'xlsx';
import * as fs from 'fs';

export class ExcelReader {
  private filepath: string;
  private fileExtension: string;
  private workbook: XLSX.WorkBook | null = null;
  private sheet: XLSX.WorkSheet | null = null;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.fileExtension = filepath.substring(filepath.indexOf('.x'));
    this.initialize();
  }

  public initialize() {
    try {
      const dataBuffer = fs.readFileSync(this.filepath);
      const data = new Uint8Array(dataBuffer);
      if (this.fileExtension === '.xlsx') {
        this.workbook = XLSX.read(data, { type: 'array' });
      } else if (this.fileExtension === '.xls') {
        this.workbook = XLSX.read(data, { type: 'array' });
      }
      if (this.workbook) {
        this.sheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
      } else {
        console.error('Workbook is null or undefined.');
      }
    } catch (error) {
      console.error('Error initializing workbook:', error);
    }
  }

  getRowCount(sheetname: string): number {
    if (!this.sheet) {
      return 0;
    }
    const sheet = this.workbook?.Sheets[sheetname];
    if (!sheet) {
      return 0;
    }
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
    return jsonData.length;
  }

  getCellData(sheetname: string, colName: string, rowNum: number): string {
    if (!this.sheet) {
      return '';
    }
    const sheet = this.workbook?.Sheets[sheetname];
    if (!sheet) {
      return '';
    }
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
    const columnIndex = jsonData[0]?.indexOf(colName);
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

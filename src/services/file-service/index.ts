import {handleExport} from './handle-export';
import {importFile} from './handle-import';

export class FileService {
  public readonly importFile = importFile;

  public readonly handleExport = handleExport;
}

export const fileService = new FileService();

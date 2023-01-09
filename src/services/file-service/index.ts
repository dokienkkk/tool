import {importFile} from './handle-import';

export class FileService {
  public readonly importFile = importFile;
}

export const fileService = new FileService();

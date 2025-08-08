import config from '@config/app.config';

export default class FileService {
  constructor(private readonly fileNamePrefix = '') {}

  public createDownloadable(content: string, type: string, extension: string) {
    const { file, fileName } = this.createFile(content, type, extension);
    const url = URL.createObjectURL(file);

    return { url, fileName };
  }

  private createFile(content: string, type: string, extension: string) {
    const fileName = this.getFileName(extension);
    const file = new File([content], fileName, { type });
    return { file, fileName };
  }

  private getFileName(extension: string): string {
    return `${this.fileNamePrefix}_${extension}`;
  }
}

const fileService = new FileService(config.DATA_PREFIX);

export { fileService };

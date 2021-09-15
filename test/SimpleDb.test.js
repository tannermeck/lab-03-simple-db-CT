import { rm, mkdir } from 'fs/promises';
import SimpleDb from '../SimpleDb.js';

describe('simple database should create files, read a file, and read all files', () => {
  const rootDir = '../store';
    
  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('tests if a file is created', () => {
    const file = new SimpleDb(rootDir);
    const newFile = 'File 1';

    return file
      .keep(newFile)
      .then(() => {
        return file.tell();
      })
      .then((savedFile) => {
        expect(savedFile).toEqual(newFile);
      });

  });
});

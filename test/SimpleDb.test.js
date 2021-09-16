import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('simple database should create files, read a file, and read all files', () => {
  const rootDir = '../store';
    
  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('tests if a file is created and retrieves the file by the id', () => {
    const file = new SimpleDb(rootDir);
    const newFile = { content: 'file-1' };

    return file
      .save(newFile)
      .then(() => {
        return file.get(newFile.id);
      })
      .then((savedFile) => {
        expect(savedFile).toEqual(newFile);
        expect(savedFile.id).toEqual(newFile.id);
      });

  });
  it('returns null for nonexistent id', () => {
    const file2 = new SimpleDb(rootDir);

    return file2
      .get(3)
      .then((fakeFile) => {
        expect(fakeFile).toBe(null);
      });

  });
});

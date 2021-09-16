import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('simple database should create files, read a file, and read all files', () => {
  const rootDir = './store';
    
  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('tests if a file is created', () => {
    const file = new SimpleDb(rootDir);
    const newFile = { content: 'file-1' };

    return file
      .save(newFile)
      .then(() => {
        expect(newFile.id).toEqual(expect.any(String));
      });
  });

  it('retrieves the file by the id', () => {
    const file = new SimpleDb(rootDir);
    const newFile = { content: 'random-file' };

    return file
      .save(newFile)
      .then(() => {
        return file.get(newFile.id);
      })
      .then((createdFile) => {
        expect(createdFile.id).toEqual(newFile.id);
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
  
  it('returns an array of all objects within the directory', () => {
    const source = './example';
    const files = new SimpleDb(source);
    return files
      .getAll()
      .then((files) => {
        expect(files).toEqual(['hello-1', 'hello-2', 'hello-3']);
      });
  });
});

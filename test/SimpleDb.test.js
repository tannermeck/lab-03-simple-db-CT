import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('simple database should create files, read a file, and read all files', () => {
  const rootDir = '../store';
    
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
  
  xit('returns an array of all objects within the directory', () => {
    const instance = new SimpleDb(rootDir);
    const file1 = { content: 'file-1' };
    // const file2 = { content: 'file-2' };
    // const file3 = { content: 'file-3' };

    return instance
      .save(file1)
      // .save(file2)
      // .save(file3)
      .then(() => {
        return instance.getAll();
      })
      .then((files) => {
        expect(files).toEqual([{ content: 'file-1', id: 1 }, { content: 'file-2', id: 2 }, { content: 'file-3', id: 3 }]);
      });

  });
});

import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export class SimpleDb {
  constructor(rootDir){
    // const createdFile = this.createdFile;
    const fileName = 'File-1.json';
    this.createdFile = path.join(rootDir, fileName);
  }
  save(object){
    let objId = 0;
    objId++;
    object.id = objId;
    return writeFile(this.createdFile, JSON.stringify(object));
  }
  get(object, id) {
    return readFile(this.createdFile, 'utf-8').catch((err) => {
      if (id !== object.id) {
        return null;
      }
      throw err;
    });
  }
}

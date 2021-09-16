import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir){
    this.rootDir = rootDir;
  }
  save(object){
    object.id = shortid.generate();
    const fileName = `File-${object.id}.json`;
    this.createdFile = path.join(this.rootDir, fileName);
    return writeFile(this.createdFile, JSON.stringify(object));
  }
  get(id) {
    const fileName = `File-${id}.json`;
    this.createdFile = path.join(this.rootDir, fileName);
    return readFile(this.createdFile, 'utf-8')
      .then(preParse => JSON.parse(preParse))
      .catch((err) => {
        if (err){
          return null;
        }
        throw err;
      });
  }
  getAll() {

    

  }
}

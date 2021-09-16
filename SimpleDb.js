import { readFile, writeFile, readdir } from 'fs/promises';
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
    const source = './example';
    return readdir(source)
      .then((files) => {
        return Promise.all(
          files.map((file) => {  
            return path.join(source, file);       
          })
        )
          .then((filePath) => {
            return Promise.all(
              filePath.map(item => {
                return readFile(item, 'utf-8')
                  .then(parse => JSON.parse(parse));
              })
            );
          });
      });
  }
}

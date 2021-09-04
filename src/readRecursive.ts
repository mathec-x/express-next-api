import * as pt from 'path';
import fs from 'fs';
import { IReadRecursive } from './types';

export default function readRecursive (path: string, rel: string[] = [""]){
    const res: IReadRecursive[] = []
  
    for (const file of fs.readdirSync(path)) {
      const fspath = pt.join(path, file)
  
      if (fs.statSync(fspath).isDirectory()) {
        res.push(...readRecursive(fspath, [...rel, file]))

      } else {
        res.push({
          name: file,
          path: path,
          relative: `${rel.join("/")}/${file}`
        })
      }
    }
  
    return res;
  }
  
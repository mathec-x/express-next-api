import { setBrackets } from './utils';
import * as pt from 'path';
import { IReadRecursive, IRouter } from './types';

export default function readRoutes(files: IReadRecursive[]) {
  const routes: IRouter[] = []
  for (const file of files) {
    const parse = pt.parse(file.relative)

    if (![".js", ".ts"].includes(parse.ext.toLocaleLowerCase())
      || parse.name.startsWith('_')
      || parse.name.endsWith('.d')
      || parse.dir.startsWith('/_'))
      continue

    const dir = parse.dir === "/" ? "" : parse.dir.substring(1);
    
    const name = parse.name.startsWith("index.")
      ? parse.name.replace("index", "")
      : parse.name === "index"
        ? ""
        : "/" + parse.name

    const url = setBrackets(dir) + setBrackets(name);
    const exported = require(pt.join(file.path, file.name));
    routes.push({ url, exported: { ...exported, priority: exported.priority || 0 } })
  }

  return routes.sort((p, n) => n.exported.priority - p.exported.priority)
}
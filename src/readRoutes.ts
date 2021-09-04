import { setBrackets } from './utils';
import * as pt from 'path';
import { IReadRecursive, IRoute } from './types';

export const readRoutes = (files: IReadRecursive[]) => {
  const routes: IRoute[] = []
  for (const file of files) {
    const parse = pt.parse(file.relative)

    if (![".js", ".ts"].includes(parse.ext.toLocaleLowerCase())
      || parse.name.startsWith('_')
      || parse.dir.startsWith('/_'))
      continue

    const dir = parse.dir === "/" ? "" : parse.dir
    const name = parse.name.startsWith("index.")
      ? parse.name.replace("index", "")
      : parse.name === "index"
        ? "/"
        : "/" + parse.name


    const url = setBrackets(dir) + setBrackets(name);
    const exported = require(pt.join(file.path, file.name));
    routes.push({ url, exported: { ...exported, priority: exported.priority || 0 } })
  }

  return routes.sort((p, n) => n.exported.priority - p.exported.priority)
}
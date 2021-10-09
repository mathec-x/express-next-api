import path from 'path';
import { getMethodKey, getHandlers, VerboseLogger } from './utils';
import type { Router, Express } from 'express';
import { defaultOptions, REQUIRE_MAIN_FILE } from './options';
import { IOptions } from './types';

import readRoutes from './readRoutes';
import readRecursive from './readRecursive';

export default function nextRouter(router: Router, opts: IOptions = defaultOptions) : Router|Express {

    if (!opts.base) {
      opts.base = '/'
    }
   
    if (opts.directory && defaultOptions.directory !== opts.directory) {
      opts.directory = path.join(REQUIRE_MAIN_FILE, opts.directory)
    }
    
    const options = { ...defaultOptions, ...opts }
    const files = readRecursive(options.directory)
    const routes = readRoutes(files)
  
    if (options.verbose) {
      console.log(
          "\x1b[36m",
          "\n[Function: NextApi]:",options.directory.replace(REQUIRE_MAIN_FILE, ''),
          '\x1b[0m'
      );
    }
  
    for (const { url, exported } of routes) {
      const baseUrl = (options.base+'/'+url).replace(/\/\/+/g, "/");
      const methods = Object.entries(exported)
  
      for (const [method, handler] of methods) {
        const methodKey = getMethodKey(method)
        const handlers = getHandlers(handler)
  
        if (
          !opts.extensions?.includes(methodKey) &&
          !["get","put","post","delete"].includes(methodKey)
        )
          continue
        
        router[methodKey](baseUrl, ...handlers);
        if (options.verbose) {
          VerboseLogger(methodKey, baseUrl, exported.priority)
        }
      }
  
      if (typeof exported.default !== "undefined") {
        router.all(url, ...getHandlers(exported.default))
        if (options.verbose) {
          VerboseLogger("_all", baseUrl, exported.priority)
        }   
      }
    }
  
    return router;
  }
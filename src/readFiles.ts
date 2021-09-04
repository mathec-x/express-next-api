import path from 'path';
import { getMethodKey, getHandlers, VerboseLogger } from './utils';
import { Router } from 'express';
import { defaultOptions, REQUIRE_MAIN_FILE } from './options';
import { IOptions } from './types';
import { readRoutes } from './readRoutes';
import readRecursive from './readRecursive';

export function readFiles(opts: IOptions = defaultOptions) : Router{
    const router = Router(opts.options);
    
    if (!opts.base) {
      opts.base = ''
    }
   
    if (opts.directory && defaultOptions.directory !== opts.directory) {
      opts.directory = path.join(REQUIRE_MAIN_FILE, opts.directory)
  
      if (!opts.base) {
        opts.base = opts.directory.replace(REQUIRE_MAIN_FILE, '')
      }
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
      const methods = Object.entries(exported)
  
      for (const [method, handler] of methods) {
        const methodKey = getMethodKey(method)
        const handlers = getHandlers(handler)
  
        if (
          !opts.extensions?.includes(methodKey) &&
          !["get","put","post","delete"].includes(methodKey)
        )
          continue
          
        router[methodKey](url, ...handlers);
        if (options.verbose) {
          VerboseLogger(`[${methodKey}]`, options.base+url, exported.priority)
        }
      }
  
      if (typeof exported.default !== "undefined") {
        router.all(url, ...getHandlers(exported.default))
        if (options.verbose) {
          VerboseLogger("[_all]", options.base+url, exported.priority)
        }
      }     
    }
  
    return router;
  }
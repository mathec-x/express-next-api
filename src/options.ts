import path from 'path';
import { IOptions } from './types';

export const REQUIRE_MAIN_FILE = path.dirname(require.main.filename);

export const defaultOptions: IOptions = {
    directory: path.join(path.dirname(require.main.filename), "routes"),
    extensions: [],
    verbose: process.env.NODE_ENV !== 'production',
    options: {}
  }
  
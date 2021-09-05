
import { Router } from "express";
import { defaultOptions } from "./options";

import nextRouter from "./nextRouter";
import { IOptions } from "./types";
export { nextRouter };

export const nextApi = (opts: IOptions = defaultOptions) => nextRouter(Router(), opts)

export type { NextApi, NextMethods } from './types';
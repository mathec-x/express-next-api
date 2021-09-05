import { NextFunction, Request, Response, Router, RouterOptions } from 'express';

export interface INextApiProps<P, B, Qs> {
  req: Request<P, {}, B, Qs>;
  res: Response;
  next?: NextFunction;
}

export type NextApi<Params = {}, Body = {}, Qs = {}> = (req?: Request<Params, {}, Body, Qs>, res?: Response, next?: NextFunction) => Router|void;

export interface IReadRecursive {
  name: string
  relative: string
  path: string
}

export interface NextMethods {
  priority?: number
  default?: NextApi|NextApi[];
  get?: NextApi|NextApi[];
  post?: NextApi|NextApi[];
  put?: NextApi|NextApi[];
  delete?: NextApi|NextApi[];
}

export interface IRouter {
  url: string;
  exported: NextMethods;
}

export interface IOptions {
  directory?: string;
  extensions?: string[];
  verbose?: boolean;
  base?: string;
  options?: RouterOptions
}
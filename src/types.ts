import { NextFunction, Request, Response, RouterOptions } from 'express';

export interface INextApiProps<P, B, Qs> {
  req: Request<P, {}, B, Qs>;
  res: Response;
  next?: NextFunction;
}

export type NextApi<Params = {}, Body = {}, Qs = {}> = (req?: Request<Params, {}, Body, Qs>, res?: Response, next?: NextFunction) => any;

export interface IReadRecursive {
  name: string
  relative: string
  path: string
}

export interface NextMethods<P = {}, B = {}, Qs = {}> {
  priority?: number;
  default?: NextApi<P,B,Qs>|NextApi<P,B,Qs>[];
  get?: NextApi<P,B,Qs>|NextApi<P,B,Qs>[];
  post?: NextApi<P,B,Qs>|NextApi<P,B,Qs>[];
  put?: NextApi<P,B,Qs>|NextApi<P,B,Qs>[];
  delete?: NextApi<P,B,Qs>|NextApi<P,B,Qs>[];
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
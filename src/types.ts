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

export interface IMethods {
  priority?: number
  default?: NextApi;
  get?: NextApi;
  post?: NextApi;
  put?: NextApi;
  delete?: NextApi;
}

export interface IRoute {
  url: string;
  exported: IMethods;
}

export interface IOptions {
  directory?: string;
  extensions?: string[];
  verbose?: boolean;
  base?: string;
  options?: RouterOptions
}
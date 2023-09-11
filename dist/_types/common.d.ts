import * as express from 'express';
import ViapiHandler from './ViapiHandler';
export type ViapiResult = {
    return?: any;
};
export type ViapiCondition = (req: express.Request, res: express.Response) => Promise<boolean>;
export type ViapiMain = (req: express.Request, res: express.Response) => Promise<ViapiResult>;
export type HandlerDescription = {
    conditions?: ViapiCondition[];
    main: ViapiMain;
};
export type ViapiStructure = {
    handler: HandlerDescription;
    path: string;
    methods?: ('post' | 'get')[];
    children?: ViapiStructure[];
};
export declare function makeExpressHandler(ViapiHandler: ViapiHandler): express.RequestHandler;

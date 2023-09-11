import * as express from 'express';
import ViapiHandler from './ViapiHandler';

export type ViapiResult = { return?: any }
export type ViapiCondition = (req:express.Request, res:express.Response) => Promise<boolean>;
export type ViapiMain = (req:express.Request, res:express.Response) => Promise<ViapiResult>;
export type HandlerDescription = {
    conditions?: ViapiCondition[],
    main: ViapiMain
}
export type ViapiStructure = {
    handler: HandlerDescription,
    path: string,
    methods?: ('post'|'get')[],
    children?: ViapiStructure[]
}


export function makeExpressHandler(ViapiHandler:ViapiHandler):express.RequestHandler {
    return async (req:express.Request, res:express.Response) => {
        process.stdout.write('Got request: ' + req.path + '\n');
        let result = await ViapiHandler.handle(req, res);
        process.stdout.write(`Request "${req.path}" handled (${result.return})\n`);
        res.send(result.return);
    }
}
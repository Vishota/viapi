import * as express from "express";
import { HandlerDescription, ViapiResult } from "./common";
export default class ViapiHandler {
    private _conditions;
    private _main;
    constructor(description: HandlerDescription);
    handle(req: express.Request, res: express.Response): Promise<ViapiResult>;
}

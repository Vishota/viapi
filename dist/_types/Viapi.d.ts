import { ViapiStructure } from "./common";
export default class Viapi {
    private _server;
    private _structure;
    constructor(structure: ViapiStructure);
    private initExpressApi;
    startExpressApi(port?: number): void;
}

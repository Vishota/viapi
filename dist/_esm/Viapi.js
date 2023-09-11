import ViapiHandler from "./ViapiHandler";
import { makeExpressHandler } from "./common";
import express from 'express';
export default class Viapi {
    constructor(structure) {
        this._server = express();
        this._structure = structure;
    }
    initExpressApi(rootPath = '/', rootStructure = this._structure) {
        let path = rootPath + rootStructure.path;
        if (rootStructure.methods == null)
            rootStructure.methods = ['get'];
        process.stdout.write('Path "' + path + '" for ' + rootStructure.methods + ' methods initialized\n');
        if (rootStructure.methods.includes('get')) {
            this._server.get(path, makeExpressHandler(new ViapiHandler(rootStructure.handler)));
        }
        if (rootStructure.methods.includes('post')) {
            this._server.post(path, makeExpressHandler(new ViapiHandler(rootStructure.handler)));
        }
        if (path.at(path.length - 1) != '/')
            path += '/';
        if (rootStructure.children) {
            rootStructure.children
                .forEach(child => {
                this.initExpressApi(path, child);
            });
        }
    }
    startExpressApi(port = 80) {
        this.initExpressApi();
        this._server.listen(port);
    }
}

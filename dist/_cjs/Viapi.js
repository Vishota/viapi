"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ViapiHandler_1 = __importDefault(require("./ViapiHandler"));
const common_1 = require("./common");
const express_1 = __importDefault(require("express"));
class Viapi {
    constructor(structure) {
        this._server = (0, express_1.default)();
        this._structure = structure;
    }
    initExpressApi(rootPath = '/', rootStructure = this._structure) {
        let path = rootPath + rootStructure.path;
        if (rootStructure.methods == null)
            rootStructure.methods = ['get'];
        process.stdout.write('Path "' + path + '" for ' + rootStructure.methods + ' methods initialized\n');
        if (rootStructure.methods.includes('get')) {
            this._server.get(path, (0, common_1.makeExpressHandler)(new ViapiHandler_1.default(rootStructure.handler)));
        }
        if (rootStructure.methods.includes('post')) {
            this._server.post(path, (0, common_1.makeExpressHandler)(new ViapiHandler_1.default(rootStructure.handler)));
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
exports.default = Viapi;

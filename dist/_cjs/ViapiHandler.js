"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ViapiHandler {
    constructor(description) {
        this._conditions = description.conditions ? description.conditions : [];
        this._main = description.main;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let resolve = () => { throw ''; }, reject = () => { throw ''; };
            let result = new Promise((presolve, preject) => {
                resolve = presolve;
                reject = preject;
            });
            let conditionsResults = [];
            this._conditions.forEach((condition) => __awaiter(this, void 0, void 0, function* () {
                conditionsResults.push(condition(req, res)
                    .then(o => { if (!o)
                    reject(); })
                    .catch(() => { reject(); }));
            }));
            if (conditionsResults.length > 0) {
                yield Promise.all(conditionsResults).catch(() => reject());
            }
            resolve(yield this._main(req, res).catch(() => reject()));
            return result;
        });
    }
}
exports.default = ViapiHandler;

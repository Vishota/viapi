import * as express  from "express";
import { HandlerDescription, ViapiCondition, ViapiMain, ViapiResult } from "./common";

export default class ViapiHandler {
    private _conditions : ViapiCondition[];
    private _main : ViapiMain;

    constructor (description:HandlerDescription) {
        this._conditions = description.conditions ? description.conditions : [];
        this._main = description.main;
    }

    async handle(req:express.Request, res:express.Response): Promise<ViapiResult> {
        let resolve:Function = ()=>{throw ''}, reject:Function = ()=>{throw ''};

        let result:Promise<ViapiResult> = new Promise<ViapiResult>((presolve, preject)=>{
            resolve = presolve;
            reject = preject;
        });
        
        let conditionsResults:Promise<any>[] = [];
        this._conditions.forEach(async condition=>{
            conditionsResults.push(
                condition(req, res)
                    .then(o => { if(!o) reject() })
                    .catch(()=>{ reject() })
            )
        })
        if(conditionsResults.length > 0) {
            await Promise.all(conditionsResults).catch(()=>reject());
        }
        resolve(await this._main(req,res).catch(()=>reject()));
        return result;
    }
}

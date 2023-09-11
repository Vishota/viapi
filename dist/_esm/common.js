var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function makeExpressHandler(ViapiHandler) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        process.stdout.write('Got request: ' + req.path + '\n');
        let result = yield ViapiHandler.handle(req, res);
        process.stdout.write(`Request "${req.path}" handled (${result.return})\n`);
        res.send(result.return);
    });
}

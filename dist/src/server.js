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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = require("./app");
process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
});
let server;
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.dbUrl);
            console.log("database connected successfully");
            server = app_1.app.listen(config_1.default.port, () => {
                console.log("server is running on port", config_1.default.port);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
process.on("unhandledRejection", (err) => {
    if (server) {
        server.close(() => {
            console.log(err);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
connectDb();
process.on("SIGTERM", (err) => {
    console.log("signterm is received", err);
    if (server) {
        server.close();
    }
});

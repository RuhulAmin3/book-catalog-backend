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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const user_model_1 = require("./user.model");
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "failed to create User");
    }
    const accessToken = (0, jwtHelpers_1.createToken)({
        id: result._id,
        email: result.email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expire_time);
    return { accessToken, data: result };
});
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user does not exist");
    }
    const passwordMatched = yield user_model_1.User.isPasswordMatched(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password, password);
    if (!passwordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "wrong credentials");
    }
    const accessToken = (0, jwtHelpers_1.createToken)({
        id: isUserExist._id,
        email: isUserExist.email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expire_time);
    return { accessToken, data: isUserExist };
});
exports.userService = {
    createUser,
    loginUser,
};

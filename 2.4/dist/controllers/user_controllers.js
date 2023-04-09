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
exports.userLogout = exports.userRegister = exports.userLogin = void 0;
const user_models_1 = __importDefault(require("../models/user_models"));
const userLogin = (req, res) => {
    const { login, pass } = req.body;
    user_models_1.default.findOne({ login: login })
        .then((user) => {
        if (!user) {
            return res.status(404).send({ error: "Not found!" });
        }
        user.comparePassword(pass, function (err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                req.session.userId = user._id;
                return res.json({ ok: true });
            }
        });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
exports.userLogin = userLogin;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pass } = req.body;
    let existingUser = yield user_models_1.default.findOne({ login: login });
    if (existingUser) {
        return res.status(500).json({ error: "User already exist!" });
    }
    let user = new user_models_1.default({
        login: login,
        pass: pass,
    });
    return user
        .save()
        .then(() => res.json({ ok: true }))
        .catch(() => res.status(500).json({ error: "Failed to create user!" }));
});
exports.userRegister = userRegister;
const userLogout = (req, res) => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
};
exports.userLogout = userLogout;
//# sourceMappingURL=user_controllers.js.map
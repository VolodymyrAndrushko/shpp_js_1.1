"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_FACTOR = 13;
const User = new mongoose_1.default.Schema({
    login: { type: "string", required: true, unique: true },
    pass: { type: "string", required: true },
    items: { type: "array" }
});
User.pre("save", function (next) {
    let user = this;
    if (!user.isModified("pass")) {
        return next();
    }
    bcrypt_1.default.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.pass, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.pass = hash;
            next();
        });
    });
});
User.methods.comparePassword = function (candidatePass, cb) {
    bcrypt_1.default.compare(candidatePass, this.pass, function (err, isMatch) {
        if (err) {
            return cb(err, null);
        }
        cb(null, isMatch);
    });
};
exports.default = mongoose_1.default.model("User", User);
//# sourceMappingURL=user_models.js.map
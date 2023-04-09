"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Item = new mongoose_1.default.Schema({
    text: { type: "string", require: true },
    checked: { type: "boolean", require: true }
});
exports.default = mongoose_1.default.model("Item", Item);
//# sourceMappingURL=items_models.js.map
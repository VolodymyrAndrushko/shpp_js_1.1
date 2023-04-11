"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.getAllItems = exports.addNewItem = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const items_models_1 = __importDefault(require("../models/items_models"));
const user_models_1 = __importDefault(require("../models/user_models"));
// const fs = require("fs");
// type Items = {
//     items:
//     {
//         id: number,
//         text: string,
//         checked: boolean
//     }[]
// }
// let filePath = './src/local_db/items.json'
// function jsonReader(filePath: string, callback: any) {
//     return fs.readFile(filePath, 'utf-8', (err: Error, fileData: string) => {
//         if (err) {
//             return callback && callback(err)
//         }
//         try {
//             const data: JSON = JSON.parse(fileData);
//             return callback && callback(null, data)
//         } catch (err) {
//             return callback && callback(err)
//         }
//     })
// }
// const updateFile = function (filePath: string, item: Items) {
//     fs.writeFile(filePath, JSON.stringify(item, null, 4), (err: Error) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// }
// export const getAllItems = (req: Request, res: Response) => {
//     jsonReader(filePath, (err: Error, data: Items) => {
//         if (err) {
//             res.status(500).json({ err });
//         }
//         return res.status(201).json(data);
//     })
// }
// export const addNewItem = (req: Request, res: Response) => {
//     jsonReader(filePath, (err: Error, data: Items) => {
//         if (err) {
//             res.status(500).json({ err });
//         }
//         try {
//             let id: number = data.items.length + 1;
//             const text: string = req.body.text;
//             const object = data;
//             object.items.push({ id: id, text: text, checked: false })
//             updateFile(filePath, object)
//             res.json({ id: id }).end();
//         } catch (error) {
//             return res.status(500).json({ err });
//         }
//     });
// }
// export const editItem = (req: Request, res: Response) => {
//     jsonReader(filePath, (err: Error, data: Items) => {
//         if (err) {
//             res.status(500).json({ err });
//         }
//         try {
//             const body: { id: number, text: string, checked: boolean } = req.body;
//             const id: number = body.id;
//             const text: string = body.text;
//             const checked: boolean = body.checked;
//             const itemIndex: number = data.items.findIndex(item => item.id === id);
//             if (itemIndex === -1) {
//                 return res.status(404).json({ error: "Item not found!" }).end();
//             }
//             const item = data.items[itemIndex];
//             item.text = text;
//             item.checked = checked;
//             updateFile(filePath, data)
//             res.json({ "ok": true }).end();
//         } catch (error) {
//             return res.status(500).json({ err });
//         }
//     });
// }
// export const deleteItem = (req: Request, res: Response) => {
//     jsonReader(filePath, (err: Error, data: Items) => {
//         if (err) {
//             res.status(500).json({ err });
//         }
//         try {
//             const id: number = req.body.id;
//             const itemIndex: number = data.items.findIndex(item => item.id === id);
//             if (itemIndex === -1) {
//                 return res.status(404).json({ error: "Item not found!" }).end();
//             }
//             data.items.splice(itemIndex, 1);
//             updateFile(filePath, data)
//             res.json({ "ok": true }).end();
//         } catch (error) {
//             return res.status(500).json({ err });
//         }
//     })
// }
const addNewItem = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" });
    }
    const { text } = req.body;
    const item = new items_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        text: text,
        checked: false
    });
    user_models_1.default.findOneAndUpdate({ _id: userId }, { $push: { items: item } })
        .then(() => {
        res.status(201).json({ _id: item.id });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
exports.addNewItem = addNewItem;
const getAllItems = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" });
    }
    user_models_1.default.findById(userId)
        .then((user) => {
        res.status(200).json({ items: user === null || user === void 0 ? void 0 : user.items });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
exports.getAllItems = getAllItems;
const editItem = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" });
    }
    const itemId = new mongoose_1.default.Types.ObjectId(req.body._id);
    const item = new items_models_1.default({
        _id: itemId,
        text: req.body.text,
        checked: req.body.checked
    });
    return user_models_1.default.updateOne({ _id: userId }, { $set: { "items.$[element]": item } }, { arrayFilters: [{ "element._id": itemId }] })
        .then(() => res.status(200).json({ ok: true }))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.editItem = editItem;
const deleteItem = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" });
    }
    const itemId = new mongoose_1.default.Types.ObjectId(req.body._id);
    return user_models_1.default.updateOne({ _id: userId }, { $pull: { items: { _id: itemId } } })
        .then(() => res.status(200).json({ ok: true }))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=items_controllers.js.map
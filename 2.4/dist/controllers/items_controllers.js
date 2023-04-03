"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.addNewItem = exports.getAllItems = void 0;
const fs = require("fs");
let filePath = './src/local_db/items.json';
function jsonReader(filePath, callback) {
    return fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return callback && callback(err);
        }
        try {
            const data = JSON.parse(fileData);
            return callback && callback(null, data);
        }
        catch (err) {
            return callback && callback(err);
        }
    });
}
const updateFile = function (filePath, item) {
    fs.writeFile(filePath, JSON.stringify(item, null, 4), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
const getAllItems = (req, res) => {
    jsonReader(filePath, (err, data) => {
        if (err) {
            res.status(500).json({ err });
        }
        return res.status(201).json(data);
    });
};
exports.getAllItems = getAllItems;
const addNewItem = (req, res) => {
    jsonReader(filePath, (err, data) => {
        if (err) {
            res.status(500).json({ err });
        }
        try {
            let id = data.items.length + 1;
            const text = req.body.text;
            const object = data;
            object.items.push({ id: id, text: text, checked: false });
            updateFile(filePath, object);
            res.json({ id: id }).end();
        }
        catch (error) {
            return res.status(500).json({ err });
        }
    });
};
exports.addNewItem = addNewItem;
const editItem = (req, res) => {
    jsonReader(filePath, (err, data) => {
        if (err) {
            res.status(500).json({ err });
        }
        try {
            const body = req.body;
            const id = body.id;
            const text = body.text;
            const checked = body.checked;
            const itemIndex = data.items.findIndex(item => item.id === id);
            if (itemIndex === -1) {
                return res.status(404).json({ error: "Item not found!" }).end();
            }
            const item = data.items[itemIndex];
            item.text = text;
            item.checked = checked;
            updateFile(filePath, data);
            res.json({ "ok": true }).end();
        }
        catch (error) {
            return res.status(500).json({ err });
        }
    });
};
exports.editItem = editItem;
const deleteItem = (req, res) => {
    jsonReader(filePath, (err, data) => {
        if (err) {
            res.status(500).json({ err });
        }
        try {
            const id = req.body.id;
            const itemIndex = data.items.findIndex(item => item.id === id);
            if (itemIndex === -1) {
                return res.status(404).json({ error: "Item not found!" }).end();
            }
            data.items.splice(itemIndex, 1);
            updateFile(filePath, data);
            res.json({ "ok": true }).end();
        }
        catch (error) {
            return res.status(500).json({ err });
        }
    });
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=items_controllers.js.map
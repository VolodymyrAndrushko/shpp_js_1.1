"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controllers_1 = require("../controllers/items_controllers");
let router = express_1.default.Router();
const path = '/items';
// let toDoItems: { items: { id: number, text: string, checked: boolean }[] } = {items:[]};
// items: [{ id: 1, text: "One", checked: false }, { id: 2, text: "Two", checked: false }] 
// jsonReader('./src/local_db/items.json', (err:Error, data: {items: { id: number, text: string, checked: boolean }[] })=>{
//     if(err){
//         console.log(err)
//     }
//     toDoItems = data
// })
// updateFile('./src/local_db/items.json',file)
router
    .route(path)
    .get(items_controllers_1.getAllItems)
    .post(items_controllers_1.addNewItem)
    .put(items_controllers_1.editItem)
    .delete(items_controllers_1.deleteItem);
// .delete((req, res) => {
//     const id: number = req.body.id;
//     const itemIndex: number = toDoItems.items.findIndex(item => item.id === id);
//     if (itemIndex === -1) {
//         return res.status(404).json({ error: "Item not found!" }).end();
//     }
//     toDoItems.items.splice(itemIndex, 1);
//     res.json({ "ok": true }).end();
// });
module.exports = router;
//# sourceMappingURL=router_v1.js.map
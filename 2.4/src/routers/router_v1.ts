import express, { Router } from "express"

import { addNewItem, editItem, getAllItems, deleteItem } from "../controllers/items_controllers";

let router: Router = express.Router();
const path: string = '/items';



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
    .get(getAllItems)
    .post(addNewItem)
    .put(editItem)
    .delete(deleteItem)
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
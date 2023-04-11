import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";

import Item, { IItem } from "../models/items_models";
import User from "../models/user_models";
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

export const addNewItem = (req: Request, res: Response): Response | undefined => {
    const userId: ObjectId | undefined = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" })
    }
    const { text } = req.body;
    const item: IItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        text: text,
        checked: false
    });
    User.findOneAndUpdate({ _id: userId }, { $push: { items: item } })
        .then(() => {
            res.status(201).json({ _id: item.id })
        })
        .catch((err) => res.status(500).json({ error: err }))
};

export const getAllItems = (req: Request, res: Response): Response | undefined => {
    const userId: ObjectId | undefined = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" })
    }
    User.findById(userId)
        .then((user) => {
            res.status(200).json({ items: user?.items })
        })
        .catch((err) => res.status(500).json({ error: err }))
}

export const editItem = (req: Request, res: Response): Promise<Response> | Response => {
    const userId: ObjectId | undefined = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" })
    }
    const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
        req.body._id
    );
    const item: IItem = new Item({
        _id: itemId,
        text: req.body.text,
        checked: req.body.checked
    })

    return User.updateOne(
        { _id: userId },
        { $set: { "items.$[element]": item } },
        { arrayFilters: [{ "element._id": itemId }] }
    )
        .then(() => res.status(200).json({ ok: true }))
        .catch((err) => res.status(500).json({ error: err }));
};

export const deleteItem = (req: Request, res: Response): Promise<Response> | Response => {
    const userId: ObjectId | undefined = req.session.userId;
    if (!userId) {
        return res.status(500).json({ error: "No access!" })
    }

    const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
        req.body._id
    );

    return User.updateOne(
        { _id: userId },
        { $pull: { items: { _id: itemId } } },
    )
    .then(()=> res.status(200).json({ok:true}))
    .catch((err)=> res.status(500).json({error:err}))
}
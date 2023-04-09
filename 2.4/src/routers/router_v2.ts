import { Router } from "express";
import { userLogin, userRegister, userLogout } from "../controllers/user_controllers";

import { addNewItem, editItem, getAllItems, deleteItem } from "../controllers/items_controllers";

const router: Router = Router();

router.all("/", (req, res) => {
    let action: string = req.query.action as string;
    switch (action) {
        case "login": {
            userLogin(req, res);
            break;
        }
        case "logout": {
            userLogout(req, res);
            break;
        }
        case "register": {
            userRegister(req, res);
            break;
        }
        case "getItems": {
            getAllItems(req, res);
            break;
        }
        case "deleteItem": {
            deleteItem(req, res);
            break;
        }
        case "createItem": {
            addNewItem(req, res);
            break;
        }
        case "editItem": {
            editItem(req, res);
            break;
        }
        default:
            res.status(400).send({ error: `Unknown request command: ${action}` });
    }
});

export = router;
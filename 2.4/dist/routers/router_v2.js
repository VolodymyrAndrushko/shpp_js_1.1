"use strict";
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user_controllers");
const items_controllers_1 = require("../controllers/items_controllers");
const router = (0, express_1.Router)();
router.all("/", (req, res) => {
    let action = req.query.action;
    switch (action) {
        case "login": {
            (0, user_controllers_1.userLogin)(req, res);
            break;
        }
        case "logout": {
            (0, user_controllers_1.userLogout)(req, res);
            break;
        }
        case "register": {
            (0, user_controllers_1.userRegister)(req, res);
            break;
        }
        case "getItems": {
            (0, items_controllers_1.getAllItems)(req, res);
            break;
        }
        case "deleteItem": {
            (0, items_controllers_1.deleteItem)(req, res);
            break;
        }
        case "createItem": {
            (0, items_controllers_1.addNewItem)(req, res);
            break;
        }
        case "editItem": {
            (0, items_controllers_1.editItem)(req, res);
            break;
        }
        default:
            res.status(400).send({ error: `Unknown request command: ${action}` });
    }
});
module.exports = router;
//# sourceMappingURL=router_v2.js.map
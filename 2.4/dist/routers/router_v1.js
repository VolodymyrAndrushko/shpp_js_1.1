"use strict";
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user_controllers");
const items_controllers_1 = require("../controllers/items_controllers");
const router = (0, express_1.Router)();
router
    .route('/items')
    .get(items_controllers_1.getAllItems)
    .post(items_controllers_1.addNewItem)
    .put(items_controllers_1.editItem)
    .delete(items_controllers_1.deleteItem);
router.post('/login', user_controllers_1.userLogin);
router.post('/register', user_controllers_1.userRegister);
router.post('/logout', user_controllers_1.userLogout);
module.exports = router;
//# sourceMappingURL=router_v1.js.map
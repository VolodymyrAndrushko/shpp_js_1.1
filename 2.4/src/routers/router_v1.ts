import express, { Router } from "express"
import {userLogin, userRegister, userLogout} from "../controllers/user_controllers";

import { addNewItem, editItem, getAllItems, deleteItem } from "../controllers/items_controllers";

const router: Router = Router();

router
    .route('/items')
    .get(getAllItems)
    .post(addNewItem)
    .put(editItem)
    .delete(deleteItem)

router.post('/login', userLogin)
router.post('/register', userRegister)
router.post('/logout', userLogout)

export = router;
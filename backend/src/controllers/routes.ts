import { Router} from "express";
import { getAllHandler, removeItemHandler, createItemHandler } from "./itemsController";
import { getAllLocationsHandler } from "../controllers/locationController";

const router=Router();

router.get('/items', getAllHandler);
router.post('/item', createItemHandler);
router.delete('/items/:id', removeItemHandler);
router.get('/locations', getAllLocationsHandler);

export default router;
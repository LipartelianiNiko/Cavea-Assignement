import { Router} from "express";
import { getAllHandler, removeItemHandler, createItemHandler } from "./itemsController";
import { getAllLocationsHandler } from "../controllers/locationController";

const router=Router();

router.get('/inventories', getAllHandler);
router.post('/inventories', createItemHandler);
router.delete('/inventories/:id', removeItemHandler);
router.get('/locations', getAllLocationsHandler);

export default router;
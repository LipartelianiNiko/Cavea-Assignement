import { Router} from "express";
import { getAllHandler, removeItemHandler, createItemHandler } from "./itemsController";
import { getAllLocationsHandler, getStatsHandler } from "../controllers/locationController";

const router=Router();

router.get('/inventories', getAllHandler);
router.post('/inventories', createItemHandler);
router.delete('/inventories/:id', removeItemHandler);
router.get('/locations', getAllLocationsHandler);
router.get('/locations/stats', getStatsHandler)

export default router;
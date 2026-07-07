import { Router} from "express";
import { getAllHandler, removeItemHandler, createItemHandler } from "./itemsController";

const router=Router();

router.get('/', getAllHandler);
router.post('/', createItemHandler);
router.delete('/:id', removeItemHandler);

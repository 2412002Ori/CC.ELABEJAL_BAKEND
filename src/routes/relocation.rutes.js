import { Router } from "express";
import { postRelocation , getAllRelocation , getRelocationById , putRelocationById} from "../controlers/relocation.controlers.js";

const router = Router();

router.post("/Relocation",postRelocation);
router.get("/Relocation", getAllRelocation);
router.get("/Relocation/:id", getRelocationById);
router.put("/Relocation/:id", putRelocationById); 

export default router;
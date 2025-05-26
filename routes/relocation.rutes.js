import { Router } from "express";
import { postRelocation , getAllRelocation , getRelocationById , putRelocationById} from "../controlers/relocation.controlers.js";

const router = Router();

router.post("/request/Relocation",postRelocation);
router.get("/request/Relocation", getAllRelocation);
router.get("/request/Relocation/:id", getRelocationById);
router.put("/request/Relocation/:id", putRelocationById); 

export default router;
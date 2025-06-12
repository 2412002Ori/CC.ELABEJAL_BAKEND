import { Router } from "express"
<<<<<<< Updated upstream:routes/users.routes.js
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUser, getUserID, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"
=======
import { getUser, createUsers, deleteUsers, updateUser } from "../controlers/users.controlers.js"
>>>>>>> Stashed changes:src/routes/users.routes.js


const router = Router()

router.get('/users', getUser);

router.get('/users/:id', getUserID);

<<<<<<< Updated upstream:routes/users.routes.js
router.post('/users', authMiddleware, createUser);
=======
router.post('/users', createUsers);
>>>>>>> Stashed changes:src/routes/users.routes.js

router.delete('/users/:id', deleteUsers);

router.put('/users/:id', updateUser);

export default router 
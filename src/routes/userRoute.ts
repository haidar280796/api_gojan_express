import { Router} from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUser);
router.post("/", userController.createUser);

// router.post("/", (req, res) => {
//     res.send("Create a new workout");
// });

// router.patch("/:workoutId", (req, res) => {
//     res.send("Update an existing workout");
// });

// router.delete("/:workoutId", (req, res) => {
//     res.send("Delete an existing workout");
// });

export default router;

import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUsersForSideBar, getMessages, sendMessage} from "../controllers/message.controller";
const  router = express.Router();

router.get("/user", protectRoute, getUsersForSideBar );
router.get("/:id", protectRoute, getMessages );

router.post("/send/:id", protectRoute, sendMessage);

export default router;
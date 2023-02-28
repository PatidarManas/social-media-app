import express from "express";
import { deleteuser, followuser, getuser, unfollowuser, updateuser } from "../controllers/usercontroller.js";

const router=express.Router();


router.get('/:id',getuser);
router.get('/:id/update',updateuser);
router.delete('/:id/delete',deleteuser);
router.put('/:id/follow',followuser);
router.put('/:id/unfollow',unfollowuser);

export default router;
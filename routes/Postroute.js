import  express  from "express";
import { createpost, deletepost, getpost, likepost, updatepost } from "../controllers/postcontroller.js";
import { gettimelinepost } from "../controllers/usercontroller.js";

const router=express.Router();

router.post('/newpost',createpost);
router.get('/:id',getpost);
router.put('/:id/update',updatepost);
router.delete('/:id/delete',deletepost);
router.put('/:id/like',likepost);
router.put('/:id/timeline',gettimelinepost);

export default router;
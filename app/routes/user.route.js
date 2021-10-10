import User from '../models/User.js';
import { Router } from 'express';
const router = Router();

router.get('/getuser/:user', async (req, res) => {
  const user = req.params.user;
  const userdata = await User.findOne({
    email: user,
  });
  res.json({ id: userdata._id });
});

export default router;

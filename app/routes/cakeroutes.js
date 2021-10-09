import { Router } from 'express';
import Cake from '../models/Cake.js';
const router = Router();

router.get("/cakes", async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/cakes/:limit", async (req, res) => {
  try {
    const number = parseInt(req.params.limit)
    const cakes = await Cake.find().limit(number)
    res.send(cakes)
  } catch (err) { console.log(err) }
});




export default router;
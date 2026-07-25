import { Router } from "express";

const router = Router();

// routes
router.get("/", (req, res) => {
    res.send("User Route");
});

export default router;
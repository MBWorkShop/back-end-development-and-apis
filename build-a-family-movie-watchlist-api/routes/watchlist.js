import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";

const router = express.Router();


router.get("/:userId", authenticate, (req, res) => {
    const userWatchlist = getWatchlist(Number(req.params.userId));
    return res.status(200).json(userWatchlist);
});

router.post("/:userId/movies", authenticate, authorizeModification, (req, res) => {
    const movieData = req.body;
    addMovie(Number(req.params.userId), movieData)
    return res.sendStatus(201);
});

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
    const updates = req.body;
    updateMovie(Number(req.params.userId), Number(req.params.movieId), updates);
    return res.sendStatus(200);
});

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
    deleteMovie(Number(req.params.userId), Number(req.params.movieId))
    return res.sendStatus(200);
});

export default router;
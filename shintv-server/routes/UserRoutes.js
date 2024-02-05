const { addToLikedAnimes, getLikedAnimes, removeFromLikedAnimes } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addToLikedAnimes);
router.get("/liked/:email",getLikedAnimes);
router.put("/delete", removeFromLikedAnimes)

module.exports = router;
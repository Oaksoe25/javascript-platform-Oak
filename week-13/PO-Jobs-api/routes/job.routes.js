const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const job = require("../controllers/job.controller");

router.get("/", job.publicList);
router.get("/:id", auth, job.detail);
router.post("/", auth, role("admin"), job.create);

module.exports = router;

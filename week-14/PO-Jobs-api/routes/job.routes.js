const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/public", jobController.getPublicJobs);

router.get("/", auth, role("admin"), jobController.getAllJobs);
router.post("/", auth, role("admin"), jobController.createJob);
router.put("/:id", auth, role("admin"), jobController.updateJob);
router.delete("/:id", auth, role("admin"), jobController.deleteJob);

module.exports = router;

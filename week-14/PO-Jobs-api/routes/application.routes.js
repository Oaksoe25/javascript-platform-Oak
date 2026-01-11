const router = require("express").Router();
const controller = require("../controllers/application.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post("/", auth, role("member"), controller.applyJob);
router.get("/", auth, role("admin"), controller.getAllApplications);
router.get("/me", auth, role("member"), controller.getMyApplications);

module.exports = router;

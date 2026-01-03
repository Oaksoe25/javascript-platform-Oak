const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const app = require("../controllers/application.controller");

router.post("/:jobId", auth, app.apply);
module.exports = router;

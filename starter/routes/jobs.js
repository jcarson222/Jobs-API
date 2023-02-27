const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);

router.route("/:id").get(getJob).patch(createJob).delete(deleteJob);

// OR
// router.post('/', createJob);
// router.get('/', getAllJobs);
// router.get("/:id", getJob);
// router.patch("/:id", createJob);
// router.delete("/:id", deleteJob);

module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createTemplate,
  getTemplates,
  getTemplate,
  duplicateTemplate,
} = require(
  "../controllers/templateController"
);

router.post(
  "/",
  authMiddleware,
  createTemplate
);

router.get(
  "/",
  authMiddleware,
  getTemplates
);

router.get(
  "/:id",
  authMiddleware,
  getTemplate
);

router.post(
  "/:id/duplicate",
  authMiddleware,
  duplicateTemplate
);

module.exports = router;
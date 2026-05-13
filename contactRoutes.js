const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const {
  addContact,
  getContacts,
  getContact,
  deleteContact,
  importCSV,
  getContactEvents,
  bulkDeleteContacts,
  createSegment,
} = require("../controllers/contactController");

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  addContact
);

router.get(
  "/",
  authMiddleware,
  getContacts
);

router.post(
  "/import",
  authMiddleware,
  upload.single("file"),
  importCSV
);

/* IMPORTANT:
   STATIC ROUTES MUST COME
   BEFORE DYNAMIC ROUTES
*/

router.post(
  "/segments",
  authMiddleware,
  createSegment
);

router.post(
  "/bulk-delete",
  authMiddleware,
  bulkDeleteContacts
);

router.get(
  "/:id/events",
  authMiddleware,
  getContactEvents
);

router.get(
  "/:id",
  authMiddleware,
  getContact
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

module.exports = router;
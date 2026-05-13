const express =
require("express");

const router =
  express.Router();

const {
  createCampaign,
  getCampaigns,
  sendCampaign,
  scheduleCampaign,
  getCampaignProgress,
  trackOpen,
} = require(
  "../controllers/campaignController"
);

router.post(
  "/",
  createCampaign
);

router.get(
  "/",
  getCampaigns
);

router.post(
  "/:id/send",
  sendCampaign
);

router.post(
  "/:id/schedule",
  scheduleCampaign
);

router.get(
  "/:id/progress",
  getCampaignProgress
);

router.get(
  "/track/open/:campaignId/:contactId",
  trackOpen
);

module.exports =
  router;
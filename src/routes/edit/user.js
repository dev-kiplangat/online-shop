const express = require("express");
const router = express.Router();
let { auth, accounting, update } = require("../../utils/validators");
const { edit } = require("../../controllers");

const { newPasswordValidator, updateValidator } = auth;

const userEditController = edit.user;

router
  .route("/change-details")
  .get(userEditController.getEditDetails)
  .post(
    updateValidator,
    userEditController.validateInputAndGenerateShortCode,
    userEditController.getInputTelCode
  );

router
  .route("/verify-tel-number")
  .post(update.shortCodeV, userEditController.saveTel);

router
  .route("/change-password")
  .get(userEditController.getChangePassword)
  .post(newPasswordValidator, userEditController.postChangePassword);
module.exports = router;
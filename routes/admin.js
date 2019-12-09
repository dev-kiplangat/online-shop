const express = require("express");
const { body } = require("express-validator/check");



const IsAuth = require("../authmiddleware/AdminRoutesProtect");
const inputValidator=require('../util/InputValidator');

const adminController = require("../controllers/admin");

const Admin = require("../models/admin");

const router = express.Router();


router.get("/signup", adminController.getAdminSignUp);
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(value => {
        return Admin.findOne({ adminEmail: value }).then(admin => {
          if (admin) {
            return Promise.reject(
              "The Admin email already exists please try another one" //check for the existence of an email before feeding the data to the database
            );
          }
        });
      }),

    body(
      "password",
      "The password should be 8 or more character and should be alphanumeric!"
    ).isLength({ min: 8 }),
    body("ConfirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    })
  ],
  adminController.postAdminSignUp
);
//come to solve later
router.post(
  "/admin/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(value => {
        return Admin.findOne({ adminEmail: value }).then(admin => {
          if (admin) {
            return Promise.reject(
              "The Admin email already exists please try another one" //check for the existence of an email before feeding the data to the database
            );
          }
        });
      }),

    body(
      "password",
      "The password should be 8 or more character and should be alphanumeric!"
    ).isLength({ min: 8 }),
    body("ConfirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    })
  ],
  adminController.postAdminSignUp
);


router.get("/login", adminController.getLogin);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body(
      "password",
      "The password should be 8 or more character and should be alphanumeric!"
    ).isLength({ min: 8 })
  ],
  adminController.postLogin
);
router.post(
  //I dont know the error but I had to do this so that admin auth routes can be accessed
  "/admin/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body(
      "password",
      "The password should be 8 or more character and should be alphanumeric!"
    ).isLength({ min: 8 })
  ],
  adminController.postLogin
);

// product management Routes
router.get("/reset", adminController.getReset);
router.post("reset", adminController.postReset);



router.get("/add-product", IsAuth, adminController.getAddProduct);
router.post(
  "/add-product",
  IsAuth,
  [
    body("title")
      .isLength({ min: 5,max:15 })
      .withMessage(
        "Please provide the product with a title which is between 5 and 15 characters long"
      ),
    body("price")
      .isNumeric()
      .withMessage("Price must be a number")
      .custom(value => {
        if (value < 1) {
          throw new Error("Price must be a positive real number");
        }
        return true;
      }),
    body("quantity")
      .isInt()
      .withMessage("Quantity must positive whole number")
      .custom(value => {
        if (value < 1) {
          throw new Error(
            "quantity must be greater than zero and must be a whole number"
          );
        }
        return true;
      }),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Very short description.Please type atleast 10 words")
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", IsAuth, adminController.getEditProduct);
router.post(
  "/edit-product",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage(
        "Please provide the product with a title which is atleast 5 characters long"
      ),
    body("price")
      .isNumeric()
      .withMessage("Price must be a positive real number")
      .custom(value => {
        if (value < 1) {
          throw new Error("Price must be a positive real number");
        }
        return true;
      }),
    body("quantity")
      .isInt()
      .withMessage("Quantity must positive whole number")
      .custom(value => {
        if (value < 1) {
          throw new Error(
            "quantity must be greater than zero and must be a whole number"
          );
        }
        return true;
      }),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Very short description.Please type atleast 10 words")
  ],
  IsAuth,
  adminController.postEditProduct
);


router.get("/products", IsAuth, adminController.getProducts);
router.post("/delete-product", IsAuth, adminController.postDeleteProduct);

module.exports = router;

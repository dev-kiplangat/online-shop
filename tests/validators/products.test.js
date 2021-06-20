const ranges = require("../../config/constraints").product;
const {
  validateStringField,
  validateFloatField,
  validateIntegerField,
} = require("./utils");

const {product} = require("../../validators");

const {
  titleValidator,
  buyingPriceValidator,
  percentageProfitValidator,
  expirationPeriodValidator,
  quantityValidator,
  descriptionValidator,
  brandValidator,
  categoryValidator,
} = product;

describe.skip("Product validator", () => {
  describe("Title", () => {
    const {minlength, maxlength, error} = ranges.title;
    validateStringField()
      .onField("title")
      .usingValidator(titleValidator)
      .withLowerLimitLength(minlength)
      .withUpperLimitLength(maxlength)
      .withFielNameOnErrrorAs("Title")
      .withErrorMessage(error)
      .runTests();
  });
  describe("Buying price", () => {
    const delta = 0.01;
    const {min, max, error} = ranges.buyingPrice;
    validateFloatField()
      .onField("buyingPrice")
      .usingValidator(buyingPriceValidator)
      .withLowerLimit(min)
      .withUpperLimit(max)
      .withDelta(delta)
      .withFielNameOnErrrorAs("Buying price")
      .withErrorMessageAs(error)
      .runTests();
  });
  describe("Percentage Profit", () => {
    const delta = 0.01;
    const {min, max, error} = ranges.percentageProfit;

    validateFloatField()
      .onField("percentageProfit")
      .usingValidator(percentageProfitValidator)
      .withLowerLimit(min)
      .withUpperLimit(max)
      .withDelta(delta)
      .withErrorMessageAs(error)
      .withFielNameOnErrrorAs("Percentage profit")
      .runTests();
  });
  describe.skip("Quantity", () => {
    const {min, max, error} = ranges.quantity;

    validateIntegerField()
      .onField("quantity")
      .usingValidator(quantityValidator)
      .withLowerLimit(min)
      .withUpperLimit(max)
      .withErrorMessage(error)
      .withFielNameOnErrrorAs("Quantity")
      .runTests();
  });

  describe("Description", () => {
    const {minlength, maxlength, error} = ranges.description;
    validateStringField()
      .onField("description")
      .usingValidator(descriptionValidator)
      .withLowerLimitLength(minlength)
      .withUpperLimitLength(maxlength)
      .withErrorMessage(error)
      .withFielNameOnErrrorAs("Description")
      .runTests();
  });
  describe("Brand", () => {
    const {minlength, maxlength, error} = ranges.brand;
    validateStringField()
      .onField("brand")
      .usingValidator(brandValidator)
      .withLowerLimitLength(minlength)
      .withUpperLimitLength(maxlength)
      .withFielNameOnErrrorAs("Brand")
      .withErrorMessage(error)
      .runTests();
  });

  describe("Category", () => {
    const {minlength, maxlength, error} = ranges.category;
    validateStringField()
      .onField("category")
      .usingValidator(categoryValidator)
      .withLowerLimitLength(minlength)
      .withUpperLimitLength(maxlength)
      .withErrorMessage(error)
      .withFielNameOnErrrorAs("Category")
      .runTests();
  });
});
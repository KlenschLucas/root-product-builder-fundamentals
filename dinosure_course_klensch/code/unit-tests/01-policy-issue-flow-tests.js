/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

/**
 * Check for a specific validation error in the Joi validation result
 * @param {*} validationResult Result of the Joi validation
 * @param {string} errorMessage string to check for in the validation error
 */
const expectJoiValidationError = (validationResult, errorMessage) => {
  const hasError = validationResult.error.details.some(
    (detail) => detail.message === errorMessage,
  );
  expect(
    hasError,
    `Expected Validation Error ${errorMessage} to be present`,
  ).to.equal(true);
};

describe('Policy issue flow', function () {
  // Setup
  let quotePackage;
  let applicationPackage;

  // Quote hook
  describe('Quote hook', function () {
    it('should not pass validation', function () {
      const validationResult = validateQuoteRequest(quoteDataInvalid);

      expect(validationResult.error).to.not.equal(null);
      expect(validationResult.error)
        .to.have.property('details')
        .with.lengthOf(5, 'Expected number of Validation Errors');

      expectJoiValidationError(
        validationResult,
        '"cover_amount" must be larger than or equal to 1000000',
      );
      expectJoiValidationError(
        validationResult,
        '"health_checks_updated" must be a boolean',
      );
      expectJoiValidationError(
        validationResult,
        '"species" must be one of [Tyrannosaurus Rex, Stegosaurus, Velociraptor, Diplodocus, Iguanodon]',
      );
    });

    it('should pass validation', function () {
      const validationResult = validateQuoteRequest(quoteDataValid);
      expect(validationResult.error).to.equal(null);
    });

    it('should return a suggested premium of <R1458.00> (in cents)', function () {
      quotePackage = getQuote(quoteData0);
      expect(quotePackage[0].suggested_premium).to.equal(145800);
    });

    it('should return a suggested premium of <R1368.00> (in cents)', function () {
      quotePackage = getQuote(quoteData1);
      expect(quotePackage[0].suggested_premium).to.equal(136800);
    });

    it('should return a suggested premium of <R1372.80> (in cents)', function () {
      quotePackage = getQuote(quoteData2);
      expect(quotePackage[0].suggested_premium).to.equal(137280);
    });
  });

  // Application hook
  describe('Application hook', function () {
    it('should pass application data validation ', function () {
      const validationResult = validateApplicationRequest(
        applicationData,
        undefined,
        undefined,
      );
      expect(validationResult.error).to.equal(null);
    });
    it('should return the correct module data', function () {
      expect(applicationPackage.module.SOME_PROPERTY).to.equal(
        '<SOME_PROPERTY>',
      );
    });
  });

  // Policy issue hook
  describe('Policy issue hook', function () {
    it('should create a policy with the correct parameters', function () {
      const policy = getPolicy(applicationPackage, undefined, undefined);
      expect(policy.package_name).to.equal('<CORRECT PACKAGE NAME>');
      expect(policy.monthly_premium).to.equal(1234);
      expect(policy.sum_assured).to.equal(12345678);
    });
  });
});

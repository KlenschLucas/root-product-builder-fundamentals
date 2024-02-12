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
        .with.lengthOf(4, 'Expected number of Validation Errors');

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
    it('should not pass application data validation ', function () {
      const validationResult = validateApplicationRequest(
        applicationDataInvalid,
        undefined,
        undefined,
      );
      expect(validationResult.error).to.not.equal(null);

      expect(validationResult.error)
        .to.have.property('details')
        .with.lengthOf(3, 'Expected number of Validation Errors');

      expectJoiValidationError(
        validationResult,
        '"dinosaur_name" length must be less than or equal to 100 characters long',
      );
      expectJoiValidationError(
        validationResult,
        '"dinosaur_colour" must be one of [Lilac, Sea green, Granite grey, Midnight blue]',
      );
      expectJoiValidationError(
        validationResult,
        '"ndrn" must be less than or equal to 999999',
      );
    });

    it('should pass data validation ', () => {
      const validationResult = validateApplicationRequest(
        applicationData0,
        undefined,
        undefined,
      );
      expect(validationResult.error).to.equal(null);
    });

    it('should return the correct module data', () => {
      quotePackage = getQuote(quoteData0);
      applicationPackage = getApplication(
        applicationData0,
        undefined,
        // @ts-ignore
        quotePackage[0],
      );

      // application data contains the quote data
      expect(applicationPackage.module.cover_amount).to.equal(
        quoteData0.cover_amount,
      );
      expect(applicationPackage.module.start_date).to.equal(
        quoteData0.start_date,
      );
      expect(applicationPackage.module.birth_date).to.equal(
        quoteData0.birth_date,
      );
      expect(applicationPackage.module.species).to.equal(quoteData0.species);
      expect(applicationPackage.module.health_checks_updated).to.equal(
        quoteData0.health_checks_updated,
      );

      // application data contains the application data
      expect(applicationPackage.module.dinosaur_name).to.equal(
        applicationData0.dinosaur_name,
      );
      expect(applicationPackage.module.dinosaur_colour).to.equal(
        applicationData0.dinosaur_colour,
      );
      expect(applicationPackage.module.ndrn).to.equal(applicationData0.ndrn);
    });
  });

  // Policy issue hook
  describe('Policy issue hook', function () {
    it('should create a policy with the correct parameters', () => {
      quotePackage = getQuote(quoteData0);
      applicationPackage = getApplication(
        applicationData0,
        undefined,
        // @ts-ignore
        quotePackage[0],
      );
      // @ts-ignore
      const policy = getPolicy(applicationPackage, undefined, undefined);

      expect(policy.package_name).to.equal('DinoSure');
      expect(policy.monthly_premium).to.equal(
        quotePackage[0].suggested_premium,
      );
      expect(policy.sum_assured).to.equal(quotePackage[0].sum_assured);
      expect(policy.base_premium).to.equal(quotePackage[0].base_premium);
      expect(policy.end_date).to.equal(null);
    });
  });
});

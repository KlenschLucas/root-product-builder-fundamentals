/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

describe('Amendment alteration hook', function () {
  describe('Update cover amount alterations', () => {
    const alterationHookKey = 'update-cover';

    it('should pass validation', function () {
      const validationResult = validateAlterationPackageRequest({
        alteration_hook_key: alterationHookKey,
        data: validAlterationData,
        policy: undefined,
        policyholder: undefined,
      });
      expect(validationResult.error).to.equal(null);
    });

    it('should fail validation', function () {
      const validationResult = validateAlterationPackageRequest({
        alteration_hook_key: alterationHookKey,
        data: invalidAlterationData,
        policy: undefined,
        policyholder: undefined,
      });
      expectJoiValidationError(
        validationResult,
        '"cover_amount" must be larger than or equal to 1000000',
      );
    });

    it('should update the monthly_premium to "R1215.00" in cents', function () {
      const alterationPackage = getAlteration({
        alteration_hook_key: alterationHookKey,
        data: validAlterationData,
        // @ts-ignore
        policy: policy0,
        policyholder: undefined,
      });
      expect(alterationPackage.monthly_premium).to.equal(1215 * 100);
      expect(alterationPackage.sum_assured).to.equal(
        validAlterationData.cover_amount,
      );
      expect(alterationPackage.module.cover_amount).to.equal(
        validAlterationData.cover_amount,
      );
    });

    it('should update the monthly_premium to "R2052.00" in cents', function () {
      const alterationPackage = getAlteration({
        alteration_hook_key: alterationHookKey,
        data: validAlterationData,
        // @ts-ignore
        policy: policy1,
        policyholder: undefined,
      });
      expect(alterationPackage.monthly_premium).to.equal(2052 * 100);
      expect(alterationPackage.sum_assured).to.equal(
        validAlterationData.cover_amount,
      );
      expect(alterationPackage.module.cover_amount).to.equal(
        validAlterationData.cover_amount,
      );
    });
  });
});

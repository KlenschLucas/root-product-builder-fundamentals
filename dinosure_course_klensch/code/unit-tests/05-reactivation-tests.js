/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */

describe('Reactivation flow', () => {
  // Setup
  let reactivationOption;

  before(() => {
    // @ts-ignore
    reactivationOption = getReactivationOptions(reactivationPolicyCancelled)[0];
  });

  // Quote hook
  describe('Before reactivation', () => {
    it('should return an error because the policy is already active', () => {
      let error = null;
      try {
        beforePolicyReactivated({
          // @ts-ignore
          policy: reactivationPolicyActive,
          policyholder: null,
          reactivationOption: null,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.not.equal(null);
    });

    it('should return without error: lapsed policy', () => {
      let error = null;
      try {
        beforePolicyReactivated({
          // @ts-ignore
          policy: reactivationPolicyLapsed,
          policyholder: null,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);
    });

    it('should return without error: cancelled policy', () => {
      let error = null;
      try {
        beforePolicyReactivated({
          // @ts-ignore
          policy: reactivationPolicyCancelled,
          policyholder: null,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);
    });

    it('should return update_action with the reactivation date', () => {
      let error = null;
      let actions = null;
      try {
        actions = beforePolicyReactivated({
          // @ts-ignore
          policy: reactivationPolicyCancelled,
          policyholder: null,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);

      // test that the actions return with the update_policy action and the reactivation date
      expect(actions).to.not.equal(null);
      expect(actions[0]).to.not.equal(null);
      expect(actions[0].name).to.equal('update_policy');
      expect(actions[0].data.module.reactivation_date).to.not.equal(null);
    });
  });
});

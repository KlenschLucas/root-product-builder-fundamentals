// 06-scheduled-functions

/**
 * Executed on the schedule defined in `.root-config.json`.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy for which the scheduled function is running.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform.
 */
const applyAnnualIncrease = ({ policy, policyholder }) => {
  // policy younger than 1 year
  if (calculateAge(policy.start_date) < 1) {
    return;
  }

  const today = moment();

  // if today is 1 January
  if (today.month() === 0 && today.date() === 1) {
    // increase cover by R10 000
    const sumAssured = policy.sum_assured + 10000 * 100;

    // calculate new premium
    const newPremium = calculatePremium(
      policy.module.birth_date,
      sumAssured,
      policy.module.species,
      policy.module.health_checks_updated,
    );

    return [
      {
        name: 'update_policy',
        data: {
          monthlyPremium: newPremium,
          sumAssured: sumAssured,
          module: {
            ...policy.module,
            cover_amount: sumAssured,
          },
        },
      },
    ];
  }
};

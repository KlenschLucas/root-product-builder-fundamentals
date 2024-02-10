// 07-reactivation-flow

/**
 * Get the reactivation options for inactive policies.
 * @param {PlatformPolicy} policy The policy to be reactivated.
 * @return {ReactivationOption[]} One of these options must be selected whenever an inactive policy is reactivated.
 */
const getReactivationOptions = (policy) => {
  return [
    new ReactivationOption({
      type: 'reinstatement',
      description:
        'We will reinstate your policy and collect the outstanding premium from you.',
      minimumBalanceRequired: false,
      settlementAmount: 0,
    }),
  ];
};

/**
 * Executed before a policy is reactivated.
 * Can be used to prevent reactivation if certain conditions are not met.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy to be reactivated
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @param {ReactivationOption} params.reactivationOption The reactivation option selected
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform
 */
const beforePolicyReactivated = ({
  policy,
  policyholder,
  reactivationOption,
}) => {
  const { status } = policy;
  if (status !== 'cancelled' && status !== 'lapsed') {
    throw new Error(
      'This policy cannot be reactivated - it is not cancelled or lapsed status.',
    );
  }

  const updatedModuleData = {
    ...policy.module,
    reactivation_date: moment().format(),
  };

  return [
    {
      name: 'update_policy',
      data: {
        module: updatedModuleData,
      },
    },
  ];
};

describe('applyAnnualIncrease', () => {
  let originalDateNow;

  before(() => {
    // store original Date.now
    originalDateNow = Date.now;
  });

  after(() => {
    // restore original Date.now
    Date.now = originalDateNow;
  });

  it('should not trigger the function if policy is younger than 1 year old', () => {
    Date.now = () => new Date('2023-01-01').getTime();

    const result = applyAnnualIncrease({
      // @ts-ignore
      policy: schedulePolicy0,
    });
    expect(result).to.equal(undefined);
  });

  it('should not trigger the function if date is not 1st January', () => {
    Date.now = () => new Date('2023-01-02').getTime();

    const result = applyAnnualIncrease({
      // @ts-ignore
      policy: schedulePolicy0,
    });

    expect(result).to.equal(undefined);
  });

  it('should trigger the function if policy is older than 1 year old and date is 1st January', () => {
    Date.now = () => new Date('2023-01-01').getTime();

    const result = applyAnnualIncrease({
      // @ts-ignore
      policy: schedulePolicy1,
    });
    expect(result).to.not.equal(undefined);
  });

  it('should increase cover_amount to <R100000> and recalculate premium to <R1458.00>', () => {
    Date.now = () => new Date('2023-01-01').getTime();

    const result = applyAnnualIncrease({
      // @ts-ignore
      policy: schedulePolicy1,
    });

    expect(result).to.deep.equal([
      {
        name: 'update_policy',
        data: {
          sumAssured: 100000 * 100,
          monthlyPremium: 145800,
          module: {
            ...schedulePolicy1.module,
            cover_amount: 100000 * 100,
          }
        },
      },
    ]);
  });
});

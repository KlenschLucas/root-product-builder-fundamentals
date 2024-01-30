/**
 * Validates the quote request data.
 * @param {Record<string, any>} data The data received in the body of the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) request
 *     (without the `type` property).
 * @return {{error: any; result: any}} The [validation result](https://joi.dev/api/?v=12.1.0#validatevalue-schema-options-callback).
 *    If there are no errors, the `value` property will contain the validated data, which is passed to `getQuote`.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */
const validateQuoteRequest = (data) => {
  const today = moment().startOf('day');
  const minBirthDate = moment().subtract(50, 'years').startOf('day');
  const maxCoverStartDate = moment().add(60, 'days').endOf('day');

  const validationResult = Joi.validate(
    data,
    Joi.object()
      .keys({
        type: Joi.string().required(),
        start_date: Joi.date()
          .min(today.toDate())
          .max(maxCoverStartDate.toDate())
          .required(),
        cover_amount: Joi.number()
          .integer()
          .min(10000 * 100)
          .max(100000 * 100)
          .required(),
        birth_date: Joi.date()
          .min(minBirthDate.toDate())
          .max(today.toDate())
          .required(),
        species: Joi.valid([
          'Tyrannosaurus Rex',
          'Stegosaurus',
          'Velociraptor',
          'Diplodocus',
          'Iguanodon',
        ]).required(),
        health_checks_updated: Joi.boolean().required(),
      })
      .required(),
    { abortEarly: false },
  );
  return validationResult;
};

/**
 * Generates an array of quote packages from the quote request data.
 * @param {Record<string, any>} data The validated data returned by `validateQuoteRequest` as `result.value`.
 * @return {QuotePackage[]} The quote package(s) that will be returned by the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) endpoint.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */
const getQuote = (data) => {
  const { birth_date, cover_amount, species, health_checks_updated } = data;
  const premium = calculatePremium(birth_date, cover_amount, species, health_checks_updated);

  const quotePackage = new QuotePackage({
    // Below are standard fields for all products
    package_name: 'DinoSure', // The name of the "package" of cover
    sum_assured: cover_amount, // Set the total, aggregated cover amount
    base_premium: premium, // Should be an integer, cents
    suggested_premium: premium, // Should be an integer, cents
    billing_frequency: 'monthly', // Can be monthly or yearly
    module: {
      // Save any data, calculations, or results here for future re-use.
      ...data,
    },
    input_data: { ...data },
  });
  return [quotePackage];
};

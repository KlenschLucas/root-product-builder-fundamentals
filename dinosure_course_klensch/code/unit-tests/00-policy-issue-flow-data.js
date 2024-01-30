/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */

// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

/**
 * Invalid Quote Data
 */
const quoteDataInvalid = {
  start_date: moment().add(60, 'days').toDate(),
  cover_amount: 100 * 100,
  birth_date: moment().subtract(51, 'years').toDate(),
  species: 'Human',
  health_checks_updated: 'yes',
};

/**
 * Valid Quote Data - boundary values
 */
const quoteDataValid = {
  type: 'dinosure_klensch_ext_dev',
  start_date: moment().add(60, 'days').toDate(),
  cover_amount: 10000 * 100,
  birth_date: moment().subtract(50, 'years').toDate(),
  species: 'Tyrannosaurus Rex',
  health_checks_updated: true,
};

const quoteData0 = {
  type: 'dinosure_klensch_ext_dev',
  start_date: moment().add(1, 'days').toDate(),
  cover_amount: 90000 * 100,
  birth_date: moment().subtract(20, 'years').toDate(),
  species: 'Tyrannosaurus Rex',
  health_checks_updated: true,
};

const quoteData1 = {
  type: 'dinosure_klensch_ext_dev',
  start_date: moment().add(1, 'days').toDate(),
  cover_amount: 50000 * 100,
  birth_date: moment().subtract(36, 'years').toDate(),
  species: 'Velociraptor',
  health_checks_updated: true,
};

const quoteData2 = {
  type: 'dinosure_klensch_ext_dev',
  start_date: moment().add(1, 'days').toDate(),
  cover_amount: 65000 * 100,
  birth_date: moment().subtract(16, 'years').toDate(),
  species: 'Brachiosaurus',
  health_checks_updated: true,
};

};

// Example application data
const applicationData = {
  // app-data
};

/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

const validAlterationData = {
  cover_amount: 75000 * 100,
};

const invalidAlterationData = {
  cover_amount: 0,
};

const policy0 = {
  package_name: 'DinoSure',
  sum_assured: 9000000,
  base_premium: 145800,
  monthly_premium: 145800,
  start_date: moment(),
  end_date: null,
  module: {
    start_date: moment().toDate(),
    cover_amount: 9000000,
    birth_date: moment().subtract(20, 'years').toDate(),
    species: 'Tyrannosaurus Rex',
    health_checks_updated: true,
    dinosaur_name: 'James the Dinosaur',
    dinosaur_colour: 'Lilac',
    ndrn: '999999',
  },
};

const policy1 = {
  package_name: 'DinoSure',
  sum_assured: 5000000,
  base_premium: 145800,
  monthly_premium: 145800,
  start_date: moment(),
  end_date: null,
  module: {
    start_date: moment().toDate(),
    cover_amount: 5000000,
    birth_date: moment().subtract(36, 'years').toDate(),
    species: 'Velociraptor',
    health_checks_updated: true,
    dinosaur_name: 'Jake the Dino',
    dinosaur_colour: 'Lilac',
    ndrn: '199459',
  },
};

const schedulePolicy = {
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
const schedulePolicy0 = {
  ...schedulePolicy,
  start_date: moment('2022-12-01'),
};

const schedulePolicy1 = {
  ...schedulePolicy,
  start_date: moment('2020-12-01'),
};

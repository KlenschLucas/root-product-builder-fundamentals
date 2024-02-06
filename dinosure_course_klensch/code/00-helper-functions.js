// 00-helper-functions

// add helper functions here

/**
 * Calculates the age in years from a date
 * @param {string} date
 * @returns {number} Age in years
 */
const calculateAge = (date) => {
  return moment().diff(moment(date), 'years');
}

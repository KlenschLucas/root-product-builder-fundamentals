// 01-ratings.js

// add all rating tables, csv and calculation functions here

// Premium calculation function at the top

/**
 * Calculates the core premium in cents
 * @param {string} birthDate
 * @param {number} coverAmount Cover amount in cents
 * @returns {number}
 */
const calculateCorePremium = (birthDate, coverAmount) => {
  const age = calculateAge(birthDate);
  const corePremiumInRands = coverAmount * (0.01 * (age * 0.001));

  // convert to cents
  return corePremiumInRands * 100;
};

const calculateSpeciesAdjustment = (species) => {
  switch (species) {
    case 'Tyrannosaurus Rex':
      return 0.81;
    case 'Stegosaurus':
      return 1.19;
    case 'Velociraptor':
      return 0.76;
    case 'Brachiosaurus':
      return 1.32;
    case 'Iguanodon':
      return 1.07;
    default:
      return 1;
  }
};

/**
 * Calculates the Monthly Premium in cents
 * @param {string} birthDate
 * @param {number} coverAmount
 * @param {string} species
 * @param {boolean} isHealthChecksUpdated
 * @returns {number}
 */
const calculatePremium = (
  birthDate,
  coverAmount,
  species,
  isHealthChecksUpdated,
) => {
  const corePremium = calculateCorePremium(birthDate, coverAmount);
  const premium = calculateSpeciesAdjustment(species) * corePremium;

  // if health checks are not updated, add R250
  if (!isHealthChecksUpdated) {
    return premium + 250 * 100;
  }
  return premium;
};

// Tables and ratings below

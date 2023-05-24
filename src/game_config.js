export const exploringResourcesLimit = { Air: 2, Food: 0, Energy: 2 }; // minimum number of resources to start exploring
export const materialsGatheringIncrement = [0, 1, 1, 2, 2, 3]; // distribution of increments with equal probability
export const resourcesGainingIncrement = [0, 1, 1, 1, 2, 2, 2, 3, 3, 4]; // distribution of increments with equal probability
export const exploringCost = {
  Walk: {
    Air: -1,
    Energy: -2,
  },
  Search: {
    Air: -1,
    Energy: -1,
  },
};
export const logPage = 20; // length of the page

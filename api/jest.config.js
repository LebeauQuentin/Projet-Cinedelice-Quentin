// configuration de jest pour les tests unitaires -> sources chatGPT
export default {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [],
  resolver: undefined
};
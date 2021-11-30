module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
};
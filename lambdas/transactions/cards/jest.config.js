const base = require('../../../jest.config');
const tsconfig = require("../../../tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    ...base,
    rootDir: '../../../',
    globalSetup: '<rootDir>/lambdas/transactions/cards/test/loader.js',
    moduleNameMapper
}
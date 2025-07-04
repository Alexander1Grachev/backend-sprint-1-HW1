const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100000, //от этой ошибки! -> thrown: "Exceeded timeout of 5000 ms for a test.
    testRegex: '.e2e.test.ts$', //<-- чтобы запускались только файлы с расширением ".e2e.test.ts"
}
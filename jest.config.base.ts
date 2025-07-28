import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/**/__tests__/?(*.)(spec|test).(t)s?(x)'],
  transformIgnorePatterns: ['[/\\\\](node_modules)[/\\\\].+\\.(js|mjs|ts)$'],
  modulePaths: ['<rootDir>/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'd.ts'],
  verbose: true,
};

export default config;

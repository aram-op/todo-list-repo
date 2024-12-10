import type {Config} from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    clearMocks: true,

    collectCoverage: true,

    coverageDirectory: 'coverage',

    preset: 'ts-jest',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
};

export default createJestConfig(config);

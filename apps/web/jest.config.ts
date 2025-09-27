import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	// Add more setup options before each test is run
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	preset: "ts-jest",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		// Mock ESM packages
		"^use-key-match$": "<rootDir>/__mocks__/use-key-match.js",
		"^next-auth$": "<rootDir>/__mocks__/next-auth.js",
		"^@auth/core$": "<rootDir>/__mocks__/@auth-core.js",
		"^motion$": "<rootDir>/__mocks__/motion.js",
	},
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);

module.exports = {
  testEnvironment: "jest-environment-jsdom-sixteen",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx?|jsx?)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: ["src/App.jsx", "src/**/*.{jsx,ts,tsx}"],
  transformIgnorePatterns: [`node_modules/(?!ky)`],
  clearMocks: true,
};

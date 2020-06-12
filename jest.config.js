module.exports = {
  testEnvironment: "jest-environment-jsdom-sixteen",
  roots: ["<rootDir>/src"],
  testRegex: "(/__TESTS__/.*|(\\.|/)(test|spec))(?<!\\.d)\\.jsx?$",
  transform: {
    "^.+\\.(tsx?|jsx?)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: ["src/*.{jsx,js}"],
  transformIgnorePatterns: [`node_modules/(?!ky)`],
  clearMocks: true,
};

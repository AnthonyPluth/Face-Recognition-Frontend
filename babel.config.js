
const instrumentForCodeCoverage = process.env.CYPRESS_ENV;

/**
 * Used by e2e tests. Instruments the code to expose coverage
 * info to the browser
 */
const istanbulPlugin = [
  'istanbul',
  {
    include: ["src/**/*.{js,jsx}"],
    exclude: ["**/*.spec.{js,jsx}"],
  },
];

module.exports = {
  presets: ["react-app"],
  plugins: ["transform-class-properties",
    ...(instrumentForCodeCoverage ? [istanbulPlugin] : []),
  ],
};

module.exports = (api) => {
  if (api.cache.using(() => process.env.CYPRESS_ENV)) {
    return {
      plugins: [
        [
          "istanbul",
          {
            include: ["src/**/*.{js,jsx}"],
            exclude: ["**/*.spec.{js,jsx}"]
          }
        ]
      ]
    };
  }
  return {
    presets: ["react-app"],
    plugins: ["transform-class-properties"]
  };
};

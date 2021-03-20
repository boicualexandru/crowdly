module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@components": "./common/components",
            "@models": "./common/models",
            "@theme": "./common/theme",
          },
        },
      ],
    ],
  };
};

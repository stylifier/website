const path = require('path');

module.exports = function(storybookBaseConfig, configType) {
  storybookBaseConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ["style", "css", "sass"],
    include: path.resolve(__dirname, '../styles'),
  });
  
  return storybookBaseConfig;
};
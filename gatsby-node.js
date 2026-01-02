/* eslint-disable @typescript-eslint/no-require-imports */

'use strict'

require('source-map-support').install()
require('ts-node').register()

exports.createSchemaCustomization =
  require('./config/createSchemaCustomization').createSchemaCustomization
exports.createPages = require('./config/createPages').createPages

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  const config = getConfig()

  // Remove ESLint webpack plugin to avoid ESLint 9 compatibility issues
  if (config.plugins) {
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin',
    )
  }

  actions.replaceWebpackConfig(config)
}

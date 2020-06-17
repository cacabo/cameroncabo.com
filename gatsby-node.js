'use strict'

require('source-map-support').install()
require('ts-node').register()

exports.createSchemaCustomization = require('./config/createSchemaCustomization').createSchemaCustomization
exports.createPages = require('./config/createPages').createPages

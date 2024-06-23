const common = require('./components/common.js');
const git = require('./components/git.js');
const sfdx = require('./components/sfdx.js');

module.exports = Object.assign({}, common, git, sfdx);
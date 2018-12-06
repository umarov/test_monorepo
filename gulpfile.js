const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readdir } = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

const baseOutput = chalk.yellow.bold('[test_monorepo]')

function buildApp (app) {
  return exec(`cd ${path.resolve(__dirname, 'app', app)} && npm run build`)
}

async function buildApps () {
  const apps = await readdir(path.resolve(__dirname, 'app'))

  await Promise.all(apps.map(async app => {
    console.log(`${baseOutput} ${chalk.cyan(`Building ${app}`)}`);

    await buildApp(app)

    console.log(`${baseOutput} ${chalk.green(`Finished building ${app}`)}`);
  }))
}

exports.build = buildApps
exports.default = buildApps

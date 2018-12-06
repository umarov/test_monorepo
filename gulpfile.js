const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readdir } = require('fs').promises;
const path = require('path');
const chalk = require('chalk');


async function buildApps () {
  const apps = await readdir(path.resolve(__dirname, 'app'))
  await Promise.all(apps.map(async app => {
    console.log(`${chalk.yellow.bold('[test-monorepo]')} ${chalk.cyan(`Building ${app}`)}`);
    await exec(`cd ${path.resolve(__dirname, 'app', app)} && npm run build`)
    console.log(`${chalk.yellow.bold('[test-monorepo]')} ${chalk.green(`Finished building ${app}`)}`);
  }))
}

exports.build = buildApps
exports.default = buildApps

#!/usr/bin/env node
const spawn = require('child_process').spawn;
const join = require('path').join;

function cli(args) {
  let eslintArgs;
  if (args.indexOf('--react') < 0) {
    eslintArgs = ['-c', join(__dirname, '.eslintrc.js'), ...args];
  } else {
    args.splice(args.indexOf('--react'), 1);
    eslintArgs = ['-c', join(__dirname, '.eslintrc.react.js'), ...args];
  }
  const proc = spawn('eslint', eslintArgs, {
    stdio: ['inherit','inherit','inherit']
  });
  proc.on('close', code => process.exit(code));
  proc.on('error', err => err && console.error(err)); // eslint-disable-line no-console
}

cli(process.argv.slice(2));

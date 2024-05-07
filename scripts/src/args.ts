import yargs from 'yargs';

export const args = yargs
  .option('env', {
    alias: 'e',
    default: '',
    description: 'Environment',
    type: 'string',
  })
  .option('deleteInstalledChannel', {
    alias: 'u',
    default: true,
    description: 'Uninstall build',
    type: 'boolean',
  })
  .option('install', {
    alias: 'i',
    default: false,
    description: 'Publish to device',
    type: 'boolean',
  })
  .option('retainStagingFolder', {
    alias: 'keep',
    default: false,
    description: 'Keep staging folder',
    type: 'boolean',
  })
  .option('zip', {
    alias: 'z',
    default: true,
    description: 'Zip stage folder',
    type: 'boolean',
  })
  .parseSync();

export const { env, install, retainStagingFolder, zip } = args;

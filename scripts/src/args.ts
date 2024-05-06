import yargs from 'yargs';

export const args = yargs
  .option('env', {
    alias: 'e',
    default: '',
    description: 'Environment',
    type: 'string',
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

export const { env, retainStagingFolder, zip } = args;

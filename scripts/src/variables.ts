import 'dotenv/config';
import { args } from './args';

export const {
  deleteInstalledChannel,
  env,
  install,
  retainStagingFolder,
  zip,
} = args;
export const { host, password } = process.env;
export const [outDir, stagingDir] = ['out/', `out/${env.toUpperCase()}`];
export let outFile: string = `app-${env}.zip`;

export enum States {
  'isCopied' = 'copied',
  'isDefault' = 'default',
  'isError' = 'error',
  'isPublished' = 'deployed',
  'isUpdated' = 'updated',
  'isZipped' = 'zipped',
}

export const files = [
  'assets/**/*.*',
  'components/**/*.*',
  'images/**/*.*',
  'manifest',
  'source/**/*.*',
];

export const isStateFailed = (state: States): boolean =>
  state === States.isError;

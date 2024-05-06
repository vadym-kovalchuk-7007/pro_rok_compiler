import 'dotenv/config';
import { args } from './args';

export const { env, retainStagingFolder, zip } = args;
export const { host, password } = process.env;
export const [outDir, stagingDir] = ['out/', `out/${env.toUpperCase()}`];
export let outFile: string = `app-${env}.zip`;

export enum States {
  'isCopied' = 'copied',
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

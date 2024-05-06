import {
  States,
  files,
  host,
  outDir,
  outFile,
  password,
  retainStagingFolder,
  stagingDir,
} from './variables';

import { rokuDeploy } from 'roku-deploy';
import { updateManifest } from './upd-manifest';

export const prepublishFiles = (): Promise<string | never> =>
  rokuDeploy
    .prepublishToStaging({
      stagingDir,
      files,
    })
    .then(prepublished, rejected);

export const zipFiles = (): Promise<string | never> =>
  rokuDeploy
    .zipPackage({
      outDir,
      outFile,
      retainStagingFolder,
      stagingDir,
    })
    .then(zipped, rejected);

export const publish = (): Promise<string | never> =>
  rokuDeploy
    .publish({
      host,
      password,
      outDir,
      outFile,
    })
    .then(published, rejected);

async function prepublished(): Promise<string> {
  return await updateManifest()
    .then(() => States.isCopied)
    .catch((err: string) => err);
}
const zipped = () => `${outFile} ${States.isZipped}`;

const published = () => States.isPublished;

const rejected = (error: string) => {
  throw new Error(error);
};

import { rokuDeploy } from 'roku-deploy';
import { updateManifest } from './upd-manifest';
import {
  deleteInstalledChannel,
  files,
  host,
  outDir,
  outFile,
  password,
  retainStagingFolder,
  stagingDir,
  States,
} from './variables';

export type TPromise = Promise<States>;

export const prepublishFiles = (): TPromise =>
  rokuDeploy
    .prepublishToStaging({
      stagingDir,
      files,
    })
    .then(prepublished, rejected);

export const zipFiles = (): TPromise =>
  rokuDeploy
    .zipPackage({
      outDir,
      outFile,
      retainStagingFolder,
      stagingDir,
    })
    .then(zipped, rejected);

export const publish = (): TPromise =>
  rokuDeploy
    .publish({
      host,
      password,
      outDir,
      outFile,
      deleteInstalledChannel,
    })
    .then(published, rejected);

async function prepublished(): TPromise {
  return await updateManifest()
    .then(() => States.isCopied)
    .catch((err) => {
      console.log(err);
      return States.isError;
    });
}
const zipped = () => States.isZipped;

const published = () => States.isPublished;

const rejected = (error: string) => {
  console.log(error);
  return States.isError;
};

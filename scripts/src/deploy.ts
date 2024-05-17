import { rokuDeploy } from 'roku-deploy';
import UpdateManifest from './UpdateManifest';
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

export default class Deploy {
  static prepublishFiles = (): TPromise =>
    rokuDeploy
      .prepublishToStaging({
        files,
        stagingDir,
      })
      .then(this.prepublished, this.rejected);

  static zipFiles = (): TPromise =>
    rokuDeploy
      .zipPackage({
        outDir,
        outFile,
        retainStagingFolder,
        stagingDir,
      })
      .then(this.zipped, this.rejected);

  static publish = (): TPromise =>
    rokuDeploy
      .publish({
        deleteInstalledChannel,
        host,
        outDir,
        outFile,
        password,
      })
      .then(this.published, this.rejected);

  static prepublished = async (): TPromise => {
    return await UpdateManifest.update()
      .then(() => States.isCopied)
      .catch((err) => {
        console.log(err);
        return States.isError;
      });
  };

  private static zipped = (): States => States.isZipped;

  private static published = (): States => States.isPublished;

  private static rejected = (error: string): States => {
    console.log(error);
    return States.isError;
  };
}

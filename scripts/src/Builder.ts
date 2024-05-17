import { prepublishFiles, publish, TPromise, zipFiles } from './deploy';
import { install, isStateFailed, outFile, States, zip } from './variables';

export default class Builder {
  static FAIL_MESSAGE = 'Build failed';

  static async build(): Promise<States | void> {
    await this.prePublish();
    await this.zipping();
    await this.installing();
    console.log('done');
  }

  protected static buildFail = (): void => {
    console.log(this.FAIL_MESSAGE);
    process.exit(1);
  };

  private static prePublish = async (): TPromise => {
    let prePublished = (await prepublishFiles()) as States;
    if (isStateFailed(prePublished)) this.buildFail();
    console.log(prePublished);
    return prePublished;
  };

  private static zipping = async (): TPromise => {
    let zipped = States.isDefault;
    if (zip) {
      zipped = (await zipFiles()) as States;
      if (isStateFailed(zipped)) this.buildFail();
      console.log(`${outFile}:${zipped}`);
    }
    return zipped;
  };

  private static installing = async (): TPromise => {
    let published = States.isDefault;
    if (install) {
      published = (await publish()) as States;
      if (isStateFailed(published)) this.buildFail();
      console.log(published);
    }
    return published;
  };
}

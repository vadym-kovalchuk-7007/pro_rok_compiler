import { prepublishFiles, publish, TPromise, zipFiles } from './deploy';
import { install, isStateFailed, outFile, States, zip } from './variables';

const buildFail = (): void => {
  console.log('Build failed');
  process.exit(1);
};

const prePublish = async (): TPromise => {
  let prePublished = (await prepublishFiles()) as States;
  if (isStateFailed(prePublished)) buildFail();
  console.log(prePublished);
  return prePublished;
};

const zipping = async (): TPromise => {
  let zipped = States.isDefault;
  if (zip) {
    zipped = (await zipFiles()) as States;
    if (isStateFailed(zipped)) buildFail();
    console.log(`${outFile}:${zipped}`);
  }
  return zipped;
};

const installing = async (): TPromise => {
  let published = States.isDefault;
  if (install) {
    published = (await publish()) as States;
    if (isStateFailed(published)) buildFail();
    console.log(published);
  }
  return published;
};

async function build(): Promise<States | void> {
  await prePublish();
  await zipping();
  await installing();
  console.log('done');
}

build();

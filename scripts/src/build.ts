import { prepublishFiles, zipFiles } from './deploy';
import { States, zip } from './variables';

async function build(): Promise<string | void> {
  let published = await prepublishFiles();
  if (published === States.isError) process.exit(1);
  if (zip) await zipFiles();
}

build();

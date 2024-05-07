import { States, env, stagingDir } from './variables';

import fs from 'fs';
import path from 'path';
import { getProperties } from 'properties-file';

type TProperties = {
  [key: string]: string;
};

type TMProps = Set<string>;

export function updateManifest(): Promise<string> {
  const updManifest: Promise<string> = new Promise((resolve, reject) => {
    const manifest = getManifestFileName();
    try {
      if (!fs.existsSync(manifest)) {
        throw new Error(`Manifest file '${manifest}' not found`);
      }
      let props: TProperties = getProperties(fs.readFileSync(manifest));
      let mProps: TMProps = prepareNewProperties(props);
      fs.writeFileSync(manifest, [...mProps].sort().join('\n'));
      resolve(States.isUpdated);
    } catch (err) {
      reject(err);
    }
  });
  return updManifest;
}

const getManifestFileName = (): string => path.join(stagingDir, 'manifest');

const prepareNewProperties = (props: TProperties): TMProps => {
  props = Object.assign(props, { env });
  let mProps: TMProps = new Set();
  for (const [k, v] of Object.entries(props)) {
    mProps.add(`${k}=${v}`);
  }
  return mProps;
};

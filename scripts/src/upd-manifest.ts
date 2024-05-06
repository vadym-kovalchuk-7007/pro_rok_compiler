import { States, env, stagingDir } from './variables';

import fs from 'fs';
import path from 'path';
import { getProperties } from 'properties-file';

export function updateManifest(): Promise<string | never> {
  const updManifest: Promise<string> = new Promise((resolve, reject) => {
    const manifest = getManifestFileName();
    try {
      if (!fs.existsSync(manifest)) {
        throw new Error(`Manifest file '${manifest}' not found`);
      }
      let props: IProperties = getProperties(fs.readFileSync(manifest));
      let mProps: Set<string> = prepareNewProperties(props);
      fs.writeFileSync(manifest, [...mProps].sort().join('\n'));
      resolve(States.isUpdated);
    } catch (err) {
      console.log(err);
      reject(States.isError);
    }
  });
  return updManifest;
}

interface IProperties {
  [key: string]: string;
}

const getManifestFileName = (): string => path.join(stagingDir, 'manifest');

const prepareNewProperties = (props: IProperties): Set<string> => {
  props = Object.assign(props, { env });
  let mProps = new Set<string>();
  for (const [k, v] of Object.entries(props)) {
    mProps.add(`${k}=${v}`);
  }
  return mProps;
};

import { BlueprintManager, BlueprintContainer } from '@qsdt/common';
import * as fs from 'fs';

import { fsConfigPath } from './file-system-manager.config';

export class FileSystemBlueprintManager extends BlueprintManager {

  public async getBlueprint(name: string, task: string): Promise<BlueprintContainer> {
    if (!fs.existsSync(`${fsConfigPath}blueprint/${name}.json`)) {
      return Promise.reject(new Error(`500 Couldn't find a blueprint file at location: ${fsConfigPath}blueprint/${name}.json`));
    }
    let blueprintFile: Buffer = fs.readFileSync(`${fsConfigPath}blueprint/${name}.json`);
    return Promise.resolve(new BlueprintContainer(name, blueprintFile.toString(), task));
  }

  public async getBlueprintMaterial(blueprintName: string, materialLocation: string): Promise<string> {
    const location = `${fsConfigPath}blueprint-material/${blueprintName}/${materialLocation}`;
    if (!fs.existsSync(location)) {
      return Promise.reject(new Error(`500 Couldn't find a blueprint material file at location: ${location}`));
    }
    return Promise.resolve(fs.readFileSync(location).toString());
  }
}
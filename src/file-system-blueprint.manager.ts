import { BlueprintManager, BlueprintContainer } from '@qsdt/common';
import * as fs from 'fs';

import { fsConfigPath } from './file-system-manager.config';

export class FileSystemBlueprintManager extends BlueprintManager {

  public getBlueprint(name: string, task: string): BlueprintContainer {
    if (!fs.existsSync(`${fsConfigPath}blueprint/${name}.json`)) {
      throw new Error(`500 Couldn't find a blueprint file at location: ${fsConfigPath}blueprint/${name}.json`);
    }
    let blueprintFile: Buffer = fs.readFileSync(`${fsConfigPath}blueprint/${name}.json`);
    return new BlueprintContainer(name, blueprintFile.toString(), task);
  }

  public getBlueprintMaterial(blueprintName: string, materialLocation: string): string {
    const location = `${fsConfigPath}blueprint-material/${blueprintName}/${materialLocation}`;
    if (!fs.existsSync(location)) {
      throw new Error(`500 Couldn't find a blueprint material file at location: ${location}`);
    }
    return fs.readFileSync(location).toString()
  }
}
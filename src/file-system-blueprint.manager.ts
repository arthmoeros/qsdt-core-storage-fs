import { BlueprintManager, BlueprintContainer } from '@qsdt/common';
import * as yml from 'js-yaml';
import * as fs from 'fs';

import { fsConfigPath } from './file-system-manager.config';

export class FileSystemBlueprintManager extends BlueprintManager {

  public async getBlueprint(name: string, task: string): Promise<BlueprintContainer> {
    let blueprintFile: string;
    if (fs.existsSync(`${fsConfigPath}blueprint/${name}.yml`)) {
      blueprintFile = JSON.stringify(yml.safeLoad(fs.readFileSync(`${fsConfigPath}blueprint/${name}.yml`).toString()));
    }else{
      if (!fs.existsSync(`${fsConfigPath}blueprint/${name}.json`)) {
        return Promise.reject(new Error(`500 Couldn't find a blueprint file at location: ${fsConfigPath}blueprint/${name}.json`));
      }
      blueprintFile = fs.readFileSync(`${fsConfigPath}blueprint/${name}.json`).toString();
    }
    return Promise.resolve(new BlueprintContainer(name, blueprintFile, task));
  }

  public async getBlueprintMaterial(blueprintName: string, materialLocation: string): Promise<string> {
    const location = `${fsConfigPath}blueprint-material/${blueprintName}/${materialLocation}`;
    if (!fs.existsSync(location)) {
      return Promise.reject(new Error(`500 Couldn't find a blueprint material file at location: ${location}`));
    }
    return Promise.resolve(fs.readFileSync(location).toString());
  }
}
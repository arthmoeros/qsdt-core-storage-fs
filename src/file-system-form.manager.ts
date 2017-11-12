import { FormManager } from '@qsdt/common';
import * as fs from 'fs';

import { fsConfigPath } from './file-system-manager.config';

export class FileSystemFormManager extends FormManager {

  public async getFormsIndex(): Promise<string[]> {
    let configList: string[] = fs.readdirSync(fsConfigPath + "form/");
    let response: string[] = [];
    configList.forEach(config => {
      let jsonIndex: number = config.indexOf(".json");
      if (jsonIndex == -1) {
        return;
      }
      response.push(config.substring(0, jsonIndex));
    });
    return Promise.resolve(response);
  }

  public async getForm(name: string): Promise<string> {
    if (/[/\\]/.test(name)) {
      return Promise.reject(new Error("400 ID is invalid"));
    }
    if (!fs.existsSync(`${fsConfigPath}form/${name}.json`)) {
      return Promise.reject(new Error("404 Form Configuration does not exist"));
    }
    return Promise.resolve(fs.readFileSync(fsConfigPath + "form/" + name + ".json").toString());
  }

}
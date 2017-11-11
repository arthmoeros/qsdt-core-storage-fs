import * as fs from 'fs';
let setPath = `${(process.env.QSDT_FS_CONFIG_PATH || "./config")}/`;
if(!fs.existsSync(setPath)){
    throw new Error(`500 QSDT FS Config Path does not exists: ${setPath}`);
}
export const fsConfigPath = setPath;

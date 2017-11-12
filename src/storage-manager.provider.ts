import { FileSystemBlueprintManager } from "./file-system-blueprint.manager";
import { FileSystemFormManager } from "./file-system-form.manager"
import { BlueprintManager, FormManager } from '@qsdt/common';

export class StorageManagerProvider {

    public static getInstance(): StorageManagerProvider {
        return new StorageManagerProvider();
    }

    public getBlueprintManager(): BlueprintManager {
        return new FileSystemBlueprintManager();
    }

    public getFormManager(): FormManager {
        return new FileSystemFormManager();
    }

}
interface IWorkspaceContentSettings {
    photo: File;
    firstBlockText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryLocationLink: string;
}

export class WorkspaceContentSettings implements IWorkspaceContentSettings {
    photo: File;
    firstBlockText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryLocationLink: string;

    constructor(settings: IWorkspaceContentSettings = null) {
        if (!settings) {
            this.photo = null;
            this.firstBlockText = "";
            this.phone = "";
            this.address = "";
            this.deliveryTime = "";
            this.deliveryLocationLink = "";
        }
        else {
            this.photo = settings.photo;
            this.firstBlockText = settings.firstBlockText;
            this.phone = settings.phone;
            this.address = settings.address;
            this.deliveryTime = settings.deliveryTime;
            this.deliveryLocationLink = settings.deliveryLocationLink;
        }
    }
}

interface IContentConfig {
    firstPhotoUrl: string;
    firstText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryMapUrl: string;
}

export class ContentConfig implements IContentConfig {
    firstPhotoUrl: string;
    firstText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryMapUrl: string;

    constructor(config: IContentConfig = null) {
        if (!config) {
            this.firstPhotoUrl = "";
            this.firstText = "";
            this.phone = "";
            this.address = "";
            this.deliveryTime = "";
            this.deliveryMapUrl = "";
        }
        else {
            this.firstPhotoUrl = config.firstPhotoUrl;
            this.firstText = config.firstText;
            this.phone = config.phone;
            this.address = config.address;
            this.deliveryTime = config.deliveryTime;
            this.deliveryMapUrl = config.deliveryMapUrl;
        }
    }
}

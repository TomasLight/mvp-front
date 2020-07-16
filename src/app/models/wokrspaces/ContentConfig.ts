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

    constructor() {
        this.firstPhotoUrl = "";
        this.firstText = "";
        this.phone = "";
        this.address = "";
        this.deliveryTime = "";
        this.deliveryMapUrl = "";
    }
}

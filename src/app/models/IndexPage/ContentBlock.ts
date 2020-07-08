export interface IContentBlock {
    firstPhotoUrl: string;
    firstText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryMapUrl: string;
}

export class ContentBlock {
    public firstPhotoUrl: string;
    public firstText: string;
    public phone: string;
    public address: string;
    public deliveryTime: string;
    public deliveryMapUrl: string;

    constructor(block: IContentBlock = null) {
        if (!block) {
            this.firstPhotoUrl = "";
            this.firstText = "";
            this.phone = "";
            this.address = "";
            this.deliveryTime = "";
            this.deliveryMapUrl = "";
        }
        else {
            this.firstPhotoUrl = block.firstPhotoUrl;
            this.firstText = block.firstText;
            this.phone = block.phone;
            this.address = block.address;
            this.deliveryTime = block.deliveryTime;
            this.deliveryMapUrl = block.deliveryMapUrl;
        }
    }
}

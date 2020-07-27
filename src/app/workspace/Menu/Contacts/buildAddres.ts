import { Translate } from "@utils";

export function buildAddress(address: string, deliveryTime: string) {
    if (address && deliveryTime) {
        return Translate.getString(`${address}, доставка ${deliveryTime}`);
    }
    else if (address) {
        return Translate.getString(`${address}`);
    }

    return Translate.getString(`доставка ${deliveryTime}`);
}

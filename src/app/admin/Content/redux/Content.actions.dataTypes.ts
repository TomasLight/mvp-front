import { IContactSettingsFormValues } from "@admin/Content/models";
import { Dispatch } from "redux";

export interface IOnChangeAddressData {
    address: string;
}

export interface IOnChangeDeliveryLocationLinkData {
    link: string;
}

export interface IOnChangeDeliveryTimeData {
    time: string;
}

export interface IOnChangeFirstBlockTextData {
    text: string;
}

export interface IOnChangePhoneData {
    phone: string;
}

export interface IOnChangePhotoData {
    photoFile: File;
    dispatch: Dispatch;
}

export interface ISubmitData {
    formValues: IContactSettingsFormValues;
}

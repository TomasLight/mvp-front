export interface INewLandingConfigRequestDto {
    domainName: string;
    menuId?: string;
    siteConfig: {
        name: string,
        faviconUrl: string,
        opengraphImage?: string,
        opengraphImageExtension ?: string,
        opengraphImageTitle: string,
        color: string
    };
    iikoConfig: {};
    contentConfig: {
        firstPhoto?: string,
        firstText: string,
        phone: string,
        address: string,
        deliveryTime: string,
        deliveryMapUrl: string
    };
}

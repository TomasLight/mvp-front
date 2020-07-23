export interface INewLandingConfigResponseDto {
    id: string;
    workspaceId: string;
    menuId: string;
    siteConfig: {
        name: string,
        faviconUrl: string,
        opengraphImageUrl: string,
        opengraphImageTitle: string,
        color: string,
    };
    iikoConfig: {};
    contentConfig: {
        firstPhotoUrl: string,
        firstText: string,
        phone: string,
        address: string,
        deliveryTime: string,
        deliveryMapUrl: string,
    };
}

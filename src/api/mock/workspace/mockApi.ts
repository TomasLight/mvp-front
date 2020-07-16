import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_WORKSPACES).test(url) && method === "GET") {
        return [ {
            "role": "owner",
            "id": "7f4401ed-83d8-4080-866c-8bae566b0880",
            "domainName": "shaurma-zbs",
            "name": "Сеть шаурмяшен у дома"
        } ];
    }

    if (UrlRegExp.build(process.env.API_CREATE_WORKSPACE).test(url) && method === "POST") {
        return "some-guid";
    }

    if (UrlRegExp.build(process.env.API_GET_LANDING_CONFIG).test(url) && method === "GET") {
        return {
            "id": "955be38a-59d9-46bd-8161-757497c329a1",
            "workspaceId": "7f4401ed-83d8-4080-866c-8bae566b0880",
            "menuId": "ac7f7cd5-76f7-4d63-a301-096e226ffe04",
            "siteConfig": {
                "name": "Шаурма ZBS",
                "faviconUrl": "/images/favicons/avocado.svg",
                "opengraphImageUrl": "/images/image_001.png",
                "opengraphImageTitle": "Vk постик",
                "color": "#39C975"
            },
            "iikoConfig": {},
            "contentConfig": {
                "firstPhotoUrl": "/images/image_001.png",
                "firstText": "Шаурма First Text",
                "phone": "004",
                "address": "СПБ",
                "deliveryTime": "40 минут",
                "deliveryMapUrl": null
            }
        };
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_SITE_SETTINGS).test(url) && method === "PATCH") {
        return undefined;
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_DATA_SETTINGS).test(url) && method === "PATCH") {
        return undefined;
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS).test(url) && method === "PATCH") {
        return {
            url: "new-workspace.bizarre.rest",
        };
    }

    throw new Error(`Invalid (${url}) with ${method} method for WORKSPACE ${nameof(mockApi)}`);
}

export { mockApi };

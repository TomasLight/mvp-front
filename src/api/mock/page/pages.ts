import { IPagesDto } from "@api/models/page/responses";

const pages: IPagesDto = {
    index: {
        layout: "demo",
        alias: "",
        blocks: [
            {
                type: "site",
                props: {
                    title: "Шаурма ZBS",
                    keywords: "в конфиге не хватает keywords",
                    description: "в конфиге не хватает demo description",
                    favicon: "/images/skull-favicon.ico",
                    opengraphImageTitle: null,
                    opengraphImageUrl: null,
                    styleColor: "#ED6E33",
                },
            },
            {
                type: "menu",
                props: {
                    menuId: "ac7f7cd5-76f7-4d63-a301-096e226ffe04",
                },
            },
            {
                type: "content",
                props: {
                    firstPhotoUrl: null,
                    firstText: "Шаурма First Text",
                    phone: "004",
                    address: "СПБ",
                    deliveryTime: "40 минут",
                    deliveryMapUrl: null,
                },
            },
        ],
    },
};

export { pages };

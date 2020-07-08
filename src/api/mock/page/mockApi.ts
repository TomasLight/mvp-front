import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

import { pages } from "./pages";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_PAGES).test(url)) {
        return pages;
    }

    throw new Error(`Invalid (${url}) with ${method} method for PAGE ${nameof(mockApi)}`);
}

export { mockApi };

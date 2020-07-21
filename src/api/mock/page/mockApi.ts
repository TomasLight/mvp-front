import { MockStorage } from "@api/mock/MockStorage";
import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_PAGES).test(url)) {
        return MockStorage.pages.list();
    }

    throw new Error(`Invalid (${url}) with ${method} method for PAGE ${nameof(mockApi)}`);
}

export { mockApi };

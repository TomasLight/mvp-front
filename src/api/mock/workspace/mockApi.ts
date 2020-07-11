import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";


function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_POST_WORKSPACE_SETTINGS).test(url) && method === "POST") {
        return undefined;
    }

    throw new Error(`Invalid (${url}) with ${method} method for WORKSPACE ${nameof(mockApi)}`);
}

export { mockApi };

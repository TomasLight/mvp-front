import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";


function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_POST_WORKSPACE_SITE_SETTINGS).test(url) && method === "POST") {
        return undefined;
    }

    if (UrlRegExp.build(process.env.API_POST_WORKSPACE_CONTENT_SETTINGS).test(url) && method === "POST") {
        return {
            url: "new-workspace.bizarre.rest",
        };
    }

    throw new Error(`Invalid (${url}) with ${method} method for WORKSPACE ${nameof(mockApi)}`);
}

export { mockApi };

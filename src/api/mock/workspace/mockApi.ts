import { MockStorage } from "@api/mock/MockStorage";
import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_WORKSPACES).test(url) && method === "GET") {
        return MockStorage.workspace.list();
    }

    if (UrlRegExp.build(process.env.API_CREATE_WORKSPACE).test(url) && method === "POST") {
        return MockStorage.workspace.create(data);
    }

    if (UrlRegExp.build(process.env.API_GET_LANDING_CONFIG).test(url) && method === "GET") {
        return MockStorage.landingConfig.get();
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_SITE_SETTINGS).test(url) && method === "PATCH") {
        return MockStorage.landingConfig.updateSite(data);
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_DATA_SETTINGS).test(url) && method === "PATCH") {
        return MockStorage.landingConfig.updateData(data);
    }

    if (UrlRegExp.build(process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS).test(url) && method === "PATCH") {
        return MockStorage.landingConfig.updateContent(data);
    }

    throw new Error(`Invalid (${url}) with ${method} method for WORKSPACE ${nameof(mockApi)}`);
}

export { mockApi };

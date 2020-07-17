import { MockStorage } from "@api/mock/MockStorage";
import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_AUTHORIZED_USER_URL).test(url)) {
        return MockStorage.user.get();
    }

    throw new Error(`Invalid (${url}) with ${method} method for USER ${nameof(mockApi)}`);
}

export { mockApi };

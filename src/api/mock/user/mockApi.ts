import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

import { authorizedUserDto } from "./authorizedUser";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_AUTHORIZED_USER_URL).test(url)) {
        return authorizedUserDto;
    }

    throw new Error(`Invalid (${url}) with ${method} method for USER ${nameof(mockApi)}`);
}

export { mockApi };

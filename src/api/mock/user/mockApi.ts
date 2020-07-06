import { IAuthorizedUserDto } from "@api/models/user/responses";

import { authorizedUserDto } from "./authorizedUser";

function mockApi(url, method, data) {
    switch (url) {
        case process.env.CHECK_USER_AUTHORIZATION_URL:
            return getAuthorizedUserDto();
    }

    throw new Error(`Invalid ${nameof(url)} for ${nameof(mockApi)}`);
}

function getAuthorizedUserDto(): IAuthorizedUserDto {
    return authorizedUserDto;
}

export { mockApi };

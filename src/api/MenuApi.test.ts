import { expect, test } from "@jest/globals";
import "isomorphic-fetch";

import { Dish } from "@pos/Menu/models";
import { configureMapper } from "@pos/config/mapper/configureMapper";
import { ApiBaseMock } from "@utils/api/ApiBase.mock";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";

import { MenuApi } from "./MenuApi";

beforeAll(() => {
    configureMapper();
});

beforeEach(() => {
    Object.setPrototypeOf(MenuApi, ApiBaseMock);
});

test("__API__ MenuApi getDishes", () => {
    return MenuApi.getDishes().then((response: ApiResponse<Dish[]>) => {
        expect(response.statusCode === ApiResponseStatus.Ok);
        expect(response.data).not.toBeNull();
        expect(response.data.length).toBeGreaterThan(0);
    });
});

import frisby, { Joi } from "frisby";

import { IAuthorizedUserDto } from "@api/models/user/responses";
import { ApiTest } from "@api/ApiTest";
import { ApiResponseStatus } from "@utils/api";

describe("get authorized user", () => {
    const requestUrl = ApiTest.url(process.env.API_GET_AUTHORIZED_USER_URL);

    it("unauthorized response", async done => {
        frisby
            .get(requestUrl)
            .expect("status", ApiResponseStatus.Unauthorized)
            .done(done)
        ;
    });

    test("validate dto", async done => {
        frisby
            .fetch(requestUrl, ApiTest.options("GET", true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.object({
                [nameof<IAuthorizedUserDto>(o => o.id)]: Joi.string().required(),
                [nameof<IAuthorizedUserDto>(o => o.email)]: Joi.string().required(),
                [nameof<IAuthorizedUserDto>(o => o.role)]: Joi.string().allow(null).required(),
                [nameof<IAuthorizedUserDto>(o => o.firstName)]: Joi.string().required(),
                [nameof<IAuthorizedUserDto>(o => o.lastName)]: Joi.string().required(),
                [nameof<IAuthorizedUserDto>(o => o.patronymic)]: Joi.string().allow(null).required(),
            }))
            .done(done)
        ;
    });
});

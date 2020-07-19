import frisby, { Joi } from "frisby";

import { ICategoryDto, IMenuDto, IMenuItemDto } from "@api/models/menu/responses";
import { ApiTest } from "@api/ApiTest";
import { ApiResponseStatus, urlWithIds } from "@utils/api";

describe("get menu", () => {
    const menuId = process.env.TEST_MENU_ID;
    const url = urlWithIds(process.env.API_GET_MENU, { menuId });
    const requestUrl = ApiTest.tenantUrl(url);

    test("validate dto", async done => {
        const CategorySchema = Joi.object({
            [nameof<ICategoryDto>(o => o.id)]: Joi.string().required(),
            [nameof<ICategoryDto>(o => o.menuId)]: Joi.string().required(),
            [nameof<ICategoryDto>(o => o.items)]: Joi.array().items(Joi.string()).required(),
            [nameof<ICategoryDto>(o => o.created)]: Joi.string().required(),
            [nameof<ICategoryDto>(o => o.name)]: Joi.string().required(),
        });

        frisby
            .fetch(requestUrl, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.object({
                [nameof<IMenuDto>(o => o.id)]: Joi.string().required(),
                [nameof<IMenuDto>(o => o.workspaceId)]: Joi.string().required(),
                [nameof<IMenuDto>(o => o.restaurants)]: Joi.array().items(Joi.string()).required(),
                [nameof<IMenuDto>(o => o.created)]: Joi.string().required(),
                [nameof<IMenuDto>(o => o.categories)]: Joi.array().items(CategorySchema).required(),
                [nameof<IMenuDto>(o => o.name)]: Joi.string().required(),
            }))
            .done(done)
        ;
    });
});

describe("get dishes", () => {
    const requestUrl = ApiTest.tenantUrl(process.env.API_GET_MENU_ITEMS);

    test("validate dto", async done => {
        frisby
            .fetch(requestUrl, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.array().items(Joi.object({
                [nameof<IMenuItemDto>(o => o.id)]: Joi.string().required(),
                [nameof<IMenuItemDto>(o => o.workspaceId)]: Joi.string().required(),
                [nameof<IMenuItemDto>(o => o.created)]: Joi.string().required(),
                [nameof<IMenuItemDto>(o => o.products)]: Joi.array().items(Joi.string()).required(),
                [nameof<IMenuItemDto>(o => o.name)]: Joi.string().required(),
                [nameof<IMenuItemDto>(o => o.description)]: Joi.string().required(),
                [nameof<IMenuItemDto>(o => o.price)]: Joi.number().required(),
                [nameof<IMenuItemDto>(o => o.imageUrl)]: Joi.string().allow(null).required(),
            })).required())
            .done(done)
        ;
    });
});

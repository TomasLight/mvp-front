import frisby, { Joi } from "frisby";

import {
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import { ILandingConfigDto, IUserWorkspaceDto } from "@api/models/workspace/responses";
import { ApiTest } from "@api/ApiTest";
import { ApiResponseStatus, urlWithIds } from "@utils/api";
import { TestsFileHelper } from "../../tests/TestsFileHelper";

describe("get wokrspaces", () => {
    const requestUrl = ApiTest.tenantUrl(process.env.API_GET_WORKSPACES);

    test("validate dto", async done => {
        frisby
            .fetch(requestUrl, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.array().items(Joi.object({
                [nameof<IUserWorkspaceDto>(o => o.role)]: Joi.string().required(),
                [nameof<IUserWorkspaceDto>(o => o.id)]: Joi.string().required(),
                [nameof<IUserWorkspaceDto>(o => o.domainName)]: Joi.string().required(),
                [nameof<IUserWorkspaceDto>(o => o.name)]: Joi.string().required(),
            })).required())
            .done(done)
        ;
    });
});

const SiteConfigSchema = Joi.object({
    [nameof<IWorkspaceSiteSettingsDto>(o => o.name)]: Joi.string().required(),
    [nameof<IWorkspaceSiteSettingsDto>(o => o.faviconUrl)]: Joi.string().allow(null),
    [nameof<IWorkspaceSiteSettingsDto>(o => o.opengraphImageUrl)]: Joi.string().allow(null),
    [nameof<IWorkspaceSiteSettingsDto>(o => o.opengraphImageTitle)]: Joi.string().allow(null),
    [nameof<IWorkspaceSiteSettingsDto>(o => o.color)]: Joi.string().required(),
});

const IikoConfigSchema = Joi.object({
    [nameof<IWorkspaceDataSettingsDto>(o => o.archive)]: Joi.string().optional(),
});

const ContentConfigSchema = Joi.object({
    [nameof<IWorkspaceContentSettingsDto>(o => o.firstPhotoUrl)]: Joi.string().allow(null),
    [nameof<IWorkspaceContentSettingsDto>(o => o.firstText)]: Joi.string().required(),
    [nameof<IWorkspaceContentSettingsDto>(o => o.phone)]: Joi.string().required(),
    [nameof<IWorkspaceContentSettingsDto>(o => o.address)]: Joi.string().required(),
    [nameof<IWorkspaceContentSettingsDto>(o => o.deliveryTime)]: Joi.string().required(),
    [nameof<IWorkspaceContentSettingsDto>(o => o.deliveryMapUrl)]: Joi.string().allow(null),
});

describe("get landing config", () => {
    const requestUrl = ApiTest.tenantUrl(process.env.API_GET_LANDING_CONFIG);

    test("validate dto", async done => {
        frisby
            .fetch(requestUrl, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.object({
                [nameof<ILandingConfigDto>(o => o.id)]: Joi.string().required(),
                [nameof<ILandingConfigDto>(o => o.workspaceId)]: Joi.string().required(),
                [nameof<ILandingConfigDto>(o => o.menuId)]: Joi.string().required(),
                [nameof<ILandingConfigDto>(o => o.siteConfig)]: SiteConfigSchema.required(),
                [nameof<ILandingConfigDto>(o => o.iikoConfig)]: IikoConfigSchema.required(),
                [nameof<ILandingConfigDto>(o => o.contentConfig)]: ContentConfigSchema.required(),
            }).required())
            .done(done)
        ;
    });
});

describe("update site config", () => {
    test("validate dto", async done => {
        const original: { landingConfig: ILandingConfigDto } = {
            landingConfig: null,
        };
        const updated: { landingConfig: ILandingConfigDto } = {
            landingConfig: null,
        };

        const loadLanding = (callback: (dto: ILandingConfigDto) => void) => {
            const url = ApiTest.tenantUrl(process.env.API_GET_LANDING_CONFIG);
            frisby
                .fetch(url, ApiTest.options("GET", true, true))
                .expect("status", ApiResponseStatus.Ok)
                .then(response => {
                    callback(response.json);
                });
        };

        const updateConfig = (dto: IWorkspaceSiteSettingsDto, callback: () => void) => {
            const url = urlWithIds(
                process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
                {
                    workspaceId: original.landingConfig.workspaceId,
                    landingConfigId: original.landingConfig.id,
                }
            );
            const requestUrl = ApiTest.tenantUrl(url);

            const options: RequestInit = ApiTest.options("POST", true, true);
            options.body = JSON.stringify(dto);

            frisby
                .fetch(requestUrl, options)
                .expect("status", ApiResponseStatus.NoContent)
                .then(response => {
                    callback();
                })
            ;
        };

        const newConfig: IWorkspaceSiteSettingsDto = {
            name: "api test",
            color: "#000",
            faviconUrl: "/images/favicons/avocado.svg",
            opengraphImageUrl: TestsFileHelper.getImageBase64ForTests(),
            // opengraphImageUrl: "",
            opengraphImageTitle: "vk post",
        };
        console.log(newConfig.opengraphImageUrl);

        loadLanding(originalLanding => {
            original.landingConfig = originalLanding;

            updateConfig(newConfig, () => {
                loadLanding(updatedLanding => {
                    updated.landingConfig = updatedLanding;
                    const updatedConfig = updatedLanding.siteConfig;

                    expect(updatedLanding.id).toBe(original.landingConfig.id);
                    expect(updatedLanding.workspaceId).toBe(original.landingConfig.workspaceId);
                    expect(updatedLanding.menuId).toBe(original.landingConfig.menuId);

                    expect(updatedConfig.name).toBe(newConfig.name);
                    expect(updatedConfig.opengraphImageTitle).toBe(newConfig.opengraphImageTitle);
                    expect(updatedConfig.opengraphImageUrl).toBe(newConfig.opengraphImageUrl);
                    expect(updatedConfig.faviconUrl).toBe(newConfig.faviconUrl);
                    expect(updatedConfig.color).toBe(newConfig.color);

                    updateConfig(original.landingConfig.siteConfig, () => {
                        done();
                    });
                });
            });
        });

        // frisby
        //     .fetch(getLandingConfigUrl, ApiTest.options("GET", true, true))
        //     .expect("status", ApiResponseStatus.Ok)
        //     .then(LandingConfigResponse => {
        //         original.landingConfig = LandingConfigResponse.json;
        //
        //         const url = urlWithIds(
        //             process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
        //             {
        //                 workspaceId: original.landingConfig.workspaceId,
        //                 landingConfigId: original.landingConfig.id,
        //             }
        //         );
        //         const requestUrl = ApiTest.tenantUrl(url);
        //
        //         const newConfig: IWorkspaceSiteSettingsDto = {
        //             name: "api test",
        //             color: "#000",
        //             faviconUrl: "/images/favicons/avocado.svg",
        //             opengraphImageUrl: TestsFileHelper.getImageBase64ForTests(),
        //             opengraphImageTitle: "vk post",
        //         };
        //
        //         const options: RequestInit = ApiTest.options("POST", true, true);
        //         options.body = JSON.stringify(newConfig);
        //
        //         frisby
        //             .fetch(requestUrl, options)
        //             .expect("status", ApiResponseStatus.NoContent)
        //             .then(updatedSiteConfigResponse => {
        //
        //             })
        //             .done(done)
        //         ;
        //     });
    });
});

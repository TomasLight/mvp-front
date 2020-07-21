import frisby, { Joi } from "frisby";

import { ApiTest } from "@api/ApiTest";
import {
    IContentSettingsRequestDto,
    IDataSettingsUpdatedRequestDto,
    ISiteSettingsUpdatedRequestDto
} from "@api/models/workspace/requests";
import { ILandingConfigDto, IUserWorkspaceResponseDto } from "@api/models/workspace/responses";
import {
    ICreatedMenuCategoriesDto,
    IDataSettingsResponseDto
} from "@api/models/workspace/responses/IDataSettingsResponseDto";
import { ApiResponseStatus, urlWithIds } from "@utils/api";
import { TestsFileHelper } from "../../tests/TestsFileHelper";

describe("get wokrspaces", () => {
    const requestUrl = ApiTest.tenantUrl(process.env.API_GET_WORKSPACES);

    test("validate dto", async done => {
        frisby
            .fetch(requestUrl, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .expect("jsonTypes", Joi.array().items(Joi.object({
                [nameof<IUserWorkspaceResponseDto>(o => o.role)]: Joi.string().required(),
                [nameof<IUserWorkspaceResponseDto>(o => o.id)]: Joi.string().required(),
                [nameof<IUserWorkspaceResponseDto>(o => o.domainName)]: Joi.string().required(),
                [nameof<IUserWorkspaceResponseDto>(o => o.name)]: Joi.string().required(),
            })).required())
            .done(done)
        ;
    });
});

const SiteConfigSchema = Joi.object({
    [nameof<ISiteSettingsUpdatedRequestDto>(o => o.name)]: Joi.string().required(),
    [nameof<ISiteSettingsUpdatedRequestDto>(o => o.faviconUrl)]: Joi.string().allow(null),
    [nameof<ISiteSettingsUpdatedRequestDto>(o => o.opengraphImage)]: Joi.string().allow(null),
    [nameof<ISiteSettingsUpdatedRequestDto>(o => o.opengraphImageTitle)]: Joi.string().allow(null),
    [nameof<ISiteSettingsUpdatedRequestDto>(o => o.color)]: Joi.string().required(),
});

const IikoConfigSchema = Joi.object({
    [nameof<IDataSettingsUpdatedRequestDto>(o => o.archive)]: Joi.string().optional(),
});

const ContentConfigSchema = Joi.object({
    [nameof<IContentSettingsRequestDto>(o => o.firstPhoto)]: Joi.string().allow(null),
    [nameof<IContentSettingsRequestDto>(o => o.firstText)]: Joi.string().required(),
    [nameof<IContentSettingsRequestDto>(o => o.phone)]: Joi.string().required(),
    [nameof<IContentSettingsRequestDto>(o => o.address)]: Joi.string().required(),
    [nameof<IContentSettingsRequestDto>(o => o.deliveryTime)]: Joi.string().required(),
    [nameof<IContentSettingsRequestDto>(o => o.deliveryMapUrl)]: Joi.string().allow(null),
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

class ConfigLoader {
    private landing: ILandingConfigDto;
    private loading: boolean;

    async loadLanding(): Promise<ILandingConfigDto> {
        const url = ApiTest.tenantUrl(process.env.API_GET_LANDING_CONFIG);
        this.loading = true;

        frisby
            .fetch(url, ApiTest.options("GET", true, true))
            .expect("status", ApiResponseStatus.Ok)
            .then((response) => {
                this.loading = false;
                this.landing = response.json;
            });

        await this.waitingLoop();
        return this.landing;
    }

    async updateSiteConfig(dto: ISiteSettingsUpdatedRequestDto): Promise<void> {
        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
            {
                workspaceId: this.landing.workspaceId,
                landingConfigId: this.landing.id,
            }
        );
        const requestUrl = ApiTest.tenantUrl(url);

        const options: RequestInit = ApiTest.options("PATCH", true, true);
        options.body = JSON.stringify(dto);

        this.loading = true;

        frisby
            .fetch(requestUrl, options)
            .expect("status", ApiResponseStatus.NoContent)
            .then(response => {
                this.loading = false;
            })
        ;

        await this.waitingLoop();
    }

    async updateContentConfig(dto: IContentSettingsRequestDto): Promise<void> {
        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS,
            {
                workspaceId: this.landing.workspaceId,
                landingConfigId: this.landing.id,
            }
        );
        const requestUrl = ApiTest.tenantUrl(url);

        const options: RequestInit = ApiTest.options("PATCH", true, true);
        options.body = JSON.stringify(dto);

        this.loading = true;

        frisby
            .fetch(requestUrl, options)
            .expect("status", ApiResponseStatus.NoContent)
            .then(response => {
                this.loading = false;
            })
        ;

        await this.waitingLoop();
    }

    private async waitingLoop() {
        const waitPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });

        await waitPromise;

        if (this.loading) {
            await this.waitingLoop();
        }
    }
}

describe("update site config", () => {
    test("validate dto", async done => {
        const loader = new ConfigLoader();
        const originalLanding = await loader.loadLanding();

        const originalConfig: ISiteSettingsUpdatedRequestDto = {
            name: originalLanding.siteConfig.name,
            color: originalLanding.siteConfig.color,
            faviconUrl: originalLanding.siteConfig.faviconUrl,
            opengraphImage: "",
            opengraphImageTitle: originalLanding.siteConfig.opengraphImageTitle,
        };

        const newConfig: ISiteSettingsUpdatedRequestDto = {
            name: "api test",
            color: "#000",
            faviconUrl: "/images/favicons/avocado.svg",
            // opengraphImage: TestsFileHelper.getImageBase64ForTests(),
            opengraphImage: "",
            opengraphImageTitle: "vk post",
        };

        await loader.updateSiteConfig(newConfig);
        const updatedLanding = await loader.loadLanding();

        expect(updatedLanding.siteConfig.name).toBe(newConfig.name);
        expect(updatedLanding.siteConfig.opengraphImageTitle).toBe(newConfig.opengraphImageTitle);
        // expect(updatedLanding.siteConfig.opengraphImageUrl).toBe(newConfig.opengraphImage);
        expect(updatedLanding.siteConfig.faviconUrl).toBe(newConfig.faviconUrl);
        expect(updatedLanding.siteConfig.color).toBe(newConfig.color);

        await loader.updateSiteConfig(originalConfig);

        done();
    });
});

const MenuCategorySchema = Joi.object({
    [nameof<ICreatedMenuCategoriesDto>(o => o.id)]: Joi.string().required(),
    [nameof<ICreatedMenuCategoriesDto>(o => o.menuId)]: Joi.string().required(),
    [nameof<ICreatedMenuCategoriesDto>(o => o.items)]: Joi.array().required(),
    [nameof<ICreatedMenuCategoriesDto>(o => o.created)]: Joi.string().required(),
    [nameof<ICreatedMenuCategoriesDto>(o => o.name)]: Joi.string().required(),
});

describe("update data config", () => {
    test("validate dto", async done => {
        const landing = await new ConfigLoader().loadLanding();

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_DATA_SETTINGS,
            {
                workspaceId: landing.workspaceId,
                landingConfigId: landing.id,
            }
        );
        const requestUrl = ApiTest.tenantUrl(url);
        const options: RequestInit = ApiTest.options("POST", true, true);

        const newConfig: IDataSettingsUpdatedRequestDto = {
            archive: TestsFileHelper.getDataConfigBase64ForTests(),
        };
        options.body = JSON.stringify(newConfig);

        frisby
            .fetch(requestUrl, options)
            .expect("status", ApiResponseStatus.Created)
            .expect("jsonTypes", Joi.object({
                [nameof<IDataSettingsResponseDto>(o => o.id)]: Joi.string().required(),
                [nameof<IDataSettingsResponseDto>(o => o.workspaceId)]: Joi.string().required(),
                [nameof<IDataSettingsResponseDto>(o => o.restaurants)]: Joi.array().required(),
                [nameof<IDataSettingsResponseDto>(o => o.created)]: Joi.string().required(),
                [nameof<IDataSettingsResponseDto>(o => o.categories)]: Joi.array().items(MenuCategorySchema).required(),
                [nameof<IDataSettingsResponseDto>(o => o.name)]: Joi.string().required(),
            }).required())
            .done(done)
        ;
    });
});

describe("update content config", () => {
    test("validate dto", async done => {
        const loader = new ConfigLoader();
        const originalLanding = await loader.loadLanding();

        const originalConfig: IContentSettingsRequestDto = {
            firstPhoto: "",
            firstText: originalLanding.contentConfig.firstText,
            phone: originalLanding.contentConfig.phone,
            address: originalLanding.contentConfig.address,
            deliveryTime: originalLanding.contentConfig.deliveryTime,
            deliveryMapUrl: originalLanding.contentConfig.deliveryMapUrl,
        };

        const newConfig: IContentSettingsRequestDto = {
            firstPhoto: "",
            firstText: "test first text",
            phone: "123 123 7",
            address: "qwerty address",
            deliveryTime: "some time",
            deliveryMapUrl: "some map url",
        };

        await loader.updateContentConfig(newConfig);
        const updatedLanding = await loader.loadLanding();

        // expect(updatedLanding.contentConfig.firstPhotoUrl).toBe(newConfig.firstPhoto);
        expect(updatedLanding.contentConfig.firstText).toBe(newConfig.firstText);
        expect(updatedLanding.contentConfig.phone).toBe(newConfig.phone);
        expect(updatedLanding.contentConfig.address).toBe(newConfig.address);
        expect(updatedLanding.contentConfig.deliveryTime).toBe(newConfig.deliveryTime);
        expect(updatedLanding.contentConfig.deliveryMapUrl).toBe(newConfig.deliveryMapUrl);

        await loader.updateContentConfig(originalConfig);

        done();
    });
});

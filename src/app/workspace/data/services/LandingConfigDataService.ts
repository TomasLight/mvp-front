import { ILandingConfigDto } from "@api/models/workspace/responses";
import { WorkspaceApi } from "@api/WorkspaceApi";
import { ContentConfig, LandingConfig, SiteConfig } from "@models";
import { DataFailed, Data, ActionProcessing } from "@utils/data";
import { Mapper } from "@utils/mapping";
import { Translate } from "@utils/translates";
import { ILandingConfigDataService } from "../ILandingConfigDataService";
import { DataServiceBase } from "./DataServiceBase";

export class LandingConfigDataService extends DataServiceBase implements ILandingConfigDataService {
    private static readonly STORAGE_TIME_MILLISECONDS = 5000;

    constructor() {
        super();
        this.siteConfigAsync = this.siteConfigAsync.bind(this);
        this.contentConfigAsync = this.contentConfigAsync.bind(this);
        this.landingConfigAsync = this.landingConfigAsync.bind(this);
    }

    async siteConfigAsync(): Data<SiteConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        return landingConfig.siteConfig;
    }

    async contentConfigAsync(): Data<ContentConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        return landingConfig.contentConfig;
    }

    async landingConfigAsync(): Data<LandingConfig> {
        if (this._landingConfig) {
            return this._landingConfig;
        }

        const response = await WorkspaceApi.getLandingConfigAsync();
        if (response.hasError()) {
            return this.failed(response);
        }

        if (!response.data) {
            return new DataFailed({
                actionProcessing: new ActionProcessing("display"),
                message: Translate.getString("Что-то пошло не так и мы не смогли загрузить настройки сайта."),
            });
        }

        this._landingConfig = Mapper.map<LandingConfig>(
            nameof<ILandingConfigDto>(),
            nameof<LandingConfig>(),
            response.data
        );
        setTimeout(() => {
            this._landingConfig = null;
        }, LandingConfigDataService.STORAGE_TIME_MILLISECONDS);

        return this._landingConfig;
    }
}

import { IPagesDto } from "@api/models/page/responses";
import { ApiBase, ApiResponse, Mapper } from "@utils";
import { Pages } from "../app/models";

import { mockApi } from "./mock/page";

export class PageApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    public static async getPages(): Promise<ApiResponse<Pages>> {
        const response: ApiResponse = await this.get<IPagesDto>(process.env.API_GET_PAGES);
        if (response.data) {
            response.data = Mapper.map<Pages>(
                nameof<IPagesDto>(),
                nameof<Pages>(),
                response.data
            );
        }
        return response as ApiResponse<Pages>;
    }
}

import { FakeLandingConfigDataService } from "./fakeServices/FakeLandingConfigDataService";
import { FakeMenuDataService } from "./fakeServices/FakeMenuDataService";
import { ILandingConfigDataService } from "./ILandingConfigDataService";
import { IMenuDataService } from "./IMenuDataService";
import { LandingConfigDataService } from "./services/LandingConfigDataService";
import { MenuDataService } from "./services/MenuDataService";

function make(service, fakeService) {
    if (process.env.FAKE_DATA === "true") {
        return fakeService;
    }

    return service;
}

export class DataService {
    static readonly config: ILandingConfigDataService = make(
        new LandingConfigDataService(),
        new FakeLandingConfigDataService()
    );
    static readonly menu: IMenuDataService = make(
        new MenuDataService(),
        new FakeMenuDataService()
    );
}

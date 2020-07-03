import { Mapper } from "@utils/mapping/Mapper";
import { MenuMappingProfile } from "./profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new MenuMappingProfile(),
    ]);
}

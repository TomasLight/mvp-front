import { Mapper } from "@utils/mapping/Mapper";
import { UserMappingProfile } from "./profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new UserMappingProfile(),
    ]);
}

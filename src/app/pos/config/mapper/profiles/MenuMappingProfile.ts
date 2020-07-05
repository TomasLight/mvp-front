import { IDishDto, IDishDetailsDto } from "@api/models/menu/responses";
import { Dish, DishDetails } from "@pos/Menu/models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class MenuMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IDishDto>(),
                nameof<Dish>(),
                MenuMappingProfile.mapIDishDtoToDish
            ),
            new MapFunction(
                nameof<IDishDetailsDto>(),
                nameof<DishDetails>(),
                MenuMappingProfile.mapIDishDetailsDtoToDish
            ),
        ];
    }

    private static mapIDishDtoToDish(dto: IDishDto): Dish {
        const dish = MappingProfileBase.autoMap(dto, new Dish());
        return dish;
    }

    private static mapIDishDetailsDtoToDish(dto: IDishDetailsDto): DishDetails {
        const dishDetails = MappingProfileBase.autoMap(dto, new DishDetails());
        return dishDetails;
    }
}

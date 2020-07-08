import { ICategoryDto, IMenuDto, IMenuItemDto } from "@api/models/menu/responses";
import { Category, Dish, Menu } from "@pos/Menu/models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class MenuMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<ICategoryDto>(),
                nameof<Category>(),
                MenuMappingProfile.mapICategoryDtoToCategory
            ),
            new MapFunction(
                nameof<IMenuDto>(),
                nameof<Menu>(),
                MenuMappingProfile.mapIMenuDtoToMenu
            ),
            new MapFunction(
                nameof<IMenuItemDto>(),
                nameof<Dish>(),
                MenuMappingProfile.mapIDishDtoToDish
            ),
        ];
    }

    private static mapICategoryDtoToCategory(dto: ICategoryDto): Category {
        const category = MappingProfileBase.autoMap(dto, new Category());
        category.dishIds = dto.items;
        return category;
    }

    private static mapIMenuDtoToMenu(dto: IMenuDto): Menu {
        const menu = MappingProfileBase.autoMap(dto, new Menu());
        menu.categories = dto.categories.map(MenuMappingProfile.mapICategoryDtoToCategory);
        return menu;
    }

    private static mapIDishDtoToDish(dto: IMenuItemDto): Dish {
        const dish = MappingProfileBase.autoMap(dto, new Dish());
        dish.title = dto.name;
        dish.productIds = dto.products;
        return dish;
    }
}

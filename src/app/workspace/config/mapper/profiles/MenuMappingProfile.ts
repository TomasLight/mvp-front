import { ICategoryDto, IMenuDto, IMenuItemDto } from "@api/models/menu/responses";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class MenuMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
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
        const category = new Category();
        category.id = dto.id;
        category.name = dto.name;
        category.menuId = dto.menuId;
        category.dishIds = dto.items;
        category.created = dto.created;
        return category;
    }

    private static mapIMenuDtoToMenu(dto: IMenuDto): Menu {
        const menu = new Menu();
        menu.id = dto.id;
        menu.workspaceId = dto.workspaceId;
        menu.restaurants = dto.restaurants;
        menu.created = dto.created;
        menu.categories = dto.categories.map(MenuMappingProfile.mapICategoryDtoToCategory);
        menu.name = dto.name;
        return menu;
    }

    private static mapIDishDtoToDish(dto: IMenuItemDto): Dish {
        const dish = new Dish();
        dish.id = dto.id;
        dish.title = dto.name;
        dish.description = dto.description;
        dish.image = dto.imageUrl;
        dish.price = dto.price;
        dish.productIds = dto.products;
        dish.workspaceId = dto.workspaceId;
        dish.created = dto.created;
        return dish;
    }
}

import { Tag } from "@api/mock/menu/Tag";
import { IDishDetailsDto, IDishDto } from "@api/models/menu/responses";
import { SizeType } from "@enums";

const newItem = (item): IDishDetailsDto => {
    return {
        id: item.id,
        title: item.title,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: `/images/${item.image}`,
        tag: item.tag,
        cost: 250,
        sizes: [ 250, 330, 460 ],
        sizeType: SizeType.Milliliter,
    };
};

export enum DishId {
    Cappuccino = 1,
    Americano = 2,
    Latte = 3,
    Macchiato = 4,
    Lungo = 5,
    Raf = 6,
}

export const dishes: IDishDetailsDto[] = [
    newItem({
        id: DishId.Cappuccino,
        title: "Капучино",
        image: "/coffee_001.png",
        tag: Tag.Coffee,
    }),
    newItem({
        id: DishId.Americano,
        title: "Американо",
        image: "/coffee_002.png",
        tag: Tag.Coffee,
    }),
    newItem({
        id: DishId.Latte,
        title: "Латте",
        image: "/coffee_003.png",
        tag: Tag.Coffee,
    }),
    newItem({
        id: DishId.Macchiato,
        title: "Макиато",
        image: "/coffee_004.png",
        tag: Tag.Coffee,
    }),
    newItem({
        id: DishId.Lungo,
        title: "Лунго",
        image: "/coffee_005.png",
        tag: Tag.Coffee,
    }),
    newItem({
        id: DishId.Raf,
        title: "Раф",
        image: "/coffee_006.png",
        tag: Tag.Coffee,
    }),
];

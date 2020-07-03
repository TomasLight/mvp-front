import { IDishDetailsDto, IDishDto } from "@api/models/menu/responses";

import { dishes } from "./dishes";
import { tags } from "./Tag";

const urlsRegexp = {
    dish: new RegExp(/menu\/dish\/\d$/),
};

function mockApi(url, method, data) {
    switch (url) {
        case "menu/tag":
            return getDishTagIds();

        case "menu/dish":
            return getDishes();
    }

    if (urlsRegexp.dish.test(url)) {
        return getDish(data);
    }

    throw new Error(`Invalid ${nameof(url)} for ${nameof(mockApi)}`);
}

function getDishTagIds(): number[] {
    return tags;
}

function getDishes(): IDishDto[] {
    return dishes;
}

function getDish(dishId: number): IDishDetailsDto {
    return dishes.find((dish) => dish.id === dishId);
}

export { mockApi };

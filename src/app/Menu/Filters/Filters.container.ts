import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { State } from "@State";
import { Translate } from "@utils/translates";
import {
    Filters,
    IFiltersProps,
    IFiltersCallProps,
} from "./Filters";

const mapStateToProps = (state: State): Partial<IFiltersProps> => ({
    tags: [
        {
            id: 1,
            title: Translate.getString("Кофе"),
        },
        {
            id: 2,
            title: Translate.getString("Чай"),
        },
        {
            id: 3,
            title: Translate.getString("Другие напитки"),
        },
        {
            id: 4,
            title: Translate.getString("Бутерброды"),
        },
        {
            id: 5,
            title: Translate.getString("Десерты"),
        },
        {
            id: 6,
            title: Translate.getString("Завтраки"),
        },
    ],
});

const mapDispatchToProps = (dispatch: Dispatch): IFiltersCallProps => ({
    onTagChange: (tagId: number) => undefined,
});

const FiltersContainer: ComponentType<Partial<IFiltersProps>> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filters);
export { FiltersContainer };

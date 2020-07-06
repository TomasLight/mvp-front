import clsx from "clsx";
import React, { FC } from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type Props = StyledComponentProps<ClassKey>;

const SetupOpenGraph: FC<Props> = (props) => {
    const { classes } = props;

    return (
        <div className={classes.item}>
            <Typography className={classes.title}>
                {Translate.getString("оупенграф")}
            </Typography>

            <Typography className={clsx(classes.helpText, classes.descriptionArea)}>
                {Translate.getString("Когда вы будете делиться ссылкой на ваш сайт в социальных сетях -- будет формироваться пост. Для него нужно загрузить картинку и написать заголовок.")}
            </Typography>

            <TextFormField
                label={Translate.getString("картинка")}
                name={nameof<ISetupFormValues>(o => o.openGraphImage)}
                InputProps={{
                    placeholder: "перетащите или кликнете",
                }}
                subscription={DefaultFieldSubscription}
                required
                classes={{
                    root: {
                        root: clsx(classes.field, classes.imageField),
                    },
                }}
            />

            <Typography className={clsx(classes.helpText, classes.imageHelpArea)}>
                {Translate.getString("Изображение JPG или PNG разрешением 968x504 размером до 1 MB.")}
            </Typography>

            <TextFormField
                label={Translate.getString("заголовок")}
                name={nameof<ISetupFormValues>(o => o.openGraphTitle)}
                InputProps={{
                    placeholder: "Вкусник доставка кофе и выпечки",
                }}

                subscription={DefaultFieldSubscription}
                required
                classes={{
                    root: {
                        root: clsx(classes.field, classes.titleField),
                    },
                }}
            />
        </div>
    );
};

type ClassKey =
    | "item"
    | "title"
    | "field"
    | "imageField"
    | "titleField"
    | "helpText"
    | "descriptionArea"
    | "imageHelpArea"
    ;

const componentWithStyles = withStyles<ClassKey>((theme) => ({
    item: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateAreas: "\
            'title' '.'\
            'description' '.' \
            'imageField' '.' \
            'imageHelp' '.' \
            'titleField'",
        gridTemplateRows: "\
            auto 12px \
            auto 20px \
            auto 12px \
            auto 20px \
            auto",
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        color: theme.content.primary,
        textTransform: "capitalize",
    },

    field: {},
    imageField: {
        gridArea: "imageField",
    },
    titleField: {
        gridArea: "titleField",
    },
    helpText: {
        fontSize: 14,
        lineHeight: "20px",
        color: theme.content.primary,
        width: 308,
    },
    descriptionArea: {
        gridArea: "description",
    },
    imageHelpArea: {
        gridArea: "imageHelp",
    },
}), { name: "SetupOpenGraph" })(SetupOpenGraph);
export { componentWithStyles as SetupOpenGraph };

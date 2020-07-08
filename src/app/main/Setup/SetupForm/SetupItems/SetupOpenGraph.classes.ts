import { withStyles } from "@material-ui/core";

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

const withClasses = withStyles<ClassKey>((theme) => ({
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
        height: 48,
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
}), { name: "SetupOpenGraph" });

export { ClassKey, withClasses };
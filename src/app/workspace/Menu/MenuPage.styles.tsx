import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "image"
    | "imageSkeleton"
    | "firstText"
    | "address"
    | "filters"
    | "menu"
    | "contacts"
    | "map"
    ;

const styles = createStyles<ClassKey, {}>(theme => ({
    root: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateAreas: "'image' '.' 'filters' '.' 'menu' '.' 'contacts'",
        gridTemplateRows: "400px 16px 40px 20px auto 20px 340px",
    },
    image: {
        gridArea: "image",
        borderRadius: theme.borderRadius,
        height: "100%",
        width: "100%",
        position: "relative",

        display: "grid",
        gridTemplateAreas: "\
            '.' \
            'firstText' '.' \
            'address' '.'",
        gridTemplateRows: "\
            1fr \
            auto 5px \
            auto 1fr",
        justifyItems: "center",
    },
    imageSkeleton: {
        position: "absolute",
    },
    firstText: {
        gridArea: "firstText",
        backgroundColor: "#fff",
        padding: "8px 20px",
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: "42px",
        borderRadius: theme.borderRadius,
    },
    address: {
        gridArea: "address",
        backgroundColor: "#000",
        color: "#fff",
        padding: "12px 20px",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "19px",
        borderRadius: theme.borderRadius,
    },
    filters: {
        gridArea: "filters",
    },
    menu: {
        gridArea: "menu",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gridGap: 20,
    },
    contacts: {
        gridArea: "contacts",
        display: "grid",
        gridAutoFlow: "column",
    },
    contactBlock: {
        gridArea: "contactBlock",
    },
    map: {
        height: "100%",
        width: "100%",
    },
}));

export { styles, ClassKey };

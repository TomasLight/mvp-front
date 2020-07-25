import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "siteName"
    | "field"
    | "domain"
    | "favicon"
    | "openGraph"
    | "colors"
    | "stepper"
    | "stepperLabel"
    | "stepperButton"
    ;

const styles = createStyles<ClassKey, {}>((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            '.' 'siteName' '.' \
            'domain' '.' \
            'favicon' '.' \
            'openGraph' '.' \
            'colors' '.' \
            'stepper'",
        gridTemplateRows: "\
            48px auto 64px \
            auto 60px \
            auto 132px \
            auto 264px \
            auto 80px \
            auto",
    },
    siteName: {
        gridArea: "siteName",
    },
    field: {
        width: 308,
    },
    domain: {
        gridArea: "domain",
    },
    favicon: {
        gridArea: "favicon",
    },
    openGraph: {
        gridArea: "openGraph",
    },
    colors: {
        gridArea: "colors",
    },
    stepper: {
        gridArea: "stepper",
        display: "grid",
        gridGap: 24,
        gridAutoFlow: "row",
    },
    stepperLabel: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    stepperButton: {
        width: "100%",
    },
}));

export { ClassKey, styles };

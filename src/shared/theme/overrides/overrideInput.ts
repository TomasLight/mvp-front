import { Overrides } from "@material-ui/core/styles/overrides";

export function overrideInput(): Overrides {
    return {
        MuiFilledInput: {
            root: {
                backgroundColor: "#F3F3F5",
                color: "#757575",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "#F3F3F5",
                "&:hover": {
                    backgroundColor: "#e0e0e0",
                    borderColor: "#e0e0e0",
                },
                "&$focused": {
                    backgroundColor: "#DBDBDB",
                    borderColor: "#DBDBDB",
                },
                "&$error": {
                    backgroundColor: "#FBEFEE",
                    borderColor: "#ECACA5",
                },
                "&$disabled": {
                    backgroundColor: "#F3F3F5",
                    borderColor: "#F3F3F5",
                },
            },
            input: {
                padding: "10px 16px",
                fontSize: 16,
                lineHeight: "24px",
                height: "auto",
            },
        },
    };
}

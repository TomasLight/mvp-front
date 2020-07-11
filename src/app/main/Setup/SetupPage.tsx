import { ArrowLeftIcon } from "@icons";
import { IconButton } from "@material-ui/core";
import React, { useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { FormProvider } from "@shared/organisms";
import { ContentContainer } from "./Content";
import { ISetupFormValues } from "./models";
import { SetupFormContainer } from "./SetupForm";
import { SetupValidator } from "./validation";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'left right'",
        gridTemplateColumns: "440px 1fr",
        height: "100%",
    },
    left: {
        gridArea: "left",
        display: "grid",
        gridGap: 10,
        justifyItems: "start",
        background: theme.palette.background.paper,
        padding: "12px 32px 60px 22px",
    },
    right: {
        gridArea: "right",
    },
}), { name: "SetupPage" });

const formProvider = new FormProvider(new SetupValidator());

interface ISetupPageProps {
    initialValues: Partial<ISetupFormValues>;
}

interface ISetupPageCallProps {
    redirectToBack: () => void;
    next: (formValues: any) => void;
}

type Props = ISetupPageProps & ISetupPageCallProps;

const SetupPage = (props: Props) => {
    const { initialValues, redirectToBack, next } = props;
    const classes = useStyles();

    const Form = useMemo(() => formProvider.createForm(next), [next]);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <IconButton onClick={redirectToBack} color="secondary">
                    <ArrowLeftIcon />
                </IconButton>

                <Form initialValues={initialValues}>
                    <SetupFormContainer onSubmit={formProvider.submitOnClick} />
                </Form>
            </div>

            <ContentContainer classes={{ root: classes.right }}/>
        </div>
    );
};

export { SetupPage, ISetupPageProps, ISetupPageCallProps };

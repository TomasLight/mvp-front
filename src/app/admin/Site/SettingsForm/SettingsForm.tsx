import React from "react";

import { makeStyles, Typography, Theme } from "@material-ui/core";

import { IconVariant } from "@enums";
import { ColorSelectFieldOption, IconSelectFieldOption } from "@select/types";
import { Button } from "@shared/molecules/Button";
import { Translate } from "@utils";

import {
    SetupDomain,
    SetupSiteName,
    SetupFavicon,
    SetupOpenGraph,
    SetupColors,
} from "./SiteItems";
import { styles, ClassKey } from "./SettingsForm.styles";

const useStyles = makeStyles<Theme, ClassKey>(styles, { name: "SettingsForm" });

interface ISettingsFormProps {
    pristine: boolean;
    faviconOptions: IconSelectFieldOption[];
    colorOptions: ColorSelectFieldOption[];
    openGraphImageIsLoading: boolean;
    isSaving: boolean;
    domainIsReadonly: boolean;
    shouldDisplayStepperLabel: boolean;
    buttonText: string;
}

interface ISettingsFormCallProps {
    onChangeSiteName: (siteName: string) => void;
    onChangeDomain: (domain: string) => void;
    onChangeFavicon: (faviconVariant: IconVariant) => void;
    onChangeOpenGraphImage: (imageFile: File) => void;
    onChangeOpenGraphTitle: (title: string) => void;
    onChangeColor: (color: string) => void;
    onSubmit: () => void;
}

type Props = ISettingsFormProps & ISettingsFormCallProps;

const SettingsForm = (props: Props) => {
    const {
        pristine,
        faviconOptions,
        colorOptions,
        openGraphImageIsLoading,
        isSaving,
        domainIsReadonly,
        shouldDisplayStepperLabel,
        buttonText,

        onChangeSiteName,
        onChangeDomain,
        onChangeFavicon,
        onChangeOpenGraphImage,
        onChangeOpenGraphTitle,
        onChangeColor,
        onSubmit,
    } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SetupSiteName
                classes={{
                    item: classes.siteName,
                    field: classes.field,
                }}
                onChange={onChangeSiteName}
            />

            <SetupDomain
                classes={{
                    item: classes.domain,
                    field: classes.field,
                }}
                onChange={onChangeDomain}
                readonly={domainIsReadonly}
            />

            <SetupFavicon
                classes={{
                    item: classes.favicon,
                    field: classes.field,
                }}
                faviconOptions={faviconOptions}
                onChange={onChangeFavicon}
            />

            <SetupOpenGraph
                classes={{
                    item: classes.openGraph,
                    field: classes.field,
                }}
                imageIsLoading={openGraphImageIsLoading}
                onChangeImage={onChangeOpenGraphImage}
                onChangeTitle={onChangeOpenGraphTitle}
            />

            <SetupColors
                classes={{
                    item: classes.colors,
                    field: classes.field,
                }}
                colorOptions={colorOptions}
                onChange={onChangeColor}
            />

            <div className={classes.stepper}>
                {shouldDisplayStepperLabel && (
                    <Typography variant={"body1"} className={classes.stepperLabel}>
                        {Translate.getString("Шаг 1/3")}
                    </Typography>
                )}

                <Button
                    variant="form"
                    onClick={onSubmit}
                    className={classes.stepperButton}
                    state={{
                        loading: isSaving,
                        pristine,
                    }}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export { SettingsForm, ISettingsFormProps, ISettingsFormCallProps };

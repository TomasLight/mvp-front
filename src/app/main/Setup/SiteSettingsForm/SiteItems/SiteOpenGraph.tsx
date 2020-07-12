import clsx from "clsx";
import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { ISiteSettingsFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { DragAndDropFormField, TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { ClassKey, styles } from "./SiteOpenGraph.classes";

interface ISiteOpenGraphCallProps {
    onChangeImage: (file: File) => void;
    onChangeTitle: (title: string) => void;
}

type Props = ISiteOpenGraphCallProps & StyledComponentProps<ClassKey>;

const SiteOpenGraph = (props: Props) => {
    const {
        classes,
        onChangeImage,
        onChangeTitle,
    } = props;

    const chooseFile = (fileList: FileList) => {
        if (!fileList || !fileList.length) {
            return;
        }

        const file: File = fileList.item(0);
        if (!file.name) {
            return;
        }

        onChangeImage(file);
    };

    return (
        <div className={classes.item}>
            <Typography className={classes.title}>
                {Translate.getString("оупенграф")}
            </Typography>

            <Typography className={clsx(classes.helpText, classes.descriptionArea)}>
                {Translate.getString("Когда вы будете делиться ссылкой на ваш сайт в социальных сетях -- будет формироваться пост. Для него нужно загрузить картинку и написать заголовок.")}
            </Typography>

            <DragAndDropFormField
                name={nameof<ISiteSettingsFormValues>(o => o.openGraphImage)}
                subscription={DefaultFieldSubscription}
                required
                classes={{
                    root: {
                        root: clsx(classes.field, classes.imageField),
                    },
                }}
                sideOnChange={chooseFile}
            />

            <Typography className={clsx(classes.helpText, classes.imageHelpArea)}>
                {/*{Translate.getString("Изображение JPG или PNG разрешением 968x504 размером до 1 MB.")}*/}
                {Translate.getString("Изображение JPG или PNG размером до 1 MB.")}
            </Typography>

            <TextFormField
                label={Translate.getString("заголовок")}
                name={nameof<ISiteSettingsFormValues>(o => o.openGraphTitle)}
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
                sideOnChange={onChangeTitle}
            />
        </div>
    );
};

const componentWithStyles = withStyles(
    styles,
    { name: "SetupOpenGraph" }
)(SiteOpenGraph);
export { componentWithStyles as SetupOpenGraph };

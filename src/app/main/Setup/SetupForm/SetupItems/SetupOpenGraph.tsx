import clsx from "clsx";
import React, { FC, useState } from "react";

import { StyledComponentProps, Typography } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription, DragAndDropField } from "@shared/organisms";
import { DragAndDropFormField, TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { ClassKey, withClasses } from "./SetupOpenGraph.classes";

type Props = StyledComponentProps<ClassKey>;

const SetupOpenGraph: FC<Props> = (props) => {
    const { classes } = props;
    const [ imageName, setImageName ] = useState<string>("");

    const chooseFile = (fileList: FileList) => {
        if (!fileList || !fileList.length) {
            return;
        }

        const file: File = fileList.item(0);
        if (!file.name) {
            return;
        }

        setImageName(file.name);
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
                name={nameof<ISetupFormValues>(o => o.openGraphImage)}
                subscription={DefaultFieldSubscription}
                required
                onDrop={chooseFile}
                classes={{
                    root: {
                        root: clsx(classes.field, classes.imageField),
                    },
                }}
            >
                <div>{imageName}</div>
            </DragAndDropFormField>

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

const componentWithStyles = withClasses(SetupOpenGraph);
export { componentWithStyles as SetupOpenGraph };

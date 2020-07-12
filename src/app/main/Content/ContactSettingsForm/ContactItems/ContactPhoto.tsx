import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@main/Content/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { DragAndDropFormField } from "@shared/templates";
import { Translate } from "@utils";

interface IContactPhotoCallProps {
    onChange: (file: File) => void;
}

type ClassKey = "field";
type Props = IContactPhotoCallProps & StyledComponentProps<ClassKey>;

const ContactPhoto = (props: Props) => {
    const {
        classes,
        onChange,
    } = props;

    const chooseFile = (fileList: FileList) => {
        if (!fileList || !fileList.length) {
            return;
        }

        const file: File = fileList.item(0);
        if (!file.name) {
            return;
        }

        onChange(file);
    };

    return (
        <DragAndDropFormField
            name={nameof<IContactSettingsFormValues>(o => o.photo)}
            subscription={DefaultFieldSubscription}
            label={Translate.getString("фото в первом блоке")}
            required
            classes={{
                root: {
                    root: classes.field,
                },
            }}
            sideOnChange={chooseFile}
        />
    );
};

const componentWithStyles = withStyles({
    field: {},
}, { name: "ContactPhoto" })(ContactPhoto);
export { componentWithStyles as ContactPhoto };

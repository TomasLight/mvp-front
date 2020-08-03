import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@admin/Content/models";
import { DragAndDropFormField } from "@shared/templates";
import { Translate } from "@utils";

interface IContactPhotoProps {
    isLoading: boolean;
}

interface IContactPhotoCallProps {
    onChange: (file: File) => void;
}

type ClassKey = "field";
type Props = IContactPhotoProps & IContactPhotoCallProps & StyledComponentProps<ClassKey>;

const Photo = (props: Props) => {
    const {
        classes,
        isLoading,
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
            isLoading={isLoading}
            sideOnChange={chooseFile}
            fileTypes={"image/jpeg,image/png,image/jpg"}
        />
    );
};

const componentWithStyles = withStyles({
    field: {},
}, { name: "Photo" })(Photo);
export { componentWithStyles as Photo };

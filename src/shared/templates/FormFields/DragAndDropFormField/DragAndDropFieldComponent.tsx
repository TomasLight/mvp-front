import React, { FC, useState } from "react";
import {FieldRenderProps } from "react-final-form";

import { DragAndDropField, DragAndDropFieldProps } from "@shared/organisms/Fields";
import { FormFieldManager } from "../managers";

interface IDragAndDropFieldComponentProps extends DragAndDropFieldProps {
    sideOnChange?: (fileList: FileList) => void;
}
type Props = IDragAndDropFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const DragAndDropFieldComponent: FC<Props> = (props) => {
    const {
        input: { name, onChange },
        sideOnChange,
        meta,
        ...rest
    } = props;

    const [ formManager ] = useState<FormFieldManager>(new FormFieldManager());
    const areErrorsDisplayed = formManager.areErrorsDisplayed(meta);

    const handleOnChange = (fileList: FileList) => {
        if (rest.readOnly || rest.disabled) {
            return;
        }

        onChange(fileList);
        if (typeof sideOnChange === "function") {
            sideOnChange(fileList);
        }
    };

    return (
        <DragAndDropField
            {...rest}
            name={name}

            helperText={areErrorsDisplayed ? meta.error || meta.submitError : rest.helperText}
            error={areErrorsDisplayed}

            onDrop={handleOnChange}
        />
    );
};

export { DragAndDropFieldComponent, IDragAndDropFieldComponentProps };

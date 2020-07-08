import React, { FC } from "react";

import { SelectWrapperProps } from "@shared/organisms/Fields/Select";
import { SimpleSingleSelect, SingleSelectWithIcon } from "./SelectVariants";

interface ISelectProps extends SelectWrapperProps {
    variant?:
        | "single-simple"
        | "single-with-icon";
}

type Props = ISelectProps;

const Select: FC<Props> = (props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case "single-with-icon":
            return (
                <SingleSelectWithIcon {...rest} />
            );

        case "single-simple":
        default:
            return (
                <SimpleSingleSelect {...rest} />
            );
    }
};

export { Select, ISelectProps };

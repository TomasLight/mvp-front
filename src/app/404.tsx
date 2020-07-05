import React, { FC } from "react";
import { useLocation } from "react-router-dom";

const NotFound: FC = () => {
    const location = useLocation();

    return (
        <div>
            <h1>
                404 - Page not found
            </h1>
            <h3>
                <code>{location.pathname}</code>
            </h3>
        </div>
    );
};

export { NotFound };


import { Enum } from "@enums";

export const ApiResponseStatus = Object.freeze({
    Unknown:  0,

    Ok:  200,
    Created:  201,
    NoContent:  204,

    BadRequest:  400,
    Unauthorized:  401,
    Forbidden:  403,
    NotFound:  404,
    MethodNotAllowed:  405,
    RequestTimeout:  408,

    InternalServerError:  500,
    BadGateway:  502,
    ServiceUnavailable:  503,
});

export type ApiResponseStatus = Enum<typeof ApiResponseStatus>;

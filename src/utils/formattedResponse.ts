import HttpStatusCode from "./HttpStatusCode";
import httpStatusCode from "./HttpStatusCode";


interface ResponseParams {
    status: number,
    object: string,
    message?: string
}

export const formattedResponse = (
    {
        status,
        object,
        message
    }: ResponseParams
) => {

    return {
        "status": status + ' - ' + HttpStatusCode[status],
        "message": !message ? getResponseMessage(status, object) : message
    }
}

const getResponseMessage = (code: httpStatusCode, object: string) => {
    switch (code) {
        case HttpStatusCode.BAD_REQUEST:
            return "The server cannot or will not process the request due to an apparent client error."
        case HttpStatusCode.UNAUTHORIZED:
            return "Unauthorized."
        case HttpStatusCode.FORBIDDEN:
            return "Forbidden request."
        case HttpStatusCode.NOT_FOUND:
            return `Could not find ${object}, make sure the id is correct or the request makes sense with your account authorization.`
        case HttpStatusCode.METHOD_NOT_ALLOWED:
            return "Request method is not supported for the requested resource."
        case HttpStatusCode.INTERNAL_SERVER_ERROR:
            return `There was a general error while handling the [${object}].`;
        case HttpStatusCode.SERVICE_UNAVAILABLE:
            return "The server is currently unavailable (because it is overloaded or down for maintenance).";
        default:
            return `There was a general error while handling the [${object}].`;

    }
}
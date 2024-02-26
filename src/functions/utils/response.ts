type IResponse = Record<string, unknown>;
type IErrorResponse = {
    message: string | string[];
    error: string;
    statusCode: number;
};

export function responseError(statusCode: number, body: IErrorResponse) {
    return response(statusCode, body);
}

export function response(statusCode: number, body: IResponse) {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}

export function verifyRequestBody(body: Record<string, unknown>) {
    const message: string[] = [];

    Object.entries(body).forEach((property) => {
        if (!property[1]) {
            message.push(`${property[0]} is required.`);
        }
    });

    return message;
}

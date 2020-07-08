export function urlWithIds(url: string, params: object): string {
    let handledUrl = url;

    for (const key in params) {
        handledUrl = handledUrl.replace(`{${key}}`, params[key]);
    }

    return handledUrl;
}

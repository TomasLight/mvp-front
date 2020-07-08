export class UrlRegExp {
    private static readonly GUID_PATTERN = "[\\d\\w-]+";
    private url: string;

    constructor(url) {
        this.url = url;
    }

    public static build(envUrl: string) {
        const { url } = new UrlRegExp(envUrl).replaceVariables().escapeForwardSlashes();

        return new RegExp(url);
    }

    private replaceVariables() {
        this.url = this.url.replace(/{\w*}/g, UrlRegExp.GUID_PATTERN);
        return this;
    }

    private escapeForwardSlashes() {
        this.url = this.url.replace(/\//g, "\\/");
        return this;
    }
}

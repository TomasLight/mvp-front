import { ApiMethod } from "@utils/api/ApiMethod";

export class RequestInitBuilder {
    private readonly options: RequestInit;
    private readonly headers: Headers;

    constructor(method: ApiMethod) {
        this.options = {
            method,
        };

        this.headers = new Headers();
        this.headers.append("X-Requested-With", "XMLHttpRequest");
    }

    appendJson(dto: any): RequestInitBuilder {
        const json = JSON.stringify(dto);

        this.headers.append("Content-Type", "application/json;charset=UTF-8");
        this.options.body = json;

        return this;
    }

    build(): RequestInit {
        const options: RequestInit = this.options;
        options.headers = this.headers;
        return this.options;
    }
}

import { ApiMethod } from "@utils/api";

export class ApiTest {
    static url(url: string): string {
        return `${process.env.TEST_API_URL}/api${url}`;
    }

    static tenantUrl(url: string): string {
        return `${process.env.TEST_TENANT_API_URL}/api${url}`;
    }

    static options(method: ApiMethod, withAuthCookies: boolean = false, tenant: boolean = false): RequestInit {
        const options: RequestInit = {
            method,
            headers: {},
        };

        if (withAuthCookies) {
            options.headers["Cookie"] = ApiTest.cookie(tenant);
        }
        if (tenant) {
            options.headers["Referer"] = process.env.TEST_TENANT_API_URL;
        }

        return options;
    }

    static cookie(tenant: boolean = false): string {
        return tenant
            ? process.env.TEST_API_TENANT_COOKIE
            : process.env.TEST_API_COOKIE;
    }
}

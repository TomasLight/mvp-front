export interface AdvancedConfig {
    url: string;
    isAbsoluteUrl?: boolean;
    method: "GET" | "POST" | "PUT" | "DELETE";
    dto?: any;
}

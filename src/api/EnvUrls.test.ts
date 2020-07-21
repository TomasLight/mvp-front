test("env api urls", () => {
    expect(process.env.TEST_API_URL).toBe("https://bizarre-dev.rest");
    expect(process.env.TEST_TENANT_API_URL).toBe("https://shaurma-zbs.bizarre-dev.rest");
    expect(process.env.TEST_API_COOKIE).not.toBeNull();
    expect(process.env.TEST_API_TENANT_COOKIE).not.toBeNull();
    expect(process.env.TEST_MENU_ID).not.toBeNull();

    expect(process.env.API_GET_AUTHORIZED_USER_URL).toBe("/users/signed");

    expect(process.env.API_BASE_URL).toBe("/api");

    expect(process.env.API_GET_WORKSPACES).toBe("/workspaces");
    expect(process.env.API_CREATE_WORKSPACE).toBe("/workspace");
    expect(process.env.API_GET_LANDING_CONFIG).toBe("/landingconfig");
    expect(process.env.API_PATCH_WORKSPACE_SITE_SETTINGS).toBe("/w-{workspaceId}/landingconfigs/{landingConfigId}/site");
    expect(process.env.API_PATCH_WORKSPACE_DATA_SETTINGS).toBe("/w-{workspaceId}/landingconfigs/{landingConfigId}/excelimport");
    expect(process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS).toBe("/w-{workspaceId}/landingconfigs/{landingConfigId}/content");

    expect(process.env.API_GET_PAGES).toBe("/pages");

    expect(process.env.API_GET_MENU).toBe("/menus/{menuId}");
    expect(process.env.API_GET_MENU_ITEMS).toBe("/menuitems");
});

test("env", () => {
    expect(process.env.TEST_API_URL).toBe("https://bizarre-dev.rest");
    expect(process.env.API_GET_AUTHORIZED_USER_URL).toBe("/users/signed");
});

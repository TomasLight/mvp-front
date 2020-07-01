import { expect, test } from "@jest/globals";

import { Translate } from "@utils/translates/Translate";

test("Translate simple", () => {
    const translatedString = Translate.getString("Test string");
    expect(translatedString).toBe("Test string");
});

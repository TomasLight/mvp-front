import { SizeType } from "@enums";
import { ApiResponseStatus } from "@utils/api";
import { apiResponseStatusDictionary } from "@utils/translates/apiResponseStatusDictionary";

export class Translate {
    static getString(key: string, options?: any) {
        // todo: add localization library usage of
        // for example: i18next
        if (Translate.dictionary.has(key)) {
            return Translate.dictionary.get(key)(options);
        }

        return key;
    }

    private static dictionary = new Map<string, (options: any) => string>([
        [ "size", Translate.getSizeText ],
        [ "api", Translate.getApiText ],
    ]);

    private static getSizeText(options: { size: number, sizeType: SizeType }): string {
        switch (options.sizeType) {
            case SizeType.Milliliter:
                return `${options.size} мл`;

            case SizeType.Liter:
                return `${options.size} л`;

            case SizeType.Gram:
                return `${options.size} гр`;

            case SizeType.Kilogram:
                return `${options.size} кг`;

            default:
                throw new Error(`Translate.getString - Invalid key for SizeType: ${options.sizeType}`);
        }
    }

    private static getApiText(options: { code: ApiResponseStatus }): string {
        const text = apiResponseStatusDictionary[options.code];
        if (text) {
            return text;
        }

        throw new Error(`Translate.getString - Not registered status code ${options.code} for api`);
    }
}

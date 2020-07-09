import { SizeType } from "@enums";

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
}

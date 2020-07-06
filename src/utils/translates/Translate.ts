import { Tag } from "@api/mock/menu/Tag";
import { SizeType } from "@enums";

export class Translate {
    public static getString(key: string, options?: any) {
        // todo: add localization library usage of
        // for example: i18next
        if (Translate.dictionary.has(key)) {
            return Translate.dictionary.get(key)(options);
        }

        return key;
    }

    private static dictionary = new Map<string, (options: any) => string>([
        [ "tag", Translate.getTagText ],
        [ "size", Translate.getSizeText ],
    ]);

    private static getTagText(options: { id: number }): string {
        switch (options.id) {
            case Tag.Coffee:
                return "Кофе";

            case Tag.Tea:
                return "Чай";

            case Tag.OtherDrink:
                return "Другие напитки";

            case Tag.Sandwich:
                return "Бутерброды";

            case Tag.Dessert:
                return "Десерты";

            case Tag.Breakfast:
                return "Завтраки";

            default:
                throw new Error(`Translate.getString - Invalid key for TagId: ${options.id}`);
        }
    }

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

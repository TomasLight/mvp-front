export interface IBrandColor {
    color: string;
    searchTags: string[];
}

function makeColor(color: string, searchTags: string[]): IBrandColor {
    return {
        color,
        searchTags,
    };
}

export const brandColors = new Map<number, IBrandColor>([
    [ 1, makeColor("#2F00ED", [ "blue", "синий" ]) ],
    [ 2, makeColor("#007BED", [
        "blue", "синий",
        "light blue", "голубой",
    ]) ],
    [ 3, makeColor("#00B3ED", [
        "blue", "синий",
        "light blue", "голубой",
    ]) ],

    [ 4, makeColor("#20C5A7", [ "green", "зеленый" ]) ],
    [ 5, makeColor("#39C975", [ "green", "зеленый" ]) ],
    [ 6, makeColor("#64D30D", [ "green", "зеленый" ]) ],

    [ 7, makeColor("#EF9E00", [
        "yellow", "желтый",
        "orange", "оранжевый",
    ]) ],
    [ 8, makeColor("#ED6E33", [
        "orange", "оранжевый",
        "red", "красный",
    ]) ],
    [ 9, makeColor("#D44333", [
        "orange", "оранжевый",
        "red", "красный",
    ]) ],

    [ 10, makeColor("#D43380", [
        "fuchsia", "фуксия",
        "crimson", "малиновый",
        "purple", "фиолетовый",
        "pink", "розовый",
    ]) ],
    [ 11, makeColor("#8333D4", [
        "purple", "фиолетовый",
        "lilac", "сиреневый",
    ]) ],
    [ 12, makeColor("#000000", [ "black", "черный" ]) ],
]);

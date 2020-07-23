import fs from "fs";

export class TestsFileHelper {
    static getImageBase64ForTests(): string {
        const buffer = fs.readFileSync(`${process.cwd()}/public/images/image_001.png`);
        const imageBase64 = buffer.toString("base64");
        return imageBase64;
    }

    static getDataConfigBase64ForTests(): string {
        const buffer = fs.readFileSync(`${process.cwd()}/public/files/export_pizza.zip`);
        const fileBase64 = buffer.toString("base64");
        return fileBase64;
    }
}

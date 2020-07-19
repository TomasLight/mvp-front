import fs from "fs";

export class TestsFileHelper {
    static getImageBase64ForTests(): string {
        const buffer = fs.readFileSync(`${process.cwd()}/public/images/image_001.png`);
        const base64Image = buffer.toString("base64");
        return base64Image;
    }
}

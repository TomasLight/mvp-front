export class FileHelper {
    static async toBase64(file: File): Promise<string> {
        const obj = { flag: true };
        let base64 = "";

        const fileReader = new FileReader();
        fileReader.onload = () => {
            obj.flag = false;
            base64 = fileReader.result.toString();
        };

        fileReader.readAsDataURL(file);
        await FileHelper.waitingLoop(obj);

        return base64;
    }

    private static async waitingLoop(obj: { flag: boolean }) {
        const waitPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });

        await waitPromise;

        if (obj.flag) {
            await FileHelper.waitingLoop(obj);
        }
    }

    static clearBase64(base64: string): string {
        return base64.substr(base64.indexOf(",") + 1);
    }

    static getFileExtension(file: File) {
        return file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) || file.name;
    }
}

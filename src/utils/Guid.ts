import uuidv4 from "uuid/v4";

export class Guid {
    private guid: string;

    constructor() {
        this.guid = uuidv4();
    }

    get get(): string {
        return this.guid;
    }

    generate(): string {
        this.guid = uuidv4();
        return this.guid;
    }

    static generate(): string {
        const guid = new Guid();
        return guid.generate();
    }
}

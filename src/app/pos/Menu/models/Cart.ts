import { CartItem } from "./CartItem";

export class Cart {
    private items: CartItem[];

    constructor() {
        this.items = [];
    }

    public add(id: string, size: number) {
        const exist = this.get(id, size);
        if (!exist) {
            this.items.push(
                new CartItem({
                    id,
                    size,
                    amount: 1,
                })
            );
        }
    }

    public remove(id: string, size: number) {
        this.items = this.items.filter((existedItem) =>
            existedItem.id !== id &&
            existedItem.size !== size
        );
    }

    public adjust(item: CartItem) {
        const existedItem = this.get(item.id, item.size);

        if (existedItem) {
            existedItem.amount += item.amount;
        }
    }

    public reduce(item: CartItem) {
        const existedItem = this.get(item.id, item.size);

        if (existedItem) {
            existedItem.amount -= item.amount;

            if (existedItem.amount <= 0) {
                this.remove(existedItem.id, existedItem.size);
            }
        }
    }

    public getById(id: string): CartItem[] {
        return this.items.filter((item) => item.id === id);
    }

    public getAmounts(id: string): Map<number, number> {
        const map = new Map<number, number>();
        this.items
            .filter((cartItem) => cartItem.id === id)
            .forEach((cartItem) => {
                map.set(cartItem.size, cartItem.amount);
            });

        return map;
    }

    public get(id: string, size: number): CartItem {
        return this.items.find((item) =>
            item.id === id &&
            item.size === size
        );
    }

    public list(): CartItem[] {
        return this.items;
    }
}

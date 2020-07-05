export class CartItem {
    id: number;
    size: number;
    amount?: number;

    constructor(cartItem: CartItem = null) {
        if (!cartItem) {
            this.id = null;
            this.size = null;
            this.amount = null;
        }
        else {
            this.id = cartItem.id;
            this.size = cartItem.size;
            this.amount = cartItem.amount || 0;
        }
    }
}

interface IAuthorizedUser {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    patronymic: string;
}

export class AuthorizedUser implements IAuthorizedUser {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    patronymic: string;

    constructor(user: IAuthorizedUser = null) {
        if (!user) {
            this.id = "";
            this.email = "";
            this.role = "";
            this.firstName = "";
            this.lastName = "";
            this.patronymic = "";
        }
        else {
            this.id = user.id;
            this.email = user.email;
            this.role = user.role;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.patronymic = user.patronymic;
        }
    }

    getName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

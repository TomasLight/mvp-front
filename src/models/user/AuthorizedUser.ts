export class AuthorizedUser {
    public id: string;
    public email: string;
    public role: string;
    public firstName: string;
    public lastName: string;
    public patronymic: string;

    constructor(user: AuthorizedUser = null) {
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
}

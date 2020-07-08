export interface IAuthorizedUserDto {
    readonly id: string;
    readonly email: string;
    readonly role: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
}

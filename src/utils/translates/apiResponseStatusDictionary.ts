import { ApiResponseStatus } from "../api/ApiResponseStatus";

export const apiResponseStatusDictionary = Object.freeze({
    [ApiResponseStatus.NoContent]: "Данные не найдены",

    [ApiResponseStatus.BadRequest]: "Неправильный запрос",
    [ApiResponseStatus.Unauthorized]: "Не авторизован",
    [ApiResponseStatus.Forbidden]: "Доступ запрещен",
    [ApiResponseStatus.NotFound]: "Ресурс не найден",
    [ApiResponseStatus.MethodNotAllowed]: "Действие запрещено",
    [ApiResponseStatus.RequestTimeout]: "Соединение закрыто из-за долгого времени ожидания",

    [ApiResponseStatus.InternalServerError]: "Ошибка сервера",
    [ApiResponseStatus.BadGateway]: "Проблемы с доступом к Джой казино?))))",
    [ApiResponseStatus.ServiceUnavailable]: "Сервис временно не доступен",
});

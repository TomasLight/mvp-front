# BizarreLab client-side application

Веб приложение состоит из двух проектов:
* [https://github.com/BizarreLab/bizarre-monster](https://github.com/BizarreLab/bizarre-monster)
* [https://github.com/BizarreLab/mvp-front](https://github.com/BizarreLab/mvp-front)

### <a name="build"></a> Сборка
Скопируйте содержимое файла `/.env.example` в `/.env`

Чтобы собрать приложение выполните следующие команды в корне проекта
```
npm i
npm run prod
```

### <a name="config"></a> Настройка
Можно изменить конфигурацию проекта через файл `/.env`

`MOCK_API` - использовать ли настоящий api или его mock объект

`API_BASE_URL` - базовый путь к api

Здесь же можно изменить api адреса. 
<b>Будьте осторожны</b>, если вы захотите радикально изменить api адреса, то mock api может перестать работать, т.к. там используются регулярные выражения для перехвата запросов.

Например `/menus/{menuId}/categories` сейчас проверяется раньше, чем `/menus/{menuId}`, потому что второй адрес более общий. Надеюсь, вы поняли меня))

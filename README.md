# User Management Service

Сервис для управления пользователями с аутентификацией и авторизацией на основе JWT.

## 🚀 Функциональность

- ✅ Регистрация пользователей
- ✅ Аутентификация по JWT
- ✅ Получение профиля пользователя
- ✅ Просмотр списка пользователей (только для админов)
- ✅ Блокировка/разблокировка пользователей

## 🛠 Технологии

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## 📋 API Endpoints

| Метод | Эндпоинт | Описание | Доступ |
|-------|----------|----------|---------|
| POST | `/register` | Регистрация пользователя | Публичный |
| POST | `/login` | Авторизация пользователя | Публичный |
| GET | `/users/:id` | Получение пользователя по ID | Self/Admin |
| GET | `/users` | Получение списка пользователей | Admin |
| PATCH | `/users/:id/block` | Блокировка пользователя | Self/Admin |

## ⚙️ Установка и настройка

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd user-service
npm install
```

### 2. Настройка базы данных

#### Создайте файл .env:

```bash
DATABASE_URL="postgresql://<username>@localhost:5432/user_service_db"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3000
```

### 3. Инициализация БД

```bash
npx prisma generate
npx prisma db push
```

### 4. Запуск приложения

```bash
npx ts-node src/index.ts
```

Сервер запустится на http://localhost:3000

## 📮 Инструкция по тестированию в Postman

### 1. Создание коллекции

Откройте Postman

Создайте новую коллекцию "User Management API"

Добавьте переменные коллекции:

- base_url: http://localhost:3000

- admin_token: (оставьте пустым, заполнится после авторизации)

- user_token: (оставьте пустым, заполнится после авторизации)

### 2. Регистрация администратора

Запрос:

Метод: **POST**

URL: {{base_url}}/register

Body → raw → JSON:

```json
{
  "fullName": "Admin User",
  "birthDate": "1985-05-15",
  "email": "admin@example.com",
  "password": "adminpassword123",
  "role": "ADMIN"
}
```

Сохраните ответ - вам понадобится email и password для входа.

### 3. Регистрация обычного пользователя

Запрос:

Метод: **POST**

URL: {{base_url}}/register

Body → raw → JSON:

```json
{
  "fullName": "John Doe",
  "birthDate": "1990-01-01",
  "email": "user@example.com",
  "password": "userpassword123"
}
```

### 4. Авторизация администратора

Запрос:

Метод: **POST**

URL: {{base_url}}/login

Body → raw → JSON:

```json
{
  "email": "admin@example.com",
  "password": "adminpassword123"
}
```

В ответе получите JWT токен и сохраните его в переменную коллекции admin_token.

### 5. Авторизация пользователя

Запрос:

Метод: **POST**

URL: {{base_url}}/login

Body → raw → JSON:

```json
{
  "email": "user@example.com",
  "password": "userpassword123"
}
```

Сохраните токен в переменную user_token.

### 6. Получение списка пользователей (только для админа)

Запрос:

Метод: **GET**

URL: {{base_url}}/users

Authorization → Type: Bearer Token

Token: {{admin_token}}

### 7. Получение пользователя по ID
Запрос:

Метод: **GET**

URL: {{base_url}}/users/1 (замените 1 на реальный ID)

Authorization → Type: Bearer Token

Token: {{admin_token}} или {{user_token}} (в зависимости от того, чей профиль запрашиваете)

### 8. Блокировка пользователя

Запрос:

Метод: **PATCH**

URL: {{base_url}}/users/1/block (замените 1 на ID пользователя)

Authorization → Type: Bearer Token

Token: {{admin_token}}

Body → raw → JSON:

```json
{
  "isActive": false
}
```

### 9. Разблокировка пользователя

Запрос:

Метод: **PATCH**

URL: {{base_url}}/users/1/block

Authorization → Type: Bearer Token

Token: {{admin_token}}

Body → raw → JSON:

```json
{
  "isActive": true
}
```

## 🔐 Правила доступа
Публичные эндпоинты: **/register, /login**

Требуется аутентификация: все эндпоинты кроме публичных

Требуются права администратора:

**GET /users** - просмотр всех пользователей

Self или Admin доступ:

**GET /users/:id** - просмотр профиля

**PATCH /users/:id/block** - блокировка

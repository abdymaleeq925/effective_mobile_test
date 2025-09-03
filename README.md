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

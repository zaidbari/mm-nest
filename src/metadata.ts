/* eslint-disable */
export default async () => {
    const t = {
        ["./auth/entity/auth.entity"]: await import("./auth/entity/auth.entity"),
        ["./users/entities/user.entity"]: await import("./users/entities/user.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./auth/entity/auth.entity"), { "TokensEntity": { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } }, "LoginResponse": { tokens: { required: true, type: () => ({ accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } }) }, username: { required: true, type: () => String }, role: { required: true, type: () => String }, id: { required: true, type: () => String } } }], [import("./auth/dto/login.dto"), { "LoginDto": { username: { required: true, type: () => String, minLength: 4 }, password: { required: true, type: () => String, minLength: 6 } } }], [import("./users/dto/create-user.dto"), { "CreateUserDto": { username: { required: true, type: () => String, maxLength: 100 }, password: { required: true, type: () => String, minLength: 8, maxLength: 32 }, email: { required: true, type: () => String, maxLength: 255 }, role: { required: true, type: () => Object }, name: { required: true, type: () => String, maxLength: 255 }, expiresAt: { required: true, type: () => Date } } }], [import("./users/entities/user.entity"), { "UserEntity": { id: { required: true, type: () => String }, email: { required: true, type: () => String }, username: { required: true, type: () => String }, name: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, role: { required: true, type: () => Object }, expiresAt: { required: true, type: () => Date, nullable: true }, password: { required: true, type: () => String } } }]], "controllers": [[import("./auth/auth.controller"), { "AuthController": { "login": { description: "---------------------------- Login ---------------------------", type: t["./auth/entity/auth.entity"].LoginResponse }, "refresh": { description: "---------------------------- Refresh ---------------------------", type: t["./auth/entity/auth.entity"].TokensEntity } } }], [import("./users/users.controller"), { "UsersController": { "create": { description: "---------------------------- Create a new user ---------------------------", type: t["./users/entities/user.entity"].UserEntity }, "findAll": { description: "---------------------------- Get all users ---------------------------", type: [t["./users/entities/user.entity"].UserEntity] }, "findOne": { description: "---------------------------- Get a user by ID ---------------------------", type: t["./users/entities/user.entity"].UserEntity }, "update": { description: "---------------------------- Update a user by ID ---------------------------", type: t["./users/entities/user.entity"].UserEntity }, "remove": { description: "---------------------------- Delete a user by ID ---------------------------", type: t["./users/entities/user.entity"].UserEntity } } }]] } };
};
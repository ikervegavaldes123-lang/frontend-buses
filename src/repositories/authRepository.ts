import initialUsers from "../data/users.json";
import { storageService } from "../services/storageService";
import type { LoginCredentials, User, UserRecord } from "../types/auth";

const SESSION_KEY = "app_session";
const users = initialUsers as unknown as UserRecord[];

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const expectedStoredRole = credentials.role === "CHOFER" ? "USUARIO" : "ADMIN";
    const foundUser = users.find(
      (user) =>
        user.carnet === credentials.carnet &&
        user.password === credentials.password &&
        (user.role as string) === expectedStoredRole
    );

    if (!foundUser) return null;

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
      role: credentials.role,
    };

    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const savedUser = storageService.get<User>(SESSION_KEY);
    if (!savedUser) return null;

    // Compatibility with sessions created before the role selector existed.
    if ((savedUser.role as string) === "USUARIO") {
      const normalizedUser: User = { ...savedUser, role: "CHOFER" };
      storageService.set<User>(SESSION_KEY, normalizedUser);
      return normalizedUser;
    }

    return savedUser;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};

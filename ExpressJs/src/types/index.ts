export type Role = "admin"| "agent"| "user";

export const User_Role = {
    admin:"admin",
    agent: "agent",
    user:"user",
} as const;
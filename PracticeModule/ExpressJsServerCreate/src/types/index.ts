export type Role = "admin"|"user"|"agent"

export const User_Role = {
    admin:"admin",
    agent: "agent",
    user:"user",
} as const;
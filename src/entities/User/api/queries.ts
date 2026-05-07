export const userQueries = {
  base: () => ["user"] as const,
  getRecoverCodeValidity: (code: string | undefined) =>
    [userQueries.base(), "recoverCodeValidity", code] as const,
  getProfile: () => [userQueries.base(), "profile"] as const,
};

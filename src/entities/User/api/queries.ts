export const userQueries = {
  base: () => ["user"] as const,
  recoverCodeValidity: (code: string | undefined) =>
    [userQueries.base(), "recoverCodeValidity", code] as const,
};

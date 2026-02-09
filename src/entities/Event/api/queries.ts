export const eventQueries = {
  getSettings: (eventId: string) => [eventId, "settings"] as const,
};

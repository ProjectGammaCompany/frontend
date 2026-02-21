export const eventQueries = {
  getSettings: (eventId: string) => [eventId, "settings"] as const,
  getEditingEventData: (eventId: string) => [eventId, "data"] as const,
};

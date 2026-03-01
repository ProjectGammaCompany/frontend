export const eventQueries = {
  getSettings: (eventId: string) => [eventId, "settings"] as const,
  getEditingEventData: (eventId: string) => [eventId, "data"] as const,
  getGroups: (eventId: string) => [eventId, "groups"] as const,
  getJoinRequiredFields: (joinCode: string) =>
    [joinCode, "joinRequiredFields"] as const,
};

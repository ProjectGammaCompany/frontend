export const eventQueries = {
  getSettings: (eventId: string) => [eventId, "settings"] as const,
  getEditingEventData: (eventId: string) => [eventId, "data"] as const,
  getEvents: () => ["allEvents"] as const,
  getGroups: (eventId: string) => [eventId, "groups"] as const,
  getJoinRequiredFields: (joinCode: string) =>
    [joinCode, "joinRequiredFields"] as const,
  getJoinCodeData: (eventId: string) => [eventId, "joinCodeData"] as const,
  getUserRole: (eventId: string) => [eventId, "userRole"] as const,
  getPlayerStats: (eventId: string) => [eventId, "playerStats"] as const,
  getEditorStats: (eventId: string) => [eventId, "editorStats"] as const,
};

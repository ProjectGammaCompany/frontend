export const blockQueries = {
  base: (eventId: string) => [eventId] as const,
  getTasks: (eventId: string, blockId: string) =>
    [...blockQueries.base(eventId), blockId, "tasksList"] as const,
  getConditions: (eventId: string, blockId: string) =>
    [...blockQueries.base(eventId), blockId, "conditionsList"] as const,
  getSettings: (eventId: string, blockId: string) =>
    [...blockQueries.base(eventId), blockId, "settings"] as const,
};

import type { ClientGroup, ServerGroup } from "@/src/entities";
import { v4 as uuidv4 } from "uuid";

export const mapServerGroupToClientGroup = (groups: ServerGroup[]) => {
  return groups.map<ClientGroup>((group) => {
    return {
      ...group,
      clientId: uuidv4(),
    };
  });
};

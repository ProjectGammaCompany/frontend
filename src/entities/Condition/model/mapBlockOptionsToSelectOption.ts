import type { BlockOption } from "../api/getBlocksOptions";

export const mapBlockOptionsToSelectOption = (blocks: BlockOption[]) => {
  return blocks.map((block) => {
    return { value: block.id, label: block.name };
  });
};

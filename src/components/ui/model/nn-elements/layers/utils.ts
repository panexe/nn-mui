import { Elements } from "react-flow-renderer";
/**
 * Returns true if the element with the given id, is in the selectedElements arr
 * @param id id of the node to check
 * @returns boolean, true when selected
 */
export const isSelected = (
  id: string,
  selectedElements: Elements<any> | null
): boolean => {
  if (selectedElements === null) {
    return false;
  }
  return selectedElements.find((el) => el.id === id) !== undefined;
};

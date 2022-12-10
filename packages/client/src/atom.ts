import { atom } from "recoil";
import { Todo } from "server/src/types/generated/graphql";

export const todoListState = atom<ReadonlyArray<Todo>>({
  key: "todoListState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

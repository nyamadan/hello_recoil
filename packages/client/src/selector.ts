import { selector } from "recoil";
import { Todo } from "server/src/types/generated/graphql";
import { todoListState } from "./atom";

export const openStatusTodoListState = selector<readonly Todo[]>({
  key: "openStatusTodoListState",
  get: ({ get }) => {
    return get(todoListState).filter((todo) => todo.status === "OPEN");
  },
});

export const closeStatusTodoListState = selector<readonly Todo[]>({
  key: "closeStatusTodoListState",
  get: ({ get }) => {
    return get(todoListState).filter((todo) => todo.status === "CLOSE");
  },
});

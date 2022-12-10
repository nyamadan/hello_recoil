import { Prisma, PrismaClient } from "@prisma/client";
import { ulid } from "ulid";
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  Todo,
} from "./types/generated/graphql";
const prisma = new PrismaClient();

const Query: QueryResolvers = {
  getTodo: async (...args) => {
    const [_, { id }] = args;

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo == null) {
      return null;
    }

    return {
      ...todo,
      status: todo.status as Todo["status"],
      createdAt: todo.createdAt.toISOString(),
    };
  },

  getTodoList: async () => {
    const result = await prisma.todo.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return result.map<Todo>((todo) => ({
      ...todo,
      status: todo.status as Todo["status"],
      createdAt: todo.createdAt.toISOString(),
    }));
  },
};

const Mutation: MutationResolvers = {
  addTodo: async (_, { text }) => {
    const data: Prisma.TodoUncheckedCreateInput = {
      id: ulid(),
      text,
    };

    const todo = await prisma.todo.create({ data });
    return {
      ...todo,
      status: todo.status as Todo["status"],
      createdAt: todo.createdAt.toISOString(),
    };
  },
  updateTodo: async (_, { id, status, text }) => {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text: text ?? undefined,
        status: status ?? undefined,
      },
    });

    return {
      ...todo,
      status: todo.status as Todo["status"],
      createdAt: todo.createdAt.toISOString(),
    };
  },
};

const resolvers: Resolvers = { Query, Mutation };

export default resolvers;

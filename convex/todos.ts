import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({ 
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
});

export const addTodo = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, { text }) => {
        const todoId = await ctx.db.insert("todos", { text, isCompleted: false });
        return todoId;
    }
});

export const toggleTodo = mutation({
    args: {
        id:v.id("todos"),
    },
    handler: async (ctx, { id }) => {
        const todo = await ctx.db.get(id);
        if (!todo) throw new ConvexError("Todo not found");
        await ctx.db.patch(id, { isCompleted: !todo.isCompleted });
        return todo;
    }
}); 

export const deleteTodo = mutation({
    args: {
        id:v.id("todos"),
    },
    handler: async (ctx, { id }) => {
        const todo = await ctx.db.get(id);
        if (!todo) throw new ConvexError("Todo not found");
        await ctx.db.delete(id);
        return todo;
    }
});

export const updateTodo = mutation({
    args: {
        id:v.id("todos"),
        text:v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { 
            text: args.text,
        });
        return args.id;
    }
});

export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();

        // Delete all todos
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return {deletedCount: todos.length};
    }
});


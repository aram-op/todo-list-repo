import {createPool} from '@vercel/postgres';
import {Todo} from '@/app/lib/definitions';

const pool = createPool({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
});

export async function fetchFilteredTodos(query: string) {

    try {
        const todos = await pool.sql<Todo>`
            SELECT * FROM todos WHERE UPPER(title) LIKE UPPER(${`%${query}%`});
        `;

        return todos.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch todos.');
    }
}

export async function fetchTodoById(id: string) {
    try {
        const result = await pool.sql<Todo>`
            SELECT * FROM todos WHERE id = ${id};
        `;

        return result.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch todo.');
    }
}

export async function updateTodo(todo: Todo) {
    try {
        const result = await pool.sql`
            UPDATE todos
             SET title = ${`${todo.title}`},
             is_completed = ${`${todo.is_completed}`}
             WHERE id = ${`${todo.id}`}
                RETURNING *;
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update todo.');
    }
}

export async function updateTodoTitle(id: string, title: string) {
    try {
        const result = await pool.sql`
            UPDATE todos
             SET title = ${`${title}`},
             WHERE id = ${`${id}`}
                RETURNING *;
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update todo.');
    }
}

export async function deleteTodoById(id: string) {
    try {
        const result = await pool.sql`
              DELETE FROM todos WHERE id = ${`${id}`};
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete todo.');
    }
}

export async function addTodo(title: string) {
    try {
        const result = await pool.sql`
            INSERT INTO todos (title, is_completed)
             VALUES
             (${title}, false)
             ON CONFLICT (id) DO NOTHING;
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add todo.')
    }
}
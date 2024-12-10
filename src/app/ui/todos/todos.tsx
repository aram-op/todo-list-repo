'use client';

import TodoListItem from '@/app/ui/todo-list-item/todo-list-item';
import {fetchFilteredTodos} from '@/app/lib/data';
import {useEffect, useState} from 'react';
import {Todo} from '@/app/lib/definitions';
import styles from './todos.module.css';

function Todos({query}: { query: string }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<Error | null>(null);

    async function getTodos() {
        const result = await fetchFilteredTodos(query);
        setTodos(result);
    }

    function handleItemRemoved(id: string) {
        const todosClone = todos.map((todo) => todo).filter((todo) => todo.id !== id);
        setTodos(todosClone);
    }

    useEffect(() => {
        getTodos().catch((err) => {
            setError(() => err);
        });
    }, [query]);

    if(error) throw new Error('Failed to fetch todos :(');

    const list = todos.map((todo) => {
            return (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onItemRemoved={handleItemRemoved}
                />
            );
        }
    );

    return (
        <ul className={styles.list}>
            {list}
        </ul>
    );
}

export default Todos;

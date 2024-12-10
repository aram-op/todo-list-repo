'use client';

import {useState} from 'react';
import styles from './todo-list-item.module.css';
import {Todo} from '@/app/lib/definitions';
import {deleteTodoById, updateTodo} from '@/app/lib/data';
import {useRouter} from 'next/navigation';

function TodoListItem({todo, onItemRemoved}: {
    todo: Todo,
    onItemRemoved: (id: string) => void,
}) {
    const [isDone, setIsDone] = useState(todo.is_completed);
    const router = useRouter();

    async function handleMarkDone() {
        setIsDone(!isDone);
        await updateTodo({...todo, is_completed: !isDone});
    }

    async function handleRemove() {
        await deleteTodoById(todo.id);
        onItemRemoved(todo.id);
    }

    function handleSelectItem() {
        router.push(`todos/${todo.id}/edit`);
    }

    return (
        <li className={styles.item}>
            <p onClick={handleSelectItem}
               className={`${styles.text} ${isDone ? styles.completed : ''}`}>{todo.title}</p>
            <button onClick={() => handleMarkDone()} className={styles.complete}>
                <img src="check-mark.svg" width="20" height="20"/>
            </button>
            <button onClick={() => handleRemove()} className={styles.delete}>
                <img src="remove.svg" width="25" height="25"/>
            </button>
        </li>
    );
}

export default TodoListItem;
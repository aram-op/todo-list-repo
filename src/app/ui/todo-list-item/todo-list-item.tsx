'use client';

import {useCallback, useState} from 'react';
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

    function handleMarkDone() {
        try {
            setIsDone(i => !i);
            updateTodo({...todo, is_completed: !isDone});
        } catch (e) {
            setIsDone((val) => !val);
            throw e;
        }
    }

    function handleRemove() {
        try {
            deleteTodoById(todo.id);
        } catch (e) {
            throw e;
        }
        onItemRemoved(todo.id);
    }

    const handleSelectItem = useCallback(() => {
        router.push(`todos/${todo.id}/edit`);
    }, [todo]);

    return (
        <li className={styles.item}>
            <p onClick={handleSelectItem}
               className={`${styles.text} ${isDone ? styles.completed : ''}`}>{todo.title}</p>
            <button onClick={handleMarkDone} className={styles.complete}>
                <img src="check-mark.svg" width="20" height="20" alt="complete"/>
            </button>
            <button onClick={handleRemove} className={styles.delete}>
                <img src="remove.svg" width="25" height="25" alt="remove"/>
            </button>
        </li>
    );
}

export default TodoListItem;

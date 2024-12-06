'use client';

import {useState} from 'react';
import styles from './todo-list-item.module.css';

function TodoListItem({title} : {title: string}) {
    const [isDone, setIsDone] = useState(false);

    function handleMarkDone() {
        setIsDone(!isDone);
    }

    return(
        <li className={styles.item}>
            <p className={`${styles.text} ${isDone ? styles.completed : ''}`}>{title}</p>
            <button onClick={() => handleMarkDone()} className={styles.complete}>checkmark</button>
            <button className={styles.delete}>X</button>
        </li>
    );
}

export default TodoListItem;
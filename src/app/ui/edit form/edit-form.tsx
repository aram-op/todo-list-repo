'use client';

import {updateTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './edit-form.module.css';
import {poppins} from '@/app/ui/fonts';
import {Todo} from '@/app/lib/definitions';
import {ChangeEvent, FormEvent, useState} from 'react';

function EditForm({todo}: { todo: Todo }) {
    const [error, setError] = useState<{message: string} | null>(null);
    const [value, setValue] = useState(todo.title);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(error || value === todo.title) return;

        updateTodo({...todo, title: value});
        redirect('/');
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value;
        setValue(() => input);

        if (/^\s*$/.test(input)) {
            setError({message: 'Title field cannot be empty!'});
        } else {
            setError(null);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.errorMessage}>{error && error.message}</p>
            <input
                className={`${styles.title} ${poppins.className}`}
                name="title"
                defaultValue={todo.title}
                onChange={handleInputChange}
            />

            <button
                className={`${styles.edit} ${poppins.className}`}
                type={'submit'}
                disabled={/^\s*$/.test(value) || value === todo.title}
            >
                Save Changes
            </button>
        </form>
    );
}

export default EditForm;

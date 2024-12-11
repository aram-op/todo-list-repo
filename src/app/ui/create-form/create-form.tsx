'use client';

import {addTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './create-form.module.css';
import {poppins} from '@/app/ui/fonts';
import {ChangeEvent, FormEvent, useState} from 'react';

function CreateForm() {
    const [error, setError] = useState<{ message: string } | null>(null);
    const [value, setValue] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (error) return;

        addTodo(value);
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
                placeholder="... needs to be done"
                onChange={handleInputChange}
            />

            <button
                className={`${styles.create} ${poppins.className}`}
                type={'submit'}
                disabled={/^\s*$/.test(value)}
            >
                Create
            </button>
        </form>
    );
}

export default CreateForm;

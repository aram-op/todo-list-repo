'use client';

import {updateTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './edit-form.module.css';
import {poppins} from '@/app/ui/fonts';
import {Todo} from '@/app/lib/definitions';
import {useState} from 'react';

function EditForm({todo}: { todo: Todo }) {
    const [error, setError] = useState<{message: string} | null>(null);

    async function edit(formData: FormData) {
        const rawFormData = {
            title: formData.get('title'),
        };

        if(rawFormData.title && rawFormData.title === todo.title) {
            return;
        } else if (rawFormData.title) {
            await updateTodo({...todo, title: rawFormData.title.toString()});
            redirect('/');
        }
        setError({message: 'Title field cannot be empty!'});
    }

    function handleInputChange(input: string) {
        if(input.length > 0) {
            setError(null);
        }
    }

    return (
        <form className={styles.form} action={edit}>
            <p className={styles.errorMessage}>{error && error.message}</p>
            <input
                className={`${styles.title} ${poppins.className}`}
                name="title"
                defaultValue={todo.title}
                onChange={(e) => handleInputChange(e.target.value)}
            />

            <button className={`${styles.edit} ${poppins.className}`} type={'submit'}>Save Changes</button>
        </form>
    );
}

export default EditForm;

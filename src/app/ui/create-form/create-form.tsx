'use client';

import {addTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './create-form.module.css';
import {poppins} from '@/app/ui/fonts';
import {useState} from 'react';

function CreateForm() {
    const [error, setError] = useState<{message: string} | null>(null);

    async function create(formData: FormData) {
        const rawFormData = {
            title: formData.get('title'),
        };

        if (rawFormData.title) {
            await addTodo(rawFormData.title.toString());
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
        <form className={styles.form} action={create}>
            <p className={styles.errorMessage}>{error && error.message}</p>
            <input
                className={`${styles.title} ${poppins.className}`}
                name="title"
                placeholder="... needs to be done"
                onChange={(e) => handleInputChange(e.target.value)}
            />

            <button className={`${styles.create} ${poppins.className}`} type={'submit'}>Create</button>
        </form>
    );
}

export default CreateForm;

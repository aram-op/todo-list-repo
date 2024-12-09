'use client';

import {addTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './create-form.module.css';
import {poppins} from '@/app/ui/fonts';

function CreateForm() {
    async function create(formData: FormData) {
        const rawFormData = {
            title: formData.get('title'),
        };

        if (rawFormData.title) {
            await addTodo(rawFormData.title.toString());
            redirect('/');
        }
    }

    return (
        <form className={styles.form} action={create}>
            <input
                className={`${styles.title} ${poppins.className}`}
                name="title"
                placeholder="... needs to be done"
            />

            <button className={`${styles.create} ${poppins.className}`} type={'submit'}>Create</button>
        </form>
    );
}

export default CreateForm;

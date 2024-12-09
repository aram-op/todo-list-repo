'use client';

import {updateTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import styles from './edit-form.module.css';
import {poppins} from '@/app/ui/fonts';
import {Todo} from '@/app/lib/definitions';

function EditForm({todo}: { todo: Todo }) {
    async function edit(formData: FormData) {
        const rawFormData = {
            title: formData.get('title'),
        };

        if (rawFormData.title) {
            await updateTodo({...todo, title: rawFormData.title.toString()});
            redirect('/');
        }
    }

    return (
        <form className={styles.form} action={edit}>
            <input
                className={`${styles.title} ${poppins.className}`}
                name="title"
                defaultValue={todo.title}
            />

            <button className={`${styles.edit} ${poppins.className}`} type={'submit'}>Save Changes</button>
        </form>
    );
}

export default EditForm;

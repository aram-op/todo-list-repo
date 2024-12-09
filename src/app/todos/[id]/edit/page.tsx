import EditForm from '@/app/ui/edit form/edit-form';
import {fetchTodoById} from '@/app/lib/data';
import styles from '@/app/page.module.css';

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const todo = await fetchTodoById(id);

    return (
        <div className={styles.container}>
            <h1>Edit your todo</h1>
            <EditForm todo={todo}/>
        </div>
    );
}
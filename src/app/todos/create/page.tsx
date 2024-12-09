import CreateForm from '@/app/ui/create-form/create-form';
import styles from '../../page.module.css';

function CreateTodo() {
    return (
        <div className={styles.container}>
            <h1>Create your todo</h1>
            <CreateForm/>
        </div>
    );
}

export default CreateTodo;
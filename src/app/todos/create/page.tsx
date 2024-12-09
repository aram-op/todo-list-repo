import CreateForm from '@/app/ui/create-form/create-form';
import styles from '../../page.module.css';

function Page() {
    return (
        <div className={styles.container}>
            <h1>Create todo</h1>
            <CreateForm/>
        </div>
    );
}

export default Page;
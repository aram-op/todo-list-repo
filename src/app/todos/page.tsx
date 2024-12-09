import Todos from '@/app/ui/todos/todos';
import Searchbar from '@/app/ui/searchbar/searchbar';
import styles from '../page.module.css';

export default async function Page({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const {query = ''} = (await searchParams);

    return (
        <div className={styles.container} role="container">
            <h1><img src="check-mark-filled.svg" width="30" height="30"/> Todoist</h1>
            <Searchbar/>
            <Todos query={query}/>
        </div>
    );
}
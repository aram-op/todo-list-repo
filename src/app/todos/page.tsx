import Todos from '@/app/ui/todos/todos';
import Searchbar from '@/app/ui/searchbar/searchbar';
import styles from '../page.module.css';
import Heading from '@/app/ui/heading/heading';

export default async function Page({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const {query = ''} = (await searchParams);

    return (
        <div className={styles.container} role="container">
            <Heading/>
            <Searchbar/>
            <Todos query={query}/>
        </div>
    );
}

'use client';

import styles from './searchbar.module.css';
import {poppins} from '@/app/ui/fonts';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';

function Searchbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={styles.container}>
            <input
                className={poppins.className}
                placeholder="What's up ? ..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <Link href={'/todos/create'}>
                <button>
                    <img src="plus.svg" width="30" height="30"/>
                </button>
            </Link>
        </div>
    );
}

export default Searchbar;

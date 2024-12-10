'use client';

import {useContext} from 'react';
import {ThemeContext} from '@/context/Theme.context';
import styles from './heading.module.css';

export default function Heading() {
    const {toggleTheme} = useContext(ThemeContext);

    function handleChangeTheme() {
        toggleTheme();
    }

    return (
        <div className={styles.container}>
            <h1><img src="check-mark-filled.svg" width="30" height="30" alt="todoist logo"/> Todoist</h1>
            <button className={styles.toggle} onClick={handleChangeTheme}>
                <img src="sun.svg" width="20" height="20" alt="sun icon"/>
                /
                <img src="moon.svg" width="20" height="20" alt="moon icon"/>
            </button>
        </div>
    );
}

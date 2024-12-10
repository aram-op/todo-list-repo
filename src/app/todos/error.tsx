'use client';

import {useEffect} from 'react';
import '../globals.css';

export default function Error({error, reset,}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='errorContainer'>
            <h2>{error.message}</h2>
            <button onClick={reset}>Try again</button>
        </div>
    );
}

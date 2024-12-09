'use client';

import React, {useContext, useState} from 'react';
import {Theme, ThemeContext} from '@/context/Theme.context';

export type ThemeProviderProps = {
    children: React.ReactNode;
};

function ThemeContextProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState(Theme.LIGHT);

    const toggleTheme = () =>
        setTheme((oldTheme) =>
            oldTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        );

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
};

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error(
            'useThemeContext must be used within a ThemeContextProvider'
        );
    }

    return context;
};

export {ThemeContextProvider, useThemeContext};
import type {Metadata} from 'next';
import './globals.css';
import React from 'react';
import {poppins} from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: 'Todo List',
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    );
}

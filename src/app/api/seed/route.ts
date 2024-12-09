import {NextResponse} from 'next/server';
import {createPool} from '@vercel/postgres';

const seedDatabase = async () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        return 'DATABASE_URL environment variable is missing!';
    }

    const pool = createPool({connectionString});

    try {
        await pool.sql`
            CREATE TABLE IF NOT EXISTS todos (
             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
             title TEXT NOT NULL,
             is_completed BOOLEAN NOT NULL DEFAULT false
            );
        `;

        await pool.sql`
            INSERT INTO todos (title, is_completed)
             VALUES
             ('Buy a cake 🎂', false),
             ('Buy milk 🥛', false),
             ('Go for a walk', false)
             ON CONFLICT (id) DO NOTHING;
        `;


        return 'Database seeded successfully!';
    } catch (error) {
        console.error('Error seeding database:', error);
        return 'Failed to seed the database';
    }
};

export async function POST() {
    const result = await seedDatabase();

    return NextResponse.json({message: result});
}

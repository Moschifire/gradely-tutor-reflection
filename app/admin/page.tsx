import { createClient } from '@supabase/supabase-js';
import ReflectionList from './ReflectionList';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AdminPage(props: {
    searchParams: Promise<{ pin?: string }>
}) {
    const searchParams = await props.searchParams;
    const userPin = searchParams.pin;
    const correctPin = process.env.ADMIN_PIN;

    if (!userPin || userPin !== correctPin) {
        return <div style={{ padding: '100px', textAlign: 'center' }}><h1>Access Denied</h1><p>Incorrect Admin PIN.</p></div>;
    }

    const { data: reflections, error } = await supabase
        .from('tutor_reflections')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ backgroundColor: '#faf9f6', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                    <div>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem' }}>Gradely Tutor Insights</h1>
                        <p style={{ color: '#8888aa' }}>Reviewing {reflections?.length} tutor submissions</p>
                    </div>
                    <a href="/" style={{ color: '#2d6a4f', fontSize: '0.9rem' }}>Back to Form</a>
                </header>

                <ReflectionList reflections={reflections || []} />
            </div>
        </div>
    );
}
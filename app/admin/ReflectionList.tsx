'use client'
import { useState } from 'react';

export default function ReflectionList({ reflections }: { reflections: any[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const filtered = reflections.filter(r =>
        r.tutor_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.tutor_email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ marginTop: '24px' }}>
            <input
                type="text"
                placeholder="Search tutors by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e8e7e3', marginBottom: '20px' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filtered.map((r) => (
                    <div key={r.id} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1.5px solid #e8e7e3', overflow: 'hidden' }}>
                        {/* Header Row */}
                        <div
                            onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                            style={{ padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#8888aa', textTransform: 'uppercase', marginBottom: '4px' }}>
                                    {new Date(r.created_at).toLocaleDateString()} at {new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>{r.tutor_name}</h3>
                                <span style={{ fontSize: '0.85rem', color: '#4a4a6a' }}>{r.tutor_email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={badgeStyle(r.s5_self_assessment)}>{r.s5_self_assessment}</span>
                                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                    {expandedId === r.id ? 'Close' : 'View Full Reflection'}
                                </button>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedId === r.id && (
                            <div style={{ padding: '0 20px 30px', borderTop: '1px solid #e8e7e3', backgroundColor: '#fcfcfc' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>

                                    {/* Section 1 */}
                                    <div>
                                        <h4 style={secTitleStyle}>Section 1: Real Sessions</h4>
                                        <DataBlock label="Effective Session" text={r.s1_effective_session} />
                                        <DataBlock label="Failed Session" text={r.s1_failed_session} />
                                        <DataBlock label="Unsure Moments" text={r.s1_unsure_moments} />
                                    </div>

                                    {/* Section 2 */}
                                    <div>
                                        <h4 style={secTitleStyle}>Section 2: Scenarios</h4>
                                        <DataBlock label="Sc1: Reading" text={r.s2_sc1_reading} />
                                        <DataBlock label="Sc1: Steps" text={r.s2_sc1_steps} />
                                        <DataBlock label="Sc2: Decision" text={r.s2_sc2_decision} />
                                        <DataBlock label="Sc2: Action" text={r.s2_sc2_action} />
                                        <DataBlock label="Sc3: Reality" text={r.s2_sc3_reality} />
                                        <DataBlock label="Sc3: Priorities" text={r.s2_sc3_priorities} />
                                    </div>

                                    {/* Section 3 & 4 */}
                                    <div>
                                        <h4 style={secTitleStyle}>Section 3 & 4: Dynamics & Pressures</h4>
                                        <DataBlock label="Hardest Situation" text={r.s3_hardest_situation} />
                                        <DataBlock label="Parent Expectations" text={r.s3_parent_expectations} />
                                        <DataBlock label="Invisible Stress" text={r.s4_invisible_stress} />
                                        <DataBlock label="Off Day Reason" text={r.s4_off_day_reason} />
                                    </div>

                                    {/* Section 5 & 6 */}
                                    <div>
                                        <h4 style={secTitleStyle}>Section 5 & 6: Self-Awareness & System</h4>
                                        <DataBlock label="Habit" text={r.s5_habit} />
                                        <DataBlock label="Observer Notice" text={r.s5_observer_notice} />
                                        <DataBlock label="Follow up: Gap" text={r.s6_gap_reason} />
                                        <DataBlock label="System Obstacles" text={r.s7_system_obstacle} />
                                    </div>

                                </div>

                                {/* Final Commitment */}
                                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1a1a2e', borderRadius: '8px', color: 'white' }}>
                                    <h4 style={{ color: '#52b788', marginBottom: '10px' }}>Final Commitment</h4>
                                    <p style={{ fontStyle: 'italic', fontSize: '1rem' }}>"{r.s8_commitment}"</p>
                                    {r.s8_extra && <div style={{ marginTop: '15px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}><strong>Extra Note:</strong> {r.s8_extra}</div>}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helpers
function DataBlock({ label, text }: { label: string, text: string }) {
    if (!text) return null;
    return (
        <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#8888aa', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '0.9rem', color: '#1a1a2e', lineHeight: '1.4' }}>{text}</div>
        </div>
    );
}

const secTitleStyle = { fontSize: '0.8rem', color: '#2d6a4f', borderBottom: '1px solid #d8f3dc', marginBottom: '15px', paddingBottom: '5px', textTransform: 'uppercase' as const };

const badgeStyle = (type: string) => {
    let bg = '#eee'; let text = '#666';
    if (type === 'con') { bg = '#d8f3dc'; text = '#2d6a4f'; }
    if (type === 'uns') { bg = '#fde8e0'; text = '#e76f51'; }
    return { backgroundColor: bg, color: text, padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' };
};
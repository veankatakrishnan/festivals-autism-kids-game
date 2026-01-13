import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { festivals } from '../data/festivals';
import { ArrowLeft, Check, X, RefreshCw } from 'lucide-react';

const MatchingGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const festival = festivals.find(f => f.id === id);

    const [draggables, setDraggables] = useState([]);
    const [matches, setMatches] = useState({}); // { itemId: true/false }
    const [attempts, setAttempts] = useState({}); // { itemId: numberOfAttempts }
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (festival) {
            // Shuffle items for the drag pile
            const items = [...festival.items].sort(() => Math.random() - 0.5);
            setDraggables(items);
        }
    }, [festival]);

    useEffect(() => {
        if (festival && Object.keys(matches).length === festival.items.length) {
            setTimeout(() => setCompleted(true), 1000);
        }
    }, [matches, festival]);

    if (!festival) return <div>Festival not found</div>;

    const handleDragEnd = (event, info, item) => {
        // Check if dropped near the correct shadow
        // We can use document.elementFromPoint or simple coordinate check if we know where shadows are.
        // Simplifying: Let's assume the user drops it "on" the shadow card.
        // For robust "Touch" detection in React without refs for every shadow, we can verify if the drag ended over the specific target zone.

        // Hack: We'll accept the drop if it's in the "top half" of the screen (shadow zone) 
        // AND roughly aligned horizontally? No, that's error prone.

        // Better: Allow drop anywhere, calculate distance to target.
        // This requires ref access.
        // Let's rely on visual feedback: The component logic here simplifies "Collision" to:
        // "Did the user release the mouse over the target element?"

        // Use simple logic: Check if drag point is within target bounding box.
        const dropTarget = document.getElementById(`shadow-${item.id}`);
        if (dropTarget) {
            const rect = dropTarget.getBoundingClientRect();
            const x = info.point.x;
            const y = info.point.y;

            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                // Match!
                setMatches(prev => ({ ...prev, [item.id]: true }));
                return;
            }
        }

        // If we are here, it wasn't a match.
        // If dropped on WRONG shadow?
        festival.items.forEach(target => {
            if (target.id !== item.id) {
                const wrongTarget = document.getElementById(`shadow-${target.id}`);
                if (wrongTarget) {
                    const rect = wrongTarget.getBoundingClientRect();
                    const x = info.point.x;
                    const y = info.point.y;
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        // Log a mistake
                        setAttempts(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
                    }
                }
            }
        });
    };

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexShrink: 0 }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ background: 'transparent', fontSize: '1.2rem' }}>
                    <ArrowLeft /> Back
                </button>
                <h1 style={{ marginLeft: '1rem', color: festival.color }}>Shadow Match: {festival.name}</h1>
            </div>

            {!completed ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Shadows Area (Targets) */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                        background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--color-shadow)', minHeight: '200px', flexWrap: 'wrap', gap: '1rem'
                    }}>
                        {festival.items.map(item => (
                            <div
                                id={`shadow-${item.id}`}
                                key={item.id}
                                style={{
                                    width: '120px', height: '120px',
                                    borderRadius: '50%',
                                    background: matches[item.id] ? item.color : '#e0e0e0', // Fill color if matched
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '4px dashed #ccc',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                            >
                                <span style={{
                                    fontSize: '4rem',
                                    opacity: matches[item.id] ? 1 : 0.2,
                                    filter: matches[item.id] ? 'none' : 'grayscale(100%) brightness(0)'
                                }}>
                                    {item.icon}
                                </span>
                                {matches[item.id] && (
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        style={{ position: 'absolute', top: -10, right: -10, background: 'var(--color-success)', color: 'white', borderRadius: '50%', padding: '4px' }}
                                    >
                                        <Check size={20} />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Draggables Area */}
                    <div style={{
                        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
                        padding: '2rem'
                    }}>
                        {draggables.map(item => (
                            !matches[item.id] && (
                                <motion.div
                                    key={item.id}
                                    drag
                                    dragSnapToOrigin={true}
                                    onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                    whileHover={{ scale: 1.1, cursor: 'grab' }}
                                    whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
                                    style={{
                                        width: '100px', height: '100px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '3.5rem',
                                        border: `2px solid ${item.color}`
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                            )
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>
                        <p>Drag the items to their matching shadows!</p>
                    </div>

                </div>
            ) : (
                /* Results Screen */
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
                        textAlign: 'center', boxShadow: 'var(--color-shadow)', maxWidth: '600px', margin: 'auto'
                    }}
                >
                    <h2 style={{ fontSize: '2.5rem', color: festival.color, marginBottom: '2rem' }}>Great Job!</h2>

                    <div style={{ display: 'grid', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
                        {festival.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {attempts[item.id] ? (
                                        <span style={{ color: 'orange', fontWeight: '600' }}>Matched after retry</span>
                                    ) : (
                                        <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Perfect Match!</span>
                                    )}
                                    <Check color="var(--color-success)" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => { setMatches({}); setAttempts({}); setCompleted(false); navigate(-1); }} className="btn" style={{ background: 'var(--color-primary)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', fontSize: '1.2rem' }}>
                        Finish Game
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default MatchingGame;

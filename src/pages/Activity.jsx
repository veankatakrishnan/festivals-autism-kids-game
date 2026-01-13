import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { festivals } from '../data/festivals';
import { ArrowLeft, CheckCircle } from 'lucide-react';

/* Simple Confetti Component using accessible CSS/Motion */
const Celebration = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            flexDirection: 'column'
        }}
    >
        <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            style={{ fontSize: '5rem', color: 'var(--color-primary)' }}
        >
            🎉 Amazing! 🎉
        </motion.h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>You did it!</p>
    </motion.div>
);

const Activity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const festival = festivals.find(f => f.id === id);

    const [items, setItems] = useState([]);
    const [placedItems, setPlacedItems] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (festival) {
            setItems(festival.items);
        }
    }, [festival]);

    useEffect(() => {
        if (festival && placedItems.length === festival.items.length && festival.items.length > 0) {
            setTimeout(() => setCompleted(true), 500);
        }
    }, [placedItems, festival]);

    if (!festival) return <div>Festival not found</div>;

    const handleDragEnd = (event, info, item) => {
        // Simple logic: if dropped roughly in the center (placing area), mark as placed.
        // In a real app we'd use collision detection with refs, but for simplicity:
        // We check if it's dragged far enough from its starting sidebar position.

        // Actually, let's make it simpler: Clicking the item moves it to the scene automatically?
        // No, dragging is part of the request.
        // We can just check the drag ending X/Y.
        // If X < window width * 0.7 (assuming sidebar is on right), it's a "drop".

        // Better yet: We just count it as "placed" wherever it lands in the decoration zone.
        // But to make it distinct, let's say: Drop any item onto the "Canvas" area.

        // We'll mark it as 'placed' which moves it from Sidebar array to Placed array.

        const isOverCanvas = info.point.x < window.innerWidth * 0.75; // Sidebar is right 25%

        if (isOverCanvas) {
            // Find existing placement or create new random spot in canvas
            // For simplicity, we just randomly place it in the center area if dropped.
            if (!placedItems.find(i => i.id === item.id)) {
                setPlacedItems([...placedItems, { ...item, x: info.point.x, y: info.point.y }]);
            }
        }
    };

    const isPlaced = (itemId) => placedItems.some(i => i.id === itemId);

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
                {completed && <Celebration />}
            </AnimatePresence>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', fontSize: '1.2rem' }}>
                    <ArrowLeft /> Back
                </button>
                <h1 style={{ marginLeft: '1rem', color: festival.color }}>Decorate for {festival.name}</h1>
            </div>

            <div style={{
                flex: 1,
                display: 'flex',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: `2px solid ${festival.color}`
            }}>
                {/* Canvas Area */}
                <div style={{ flex: 3, position: 'relative', background: festival.bgGradient }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0.1, fontSize: '20rem', pointerEvents: 'none'
                    }}>
                        {festival.items[0].icon}
                    </div>

                    <h3 style={{ position: 'absolute', bottom: 20, left: 20, color: 'var(--color-text-light)' }}>
                        Drag items here!
                    </h3>

                    {/* Render Placed Items */}
                    {placedItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1, x: 0, y: 0 }} // Simplified: we center them or could use drag info
                            // To make it fun, let's just arrange them in a grid or circle in the center? 
                            // Or better: Allow them to be dragged AROUND the canvas after placing?
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Free drag within parent?
                            dragElastic={0.1}
                            style={{
                                position: 'absolute',
                                // Randomize initial placement slightly if we don't use drop coordinates
                                // We'll just center them for now but allow drag
                                top: '50%',
                                left: '50%',
                                fontSize: '4rem',
                                cursor: 'grab',
                                marginLeft: (index - placedItems.length / 2) * 60, // Spread them out
                                marginTop: (Math.random() - 0.5) * 100
                            }}
                            whileHover={{ scale: 1.8 }}
                        >
                            {item.icon}
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar */}
                <div style={{
                    flex: 1,
                    background: '#f8f9fa',
                    borderLeft: '1px solid #ddd',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Items</h3>
                    {items.map((item) => (
                        !isPlaced(item.id) && (
                            <motion.div
                                key={item.id}
                                drag
                                dragSnapToOrigin={true} // Snap back if not dropped successfully (we handle success by removing from this list)
                                onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                whileHover={{ scale: 1.1 }}
                                whileDrag={{ scale: 1.2, zIndex: 100 }}
                                style={{
                                    fontSize: '3rem',
                                    cursor: 'grab',
                                    background: 'white',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    width: '80px', height: '80px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                {item.icon}
                            </motion.div>
                        )
                    ))}

                    {placedItems.length === items.length && (
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            style={{ marginTop: 'auto', textAlign: 'center' }}
                        >
                            <CheckCircle size={48} color="var(--color-success)" />
                            <p>All done!</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activity;

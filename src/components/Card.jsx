import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ festival, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                background: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                border: `3px solid ${festival.color}`,
                width: '100%',
                height: '100%',
                minHeight: '200px',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Gradient */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: festival.bgGradient,
                    opacity: 0.3,
                    zIndex: 0
                }}
            />

            <div style={{ fontSize: '4rem', zIndex: 1 }}>
                {/* We can use the first item as an icon if no specific icon is set, or just a generic one */}
                {festival.items[0].icon}
            </div>

            <h2 style={{
                color: festival.color,
                fontSize: '1.5rem',
                fontWeight: '800',
                zIndex: 1,
                textAlign: 'center'
            }}>
                {festival.name}
            </h2>

            <p style={{
                color: 'var(--color-text-light)',
                textAlign: 'center',
                zIndex: 1,
                fontSize: '0.9rem'
            }}>
                {festival.description}
            </p>
        </motion.div>
    );
};

export default Card;

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// This component uses React Portals to render outside the main DOM hierarchy
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    // Create a portal to the document body
    return ReactDOM.createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        maxWidth: '500px',
                        width: '90%',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}
                    onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>{title}</h2>
                        <button onClick={onClose} className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#999' }}>
                            <X size={24} />
                        </button>
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default Modal;

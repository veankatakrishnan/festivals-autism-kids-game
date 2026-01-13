import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { festivals } from '../data/festivals';
import { ArrowLeft, Palette, Shapes, HelpCircle } from 'lucide-react';

const FestivalMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const festival = festivals.find(f => f.id === id);

    if (!festival) return <div>Festival not found</div>;

    const features = [
        {
            id: 'decorate',
            title: 'Decorate',
            icon: <Palette size={48} />,
            desc: 'Drag and drop fun!',
            color: '#4CC9F0',
            path: `/activity/${id}`
        },
        {
            id: 'match',
            title: 'Match Shadows',
            icon: <Shapes size={48} />,
            desc: 'Find the shapes!',
            color: '#4361EE',
            path: `/match/${id}`
        },
        {
            id: 'quiz',
            title: 'Fun Quiz',
            icon: <HelpCircle size={48} />,
            desc: 'What do you know?',
            color: '#F72585',
            path: `/quiz/${id}`
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

            <div style={{ width: '100%', textAlign: 'left' }}>
                <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', fontSize: '1.2rem' }}>
                    <ArrowLeft /> Back to Festivals
                </button>
            </div>

            <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 className="title" style={{ color: festival.color, marginBottom: '0.5rem' }}>{festival.name} Activities</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>What do you want to play?</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '900px'
            }}>
                {features.map((feature, idx) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(feature.path)}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            borderTop: `6px solid ${feature.color}`
                        }}
                    >
                        <div style={{
                            color: feature.color,
                            background: `${feature.color}20`,
                            padding: '1.5rem',
                            borderRadius: '50%'
                        }}>
                            {feature.icon}
                        </div>
                        <h2 style={{ fontSize: '1.5rem' }}>{feature.title}</h2>
                        <p style={{ color: 'var(--color-text-light)' }}>{feature.desc}</p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default FestivalMenu;

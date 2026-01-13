import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { festivals } from '../data/festivals';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="title">Choose a Festival!</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                    Let's learn and decorate together.
                </p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.1 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1000px'
                }}
            >
                {festivals.map((festival) => (
                    <motion.div key={festival.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <Card
                            festival={festival}
                            onClick={() => navigate(`/festival/${festival.id}`)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Home;

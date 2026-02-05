import React, { useState, useContext, useRef, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';
import { Lock, Save, Settings } from 'lucide-react';

/*
 * This component demonstrates:
 * 1. Context API (SettingsContext)
 * 2. React Portals (Modal)
 * 3. Refs (focus management)
 * 4. Functional Components & Hooks
 */
const ParentSettings = () => {
    const { settings, updateSettings } = useContext(SettingsContext);

    // Local state for the form (buffers changes before saving)
    const [formData, setFormData] = useState(settings);
    const [isGateOpen, setIsGateOpen] = useState(true); // Start locked
    const [gateAnswer, setGateAnswer] = useState('');
    const [gateProblem, setGateProblem] = useState({ q: '3 x 4 = ?', a: '12' });

    // Ref for focus management
    const answerInputRef = useRef(null);

    useEffect(() => {
        // Generate a random simple math problem for the parent gate
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 2;
        setGateProblem({ q: `${a} x ${b} = ?`, a: (a * b).toString() });

        if (answerInputRef.current) {
            answerInputRef.current.focus();
        }
    }, [isGateOpen]);

    const handleGateSubmit = (e) => {
        e.preventDefault();
        if (gateAnswer === gateProblem.a) {
            setIsGateOpen(false); // Unlock
        } else {
            alert('Incorrect. Access Denied.');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateSettings(formData);
        alert('Settings Saved!');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Parent Gate Modal */}
            <Modal isOpen={isGateOpen} onClose={() => { }} title="Parent Gate">
                <div style={{ textAlign: 'center' }}>
                    <Lock size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                    <p style={{ marginBottom: '1.5rem' }}>Please solve this to access settings:</p>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{gateProblem.q}</p>
                    <form onSubmit={handleGateSubmit}>
                        <input
                            ref={answerInputRef}
                            type="text"
                            value={gateAnswer}
                            onChange={(e) => setGateAnswer(e.target.value)}
                            style={{
                                padding: '1rem', fontSize: '1.5rem', width: '100px', textAlign: 'center',
                                borderRadius: 'var(--radius-md)', border: '2px solid #ccc', marginBottom: '1.5rem'
                            }}
                        />
                        <button type="submit" className="btn" style={{ width: '100%', background: 'var(--color-primary)', color: 'white' }}>
                            Unlock
                        </button>
                    </form>
                </div>
            </Modal>

            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: '#eee', borderRadius: '50%' }}>
                    <Settings size={32} />
                </div>
                <div>
                    <h1 style={{ color: 'var(--color-primary)' }}>Parent Settings</h1>
                    <p>Customize the experience for {settings.childName}</p>
                </div>
            </header>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSave}
                style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--color-shadow)',
                    display: isGateOpen ? 'none' : 'flex', // Hide if locked (though modal covers it)
                    flexDirection: 'column',
                    gap: '2rem'
                }}
            >
                <section>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Personalization</h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Child's Name</label>
                        <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                        />
                    </div>
                </section>

                <section>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Appearance Preference for the Kid</h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Theme Color</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {['#FF6B6B', '#4CC9F0', '#4361EE', '#F72585', '#7209B7'].map(color => (
                                <div
                                    key={color}
                                    onClick={() => setFormData(p => ({ ...p, themeColor: color }))}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%', background: color,
                                        cursor: 'pointer',
                                        border: formData.themeColor === color ? '4px solid #333' : '2px solid white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Preferences</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="checkbox"
                            checked={formData.soundEnabled}
                            onChange={e => setFormData(p => ({ ...p, soundEnabled: e.target.checked }))}
                            id="sound"
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label htmlFor="sound" style={{ fontSize: '1.1rem' }}>Enable Sound Effects</label>
                    </div>
                </section>

                <button type="submit" className="btn" style={{ marginTop: '1rem', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <Save size={20} /> Save Settings
                </button>
            </motion.form>
        </div>
    );
};

export default ParentSettings;

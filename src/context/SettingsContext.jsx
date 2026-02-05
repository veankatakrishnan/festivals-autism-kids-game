import React, { createContext, useState, useEffect } from 'react';

// Create confirmation context
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    // Load from local storage if available
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('autism-game-settings');
        return saved ? JSON.parse(saved) : {
            childName: 'Buddy',
            themeColor: '#FF6B6B', // Default primary color
            soundEnabled: true,
            visuals: 'simple' // simple, vibrant
        };
    });

    useEffect(() => {
        localStorage.setItem('autism-game-settings', JSON.stringify(settings));

        // Apply theme color globally via CSS variable
        document.documentElement.style.setProperty('--color-primary', settings.themeColor);
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

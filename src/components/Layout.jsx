import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            {/* Background decoration could go here */}
            <main className="container" style={{ minHeight: 'calc(100vh - 60px)', padding: '2rem 1rem' }}>
                <Outlet />
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                color: 'var(--color-text-light)',
                borderTop: '1px solid #eee'
            }}>
                <a href="/settings" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                    Parent Settings
                </a>
            </footer>
        </div>
    );
};

export default Layout;

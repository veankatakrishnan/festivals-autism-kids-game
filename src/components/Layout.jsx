import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            {/* Background decoration could go here */}
            <main className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

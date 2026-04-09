import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Nolan from './pages/Nolan.jsx'
import Whitelist from './pages/Whitelist.jsx'

function App() {
    useEffect(() => {
        const cursor = document.querySelector('.custom-cursor');
        const cursorTrail = document.querySelector('.cursor-trail');

        if (cursor && cursorTrail) {
            const handleMove = (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                setTimeout(() => {
                    cursorTrail.style.left = e.clientX + 'px';
                    cursorTrail.style.top = e.clientY + 'px';
                }, 80);
            };
            document.addEventListener('mousemove', handleMove);
            return () => document.removeEventListener('mousemove', handleMove);
        }
    }, []);

    return (
        <Router>
            <div className="custom-cursor"></div>
            <div className="cursor-trail"></div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nolan" element={<Nolan />} />
                <Route path="/whitelist" element={<Whitelist />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default App

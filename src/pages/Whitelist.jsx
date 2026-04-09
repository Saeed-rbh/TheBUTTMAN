import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TASKS = [
    {
        id: 1,
        title: 'Follow The Butt-Man on X',
        url: 'https://x.com/thebuttman_nft',
    },
    {
        id: 2,
        title: 'Like & Repost the pinned tweet',
        url: 'https://x.com/thebuttman_nft',
    },
    {
        id: 3,
        title: 'Comment on the pinned tweet, and tag 2 friends',
        url: 'https://x.com/thebuttman_nft',
    },
];

const STORAGE_KEY = 'buttman_whitelist';

function getWhitelist() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveToWhitelist(entry) {
    const list = getWhitelist();
    list.push({ ...entry, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function isAlreadyRegistered(wallet) {
    return getWhitelist().some(e => e.wallet.toLowerCase() === wallet.toLowerCase());
}

export default function Whitelist() {
    const navigate = useNavigate();
    const [completedTasks, setCompletedTasks] = useState({});
    const [username, setUsername] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifiedXId, setVerifiedXId] = useState(null);
    const [checkingTaskId, setCheckingTaskId] = useState(null);
    const [wallet, setWallet] = useState('');
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');
    const [entryCount, setEntryCount] = useState(0);

    useEffect(() => {
        setEntryCount(getWhitelist().length);
    }, []);

    const allTasksDone = TASKS.every(t => completedTasks[t.id]);

    const autoCheckTasks = (normalizedUser) => {
        // Stagger check each task one by one
        TASKS.forEach((task, idx) => {
            setTimeout(() => {
                setCheckingTaskId(task.id);
                // After a brief "checking" state, mark it done
                setTimeout(() => {
                    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
                    setCheckingTaskId(null);
                }, 800);
            }, idx * 1200);
        });
    };

    const handleVerifyX = () => {
        const cleanUser = username.trim().replace(/^@/, '');
        if (!cleanUser || !/^[a-zA-Z0-9_]{1,15}$/.test(cleanUser)) {
            setErrors({ username: 'Enter a valid X username' });
            return;
        }
        setErrors({});
        setIsVerifying(true);
        // Simulate API lookup for the X account
        setTimeout(() => {
            const normalizedUser = `@${cleanUser}`;
            setIsVerifying(false);
            setVerifiedXId(normalizedUser);
            // Start auto-checking tasks
            autoCheckTasks(normalizedUser);
        }, 1500);
    };

    const validate = () => {
        const errs = {};
        const cleanWallet = wallet.trim();
        if (!cleanWallet) {
            errs.wallet = 'Wallet address is required';
        } else if (!/^0x[a-fA-F0-9]{40}$/.test(cleanWallet)) {
            errs.wallet = 'Must be a valid Ethereum address (0x...)';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        if (!verifiedXId) {
            setSubmitStatus('error');
            setSubmitMessage('Verify your X ID first!');
            return;
        }
        if (!allTasksDone) {
            setSubmitStatus('error');
            setSubmitMessage('Waiting for task verification...');
            return;
        }
        if (!validate()) return;
        const cleanWallet = wallet.trim();
        if (isAlreadyRegistered(cleanWallet)) {
            setSubmitStatus('error');
            setSubmitMessage('This wallet is already on the whitelist!');
            return;
        }
        saveToWhitelist({ username: verifiedXId, wallet: cleanWallet });
        setSubmitStatus('success');
        setSubmitMessage("You're on the whitelist! Welcome to the squad 🎉");
        setEntryCount(prev => prev + 1);
        setUsername('');
        setVerifiedXId(null);
        setWallet('');
        setErrors({});
        setCompletedTasks({});
    };

    const dismissToast = () => {
        setSubmitStatus(null);
        setSubmitMessage('');
    };

    return (
        <div className="wl-page">
            {/* Header */}
            <header className="wl-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    ← BACK
                </button>
                <div className="wl-entry-count">
                    <span className="wl-count-number">{entryCount}</span>
                    <span className="wl-count-label">on whitelist</span>
                </div>
            </header>

            {/* Hero */}
            <div className="wl-hero">
                <h1 className="wl-title">Join the Whitelist</h1>
                <p className="wl-subtitle">Complete the steps below to secure your spot</p>
            </div>

            {/* X Verification Gateway */}
            <div className="wl-username-section">
                <div className="wl-task-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.2rem', margin: '0', background: 'transparent' }}>
                    <label htmlFor="wl-username-verify" className="wl-username-label" style={{ fontFamily: 'Mali, cursive', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>First, enter your X username</label>
                    <div className="wl-username-row" style={{ width: '100%' }}>
                        <input
                            id="wl-username-verify"
                            type="text"
                            placeholder="@username"
                            value={verifiedXId || username}
                            onChange={e => setUsername(e.target.value)}
                            disabled={!!verifiedXId || isVerifying}
                            className={`wl-username-input ${verifiedXId ? 'wl-input-verified' : ''} ${errors.username ? 'wl-input-error' : ''}`}
                            style={{ background: '#0f172a', borderColor: '#1e293b' }}
                        />
                        <button
                            className={`wl-go-btn ${verifiedXId ? 'wl-go-done' : ''}`}
                            onClick={handleVerifyX}
                            disabled={!!verifiedXId || isVerifying}
                            type="button"
                            style={{ marginLeft: '10px' }}
                        >
                            {isVerifying ? 'Checking...' : verifiedXId ? 'Verified ✓' : 'Verify'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Task Cards — auto-checked by API */}
            <div className="wl-tasks" style={{ marginTop: '0' }}>
                {TASKS.map(task => {
                    const done = completedTasks[task.id];
                    const checking = checkingTaskId === task.id;
                    return (
                        <div key={task.id} className={`wl-task-card ${done ? 'wl-task-done' : ''} ${checking ? 'wl-task-checking' : ''}`}>
                            <div className="wl-task-number">
                                {done ? (
                                    <svg viewBox="0 0 24 24" className="wl-check-icon" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : checking ? (
                                    <span className="wl-spinner">…</span>
                                ) : (
                                    task.id
                                )}
                            </div>
                            <div className="wl-task-info">
                                <h3>{task.title}</h3>
                            </div>
                            <span className="wl-task-status-label">
                                {done ? '✅ Verified' : checking ? 'Checking...' : '⏳ Pending'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Form — unlocks after all tasks verified */}
            <form className={`wl-form ${(verifiedXId && allTasksDone) ? 'wl-form-unlocked' : 'wl-form-locked'}`} onSubmit={handleSubmit} style={{ marginTop: '0' }}>

                <div className="wl-field">
                    <label htmlFor="wl-wallet">Wallet Address</label>
                    <input
                        id="wl-wallet"
                        type="text"
                        placeholder="0x..."
                        value={wallet}
                        onChange={e => setWallet(e.target.value)}
                        disabled={!allTasksDone}
                        className={errors.wallet ? 'wl-input-error' : ''}
                    />
                    {errors.wallet && <span className="wl-error">{errors.wallet}</span>}
                </div>

                <button type="submit" className="wl-submit-btn" disabled={!(verifiedXId && allTasksDone)}>
                    Join NFT Whitelist
                </button>
            </form>

            {/* Toast */}
            {submitStatus && (
                <div className={`wl-toast wl-toast-${submitStatus}`} onClick={dismissToast}>
                    <span>{submitMessage}</span>
                    <button className="wl-toast-close">✕</button>
                </div>
            )}
        </div>
    );
}

// src/components/Dashboard/Overview.tsx
import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useYapsScore } from '../../hooks/useYapsScore';
import './Dashboard.css';

export function Overview() {
    const { user, ready, authenticated } = usePrivy();
    const [handle, setHandle] = useState('');
    const [apiHandle, setApiHandle] = useState('serpinxbt');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
    const { data, isLoading, error, refetch } = useYapsScore(apiHandle);

    const onFetch = () => {
        if (handle.trim()) {
            setApiHandle(handle);
            refetch(handle);
        }
    };

    // Fetch profile picture when apiHandle changes
    useEffect(() => {
        const getTwitterProfilePicture = async (username: string) => {
            try {
                console.log('Fetching profile picture for:', username);
                const profileUrl = `https://unavatar.io/x/${username}`;
                console.log('Profile picture URL:', profileUrl);
                setProfilePictureUrl(profileUrl);
            } catch (error) {
                console.error('Error getting profile picture URL:', error);
            }
        };

        if (apiHandle) {
            getTwitterProfilePicture(apiHandle);
        }
    }, [apiHandle]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Reputation Forge</h1>
                {ready && authenticated && user && (
                    <p className="user-greeting">
                        Welcome back, @{user.twitter?.username}! 👋
                    </p>
                )}
            </header>

            <section className="dashboard-control">
                <input
                    type="text"
                    value={handle}
                    onChange={e => setHandle(e.target.value)}
                    placeholder="Enter Kaito handle"
                />
                <button onClick={onFetch}>Fetch Score</button>
            </section>

            <section className="dashboard-content">
                {isLoading && <p>Loading…</p>}
                {error && <p className="error">Error: {error.message}</p>}
                {data && (
                    <div className="score-display">
                        <div className="user-info">
                            {profilePictureUrl && (
                                <img
                                    src={profilePictureUrl}
                                    alt={`@${data.username} profile picture`}
                                    className="profile-picture"
                                    onError={(e) => {
                                        console.log('Image failed to load:', e.currentTarget.src);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                    onLoad={(e) => {
                                        console.log('Image loaded successfully:', e.currentTarget.src);
                                    }}
                                />
                            )}
                            <span className="username">@{data.username}</span>
                        </div>
                        <p><strong>Score:</strong> {data.yaps_all.toFixed(2)}</p>
                    </div>
                )}
            </section>
        </div>
    );
} 
import { NavLink, Outlet } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import './Dashboard.css';

export function DashboardLayout() {
    const { user, logout, ready, authenticated } = usePrivy();

    return (
        <div className="dashboard-layout">
            <nav className="dashboard-nav">
                <NavLink to="/dashboard" className="forge-logo">Forge</NavLink>
                <div className="nav-links">
                    <NavLink to="/dashboard" end>Overview</NavLink>
                    <NavLink to="/dashboard/aura">Forge Aura</NavLink>
                    <NavLink to="/dashboard/rewards">Rewards</NavLink>
                    <NavLink to="/dashboard/settings">Settings</NavLink>
                    <NavLink to="/dashboard/help">Help</NavLink>
                    {ready && authenticated && user ? (
                        <div className="user-profile">
                            <span className="username">{user?.twitter?.username}</span>
                            <button className="logout-button" onClick={() => logout()}>
                                Log out
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/dashboard/login" className="login-link">Log In</NavLink>
                    )}
                </div>
            </nav>
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}

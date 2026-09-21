import { FormEvent, useEffect, useState } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { getApiErrorMessage } from '../../utils/apiError';
import { useAuth } from '../../hooks/useAuth';

interface LocationState {
  from?: string;
}

export function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const destination = state?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [email, password]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await login({
        email: email.trim(),
        password,
      });

      navigate(destination, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid email or password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-orb auth-orb-one" />
      <div className="auth-background-orb auth-orb-two" />

      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">H</div>

          <div>
            <strong>HRDashboard</strong>
            <span>Business Intelligence</span>
          </div>
        </div>

        <div className="login-heading">
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Sign in to your workspace</h1>
          <p>
            Access projects, metrics, insights and analytics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-stack">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <div className="password-field">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="button-full"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
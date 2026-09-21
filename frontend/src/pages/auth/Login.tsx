import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Button } from '../../components/common/Button';
import { BrandLogo } from '../../components/common/BrandLogo';
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
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [email, password]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
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
      setError(
        getApiErrorMessage(
          err,
          'Invalid email or password.',
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-video-layer">
        <video
          className="auth-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/PHMA1268.MP4"
            type="video/mp4"
          />
        </video>

        <div className="auth-video-overlay" />
        <div className="auth-video-vignette" />
      </div>

      <div className="auth-content">
        <div className="auth-brand">
          <BrandLogo />
        </div>

        <main className="login-card">
          <div className="login-card-glow" />

          <div className="login-heading">
            <span className="eyebrow">
              SECURE WORKSPACE
            </span>

            <h1>Welcome back.</h1>

            <p>
              Sign in to access your analytics workspace,
              dashboards and business intelligence.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-stack login-form"
          >
            <Input
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <div className="password-field">
              <Input
                id="password"
                type={
                  showPassword ? 'text' : 'password'
                }
                label="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3L21 21"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.6 10.7C10.2 11.5 10.4 12.5 11.1 13.2C12 14.1 13.5 14.1 14.4 13.2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.9 5.2C10.6 5 11.3 4.9 12 4.9C17.4 4.9 20.8 10.2 21 10.5C20.7 11 20.1 11.9 19.3 12.8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6.5 7.1C4.4 8.5 3.2 10.4 3 10.7C3.3 11.2 6.7 16.5 12 16.5C13 16.5 13.9 16.3 14.7 16"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 12C4.7 8.3 7.8 6 12 6C16.2 6 19.3 8.3 21 12C19.3 15.7 16.2 18 12 18C7.8 18 4.7 15.7 3 12Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="form-error" role="alert">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M12 8V12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="16"
                    r="1"
                    fill="currentColor"
                  />
                </svg>

                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="button-full login-submit"
            >
              <span>Sign in to workspace</span>

              {!loading && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Button>
          </form>

          <div className="login-security">
            <span className="security-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 10V7.5C8 5.57 9.57 4 11.5 4H12.5C14.43 4 16 5.57 16 7.5V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>

            <span>
              Protected enterprise workspace
            </span>
          </div>
        </main>

        <footer className="auth-footer">
          <span>HRDashboard</span>
          <span className="auth-footer-dot" />
          <span>Business Intelligence Platform</span>
        </footer>
      </div>
    </div>
  );
}
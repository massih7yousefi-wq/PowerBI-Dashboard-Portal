import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-code">404</div>
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist or has moved.
      </p>

      <Link to="/dashboard" className="button button-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}
interface LoadingStateProps {
  fullScreen?: boolean;
}

export function LoadingState({
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <div className={`loading-state ${fullScreen ? 'loading-full' : ''}`}>
      <span className="spinner" />
      <span>Loading...</span>
    </div>
  );
}
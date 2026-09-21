export function AppBackground() {
  return (
    <div className="app-background" aria-hidden="true">
      <video
        className="app-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/PHMA1268.MP4" type="video/mp4" />
      </video>

      <div className="app-background-overlay" />
      <div className="app-background-vignette" />
      <div className="app-background-glow app-background-glow-one" />
      <div className="app-background-glow app-background-glow-two" />
    </div>
  );
}
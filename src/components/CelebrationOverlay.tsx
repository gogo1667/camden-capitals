type CelebrationOverlayProps = {
  isVisible: boolean;
};

export function CelebrationOverlay({ isVisible }: CelebrationOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="overlay" role="status" aria-live="polite">
      <div className="overlay-card dance">
        <h3>Correct! Dance break!</h3>
        <p>Camden is celebrating this one.</p>
        <div className="stick-figure-wrap">
          <img
            src="/camden-head.png"
            alt="Camden head"
            className="nephew-photo"
            onError={(event) => {
              const target = event.currentTarget;
              target.style.display = "none";
            }}
          />
          <div className="stick-body" aria-hidden>
            <span className="stick-torso" />
            <span className="stick-arm stick-arm-left" />
            <span className="stick-arm stick-arm-right" />
            <span className="stick-leg stick-leg-left" />
            <span className="stick-leg stick-leg-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

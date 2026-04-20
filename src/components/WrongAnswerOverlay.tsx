type WrongAnswerOverlayProps = {
  isVisible: boolean;
};

export function WrongAnswerOverlay({ isVisible }: WrongAnswerOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="overlay" role="status" aria-live="polite">
      <div className="overlay-card wrong-overlay-card">
        <h3>Oops! Wrong answer!</h3>
        <div className="slap-scene" aria-hidden>
          <div className="slap-character grace">
            <img src="/grace-head.png" alt="Grace head" className="slap-head" />
            <span className="slap-torso" />
            <span className="slap-arm slap-arm-left" />
            <span className="slap-arm slap-arm-right slap-arm-hit" />
            <span className="slap-leg slap-leg-left" />
            <span className="slap-leg slap-leg-right" />
          </div>
          <div className="slap-impact">SLAP!</div>
          <div className="slap-character camden">
            <img src="/camden-head.png" alt="Camden head" className="slap-head camden-shake" />
            <span className="slap-torso" />
            <span className="slap-arm slap-arm-left" />
            <span className="slap-arm slap-arm-right" />
            <span className="slap-leg slap-leg-left" />
            <span className="slap-leg slap-leg-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

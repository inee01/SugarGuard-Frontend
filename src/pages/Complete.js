import "./Complete.css";

const confettiImage =
  "https://www.figma.com/api/mcp/asset/4c1fcb02-6173-4ae9-9de2-9cc43ecb555b.svg";

function Complete({
  recommendation,
  distanceKm,
  homeData,
  onHome
}) {
  const formatDistance = (km) => {
    if (km < 0.01) {
      return "0km";
    }

    if (km < 1) {
      return `${(km * 1000).toFixed(0)}m`;
    }

    return `${km.toFixed(2)}km`;
  };

  return (
    <div className="complete-page">
      <div
        className="complete-confetti"
        aria-hidden="true"
      >
        <img
          className="complete-confetti-image"
          src={confettiImage}
          alt=""
        />
      </div>

      <img
        className="complete-shield"
        src="/images/complete-shield.png"
        alt="방패"
      />

      <h1 className="complete-title">
        혈당 방어 성공!
      </h1>

      <p className="complete-description">
        오늘도 식후 {recommendation.durationMinutes}분 활동을
        <br />
        완료했어요.
      </p>

      <div className="complete-summary">
        <div className="complete-summary-item">
          <strong>
            {recommendation.durationMinutes}분
          </strong>
          <span>활동 시간</span>
        </div>

        <div className="complete-summary-item">
          <strong>
            {formatDistance(distanceKm)}
          </strong>
          <span>이동 거리</span>
        </div>

        <div className="complete-summary-item">
          <strong>
            🔥 {homeData?.continuousDays ?? 0}일
          </strong>
          <span>연속 달성</span>
        </div>
      </div>

      <div
        className="complete-badge"
        aria-hidden="true"
      >
        <div className="badge-content">
          <p className="badge-line badge-line-primary">
            🏅 오늘도 건강한 한 걸음 완료!
          </p>

          <p className="badge-line badge-line-secondary">
            내일도 가볍게 이어가보세요.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="complete-button"
        onClick={onHome}
      >
        완료
      </button>
    </div>
  );
}

export default Complete;
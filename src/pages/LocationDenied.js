import "./LocationDenied.css";

function LocationDenied({ onIndoorRecommendation, onBack }) {
  return (
    <div className="denied-page">
      <button
        type="button"
        className="denied-back"
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <svg
          width="35"
          height="32"
          viewBox="0 0 35 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.875 24L13.125 16L21.875 8"
            stroke="#624001"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="denied-header">
        위치 권한 거부 안내
      </div>

      <h1 className="denied-title">
        위치 정보를
        <br />
        가져오지 못했어요
      </h1>

      <p className="denied-description">
        괜찮아요. 위치 없이도 실내 활동을 추천해 드릴게요.
      </p>

      <div className="denied-info-box">
        <p className="denied-info-text">
          실내 활동으로 자동 전환됩니다.
          <br />
          현재 위치를 확인할 수 없어 날씨·공원 정보 대신
          <br />
          실내에서 할 수 있는 15분 활동을 안내해 드려요.
          <br />
          위치 정보는 이번 추천에만 사용되며 저장하거나 추적하지 않습니다.
        </p>
      </div>

      <p className="denied-method-title">
        나중에 위치를 허용하려면
      </p>

      <div className="denied-method-box">
        <p className="denied-method-text">
          ① 브라우저 주소창 왼쪽 자물쇠 아이콘을 누르세요.
          <br />
          ② '사이트 설정'에서 위치를 '허용'으로 바꾸세요.
          <br />
          ③ 페이지를 새로고침한 뒤 다시 시도해 보세요.
        </p>
      </div>

      <button
        type="button"
        className="denied-confirm"
        onClick={onIndoorRecommendation}
      >
        확인
      </button>
    </div>
  );
}

export default LocationDenied;
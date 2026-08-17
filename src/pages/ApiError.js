import "./ApiError.css";

function ApiError({ onRetry, onHome }) {
  return (
    <div className="api-error-page">
      <button
        type="button"
        className="api-error-back"
        onClick={onHome}
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

      <h1 className="api-error-header">
        API 오류 안내 화면
      </h1>

      <main className="api-error-main">
        <h2 className="api-error-title">
          환경 정보를
          <br />
          불러올 수 없어요
        </h2>

        <div className="api-error-info">
          <p>
            잠시 네트워크가 불안정하거나 날씨 정보 서버가
            <br />
            일시적으로 응답하지 않고 있습니다.
            <br />
            몇 초 후 다시 시도해주세요.
          </p>
        </div>
      </main>

      <button
        type="button"
        className="api-error-retry"
        onClick={onRetry}
      >
        다시 시도
      </button>

      <button
        type="button"
        className="api-error-home"
        onClick={onHome}
      >
        홈으로
      </button>
    </div>
  );
}

export default ApiError;
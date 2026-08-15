import "./LocationPermission.css";

function LocationPermission({ 
  onLocationSuccess, 
  onDenied, 
  onBack, 
  onLoading
}) {
  const handleLocationPermission = () => {
    onLoading();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        onLocationSuccess({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log("위치 정보 오류:", error);
        onDenied();
      }
    );
  };

  return (
    <div className="location-page">

      {/* 뒤로가기 */}
      <button
        type="button"
        className="location-back"
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

      {/* 상단 제목 */}
      <div className="location-header">
        위치 권한 요청
      </div>

      {/* 가운데 위치 핀 */}
      <div className="location-pin">
        <svg
          width="35"
          height="43"
          viewBox="0 0 35 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4996 20.238C21.3519 19.3952 21.778 18.3825 21.778 17.2C21.778 16.0175 21.3519 15.0056 20.4996 14.1642C19.6474 13.3228 18.6217 12.9014 17.4224 12.9C16.2232 12.8986 15.1982 13.32 14.3474 14.1642C13.4966 15.0084 13.0697 16.0204 13.0668 17.2C13.0639 18.3796 13.4908 19.3923 14.3474 20.238C15.204 21.0836 16.229 21.5043 17.4224 21.5C18.6158 21.4957 19.6416 21.075 20.4996 20.238ZM21.2115 39.6774C19.0662 41.6491 15.779 41.6486 13.6341 39.6765C9.65405 36.0173 6.55251 32.5656 4.32947 29.3217C1.44461 25.112 0.00145187 21.2148 0 17.63C0 12.255 1.75168 7.97292 5.25503 4.78375C8.75839 1.59458 12.8142 0 17.4224 0C22.0306 0 26.0872 1.59458 29.592 4.78375C33.0968 7.97292 34.8477 12.255 34.8448 17.63C34.8448 21.2133 33.4024 25.1106 30.5175 29.3217C28.2945 32.5668 25.1925 36.0187 21.2115 39.6774Z"
            fill="#624001"
          />

          <circle
            cx="17.4224"
            cy="16.681"
            r="4.81897"
            fill="white"
          />
        </svg>
      </div>

      {/* 메인 제목 */}
      <h1 className="location-title">
        현재 위치 확인
      </h1>

      {/* 설명 */}
      <p className="location-description">
        주변 환경을 분석해 맞춤 활동을 추천합니다.
      </p>

      {/* 위치 정보 안내 박스 */}
      <div className="location-info">
        <div className="location-info-title">
          위치 정보 사용 안내
        </div>

        <div className="location-info-description">
          이 추천을 위해서만 현재 위치를 사용합니다.
          <br />
          위치 정보는 저장하거나 추적하지 않습니다.
        </div>
      </div>

      {/* 위치 권한 허용 */}
      <button
        className="location-allow"
        onClick={handleLocationPermission}
      >
        위치 권한 허용
      </button>

      {/* 건너뛰기 */}
      <button
        className="location-skip"
        onClick={onDenied}
      >
        건너뛰기
      </button>

    </div>
  );
}

export default LocationPermission;
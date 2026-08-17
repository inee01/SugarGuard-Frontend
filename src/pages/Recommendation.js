import { useState } from "react";
import "./Recommendation.css";

const WEATHER_LABEL = {
  CLEAR: "맑음",
  CLOUDY: "흐림",
  RAIN: "비",
  SNOW: "눈",
};

const PM_LABEL = {
  GOOD: "좋음",
  MODERATE: "보통",
  BAD: "나쁨",
  VERY_BAD: "매우 나쁨",
};

const API_BASE_URL = "http://localhost:8080";

function toWeatherLabel(value) {
  return WEATHER_LABEL[value] ?? value;
}

function toPmLabel(value) {
  return PM_LABEL[value] ?? value;
}

function isWeatherCondition(value, conditions) {
  return conditions.includes(value);
}

function isOutdoorActivity(activityType) {
  return (
    typeof activityType === "string" &&
    activityType.startsWith("OUTDOOR")
  );
}

function WeatherIcon({ weatherCondition }) {
  if (
    isWeatherCondition(weatherCondition, [
      "CLOUDY",
      "흐림",
    ])
  ) {
    return (
      <svg
        width="31"
        height="31"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.9991 3.59717C17.544 3.5975 17.0913 3.65775 16.6556 3.776C16.6589 3.71599 16.6656 3.65778 16.6656 3.59717C16.6649 2.72541 16.3128 1.88349 15.6746 1.22774C15.0364 0.571989 14.1554 0.146985 13.1954 0.03165C12.2353 -0.0836845 11.2614 0.118489 10.4544 0.600625C9.64742 1.08276 9.06228 1.8121 8.80763 2.65318C8.33776 2.4845 7.8366 2.39754 7.33073 2.39693C6.26969 2.39693 5.25211 2.77629 4.50184 3.45156C3.75157 4.12682 3.33008 5.04267 3.33008 5.99764C3.33008 6.9526 3.75157 7.86846 4.50184 8.54372C5.25211 9.21898 6.26969 9.59834 7.33073 9.59834C8.20853 9.59763 9.06171 9.33709 9.75876 8.85689C10.4558 8.37668 10.958 7.70347 11.188 6.94102C11.6578 7.10992 12.159 7.19707 12.6649 7.19787C12.915 7.19787 13.1583 7.17447 13.3957 7.13546C13.357 7.3515 13.3317 7.57174 13.3317 7.79799C13.3317 10.1174 15.422 11.9988 17.9991 11.9988C20.5762 11.9988 22.6665 10.1174 22.6665 7.79799C22.6665 6.68386 22.1748 5.61537 21.2995 4.82756C20.4242 4.03975 19.237 3.59717 17.9991 3.59717Z"
          fill="#CCD6DD"
        />
        <path
          d="M20.6661 11.9988C20.3547 11.9988 20.0594 12.0498 19.7733 12.1212C19.9173 11.8056 19.9993 11.4611 19.9993 11.0986C19.9993 10.3824 19.6832 9.6955 19.1205 9.18905C18.5578 8.68261 17.7946 8.39809 16.9989 8.39809C16.3475 8.39983 15.7148 8.59401 15.1979 8.9508C14.9634 8.10781 14.4228 7.35946 13.6619 6.82446C12.901 6.28946 11.9634 5.99846 10.9979 5.99762C10.0994 5.99831 9.22339 6.25031 8.49101 6.71874C7.75863 7.18718 7.20611 7.84889 6.90989 8.61233C6.17646 8.40823 5.40272 8.34902 4.64153 8.43874C3.88034 8.52846 3.14963 8.765 2.49933 9.13221C1.84902 9.49941 1.29445 9.98863 0.873484 10.5664C0.45252 11.1442 0.175086 11.797 0.0601366 12.4802C-0.0548132 13.1633 -0.00457071 13.8608 0.207432 14.5248C0.419434 15.1889 0.788201 15.804 1.28854 16.328C1.78888 16.8521 2.409 17.2727 3.10654 17.5613C3.80409 17.8498 4.56261 17.9995 5.3303 18H20.6661C22.5078 18 24 16.6569 24 14.9994C24 13.3419 22.5078 11.9988 20.6661 11.9988Z"
          fill="#E1E8ED"
        />
      </svg>
    );
  }

  if (
    isWeatherCondition(weatherCondition, [
      "RAIN",
      "비",
    ])
  ) {
    return (
      <svg
        width="31"
        height="31"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6667 2.70724C18.1167 2.70724 17.5867 2.79184 17.0873 2.94886C16.7912 2.08785 16.2387 1.34158 15.5065 0.813279C14.7742 0.284982 13.8983 0.00078231 13 0C10.9707 0 9.272 1.41859 8.80067 3.33058C8.28389 2.9282 7.65127 2.7092 7 2.70724C6.20435 2.70724 5.44129 3.02812 4.87868 3.59929C4.31607 4.17045 4 4.94513 4 5.75288C4 6.16167 4.082 6.55016 4.226 6.90616C3.93599 6.81925 3.63568 6.7728 3.33333 6.76809C1.492 6.76809 0 8.28279 0 10.1521C0 12.0215 1.492 13.5362 3.33333 13.5362H18.6667C20.0812 13.5362 21.4377 12.9657 22.4379 11.9503C23.4381 10.9349 24 9.55772 24 8.12171C24 6.6857 23.4381 5.30851 22.4379 4.2931C21.4377 3.27769 20.0812 2.70724 18.6667 2.70724Z"
          fill="#E1E8ED"
        />
        <path
          d="M7.9992 16.8938L7.92386 14.5784L6.01053 15.7344C5.79517 15.852 5.61642 16.0282 5.4944 16.2434C5.37238 16.4585 5.31193 16.7039 5.31986 16.952C5.33376 17.3126 5.48661 17.6531 5.74548 17.9004C6.00435 18.1476 6.34853 18.2817 6.70386 18.2738C6.87862 18.271 7.05108 18.233 7.21118 18.1618C7.37129 18.0907 7.51585 17.9879 7.63642 17.8594C7.75699 17.731 7.85116 17.5794 7.91345 17.4136C7.97573 17.2478 8.00488 17.0711 7.9992 16.8938Z"
          fill="#5DADEC"
        />
      </svg>
    );
  }

  if (
    isWeatherCondition(weatherCondition, [
      "SNOW",
      "눈",
    ])
  ) {
    return (
      <svg
        width="31"
        height="31"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6667 2.66667C18.1167 2.66667 17.5867 2.75 17.0873 2.90467C16.7912 2.05656 16.2387 1.32147 15.5065 0.801091C14.7742 0.280711 13.8983 0.000770586 13 0C10.9707 0 9.272 1.39733 8.80067 3.28067C8.28389 2.88432 7.65127 2.6686 7 2.66667C6.20435 2.66667 5.44129 2.98274 4.87868 3.54535C4.31607 4.10796 4 4.87102 4 5.66667C4 6.06933 4.082 6.452 4.226 6.80267C3.93599 6.71705 3.63568 6.6713 3.33333 6.66667C1.492 6.66667 0 8.15867 0 10C0 11.8413 1.492 13.3333 3.33333 13.3333H18.6667C20.0812 13.3333 21.4377 12.7714 22.4379 11.7712C23.4381 10.771 24 9.41449 24 8C24 6.58551 23.4381 5.22896 22.4379 4.22876C21.4377 3.22857 20.0812 2.66667 18.6667 2.66667Z"
          fill="#E1E8ED"
        />
      </svg>
    );
  }

  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 0L19.3556 6.1917L26.4602 4.53984L24.8083 11.6444L31 15.5L24.8083 19.3556L26.4602 26.4602L19.3556 24.8083L15.5 31L11.6444 24.8083L4.53984 26.4602L6.1917 19.3556L0 15.5L6.1917 11.6444L4.53984 4.53984L11.6444 6.1917L15.5 0Z"
        fill="#F2C94C"
      />
      <path
        d="M13.1512 9.82973C13.8958 9.52128 14.6938 9.3625 15.4997 9.36246C16.3056 9.36242 17.1036 9.52111 17.8482 9.82948C18.5928 10.1379 19.2694 10.5899 19.8393 11.1597C20.4092 11.7295 20.8612 12.4061 21.1697 13.1506C21.4781 13.8952 21.6369 14.6932 21.637 15.4991C21.637 16.305 21.4783 17.103 21.1699 17.8476C20.8616 18.5922 20.4095 19.2688 19.8397 19.8387C19.2699 20.4086 18.5934 20.8606 17.8488 21.1691C16.3451 21.792 14.6555 21.7921 13.1518 21.1693C11.648 20.5465 10.4533 19.3519 9.83033 17.8482C9.20738 16.3445 9.2073 14.655 9.83008 13.1512C10.4529 11.6474 11.6475 10.4527 13.1512 9.82973Z"
        fill="#EB5757"
      />
    </svg>
  );
}

function ActivityIcon({ activityType }) {
  if (isOutdoorActivity(activityType)) {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="15.5"
          cy="15.5"
          r="15.5"
          fill="#FFEFD3"
        />
        <path
          d="M18.5174 6.38958C18.5174 7.69893 17.3611 8.77915 15.9241 8.77915C14.5036 8.77915 13.3474 7.69893 13.3474 6.38958C13.3474 5.06385 14.5036 4 15.9241 4C17.3611 4 18.5174 5.06385 18.5174 6.38958ZM13.3474 9.72844C13.9481 9.64679 14.9 9.72844 14.9 9.72844C14.9 9.72844 23.2579 15.4855 23.6709 15.9315C24.0838 16.3775 24.1349 17.0479 23.6709 17.3718C23.3439 17.6001 22.845 17.4628 22.6468 17.3718C22.4486 17.2808 17.4768 13.6729 17.4768 13.6729V17.3718L19.5415 21.1853C19.5415 21.1853 21.6062 25.5839 21.6062 25.9645C21.6062 26.345 21.1023 26.7443 20.5821 26.9138C20.196 27.0395 19.9544 27.0161 19.5415 26.9138C19.1285 26.8114 17.4768 22.1346 17.4768 22.1346L13.3474 16.4062V11.9707C13.3474 11.9707 11.6388 13.0828 10.7706 14.033C9.73488 15.1666 8.90829 16.9913 8.70595 17.3718C8.50361 17.7524 7.47565 17.8807 7.1533 17.3718C6.95098 17.0524 6.94683 16.7417 7.1533 16.4062C7.35977 16.0706 7.95295 14.5693 8.70595 13.5419C10.0897 11.6541 13.3474 9.72844 13.3474 9.72844ZM15.1024 18.718C15.1024 18.718 12.0053 26.8114 11.8278 26.9138C11.6502 27.0161 11.1631 27.0408 10.7706 26.9138C10.2456 26.7438 9.93238 26.345 9.73004 25.9645C9.5277 25.5839 13.3474 16.4062 13.3474 16.4062L15.1024 18.718Z"
          fill="#FFAD16"
        />
      </svg>
    );
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15.5"
        r="15.5"
        fill="#FFEFD3"
      />
      <path
        d="M7 23.765V13.0307C7 12.7145 7.06962 12.4153 7.20886 12.1329C7.3481 11.8505 7.53995 11.6179 7.78443 11.4351L14.3234 6.3989C14.6658 6.13297 15.0568 6 15.4964 6C15.9359 6 16.3294 6.13297 16.6766 6.3989L23.2156 11.4339C23.4609 11.6166 23.6527 11.8496 23.7911 12.1329C23.9304 12.4153 24 12.7145 24 13.0307V23.765C24 24.096 23.879 24.3846 23.6369 24.6307C23.3949 24.8769 23.1111 25 22.7857 25H18.6766C18.3981 25 18.165 24.9045 17.9771 24.7135C17.7893 24.5217 17.6954 24.2845 17.6954 24.0021V18.1126C17.6954 17.8302 17.6015 17.5935 17.4137 17.4025C17.2251 17.2106 16.992 17.1147 16.7143 17.1147H14.2857C14.008 17.1147 13.7753 17.2106 13.5875 17.4025C13.3989 17.5935 13.3046 17.8302 13.3046 18.1126V24.0034C13.3046 24.2858 13.2107 24.5225 13.0229 24.7135C12.835 24.9045 12.6023 25 12.3246 25H8.21429C7.88886 25 7.60512 24.8769 7.36307 24.6307C7.12102 24.3846 7 24.096 7 23.765Z"
        fill="#FFAD16"
      />
    </svg>
  );
}

function Recommendation({
  data,
  onBack,
  onClose,
  onStart,
  showEnvironment = true,
}) {
  const { environment, recommendation } = data;
  const [isLogging, setIsLogging] = useState(false);

  const logRecommendation = async (accepted) => {
    try {
      setIsLogging(true);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/recommendations/log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activityType:
              recommendation.activityType,
            accepted,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "추천 기록 저장에 실패했습니다."
        );
      }

      console.log("추천 로깅 성공:", result);

      return true;
    } catch (error) {
      console.error("추천 로깅 실패:", error);
      alert("잠시 후 다시 시도해주세요.");
      return false;
    } finally {
      setIsLogging(false);
    }
  };

  const handleAccept = async () => {
    if (isLogging) {
      return;
    }

    const success =
      await logRecommendation(true);

    if (success) {
      onStart();
    }
  };

  const handleReject = async () => {
    if (isLogging) {
      return;
    }

    const success =
      await logRecommendation(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="recommendation-page">
      <div className="recommendation-header">
        <button
          className="recommendation-back"
          aria-label="뒤로가기"
          type="button"
          onClick={onBack}
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

        <h1 className="recommendation-title">
          오늘의 {recommendation.durationMinutes}분
        </h1>
      </div>

      <div className="recommendation-content">
        {showEnvironment && (
          <div className="recommendation-env-card">
            <div className="recommendation-env-item">
              <div className="recommendation-env-icon">
                <WeatherIcon
                  weatherCondition={
                    environment.weatherCondition
                  }
                />
              </div>

              <p className="recommendation-env-text">
                {environment.temperature}°{" "}
                {toWeatherLabel(
                  environment.weatherCondition
                )}
              </p>
            </div>

            <div className="recommendation-env-item">
              <p className="recommendation-env-text recommendation-env-pm">
                미세먼지{" "}
                {toPmLabel(environment.pmGrade)}
              </p>
            </div>
          </div>
        )}

        <h2
          className={`recommendation-main-title ${
            !showEnvironment
              ? "no-environment"
              : ""
          }`}
        >
          오늘의 식후 활동 추천
        </h2>

        <div className="recommendation-activity-card">
          <div className="recommendation-activity-icon-wrap">
            <div className="recommendation-activity-icon">
              <ActivityIcon
                activityType={
                  recommendation.activityType
                }
              />
            </div>
          </div>

          <div className="recommendation-activity-text">
            <h3 className="recommendation-activity-name">
              {recommendation.activityName}
            </h3>

            {(recommendation.guideText ||
              recommendation.reason) && (
              <p className="recommendation-activity-desc">
                {recommendation.guideText ||
                  recommendation.reason}
              </p>
            )}
          </div>
        </div>

        {recommendation.location && (
          <div className="recommendation-location-section">
            <div className="recommendation-location-box">
              <h3 className="recommendation-location-title">
                추천 장소
              </h3>

              <h4 className="recommendation-location-name">
                {recommendation.location.name}
              </h4>

              <p className="recommendation-location-info">
                현재 위치에서 가까운 공원이에요.
              </p>

              <button
                type="button"
                className="recommendation-location-map"
                onClick={() => {
                  const {
                    latitude,
                    longitude,
                  } = recommendation.location;

                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
                    "_blank"
                  );
                }}
              >
                지도에서 보기 <span>›</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="recommendation-actions">
        <button
          type="button"
          className="recommendation-start-button"
          onClick={handleAccept}
          disabled={isLogging}
        >
          {isLogging
            ? "처리 중..."
            : `${recommendation.durationMinutes}분 시작하기`}
        </button>

        <button
          type="button"
          className="recommendation-reject-button"
          onClick={handleReject}
          disabled={isLogging}
        >
          다음에 할래요
        </button>
      </div>
    </div>
  );
}

export default Recommendation;
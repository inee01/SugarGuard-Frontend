import { useEffect, useRef, useState } from "react";
import "./EnvironmentLoading.css";

const STEPS = [
  { id: 0, label: "현재 위치 확인" },
  { id: 1, label: "날씨 확인" },
  { id: 2, label: "미세먼지 확인" },
  { id: 3, label: "주변 활동 장소 찾는 중..." }
];

function EnvironmentLoading({
  onBack,
  onHome,
  onComplete,
  isApiDone
}) {
  const [stepStatus, setStepStatus] = useState({
    0: "pending",
    1: "pending",
    2: "pending",
    3: "pending"
  });

  const [firstThreeDone, setFirstThreeDone] = useState(false);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;

    const delay = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const runFirstThree = async () => {
      for (let i = 0; i < 3; i++) {
        if (cancelled) {
          return;
        }

        setStepStatus((prev) => ({
          ...prev,
          [i]: "loading"
        }));

        await delay(1000);

        if (cancelled) {
          return;
        }

        setStepStatus((prev) => ({
          ...prev,
          [i]: "completed"
        }));
      }

      if (cancelled) {
        return;
      }

      setStepStatus((prev) => ({
        ...prev,
        3: "loading"
      }));

      setFirstThreeDone(true);
    };

    runFirstThree();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!firstThreeDone || !isApiDone) {
      return;
    }

    let cancelled = false;

    const finish = async () => {
      setStepStatus((prev) => ({
        ...prev,
        3: "completed"
      }));

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      if (cancelled) {
        return;
      }

      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    };

    finish();

    return () => {
      cancelled = true;
    };
  }, [firstThreeDone, isApiDone]);

  return (
    <div className="environment-loading-page">
      <div className="environment-loading-header">
        <button
          type="button"
          className="environment-loading-back"
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

        <h1 className="environment-loading-title">
          환경 분석 중..
        </h1>

        <button
          type="button"
          className="environment-loading-close"
          onClick={onHome}
          aria-label="닫기"
        >
          <svg
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 7.25L7.5 21.75M7.5 7.25L22.5 21.75"
              stroke="#624001"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="environment-loading-graphic">
        <div className="environment-location-icon">
          <div className="environment-wave environment-wave-outer"></div>
          <div className="environment-wave environment-wave-mid"></div>
          <div className="environment-wave environment-wave-inner"></div>

          <svg
            className="environment-location-pin"
            width="47"
            height="58"
            viewBox="0 0 47 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.3765 26.7854C28.5309 25.6435 29.108 24.2718 29.108 22.6701C29.108 21.0683 28.5309 19.6978 27.3765 18.5584C26.2222 17.419 24.8338 16.8487 23.2114 16.8468C21.5889 16.845 20.2015 17.4153 19.0492 18.5584C17.8969 19.7016 17.3187 21.0722 17.3149 22.6701C17.311 24.2679 17.8892 25.6396 19.0492 26.7854C20.2091 27.9311 21.5965 28.5012 23.2114 28.4954C24.8262 28.4896 26.2144 27.9194 27.3765 26.7854ZM28.3404 53.1228C25.4364 55.7915 20.9866 55.7908 18.0821 53.1215C12.6945 48.1695 8.49537 43.4969 5.48474 39.1037C1.57783 33.4053 -0.376286 28.1297 -0.37825 23.2769C-0.37825 15.998 1.99238 10.2 6.73364 5.88304C11.4749 1.56609 16.9675 -0.592392 23.2114 -0.592392C29.4554 -0.592392 34.949 1.56609 39.6921 5.88304C44.4353 10.2 46.8049 15.998 46.8009 23.2769C46.8009 28.1278 44.8478 33.4023 40.9409 39.1037C37.9303 43.4986 33.7302 48.1714 28.3404 53.1228Z"
              fill="#FFAD16"
            />
            <circle
              cx="23.2114"
              cy="21.9696"
              r="6.525"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <p className="environment-loading-message">
        지금 하기 좋은 활동을 찾고 있어요
      </p>

      <div className="environment-steps">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className="environment-step"
          >
            <div className="environment-step-indicator">
              {stepStatus[step.id] === "completed" && (
                <svg
                  className="environment-step-check"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="12.5"
                    fill="#FFAD16"
                  />
                  <path
                    d="M7.3 12.9L10.6 16.2L17.8 9"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {stepStatus[step.id] === "loading" && (
                <div className="environment-step-spinner"></div>
              )}

              {stepStatus[step.id] === "pending" && (
                <div className="environment-step-pending"></div>
              )}
            </div>

            <span
              className={`environment-step-label ${
                stepStatus[step.id]
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnvironmentLoading;
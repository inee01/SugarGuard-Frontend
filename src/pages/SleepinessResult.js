import { useEffect, useRef, useState } from "react";
import "./SleepinessResult.css";

const API_BASE_URL = "";

function SleepinessFace({ value }) {
  const iconColor = "#FFFFFF";

  let type = "normal";

  if (value === 1) {
    type = "fresh";
  } else if (value === 2) {
    type = "slightly-fresh";
  } else if (value === 4) {
    type = "sleepy";
  } else if (value === 5) {
    type = "very-sleepy";
  }

  return (
    <span className="sleepiness-result-face">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="17"
          cy="17"
          r="17"
          fill="#FFAD16"
        />

        {type === "fresh" && (
          <>
            <path
              d="M10.5 16.5C10.5 12.91 13.41 10 17 10C20.59 10 23.5 12.91 23.5 16.5"
              stroke={iconColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            <path
              d="M10.5 17.5C10.5 21.09 13.41 24 17 24C20.59 24 23.5 21.09 23.5 17.5"
              stroke={iconColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            <path
              d="M12.5 17H21.5"
              stroke={iconColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </>
        )}

        {type === "slightly-fresh" && (
          <>
            <circle
              cx="12.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <circle
              cx="21.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <path
              d="M11 19C12.5 21 14.5 22 17 22C19.5 22 21.5 21 23 19"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}

        {type === "normal" && (
          <>
            <circle
              cx="12.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <circle
              cx="21.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <path
              d="M12 20H22"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}

        {type === "sleepy" && (
          <>
            <circle
              cx="12.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <circle
              cx="21.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <path
              d="M11 20C12.5 18.5 14.5 18 17 18C19.5 18 21.5 18.5 23 20"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}

        {type === "very-sleepy" && (
          <>
            <circle
              cx="12.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <circle
              cx="21.5"
              cy="14"
              r="1.5"
              fill={iconColor}
            />

            <path
              d="M11 20C12.5 18.5 14.5 18 17 18C19.5 18 21.5 18.5 23 20"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M23.5 8L27 5.5"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M25 11L29 9"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </span>
  );
}

function SleepinessResult({
  result,
  activityType,
  onComplete
}) {
  const [generatedText, setGeneratedText] = useState("");
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);

  const lastRequestKeyRef = useRef(null);

  useEffect(() => {
    const requestKey =
      `${result.recordId}-${activityType}-${result.difference}`;

    if (lastRequestKeyRef.current === requestKey) {
      return;
    }

    lastRequestKeyRef.current = requestKey;

    const fetchGeneratedMessage = async () => {
      try {
        setIsLoadingMessage(true);

        const response = await fetch(
          `${API_BASE_URL}/api/v1/llm/generate-message`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contextType: "RESULT_COMPARISON",
              activityType,
              sleepinessDiff: result.difference
            })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "맞춤 문구 생성에 실패했습니다."
          );
        }

        console.log(
          "LLM 결과 문구 생성 성공:",
          data
        );

        setGeneratedText(
          data.generatedText ||
            result.message ||
            "15분 활동을 완료했어요. 오늘도 잘 해냈어요!"
        );
      } catch (error) {
        console.error(
          "LLM 결과 문구 생성 실패:",
          error
        );

        setGeneratedText(
          result.message ||
            "15분 활동을 완료했어요. 오늘도 잘 해냈어요!"
        );
      } finally {
        setIsLoadingMessage(false);
      }
    };

    fetchGeneratedMessage();
  }, [
    activityType,
    result.recordId,
    result.difference,
    result.message
  ]);

  return (
    <div className="sleepiness-result-page">
      <header className="sleepiness-result-header">
        <h1 className="sleepiness-result-header-title">
          활동 결과
        </h1>
      </header>

      <div className="sleepiness-result-content">
        <h2 className="sleepiness-result-title">
          활동 후 상태를 확인해보세요
        </h2>

        <p className="sleepiness-result-description">
          15분 활동 전후의 졸림 정도를 비교했어요.
        </p>

        <div className="sleepiness-result-comparison">
          <div className="sleepiness-result-value-box">
            <span className="sleepiness-result-label">
              활동 전
            </span>

            <strong className="sleepiness-result-value">
              {result.beforeSleepiness}
            </strong>

            <SleepinessFace
              value={result.beforeSleepiness}
            />
          </div>

          <div className="sleepiness-result-arrow">
            →
          </div>

          <div className="sleepiness-result-value-box">
            <span className="sleepiness-result-label">
              활동 후
            </span>

            <strong className="sleepiness-result-value">
              {result.afterSleepiness}
            </strong>

            <SleepinessFace
              value={result.afterSleepiness}
            />
          </div>
        </div>

        <div className="sleepiness-result-difference">
          {result.difference > 0
            ? `졸림이 ${result.difference}단계 줄었어요!`
            : result.difference === 0
              ? "졸림 정도가 그대로예요."
              : `졸림이 ${Math.abs(
                  result.difference
                )}단계 높아졌어요.`}
        </div>

        <div className="sleepiness-result-message-box">
          {isLoadingMessage
            ? "맞춤 메시지를 만들고 있어요..."
            : generatedText}
        </div>
      </div>

      <button
        type="button"
        className="sleepiness-result-home"
        onClick={onComplete}
      >
        확인
      </button>
    </div>
  );
}

export default SleepinessResult;
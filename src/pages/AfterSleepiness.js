import { useState } from "react";
import "./Sleepiness.css";

const API_BASE_URL = "http://192.168.45.170:8080";

const sleepinessOptions = [
  { value: 1, label: "개운해요", icon: "fresh" },
  { value: 2, label: "조금 개운해요", icon: "slightly-fresh" },
  { value: 3, label: "보통이에요", icon: "normal" },
  { value: 4, label: "졸려요", icon: "sleepy" },
  { value: 5, label: "매우 졸려요", icon: "very-sleepy" }
];

function SleepinessIcon({ type, selected }) {
  const iconColor = "#FFFFFF";
  const circleColor = selected ? "#FFAD16" : "#FFDFA3";

  return (
    <span className="sleepiness-face-icon">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="17" cy="17" r="17" fill={circleColor} />

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
            <circle cx="12.5" cy="14" r="1.5" fill={iconColor} />
            <circle cx="21.5" cy="14" r="1.5" fill={iconColor} />
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
            <circle cx="12.5" cy="14" r="1.5" fill={iconColor} />
            <circle cx="21.5" cy="14" r="1.5" fill={iconColor} />
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
            <circle cx="12.5" cy="14" r="1.5" fill={iconColor} />
            <circle cx="21.5" cy="14" r="1.5" fill={iconColor} />
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
            <circle cx="12.5" cy="14" r="1.5" fill={iconColor} />
            <circle cx="21.5" cy="14" r="1.5" fill={iconColor} />

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

function AfterSleepiness({
  recordId,
  onComplete
}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedValue === null || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/sleepiness/in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            recordId,
            afterSleepiness: selectedValue
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "활동 후 졸림 수치 기록에 실패했습니다."
        );
      }

      console.log("활동 후 졸림 기록 성공:", result);

      onComplete(result);
    } catch (error) {
      console.error("활동 후 졸림 기록 실패:", error);

      alert(
        "졸림 수치를 저장하지 못했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sleepiness-page">
      <header className="sleepiness-header">

        <h1 className="sleepiness-header-title">
          졸림 체크
        </h1>

      </header>

      <main className="sleepiness-content">
        <section className="sleepiness-title-section">
          <h2 className="sleepiness-title">
            지금 얼마나 졸린가요?
          </h2>

          <p className="sleepiness-description">
            활동 후 현재 상태를 알려주세요.
          </p>
        </section>

        <div className="sleepiness-options">
          {sleepinessOptions.map((option) => {
            const isSelected =
              selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`sleepiness-option ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() =>
                  setSelectedValue(option.value)
                }
                disabled={isSubmitting}
              >
                <span className="sleepiness-number">
                  {option.value}
                </span>

                <SleepinessIcon
                  type={option.icon}
                  selected={isSelected}
                />

                <span className="sleepiness-label">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <button
        type="button"
        className="sleepiness-submit"
        onClick={handleSubmit}
        disabled={selectedValue === null || isSubmitting}
      >
        {isSubmitting ? "기록 중..." : "활동 결과 보기"}
      </button>
    </div>
  );
}

export default AfterSleepiness;
import "./Timer.css";

function TimerRestore({
  recommendation,
  timerTimeLeft,
  onStop,
  onBack,
  onResume
}) {
  const timerCirclePath =
    "M130.912 6.38408C161.067 8.84945 189.051 23.0491 208.847 45.9301C228.643 68.8112 238.67 98.5464 236.773 128.743C234.876 158.939 221.205 187.186 198.701 207.409C176.196 227.632 146.655 238.217 116.428 236.889C86.2017 235.56 57.7031 222.424 37.0598 200.304C16.4166 178.184 5.27718 148.848 6.03653 118.601C6.79588 88.3548 19.3934 59.614 41.1205 38.558C62.8477 17.5021 91.9696 5.81241 122.225 6.00228";

  const totalSeconds =
    recommendation.durationMinutes * 60;

  const progress = Math.min(
    1,
    Math.max(
      0,
      (totalSeconds - timerTimeLeft) / totalSeconds
    )
  );

  const trackLeft = 47;
  const foodWidth = 62;
  const foodStartLeft = 16;
  const foodEndLeft = 271.5;

  const foodLeft =
    foodStartLeft +
    (foodEndLeft - foodStartLeft) * progress;

  const fillWidth = Math.max(
    0,
    foodLeft + foodWidth / 2 - trackLeft
  );

  const minutes = Math.floor(
    timerTimeLeft / 60
  );

  const seconds =
    timerTimeLeft % 60;

  return (
    <div className="timer-page">
      <button
        type="button"
        className="timer-back"
        aria-label="뒤로가기"
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

      <h1 className="timer-header">
        혈당 방어 중
      </h1>

      <h2 className="timer-title">
        가볍게 걸어볼까요?
      </h2>

      <p className="timer-activity-name">
        {recommendation.activityName}
      </p>

      <div className="timer-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="243"
          height="243"
          viewBox="0 0 243 243"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <path
              id="timer-circle-path-restore"
              d={timerCirclePath}
              pathLength="1"
            />
          </defs>

          <g className="timer-circle-paths">
            <use
              href="#timer-circle-path-restore"
              stroke="#FFEFD3"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <use
              className="timer-circle-progress"
              href="#timer-circle-path-restore"
              stroke="#FFAD16"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1"
              strokeDashoffset={progress}
              style={{
                transition: "none"
              }}
            />
          </g>
        </svg>
      </div>

      <p className="timer-time">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </p>

      <p className="timer-remaining-label">
        남았어요
      </p>

      <div className="timer-progress-track">
        <div
          className="timer-progress-fill"
          style={{
            width: `${fillWidth}px`,
            transition: "none"
          }}
        />
      </div>

      <img
        className="timer-progress-food"
        src="/images/progress-food.png"
        alt="밥 캐릭터"
        draggable="false"
        style={{
          top: "583px",
          left: `${foodLeft}px`,
          transition: "none"
        }}
      />

      <img
        className="timer-progress-shield"
        src="/images/shield.png"
        alt="방패"
        draggable="false"
      />

      <p className="timer-progress-text">
        활동 일시정지
      </p>

      <button
        type="button"
        className="timer-stop-button"
        onClick={onStop}
      >
        <svg
          className="timer-stop-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M0 0H21V21H0V0Z"
            fill="#C6C6C6"
          />
        </svg>

        <span className="timer-stop-text">
          그만하기
        </span>
      </button>

      <button
        type="button"
        className="timer-pause-button"
        onClick={onResume}
      >
        <svg
          className="timer-pause-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
        >
          <path
            d="M0 0L18 10.5L0 21V0Z"
            fill="white"
          />
        </svg>

        <span className="timer-pause-text">
          다시 시작
        </span>
      </button>
    </div>
  );
}

export default TimerRestore;
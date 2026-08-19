import "./Home.css";

function Home({ onStart, homeData }) {
  const isCompletedToday = homeData?.isCompletedToday ?? false;
  const continuousDays = homeData?.continuousDays ?? 0;

  const handleStart = () => {
    onStart();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleStart();
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-logo">SugarGuard</h1>

        <div className="challenge-badge">
          <span className="challenge-emoji">
            {continuousDays > 0 ? "🔥" : "🌱"}
          </span>

          <span className="challenge-text">
            {continuousDays > 0
              ? `${continuousDays}일 연속`
              : "첫 도전"}
          </span>
        </div>
      </header>

      <main className="home-main">
        <section className="home-intro">
          <h2 className="home-title">식사하셨나요?</h2>

          <p className="home-description">
            지금부터 딱 15분,
            <br />
            가볍게 움직여봐요.
          </p>
        </section>

        <div className="meal-visual">
          <div className="meal-gradient"></div>

          <img
            className="meal-image"
            src="/images/16.png"
            alt="밥 캐릭터"
          />
        </div>

        <button
          type="button"
          className="start-button"
          onPointerUp={handleStart}
          onKeyUp={handleKeyUp}
        >
          밥 먹었어요!
        </button>

        <div className="daily-card">
          <p className="daily-text">
            오늘 {isCompletedToday ? "1/1" : "0/1"}회 완료
          </p>

          <div className="progress-track">
            <div
              className={`progress-marker ${
                isCompletedToday ? "progress-complete" : ""
              }`}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";

import ApiError from "./pages/ApiError";
import Complete from "./pages/Complete";
import EnvironmentLoading from "./pages/EnvironmentLoading";
import Home from "./pages/Home";
import LocationDenied from "./pages/LocationDenied";
import LocationPermission from "./pages/LocationPermission";
import NetworkError from "./pages/NetworkError";
import Recommendation from "./pages/Recommendation";
import Timer from "./pages/Timer";
import TimerRestore from "./pages/TimerRestore";

import {
  mockIndoorRecommendation,
  mockOutdoorRecommendation
} from "./data/mockRecommendation";

function App() {
  const [page, setPage] = useState("home");
  const [recommendationData, setRecommendationData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [distanceKm, setDistanceKm] = useState(0);
  const [isRecommendationReady, setIsRecommendationReady] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(null);

  // 홈 화면 상태 조회
  const fetchHomeData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/home"
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const data = await response.json();

      console.log("홈 API 응답:", data);

      setHomeData(data.data);
    } catch (error) {
      console.error("홈 API 호출 실패:", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  // 활동 완료 기록 저장
  const handleActivityComplete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            activityType:
              recommendationData.recommendation.activityType,
            durationMinutes:
              recommendationData.recommendation.durationMinutes,
            distanceKm: distanceKm
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const data = await response.json();

      console.log("활동 완료 저장:", data);

      // 저장 후 홈 상태 다시 조회
      await fetchHomeData();

      setPage("complete");
    } catch (error) {
      console.error("활동 완료 저장 실패:", error);
    }
  };

  // 위치 허용 성공 → 실제 추천 API 호출
  const handleLocationSuccess = async (coords) => {
    console.log("저장된 위치:", coords);

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude
          })
        }
      );

      if (!response.ok) {
        console.error("추천 API 오류:", response.status);
        setPage("apiError");
        return;
      }

      const data = await response.json();

      console.log("추천 API 응답:", data);

      setRecommendationData(data);
      setIsRecommendationReady(true);
    } catch (error) {
      console.error("추천 API 호출 실패:", error);
      setPage("networkError");
    }
  };



  if (page === "location") {
    return (
      <LocationPermission
        onLocationSuccess={handleLocationSuccess}
        onDenied={() => setPage("locationDenied")}
        onBack={() => setPage("home")}
        onLoading={() => {
          setRecommendationData(null);
          setIsRecommendationReady(false);
          setPage("environmentLoading");
        }}
      />
    );
  }

  if (page === "timerRestore") {
    if (!recommendationData?.recommendation || timerTimeLeft === null) {
      setPage("home");
      return null;
    }

    return (
      <TimerRestore
        recommendation={recommendationData.recommendation}
        timerTimeLeft={timerTimeLeft}
        onStop={() => setPage("home")}
        onClose={() => setPage("home")}
        onBack={() => setPage("location")}
        onResume={() => setPage("timer")}
      />
    );
  }

  if (page === "locationDenied") {
    return (
      <LocationDenied
        onIndoorRecommendation={() => {
          setRecommendationData(mockIndoorRecommendation);
          setPage("recommendation");
        }}
      />
    );
  }

  if (page === "environmentLoading") {
    return (
      <EnvironmentLoading
        onBack={() => setPage("location")}
        isApiDone={isRecommendationReady}
        onComplete={() => setPage("recommendation")}
      />
    );
  }

  if (page === "networkError") {
    return (
      <NetworkError
        onRetry={() => setPage("environmentLoading")}
        onHome={() => setPage("home")}
      />
    );
  }

  if (page === "apiError") {
    return (
      <ApiError
        onRetry={() => setPage("environmentLoading")}
        onHome={() => setPage("home")}
      />
    );
  }

  if (page === "recommendation") {
    return (
      <Recommendation
        data={recommendationData}
        onBack={() => setPage("location")}
        onClose={() => setPage("home")}
        onStart={() => {
          setDistanceKm(0);
          setTimerTimeLeft(
            recommendationData.recommendation.durationMinutes * 60
          );
          setPage("timer");
        }}
      />
    );
  }

  if (page === "timer") {
  if (!recommendationData?.recommendation || timerTimeLeft === null) {
    setPage("home");
    return null;
  }

  return (
    <Timer
      recommendation={recommendationData.recommendation}
      timerTimeLeft={timerTimeLeft}
      setTimerTimeLeft={setTimerTimeLeft}
      distanceKm={distanceKm}
      onDistanceUpdate={setDistanceKm}
      onComplete={handleActivityComplete}
      onStop={() => setPage("home")}
      onClose={() => setPage("home")}
      onBack={() => setPage("location")}
      onPause={() => setPage("timerRestore")}
    />
  );
}

  if (page === "complete") {
    return (
      <Complete
        recommendation={
        recommendationData?.recommendation ??
        mockOutdoorRecommendation.recommendation
      }
      distanceKm={distanceKm}
      homeData={homeData}
      onHome={() => setPage("home")}
      />
    );
  }

  return (
    <Home
      homeData={homeData}
      onStart={() => setPage("location")}
    />
  );
}

export default App;
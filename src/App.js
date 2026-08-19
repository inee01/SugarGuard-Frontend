import { useEffect, useState } from "react";

import AfterSleepiness from "./pages/AfterSleepiness";
import ApiError from "./pages/ApiError";
import BeforeSleepiness from "./pages/BeforeSleepiness";
import Complete from "./pages/Complete";
import EnvironmentLoading from "./pages/EnvironmentLoading";
import Home from "./pages/Home";
import LocationDenied from "./pages/LocationDenied";
import LocationPermission from "./pages/LocationPermission";
import NetworkError from "./pages/NetworkError";
import Recommendation from "./pages/Recommendation";
import SleepinessResult from "./pages/SleepinessResult";
import Timer from "./pages/Timer";
import TimerRestore from "./pages/TimerRestore";

import {
  mockIndoorRecommendation,
  mockOutdoorRecommendation
} from "./data/mockRecommendation";

const API_BASE_URL = "";

function App() {
  const [page, setPage] = useState("home");
  const [recommendationData, setRecommendationData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [distanceKm, setDistanceKm] = useState(0);
  const [isRecommendationReady, setIsRecommendationReady] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(null);
  const [sleepinessRecordId, setSleepinessRecordId] = useState(null);
  const [sleepinessResult, setSleepinessResult] = useState(null);
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);

  const fetchHomeData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/home`
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

  const requestRecommendation = async (coords) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/recommendations`,
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

  const handleLocationSuccess = async (coords) => {
    setIsLocationDenied(false);
    setLastCoords(coords);

    console.log("저장된 위치:", coords);

    await requestRecommendation(coords);
  };

  const handleRecommendationRetry = async () => {
    if (!lastCoords) {
      setPage("location");
      return;
    }

    setRecommendationData(null);
    setIsRecommendationReady(false);
    setPage("environmentLoading");

    await requestRecommendation(lastCoords);
  };

  const handleActivityComplete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/records`,
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
            distanceKm
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const data = await response.json();

      console.log("활동 완료 저장:", data);

      await fetchHomeData();

      setPage("afterSleepiness");
    } catch (error) {
      console.error("활동 완료 저장 실패:", error);
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
    if (
      !recommendationData?.recommendation ||
      timerTimeLeft === null
    ) {
      setPage("home");
      return null;
    }

    return (
      <TimerRestore
        recommendation={recommendationData.recommendation}
        timerTimeLeft={timerTimeLeft}
        onStop={() => setPage("home")}
        onBack={() => setPage("timer")}
        onResume={() => setPage("timer")}
      />
    );
  }

  if (page === "locationDenied") {
    return (
      <LocationDenied
        onBack={() => setPage("location")}
        onIndoorRecommendation={() => {
          setIsLocationDenied(true);
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
        onHome={() => setPage("home")}
        isApiDone={isRecommendationReady}
        onComplete={() => setPage("recommendation")}
      />
    );
  }

  if (page === "networkError") {
    return (
      <NetworkError
        onRetry={handleRecommendationRetry}
        onHome={() => setPage("home")}
      />
    );
  }

  if (page === "apiError") {
    return (
      <ApiError
        onRetry={handleRecommendationRetry}
        onHome={() => setPage("home")}
      />
    );
  }

  if (page === "recommendation") {
    return (
      <Recommendation
        data={recommendationData}
        showEnvironment={!isLocationDenied}
        onBack={() => setPage("location")}
        onClose={() => setPage("home")}
        onStart={() => {
          setDistanceKm(0);
          setPage("beforeSleepiness");
        }}
      />
    );
  }

  if (page === "beforeSleepiness") {
    return (
      <BeforeSleepiness
        onBack={() => setPage("recommendation")}
        onComplete={(recordId) => {
          setSleepinessRecordId(recordId);

          localStorage.setItem(
            "sleepinessRecordId",
            String(recordId)
          );

          setTimerTimeLeft(
            recommendationData.recommendation.durationMinutes * 60
          );

          setPage("timer");
        }}
      />
    );
  }

  if (page === "timer") {
    if (
      !recommendationData?.recommendation ||
      timerTimeLeft === null
    ) {
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
        onBack={() => setPage("location")}
        onPause={() => setPage("timerRestore")}
      />
    );
  }

  if (page === "afterSleepiness") {
    return (
      <AfterSleepiness
        recordId={
          sleepinessRecordId ??
          Number(
            localStorage.getItem("sleepinessRecordId")
          )
        }
        onComplete={(result) => {
          setSleepinessResult(result);
          setPage("complete");
        }}
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
        onHome={() => {
          setPage("sleepinessResult");
        }}
      />
    );
  }

  if (page === "sleepinessResult") {
    if (
      !sleepinessResult ||
      !recommendationData?.recommendation
    ) {
      setPage("home");
      return null;
    }

    return (
      <SleepinessResult
        result={sleepinessResult}
        activityType={
          recommendationData.recommendation.activityType
        }
        onComplete={() => {
          localStorage.removeItem("sleepinessRecordId");
          setSleepinessRecordId(null);
          setSleepinessResult(null);
          setTimerTimeLeft(null);
          setDistanceKm(0);
          setPage("home");
        }}
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
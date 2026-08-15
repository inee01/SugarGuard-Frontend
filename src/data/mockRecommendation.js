export const mockOutdoorRecommendation = {
  success: true,

  environment: {
    retrievedAt: "2026-08-10T12:32:00+09:00",
    dataSource: "LIVE",
    weatherCondition: "CLEAR",
    temperature: 27.5,
    feelsLikeTemperature: 28.0,
    pmGrade: "GOOD",

    nearbyParks: [
      {
        name: "OO근린공원",
        latitude: 36.8153,
        longitude: 127.1142,
        distanceMeters: 210,
      },
    ],
  },

  recommendation: {
    activityId: "rec_20260810_0001",
    activityType: "OUTDOOR_WALK",
    activityName: "OO근린공원 15분 산책",
    durationMinutes: 15,
    reason:
      "현재 날씨가 맑고 미세먼지가 좋음 수준이라 야외 산책에 적합해요.",

    location: {
      name: "OO근린공원",
      latitude: 36.8153,
      longitude: 127.1142,
    },

    guideText: null,
  },
};

export const mockIndoorRecommendation = {
  success: true,

  environment: {
    retrievedAt: "2026-08-10T12:32:00+09:00",
    dataSource: "LIVE",
    weatherCondition: "CLOUDY",
    temperature: 24.1,
    feelsLikeTemperature: 25.0,
    pmGrade: "BAD",

    nearbyParks: [
      {
        name: "OO근린공원",
        latitude: 36.8153,
        longitude: 127.1142,
        distanceMeters: 210,
      },
    ],
  },

  recommendation: {
    activityId: "rec_20260810_0002",
    activityType: "INDOOR_STAIRS",
    activityName: "계단 오르내리기",
    durationMinutes: 15,
    reason: "현재 미세먼지가 나쁨 수준이라 실내 활동을 추천해요.",
    location: null,
    guideText: "가까운 계단에서 15분간 오르내려 보세요.",
  },
};
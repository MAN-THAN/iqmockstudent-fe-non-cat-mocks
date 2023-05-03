import request from "./Request";

// api for fetching analysis data

export const fetchAnalysisData = async (attempt_id) => {
  try {
    const res = await request({
      url: `/api/student/v1/analyse/create/${attempt_id}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchLeaderBoard = async (startDate,endDate,mockId ,attemptId) => {
  try {
    const res = request({
      url: `/api/student/v1/analyse/createleaderBoard/${mockId}/${attemptId}/${startDate}/${endDate}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchOverallAcross = async (mockId ,attemptId) => {
  try {
    const res = request({
      url: `api/student/v1/analyse/across/${attemptId} `,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchViewSolution = async (attemptId) => {
  try {
    const res = request({
      url: `/api/student/v1/leaderboard/view/${attemptId}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//GET ERROR TRACKER
export const fetchErrorTracker = async (attemptId, type) => {
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};


// POST ERROR TRACKER

export const postToErrorTracker = async (attemptId, type, payload) => {
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}/${type}`,
      type: "POST",
      data: payload,
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for mock comparison

export const getMockComparison = async (mockId, attemptId) => {
  try {
    const res = request({
      url: `/api/student/v1/analyse/compare/${mockId}/${attemptId}`,
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for across mock analysis

export const getMockAcrossAnalysis = async (uid) => {
  try {
    const res = request({
      url: `/api/student/v1/analyse/across/${uid}`,
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for goal tracker

export const getGoalTrackerData = async (attemptId) => {
  try {
    const res = request({
      url: `/api/student/v1/analyse/goaltracker/${attemptId}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for goal tracker

export const getMarketPlace = async () => {
  try {
    const res = request({
      url: `/api/student/v1/marketplace`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
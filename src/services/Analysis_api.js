import request from "./Request";

// api for fetching analysis data

export const fetchAnalysisData = async (attempt_id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = await request({
      url: `/api/student/v1/analyse/create/${attempt_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchLeaderBoard = async (mockId, attemptId, uid) => {
   const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/leaderboard/all/${mockId}/${attemptId}/${uid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchOverallAcross = async (uid, attemptId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `api/student/v1/analyse/across/${uid}/${attemptId} `,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const fetchViewSolution = async (attemptId, mockId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/leaderboard/view/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//GET ERROR TRACKER
export const fetchErrorTracker = async (attemptId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// POST ERROR TRACKER

export const postToErrorTracker = async (attemptId, type, payload) => {
   const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}/${type}`,
      type: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for mock comparison

export const getMockComparison = async (mockId, attemptId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/analyse/compare/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for across mock analysis

export const getMockAcrossAnalysis = async (uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/analyse/across/${uid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for goal tracker

export const getGoalTrackerData = async (attemptId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/analyse/goaltracker/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for goal tracker

export const getMarketPlace = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/marketplace`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for checking mock status

export const fetchMockStatus = async (mockId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/leaderboard/mockstatus/${mockId}/${uid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

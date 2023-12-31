import request from "./Request";

// api for fetching analysis data

export const fetchAnalysisData = async (attempt_id, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = await request({
      url: `/api/student/v1/analyse/create/${attempt_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attempt_id
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
      url: `/api/student/v1/view/${mockId}/${attemptId}/${uid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchOverallAcross = async (uid, attemptId,secType) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `api/student/v1/analyse/across/${uid}/${attemptId}/${secType} `,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const fetchViewSolution = async (attemptId, mockId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/view/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attemptId
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//GET ERROR TRACKER
export const fetchErrorTracker = async (attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attemptId
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// POST ERROR TRACKER

export const postToErrorTracker = async (attemptId, type, payload, uid) => {
   const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/errortracker/${attemptId}`,
      type: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        attemptId : attemptId,
        uid : uid
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for mock comparison

export const getMockComparison = async (mockId, attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/analyse/compare/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attemptId
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for getting particular prev mock data

export const getPrevMockData = async (attemptId) => {
  const token = localStorage.getItem("auth_token");
  const uid = JSON.parse(localStorage.getItem("userData"))._id
  try {
    const res = request({
      url: `/api/student/v1/analyse/getAttempts/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid:uid,
        attemptid:attemptId
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
        uid: uid      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for goal tracker

export const getGoalTrackerData = async (attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/analyse/goaltracker/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for market place

export const getMarketPlace = async (attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/marketplace`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        attemptId: attemptId,
        uid : uid
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// api for checking mock status

export const fetchMockStatus = async (mockId, attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/view/mockstatus/sectional/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Get score vs precentile

export const fetchScoreVsPrecentile = async (mockId,attemptId,uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `api/student/v1/analyse/scorevs/${uid}/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Getting score vs precentile By Mock Id

export const fetchScoreVsPrecentileByMockId = async (mockId,attemptId,uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `api/student/v1/analyse/scorevsById/${mockId}/${attemptId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId: attemptId,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

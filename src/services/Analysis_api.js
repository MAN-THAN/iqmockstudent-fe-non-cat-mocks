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

import request from "./Request";

// api for fetching analysis data

export const fetchAnalysisData = async (attempt_id) => {
  try {
    const res = await request({
      url: `api/student/v1/analyse/create/${attempt_id}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchLeaderBoard = async (
  startDate,
  endDate,
  mockId,
  attemptId
) => {
  try {
    const res = request({
      url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/analyse/createleaderBoard/${mockId}/${startDate}/${endDate}/${attemptId}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

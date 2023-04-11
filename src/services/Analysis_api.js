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
    return err;
  }
};

<<<<<<< HEAD
export const fetchLeaderBoard = async (
  startDate,
  endDate,
  mockId,
  attemptId
) => {
=======
export const fetchLeaderBoard = async (startDate,endDate,mockId ,attemptId) => {
>>>>>>> 04fb3b577563b88bbc2d1a3b94936f197f89e222
  try {
    const res = request({
      url: `${process.env.REACT_APP_LEADER_URL}/api/student/v1/analyse/createleaderBoard/${mockId}/${attemptId}/${startDate}/${endDate}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

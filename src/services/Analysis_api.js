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
>>>>>>> 964df2100af3768d2fe66c8e123c07db191fb7b6
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

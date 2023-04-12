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
<<<<<<< HEAD
      url: `${process.env.REACT_APP_LEADER_URL}/api/student/v1/analyse/createleaderBoard/${mockId}/${attemptId}/${startDate}/${endDate}`,
=======
      url: `/api/student/v1/analyse/createleaderBoard/${mockId}/${attemptId}/${startDate}/${endDate}`,
>>>>>>> 57945b8985d4e68226d78600b5fe774d67bb092d
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

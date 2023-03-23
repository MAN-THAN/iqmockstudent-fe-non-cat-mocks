import request from "./Request";

// api for fetching analysis data

export const fetchAnalysisData = async (attempt_id) => {
  try {
    const res = await request({
      url: `api/student/v1/analyse/create/${attempt_id}`,
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

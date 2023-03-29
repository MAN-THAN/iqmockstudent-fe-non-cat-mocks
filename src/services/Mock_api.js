import request from "./Request";

// api for creating attempt id

export const getAttemptId = async (name,email,uid) => {
  const jsonData = {
    name,
    email,
    uid,
    mockId: `${process.env.REACT_APP_MOCK_ID}`,
  };
  try {
    const res = await request({
      url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks`,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(jsonData),
    });
    // console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    console.log("Error --> attempt id can not be created!!!");
    throw err;
  }
};

// api for fetching main data

export const fetchQuestions = async (mockid, subject_type) => {
  try {
    const res = request({
      url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/quizs/${mockid}/${subject_type}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// api for fetching answer status

export const fetchAnswerStatus = async (attempt_id, subject_type) => {
  try {
    const res = request({
      url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/answerstatus/${attempt_id}/${subject_type}`,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

 // api for submit student answers(section-wise)

export const submitSection = async (attempt_id, subject_type, payload) => { 
  try {
    const res = request({
      url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/submitAnswer/${subject_type}/${attempt_id}`,
      type: "POST",
      data: {answers : payload},
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

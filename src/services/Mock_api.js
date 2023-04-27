import request from "./Request";

// api for creating attempt id

export const getAttemptId = async (name, email, uid, mockId, setId) => {
  const jsonData = {
    name,
    email
  };
  try {
    const res = await request({
      url: `/api/student/v1/mocks/post/${uid}/${setId}/${mockId}`,
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
    return err;
  }
};

// api for fetching main data

export const fetchQuestions = async (mockid, subject_type) => {
  try {
    const res = request({
      url: `/api/student/v1/quizs/${mockid}/${subject_type}`,
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
      url: `/api/student/v1/mocks/submitAnswer/${subject_type}/${attempt_id}`,
      type: "POST",
      data: {answers : payload},
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// api for college predictor

export const getPredictCollege = async (payload) => {
 
    const res = request({
      url: `/api/student/v1/analyse/read/64732643222`,
      type: "POST",
      data: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res
};


 // api for verification (MBR)

export const getVerified = async (email, otp) => {
  try {
    const res = request({
      url: `/api/student/v1/verify/user`,
      type: "POST",
      data: { email: email, otp: otp },
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

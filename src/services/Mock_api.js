import request from "./Request";

// api for creating attempt id

export const getAttemptId = async (name, email, uid, mockId, setId) => {
  const token = localStorage.getItem("auth_token");
  const jsonData = {
    name,
    email,
  };
  try {
    const res = await request({
      url: `/api/student/v1/mocks/post/${uid}/${setId}/${mockId}`,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid : uid
      },
      data: JSON.stringify(jsonData),
    });
    // //console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    //console.log("Error --> attempt id can not be created!!!");
    return err;
  }
};

// api for fetching main data

export const fetchQuestions = async (attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/quizs/${attemptId}`,
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
    throw err;
  }
};

// api for submit student answers(section-wise)

export const submitSection = async (attempt_id, payload, uid, type) => {
  const token = localStorage.getItem("auth_token");
  let data = {};
  data[type] = payload;
  try {
    const res = request({
      url: `/api/student/v1/quizs/${attempt_id}`,
      type: "POST",
      data: [data],
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        attemptId: attempt_id,
        uid : uid
      },
    });
    return res;
  } catch (err) {
    //console.log(err);
    return err;
  }
};

// api for college predictor

export const getPredictCollege = async (uid, payload) => {
  const token = localStorage.getItem("auth_token");
  const res = request({
    url: `/api/student/v1/analyse/read/${uid}`,
    type: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

// api for verification (MBR Side)

export const getVerified = async (email, otp, mockId) => {
  try {
    const res = request({
      url: `/api/student/v1/verify/user`,
      type: "POST",
      data: { email: email, otp: otp, mockId : mockId, type : "section" },
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    //console.log(err);
    return err;
  }
};

//api for token validation 
export const validateToken = async (uid) => {
  try {
    const token = localStorage.getItem("auth_token");
    const res = request({
      url: `/api/student/v1/verify/validate`,
      type: "GET",
      headers: { "Content-Type": "application/json" , Authorization:"Bearer "+ token ,uid:uid},
    });
    return res;
  } catch (err) {
    //console.log(err);
    return err;
  }
};
// discard button api(Resume mock)

export const discardMock = async (attemptId, uid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = request({
      url: `/api/student/v1/mocks/discard/${attemptId}`,
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attemptId
      },
    });
    if(res){
      localStorage.clear();
    }
    
    return res;
  } catch (err) {
    ////console.log(err);
    return err;
  }
};

// api to save student response on tab closure or cache clear

export const saveStudentProgress = async (attempt_id,type,payload,uid,timer)=>{
  const token = localStorage.getItem("auth_token");
  //console.log("type:",type);
  let data = {};
  data[type] = payload;
  try {
    const res = request({
      url: `/api/student/v1/quizs/submitStudentResponse/${type}/${attempt_id}`,
      type: "POST",
      data: {answer : data, timer : timer},
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        uid: uid,
        attemptId : attempt_id
      },
    });
    return res;
  } catch (err) {
    ////console.log(err);
    return err;
  }
}

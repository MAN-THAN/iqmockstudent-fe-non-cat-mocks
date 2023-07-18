import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { Stack, TextField, Typography, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ExpandMore } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { getPredictCollege } from "../services/Mock_api";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encode, decode } from "base-64";

const LoginForm = ({ setCollege, percentile, setFormData }) => {
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [program, setProgram] = useState("");
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(decode(localStorage.getItem("userData")));

  console.log("userDAta", userData);
  const {
    name: name_,
    email: email_,
    phone: phone_,
    gender: gender_,
    category: category_,
    dob: dob_,
    min10th,
    min12th,
    minWorkExInMon,
    mingrad,
    graduationStream,
  } = userData;

  //console.log(program);
  // Filling details if present
  useEffect(() => {
    // //console.log(name, gh);
    if (name_ !== undefined) {
      values.name = name_;
    }
    if (email_ !== undefined) {
      values.email = email_;
    }
    if (phone_ !== undefined) {
      let inputValue = phone_;
      if (
        inputValue.length > 10 &&
        (inputValue.startsWith("+91") || inputValue.startsWith("0"))
      ) {
        inputValue = inputValue.slice(
          inputValue.startsWith("+91") ? 3 : inputValue.startsWith("0") ? 1 : 0
        );
      }
      values.phone_number = Number(inputValue);
    }
    if (gender_ !== undefined) {
      setGender(gender_);
    }
    if (category_ !== undefined) {
      setCategory(category_);
    }
    // if (dob_ !== undefined) {
    //   setDob(dob_);
    // }
    if (min10th !== undefined) {
      values.class_10th_result = min10th;
    }
    if (min12th !== undefined) {
      values.class_12th_result = min12th;
    }
    if (minWorkExInMon !== undefined) {
      values.work_experience = minWorkExInMon;
    }
    if (mingrad !== undefined) {
      values.graduation_marks = mingrad;
    }
    if (graduationStream !== undefined) {
      setProgram(graduationStream);
    }
  }, []);

  useEffect(() => {
    values.category = category;
    values.gender = gender;
    values.program = program;
    // values.dob = dob;
  }, [category, gender, program]);

  const storedValues = JSON.parse(decode(localStorage.getItem("userData")));
  // const { name, email, phone, class_10th_result } = storedValues || {};

  useEffect(() => {
    const selectedDateString = dob?.$d;
    values.dob = selectedDateString;
  }, [dob]);

  const showToastMessage = () => {
    toast.error("Some error occurred! Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return setLoading(false);
  };

  const letterRegex = /^[1-9]\d*(\.\d{1,2})?$/;

  const initialValue = {
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    dob: "",
    class_10th_result: "",
    class_12th_result: "",
    graduation_marks: "",
    category: undefined,
    salary: "",
    work_experience: "",
    program: undefined,
  };

  const validationSchema = Yup.object({
    name: Yup.string().matches("[A-Za-z]", "Must be text").required("Required"),
    email: Yup.string(),
    phone_number: Yup.string()
      .min(10)
      .matches(/^[0-9]{1,10}$/, "Must be a number with maximum 10 digits")
      .required("Required"),
    gender: Yup.string(),
    class_10th_result: Yup.string()
      .min(2)
      .max(5)
      .matches(letterRegex, "Must be in correct format")
      .required("Required"),
    class_12th_result: Yup.string()
      .min(2)
      .max(5)
      .matches(letterRegex, "Must be in correct format")
      .required("Required"),
    graduation_marks: Yup.string()
      .min(2)
      .max(5)
      .matches(letterRegex, "Must be in correct format")
      .required("Required"),
    work_experience: Yup.string()
      .matches("^[1-9][0-9]?$|^100$", "Must be in correct format")
      .required("Required"),
  });

  const handlePercentageInputChange = (fieldName, inputValue, handleChange) => {
    let formattedValue = inputValue.replace(/[^0-9.]/g, "");

    if (formattedValue.length > 2) {
      const decimalIndex = formattedValue.indexOf(".");
      if (decimalIndex === -1) {
        formattedValue =
          formattedValue.slice(0, 2) + "." + formattedValue.slice(2);
      } else if (formattedValue.slice(decimalIndex + 1).length > 2) {
        formattedValue = formattedValue.slice(0, decimalIndex + 3);
      }
    }

    handleChange({ target: { name: fieldName, value: formattedValue } });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // api call(If any)
      const obj = {
        name: values.name,
        email: values.email,
        phone: values.phone_number,
        min10th: values.class_10th_result,
        min12th: values.class_12th_result,
        mingrad: values.graduation_marks,
        category: values.category,
        graduationStream: program,
        minWorkExInMon: Number(values.work_experience),
        gender: values.gender,
        minPercentile: percentile,
        currentSalary: values.salary,
      };
      setFormData(obj);
      setLoading(true);
      try {
        const uid = JSON.parse(decode(localStorage.getItem("userData")))?._id;
        const res = await getPredictCollege(uid, obj);
        //console.log(res);
        if (res?.status == 200) {
          setLoading(false);
        }
        //console.log(res);
        setCollege(res?.data.bschools);
      } catch (err) {
        showToastMessage();
        //console.log(err);
      }
    },
  });
  console.log(values);

  return (
    <React.Fragment>
      <ToastContainer />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background: "white",
          borderRadius: "1em",
          padding: "1.5em",
        }}
      >
        <Typography
          sx={{
            color: "#1066DA",
            fontWeight: 700,
            fontSize: "1.5em",
            marginLeft: 0.3,
          }}
        >
          Fill Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: "0.1em",
              gap: "10px",
              marginTop: 2,
            }}
          >
            {" "}
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="name"
              name="name"
              label="Full Name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              // helperText={touched.name && errors.name}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/user.png"
                    />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              disabled={
                name_ == undefined || name_ == null || name_ == ""
                  ? false
                  : true
              }
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              // helperText={touched.email && errors.email}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/email.png"
                    />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              disabled={
                email_ == undefined || email_ == null || email_ == ""
                  ? false
                  : true
              }
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              type="number"
              value={values.phone_number}
              onChange={(e) => {
                let inputValue = e.target.value.slice(0, 10);

                handleChange({
                  target: { name: "phone_number", value: inputValue },
                });
                e.target.value = inputValue;
              }}
              error={touched.phone_number && Boolean(errors.phone_number)}
              helperText={
                touched.phone_number &&
                Boolean(errors.phone_number) &&
                "phone number must be 10 digits"
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/telephone.png"
                    />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              required
            />
            <FormControl size="small" sx={{ width: "48%" }} required>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                IconComponent={() => (
                  <div style={{ marginRight: "0.8em" }}>
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/gender-symbols.png"
                    />
                  </div>
                )}
                labelId="gender"
                id="gender"
                value={gender}
                label="Age"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Others</MenuItem>
              </Select>
              {/* <FormHelperText>Disabled</FormHelperText> */}
            </FormControl>
            {/* <TextField
              sx={{ width: "48%" }}
              size="small"
              id="dob"
              name="dob"
              type="string"
              value={dob}
              onChange={handleChange}
              error={touched.dob && Boolean(errors.dob)}
              helperText={touched.dob && errors.dob}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/calendar.png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              disabled={dob_ === undefined ? false : true}
              required
            /> */}
            <Box sx={{ width: "48%" }}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth(optional)"
                  value={dob}
                  onChange={(newVal) => setDob(newVal)}
                  disableFuture
                  renderInput={(params) => <TextField {...params} />}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="class_10th_result"
              name="class_10th_result"
              label="Class 10th Result(%)"
              type="text"
              value={values.class_10th_result}
              onChange={(e) =>
                handlePercentageInputChange(
                  "class_10th_result",
                  e.target.value,
                  handleChange
                )
              }
              error={
                touched.class_10th_result && Boolean(errors.class_10th_result)
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/school(2).png"
                    />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              inputProps={{ maxLength: 5 }}
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="class_12th_result"
              name="class_12th_result"
              label="Class 12th Result(%)"
              type="text"
              value={values.class_12th_result}
              onChange={(e) =>
                handlePercentageInputChange(
                  "class_12th_result",
                  e.target.value,
                  handleChange
                )
              }
              error={
                touched.class_12th_result && Boolean(errors.class_12th_result)
              }
              // helperText={touched.class_12th_result && errors.class_12th_result}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/school(2).png"
                    />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100 },
              }}
              autoComplete="off"
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="graduation_marks"
              name="graduation_marks"
              label="Graduation Marks(%)"
              type="text"
              value={values.graduation_marks}
              onChange={(e) =>
                handlePercentageInputChange(
                  "graduation_marks",
                  e.target.value,
                  handleChange
                )
              }
              error={
                touched.graduation_marks && Boolean(errors.graduation_marks)
              }
              // helperText={touched.graduation_marks && errors.graduation_marks}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/school(1).png"
                    />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100 },
              }}
              autoComplete="off"
              required
            />
            {/* <TextField
            sx={{ width: "48%" }}
            size="small"
            id="category"
            name="category"
            label="Category"
            type="email"
            value={values.category}
            onChange={handleChange}
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img alt="no image" width="20px" height="20px" src="/application.png" />
                </InputAdornment>
              ),
            }}
            autoComplete="off"
            select
          >
            {" "}
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
            <FormControl
              size="small"
              sx={{ width: "48%" }}
              disabled={category_ === undefined ? false : true}
              required
            >
              <InputLabel id="category">Category</InputLabel>
              <Select
                IconComponent={() => (
                  <div style={{ marginRight: "0.8em" }}>
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/application.png"
                    />
                  </div>
                )}
                labelId="Category"
                id="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"GEN"}>General</MenuItem>
                <MenuItem value={"OBC"}>OBC</MenuItem>
                <MenuItem value={"EWS"}>EWS</MenuItem>
                <MenuItem value={"SC"}>SC</MenuItem>
                <MenuItem value={"ST"}>ST</MenuItem>
                <MenuItem value={"PWD"}>PwD</MenuItem>
              </Select>
              {/* <FormHelperText>Disabled</FormHelperText> */}
            </FormControl>
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="salary"
              name="salary"
              label="Salary(LPA)"
              type="number"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              // helperText={touched.salary && errors.salary}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/salary.png"
                    />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100 },
              }}
              autoComplete="off"
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="work_experience"
              name="work_experience"
              label="Work Experience(Mon)"
              type="text"
              value={values.work_experience}
              onChange={handleChange}
              error={touched.work_experience && Boolean(errors.work_experience)}
              // helperText={touched.work_experience && errors.work_experience}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/application.png"
                    />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 40 },
              }}
              autoComplete="off"
              required
            />
            <FormControl size="small" sx={{ width: "48%" }} required>
              <InputLabel id="program">Program</InputLabel>
              <Select
                IconComponent={() => (
                  <div style={{ marginRight: "0.8em" }}>
                    <img
                      alt="no image"
                      width="20px"
                      height="20px"
                      src="/application.png"
                    />
                  </div>
                )}
                labelId="Program"
                id="program"
                value={program}
                label="Program"
                onChange={(e) => setProgram(e.target.value)}
              >
                <MenuItem value={"btech"}>B.Tech</MenuItem>
                <MenuItem value={"bba"}>BBA</MenuItem>
                <MenuItem value={"Bcom"}>B.Com</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
              {/* <FormHelperText>Disabled</FormHelperText> */}
            </FormControl>
            <LoadingButton
              loading={loading}
              color="primary"
              variant="contained"
              width="5em"
              type="submit"
              endIcon={<img src="/arrowright.svg" />}
            >
              Next
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;

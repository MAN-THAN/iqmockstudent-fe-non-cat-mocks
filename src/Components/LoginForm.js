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

const LoginForm = ({ setCollege, percentile }) => {
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [program, setProgram] = useState("");
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    values.category = category;
    values.gender = gender;
    values.program = program;
    // values.dob = dob;
  }, [category, gender, program]);

  useEffect(() => {
    const selectedDateString = dob?.$d;
    console.log(selectedDateString);
    // console.log(selectedDateString)
    values.dob = selectedDateString;
  }, [dob]);

  const showToastMessage = () => {
    toast.error("Some error occurred! Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return setLoading(false);
  };

  function phoneValidationTest(message) {
    return this.test("isValidPhone", message, function (value) {
      const { path, createError } = this;
      const stringVal = value?.toString() || "";

      if (stringVal) {
        if (stringVal.length < 10 || stringVal.length > 11) {
          return createError({
            path,
            message: "Error",
          });
        }
      }
      return true;
    });
  }
  Yup.addMethod(Yup.mixed, "phoneValidation", phoneValidationTest);
  const validationSchema = Yup.object({
    name: Yup.string().matches("[A-Za-z]", "Must be text").required("Required"),
    email: Yup.string(),
    phone_number: Yup.mixed().phoneValidation(""),
    gender: Yup.string(),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldTouched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      gender: undefined,
      dob: undefined,
      class_10th_result: "",
      class_12th_result: "",
      graduation_marks: "",
      category: undefined,
      salary: "",
      work_experience: "",
      program: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      // setUserData(values)
      // api call(If any)
      const obj = {
        name: values.name,
        email: values.email,
        phone : values.phone_number,
        min10th: values.class_10th_result,
        min12th: values.class_12th_result,
        mingrad: values.graduation_marks,
        category: values.category,
        graduationStream: ["BCA"],
        minWorkExInMon: Number(values.work_experience),
        gender: values.gender,
        minPercentile: percentile,
      };
      setLoading(true);
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await getPredictCollege(uid, obj);
        console.log(res);
        if (res?.status == 200) {
          setLoading(false);
        }
        console.log(res);
        setCollege(res?.data[0]?.bschools);
      } catch (err) {
        showToastMessage();
        console.log(err);
      }
    },
  });

  return (
    <React.Fragment>
      <ToastContainer />
      <Box sx={{ width: "32vw", height: "auto", background: "white", borderRadius: "1em", padding: "1em" }}>
        <Typography sx={{ color: "#1066DA", fontWeight: 700, fontSize: "1.5em", marginLeft: "2em" }}>Fill Details</Typography>{" "}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: "0.6em", gap: "10px" }}>
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
                    <img alt="no image" width="20px" height="20px" src="/user.png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
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
                    <img alt="no image" width="20px" height="20px" src="/email.png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              type="tel"
              value={values.phone_number}
              onChange={handleChange}
              error={touched.phone_number && Boolean(errors.phone_number)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/telephone.png" />
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
                    <img alt="no image" width="20px" height="20px" src="/gender-symbols.png" />
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
            label="Date of Birth"
            type="dob"
            value={values.dob}
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
          /> */}
            <Box sx={{ width: "48%" }}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newVal) => setDob(newVal)}
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
              type="number"
              value={values.class_10th_result}
              onChange={handleChange}
              error={touched.class_10th_result && Boolean(errors.class_10th_result)}
              // helperText={touched.class_10th_result && errors.class_10th_result}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/school (2).png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              required
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="class_12th_result"
              name="class_12th_result"
              label="Class 12th Result(%)"
              type="number"
              value={values.class_12th_result}
              onChange={handleChange}
              error={touched.class_12th_result && Boolean(errors.class_12th_result)}
              // helperText={touched.class_12th_result && errors.class_12th_result}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/school (2).png" />
                  </InputAdornment>
                ),
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
              type="number"
              value={values.graduation_marks}
              onChange={handleChange}
              error={touched.graduation_marks && Boolean(errors.graduation_marks)}
              // helperText={touched.graduation_marks && errors.graduation_marks}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/school (1).png" />
                  </InputAdornment>
                ),
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
            <FormControl size="small" sx={{ width: "48%" }} required>
              <InputLabel id="category">Category</InputLabel>
              <Select
                IconComponent={() => (
                  <div style={{ marginRight: "0.8em" }}>
                    <img alt="no image" width="20px" height="20px" src="/application.png" />
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
              type="tel"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              // helperText={touched.salary && errors.salary}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/salary.png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
            />
            <TextField
              sx={{ width: "48%" }}
              size="small"
              id="work_experience"
              name="work_experience"
              label="Work Experience(Mon)"
              type="tel"
              value={values.work_experience}
              onChange={handleChange}
              error={touched.work_experience && Boolean(errors.work_experience)}
              // helperText={touched.work_experience && errors.work_experience}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="no image" width="20px" height="20px" src="/application.png" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              required
            />
            <FormControl size="small" sx={{ width: "48%" }}>
              <InputLabel id="program">Program</InputLabel>
              <Select
                IconComponent={() => (
                  <div style={{ marginRight: "0.8em" }}>
                    <img alt="no image" width="20px" height="20px" src="/application.png" />
                  </div>
                )}
                labelId="Program"
                id="program"
                value={program}
                label="Program"
                onChange={(e) => setProgram(e.target.value)}
              >
                <MenuItem value={"obc"}>B.Tech</MenuItem>
                <MenuItem value={"general"}>BCA</MenuItem>
                <MenuItem value={"general"}>BBA</MenuItem>
                <MenuItem value={"general"}>B.Com</MenuItem>
              </Select>
              {/* <FormHelperText>Disabled</FormHelperText> */}
            </FormControl>
            <LoadingButton loading={loading} color="primary" variant="contained" width="5em" type="submit" endIcon={<img src="/arrowright.svg" />}>
              Next
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;

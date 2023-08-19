import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { Stack, TextField, Typography, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ExpandMore, NumbersOutlined } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { getPredictCollege } from "../services/Mock_api";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { encode, decode } from "base-64";
import { useSelector } from "react-redux";

function LoginFormNew({ setCollege, percentile, setFormData }) {
    const userData = useSelector((state) => state.userData);
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

    const initialValue = {
        name: name_,
        email: email_,
        phone_number: phone_,
        gender: gender_.toLowerCase(),
        dob: null,
        class_10th_result: min10th,
        class_12th_result: min12th,
        graduation_marks: mingrad,
        category: category_,
        salary: "",
        work_experience: minWorkExInMon,
        program: graduationStream || null,
    };

    const [values, setValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({}); // State to track touched fields

    const handleBlur = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTouched({ ...value, [name]: true }); // Mark the field as touched on blur
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });

        // Check for validation errors when the field has been changed
        const error = validationSchema({ ...values, [name]: value });
        setFormErrors(error);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the memoized validation function for the final form submission
        const validationErrors = validationSchema(values);

        // Create an object to store which fields have validation errors
        const fieldsWithErrors = {};

        // Loop through the validation errors and set corresponding fields to true in touched state
        Object.keys(validationErrors).forEach((fieldName) => {
            console.log(fieldName);
            fieldsWithErrors[fieldName] = true;
        });

        console.log("Fieldlld", fieldsWithErrors);
        // Update the touched state with the fields that have errors
        setTouched((prev) => ({ ...prev, ...fieldsWithErrors }));

        // Update the form errors state
        await setFormErrors(validationErrors);
        if (
            Object.keys(validationErrors).length === 0 &&
            Object.keys(validationErrors).length === 0
        ) {
            const obj = {
                name: values.name,
                email: values.email,
                phone: values.phone_number,
                min10th: values.class_10th_result,
                min12th: values.class_12th_result,
                mingrad: values.graduation_marks,
                category: values.category,
                graduationStream: values.program,
                minWorkExInMon: Number(values.work_experience),
                gender: values.gender,
                currentSalary: values.salary,
                dob: values.dob,
                minPercentile: percentile,
            };
            setLoading(true);

            try {
                const uid = userData?._id;
                const res = await getPredictCollege(uid, obj);
                //console.log(res);
                if (res?.status == 200) {
                    setLoading(false);
                    setCollege(res?.data.bschools);
                    setFormData(obj);
                }
            } catch (err) {
                showToastMessage(err);
            }
        } else {
            showToastMessage();
            return;
        }
    };

    const showToastMessage = (err) => {
        toast.error(err || "Some error occurred! Please try again.", {
            position: toast.POSITION.TOP_CENTER,
        });
        return setLoading(false);
    };

    const validationSchema = useMemo(() => {
        return (values) => {
            const validationErrors = {};

            if (!values.name) {
                validationErrors.name = "Please enter your name";
            }

            if (!values.email) {
                validationErrors.email = "Please enter your email address";
            } else if (!isValidEmail(values.email)) {
                validationErrors.email = "Invalid email address";
            }

            if (!values.phone_number) {
                validationErrors.phone_number = "Please enter your phone number";
            } else if (!isValidPhoneNumber(values.phone_number)) {
                validationErrors.phone_number = "Invalid phone number";
            }

            if (!values.class_10th_result) {
                validationErrors.class_10th_result = "Please enter the percentage";
            } else if (values.class_10th_result < 33) {
                validationErrors.class_10th_result =
                    "Marks value cannot be less than 33";
            } else if (!isValidPercentage(values.class_10th_result)) {
                validationErrors.class_10th_result =
                    "Invalid class 10th result percentage";
            }

            if (!values.class_12th_result) {
                validationErrors.class_12th_result = "Please enter the percentage";
            } else if (values.class_12th_result < 33) {
                validationErrors.class_12th_result =
                    "Marks value cannot be less than 33";
            } else if (!isValidPercentage(values.class_12th_result)) {
                validationErrors.class_12th_result =
                    "Invalid class 12th_result percentage";
            }

            if (!values.graduation_marks) {
                validationErrors.graduation_marks = "Please enter the percentage";
            } else if (values.graduation_marks < 50) {
                validationErrors.graduation_marks =
                    "Marks value cannot be less than 50";
            } else if (!isValidPercentage(values.graduation_marks)) {
                validationErrors.graduation_marks = "Invalid Graduation Marks";
            }

            if (!values.gender) {
                validationErrors.gender = "Select the Gender";
            }
            if (!values.salary) {
                validationErrors.salary = "Enter Salary";
            }
            if (!values.work_experience) {
                validationErrors.work_experience = "Enter work Experience";
            }
            if (!values.program) {
                validationErrors.program = "Select the Stream";
            }

            if (!values.category) {
                validationErrors.category = "Select the Category";
            }

            //   if (!values.dob) {
            //     validationErrors.dob = "Select DOB";
            //   }

            return validationErrors;
        };
    }, []);

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        // Regular expression for phone number validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const isValidPercentage = (percentage) => {
        // Percentage validation logic
        const value = parseFloat(percentage);
        return !isNaN(value) && value >= 0 && value <= 100;
    };

    useEffect(() => {
        const selectedDateString = values.dob; // $d property is not needed here
        setValues((prevValues) => ({
            ...prevValues,
            dob: selectedDateString,
        }));
    }, [values.dob]);

    const handlePercentageInputChange = (
        fieldName,
        inputValue,
        handleChange,
        handleBlur
    ) => {
        let formattedValue = inputValue.replace(/[^0-9.]/g, "");
        const dotIndex = formattedValue.indexOf(".");
        if (dotIndex !== -1) {
            // Remove any dots after the first dot
            formattedValue =
                formattedValue.slice(0, dotIndex + 1) +
                formattedValue.slice(dotIndex + 1).replace(/\./g, "");
        }
        if (formattedValue.length > 2) {
            const decimalIndex = formattedValue.indexOf(".");
            if (decimalIndex === -1) {
                formattedValue =
                    formattedValue.slice(0, 2) + "." + formattedValue.slice(2);
            } else if (formattedValue.slice(decimalIndex + 1).length > 2) {
                formattedValue = formattedValue.slice(0, decimalIndex + 3);
            }
        }

        handleChange({
            target: { name: fieldName, value: Number(formattedValue) },
        });
        handleBlur({ target: { name: fieldName } });
    };

    console.log("Form errors", formErrors);
    console.log("values", values);
    console.log("Toucheed", touched);

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
                            name="name"
                            label="Full Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(formErrors.name)}
                            helperText={touched.name && formErrors.name}
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
                            onBlur={handleBlur}
                            error={touched.email && Boolean(formErrors.email)}
                            helperText={touched.email && formErrors.email}
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
                            onBlur={handleBlur}
                            onChange={(e) => {
                                let inputValue = e.target.value.slice(0, 10);

                                handleChange({
                                    target: { name: "phone_number", value: inputValue },
                                });
                                e.target.value = inputValue;
                            }}
                            error={touched.phone_number && Boolean(formErrors.phone_number)}
                            helperText={touched.phone_number && formErrors.phone_number}
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
                                name="gender"
                                value={values.gender}
                                error={touched.gender && Boolean(formErrors.gender)}
                                label="Gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"other"}>Others</MenuItem>
                            </Select>
                            {touched.gender && Boolean(formErrors.gender) && (
                                <FormHelperText>{formErrors.gender}</FormHelperText>
                            )}
                        </FormControl>
                        <Box sx={{ width: "48%" }}>
                            {" "}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    onChange={(newValue) =>
                                        handleChange({
                                            target: {
                                                name: "dob",
                                                value: newValue,
                                            },
                                        })
                                    }
                                    label="Date of Birth(optional)"
                                    value={values.dob}
                                    name="dob"
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
                            error={
                                touched.class_10th_result &&
                                Boolean(formErrors.class_10th_result)
                            }
                            helperText={
                                touched.class_10th_result && formErrors.class_10th_result
                            }
                            onChange={(e) =>
                                handlePercentageInputChange(
                                    "class_10th_result",
                                    e.target.value,
                                    handleChange,
                                    handleBlur
                                )
                            }
                            onBlur={handleBlur}
                            //   error={
                            //     touched.class_10th_result && Boolean(errors.class_10th_result)
                            //   }
                            //   helperText={touched.class_10th_result && errors.class_10th_result}
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
                                    handleChange,
                                    handleBlur
                                )
                            }
                            onBlur={handleBlur}
                            error={
                                touched.class_12th_result &&
                                Boolean(formErrors.class_12th_result)
                            }
                            helperText={
                                touched.class_12th_result && formErrors.class_12th_result
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
                                    handleChange,
                                    handleBlur
                                )
                            }
                            onBlur={handleBlur}
                            error={
                                touched.graduation_marks && Boolean(formErrors.graduation_marks)
                            }
                            helperText={
                                touched.graduation_marks && formErrors.graduation_marks
                            }
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
                                name="category"
                                value={values.category}
                                label="Category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.category && Boolean(formErrors.category)}
                            >
                                <MenuItem value={"GEN"}>General</MenuItem>
                                <MenuItem value={"OBC"}>OBC</MenuItem>
                                <MenuItem value={"EWS"}>EWS</MenuItem>
                                <MenuItem value={"SC"}>SC</MenuItem>
                                <MenuItem value={"ST"}>ST</MenuItem>
                                <MenuItem value={"PWD"}>PwD</MenuItem>
                            </Select>
                            {touched.category && Boolean(formErrors.category) && (
                                <FormHelperText sx={{ color: "#da4f4d" }}>
                                    {formErrors.category}
                                </FormHelperText>
                            )}
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
                            onBlur={handleBlur}
                            error={touched.salary && Boolean(formErrors.salary)}
                            helperText={touched.salary && formErrors.salary}
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
                            type="number"
                            value={values.work_experience}
                            onChange={(e) => {
                                let inputValue = e.target.value.slice(0, 2);

                                handleChange({
                                    target: {
                                        name: "work_experience",
                                        value: inputValue,
                                    },
                                });
                                e.target.value = inputValue;
                            }}
                            error={
                                touched.work_experience && Boolean(formErrors.work_experience)
                            }
                            onBlur={handleBlur}
                            helperText={touched.work_experience && formErrors.work_experience}
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
                                name="program"
                                value={values.program}
                                label="Program"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={formErrors.program && Boolean(formErrors.program)}
                            >
                                <MenuItem value={"btech"}>B.Tech</MenuItem>
                                <MenuItem value={"bba"}>BBA</MenuItem>
                                <MenuItem value={"Bcom"}>B.Com</MenuItem>
                                <MenuItem value={"others"}>Others</MenuItem>
                            </Select>
                            {touched.program && Boolean(formErrors.program) && (
                                <FormHelperText sx={{ color: "#da4f4d" }}>
                                    {formErrors.program}
                                </FormHelperText>
                            )}
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
}

export default LoginFormNew;
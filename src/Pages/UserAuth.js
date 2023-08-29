import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAttemptId } from "../services/Mock_api";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMockData, setCurrentSectionIndex } from "../store/slices/mockDataSlice";
import { addStudentResponse } from "../store/slices/mockDataSlice";

const UserAuth = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";

  //console.log(state);
  useEffect(() => {
    // userAuthCheck();
    createAttemptId();
  }, []);

  // Function for checking authorising user
  // const userAuthCheck = () => {
  //   const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId;
  //   //console.log(attemptID);
  //   if (attemptID) {
  //     //console.log("userAttemptID", attemptID);
  //     //console.log("go to m0ck page");
  //     // navigate(`/main/${state.mockId}/varc`);
  //     navigate(`/instructions`, {
  //       state: {
  //       mockId : state.mockId
  //     } });
  //   } else {
  //     //console.log("you dont have an attempt id");
  //     createAttemptId();
  //   }
  // Function for creating attempt id
  const createAttemptId = async () => {
    ////console.log("creating attemptid");
    try {
      dispatch(
        addMockData({
          mockname: "TISS",
          timer : 40,
          sections: [
            {
              name: "QUANTS",
              timing: 30,
              questions: [
                {
                  _id: "b8bdee8c-026a-4412-b34c-d6f41c5dbde9",
                  question:
                    '<span id="docs-internal-guid-b242bf01-7fff-9eb9-1236-4a952ae79c1c"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>Ratio of the earnings of Ram and Raghav is 4:7 respectively. If the earnings of Ram increase by 50% and the earnings of Raghav decrease by 25%, the new ratio of their earnings becomes 8:7 respectively. What is Raghav\'s earnings?</b></span></span>',
                  section: "quants",
                  type: 1,
                  options: [
                    '<span id="docs-internal-guid-7296c4a2-7fff-caa4-fb5d-00f69f9bab7d"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Data Inadequate </span></span>',
                    '<span id="docs-internal-guid-0a5b1919-7fff-ef6e-d19f-b4fcd355a49e"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Rs 21,000</span></span>',
                    '<span id="docs-internal-guid-f2e8f9be-7fff-15a6-b76d-f8304f55f446"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">RS 28,000</span></span>',
                    '<span id="docs-internal-guid-9964d689-7fff-3109-115b-0a98515a5283"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Rs 26,000</span></span><br>',
                  ],
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
                {
                  _id: "17f7df9f-27b7-4283-96af-24d2418f9d3f",
                  question:
                    '<span id="docs-internal-guid-56aa0486-7fff-82e2-4aa5-b5d46d799301"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>In two alloys, aluminum and iron are in the ratios of 4 : 1 and 1 : 3. After alloying together 10 kg of the first alloy, 16 kg of the second and several kilograms of pure aluminum, an alloy was obtained in which the ratio of aluminum to iron was 3 : 2. Find the weight of the new alloy.</b></span></span>',
                  section: "quants",
                  type: 1,
                  options: [
                    '<span id="docs-internal-guid-592cc7f6-7fff-f75f-27fb-c7f70dc9cfaa"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">15 kg</span></span>',
                    '<span id="docs-internal-guid-34b2ca93-7fff-171e-bab6-7cd0fee06fb4"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">35 kg</span></span>',
                    '<span id="docs-internal-guid-6128e19b-7fff-3887-8637-f2dd98dcb35d"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">65 kg</span></span>',
                    '<span id="docs-internal-guid-2ee3f8f9-7fff-64cd-d2df-eac1e8ef967c"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">95 kg</span></span>',
                  ],
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
              ],
            },
            {
              name: "VARC",
              timing: 30,
              questions: [
                {
                  _id: "eedae07e-d22f-46e4-aa4d-c6b02b2524e9",
                  question:
                    '<span id="docs-internal-guid-541290ea-7fff-57cd-5f09-3d5874d9b0e9"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>There are 8 students appearing in an examination of which 3 have to appear in a mathematics paper and the remaining 5 in different subjects. In how many ways can they be made to sit in a row, if all candidates in mathematics cannot sit next to each other?</b></span></span>',
                  section: "quants",
                  type: 1,
                  options: [
                    '<span id="docs-internal-guid-77bb248b-7fff-ef56-cefb-e40cf7af7a4f"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 7! X 3!</span></span>',
                    '<span id="docs-internal-guid-ca291cab-7fff-1900-a41a-50ceee1a84e8"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 6! X 3! </span></span>',
                    '<span id="docs-internal-guid-fca4734f-7fff-4235-4dd1-c1b33b2edbf5"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 5! X 3!</span></span>',
                    '<span id="docs-internal-guid-f3e91166-7fff-5eae-b8d6-1ac671f8a653"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 4! X 3!</span></span>',
                  ],
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
              ],
            },
            {
              name: "LRDI",
              timing: 30,
              questions: [
                {
                  _id: "41905979-07bd-4297-a969-3c241b2942d4",
                  question:
                    '<span id="docs-internal-guid-f1e1fe37-7fff-8a8d-8241-5d276ce9455a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>The price of articles ‘A’ and ‘B’ is ₹‘X’ and ₹(X + 600), respectively. Article ‘A’ is sold at 15% profit while article ‘B’ is sold at a 10% loss. If the selling price of article ‘B’ is ₹240 more than that of article ‘A’ and article ‘B’ is sold after giving a discount of 25%, then find the marked price of article ‘B’.</b></span></span>',
                  section: "quants",
                  type: 0,
                  options: null,
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
              ],
            },
            {
              name: "GK",
              timing: 30,
              questions: [
                {
                  _id: "cd4daab0-1346-4e9b-a719-b3b4923e7471",
                  question:
                    '<p><span id="docs-internal-guid-9a0d1a23-7fff-7525-59e3-3ae6a8a6f002"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>ABCD is a square and ∆ PBC is an equilateral triangle. If PQ&nbsp;⊥&nbsp;DC ,&nbsp;then find the measure of the&nbsp;∠DPQ </b></span></span></p><p><span id="docs-internal-guid-9a0d1a23-7fff-7525-59e3-3ae6a8a6f002"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span id="docs-internal-guid-2622bf67-7fff-3f7d-0c1a-12476ea33b31"><span style="font-size: 13pt; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline;"><span style="border:none;display:inline-block;overflow:hidden;width:146px;height:123px;"><img src="https://lh3.googleusercontent.com/3r230ZmReBT5nMmMCVL7e4AWmAaKF61SWNcHnR_sDtzNXBJZxHkqrLrhZixg3ZLNZVpMfJEdNzeXGsKPCwvcR1giA85fNmJ6wmn6_TViXNubBjF92wQmIYRVANp4E1Y-_SztYtNbUDEnT81EZmSYy9DBdHQEq-Ao" width="146" height="123" style="margin-left:0px;margin-top:0px;"></span></span></span><b><br></b></span></span></p>',
                  section: "quants",
                  type: 1,
                  options: [
                    '<span id="docs-internal-guid-0913964d-7fff-e1a7-b059-edf6dd543d7a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">30</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                    '<span id="docs-internal-guid-4d907ec6-7fff-ffe9-f5bf-ff6c3d922867"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">15</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0&nbsp;</span></span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">&nbsp;</span></span>',
                    '<span id="docs-internal-guid-33191c4b-7fff-27a3-fbeb-d0c18c000632"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">25</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                    '<span id="docs-internal-guid-319ed457-7fff-445a-74b9-436780c7cc2a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">20</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                  ],
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
                {
                  _id: "41905979-07bd-4297-a969-3c241b2942d4",
                  question:
                    '<span id="docs-internal-guid-f1e1fe37-7fff-8a8d-8241-5d276ce9455a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>The price of articles ‘A’ and ‘B’ is ₹‘X’ and ₹(X + 600), respectively. Article ‘A’ is sold at 15% profit while article ‘B’ is sold at a 10% loss. If the selling price of article ‘B’ is ₹240 more than that of article ‘A’ and article ‘B’ is sold after giving a discount of 25%, then find the marked price of article ‘B’.</b></span></span>',
                  section: "quants",
                  type: 0,
                  options: null,
                  isPara: "No",
                  videoLink: "",
                  stage: 0,
                },
              ],
            },
          ],
          isCalculatorAllowed: true,
          isToggleAllowed: false,
        })
      );
      dispatch(
        addStudentResponse([
          {
            name: "QUANTS",
            timing: 30,
            questions: [
              {
                _id: "b8bdee8c-026a-4412-b34c-d6f41c5dbde9",
                question:
                  '<span id="docs-internal-guid-b242bf01-7fff-9eb9-1236-4a952ae79c1c"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>Ratio of the earnings of Ram and Raghav is 4:7 respectively. If the earnings of Ram increase by 50% and the earnings of Raghav decrease by 25%, the new ratio of their earnings becomes 8:7 respectively. What is Raghav\'s earnings?</b></span></span>',
                section: "quants",
                type: 1,
                options: [
                  '<span id="docs-internal-guid-7296c4a2-7fff-caa4-fb5d-00f69f9bab7d"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Data Inadequate </span></span>',
                  '<span id="docs-internal-guid-0a5b1919-7fff-ef6e-d19f-b4fcd355a49e"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Rs 21,000</span></span>',
                  '<span id="docs-internal-guid-f2e8f9be-7fff-15a6-b76d-f8304f55f446"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">RS 28,000</span></span>',
                  '<span id="docs-internal-guid-9964d689-7fff-3109-115b-0a98515a5283"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">Rs 26,000</span></span><br>',
                ],
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
              {
                _id: "17f7df9f-27b7-4283-96af-24d2418f9d3f",
                question:
                  '<span id="docs-internal-guid-56aa0486-7fff-82e2-4aa5-b5d46d799301"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>In two alloys, aluminum and iron are in the ratios of 4 : 1 and 1 : 3. After alloying together 10 kg of the first alloy, 16 kg of the second and several kilograms of pure aluminum, an alloy was obtained in which the ratio of aluminum to iron was 3 : 2. Find the weight of the new alloy.</b></span></span>',
                section: "quants",
                type: 1,
                options: [
                  '<span id="docs-internal-guid-592cc7f6-7fff-f75f-27fb-c7f70dc9cfaa"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">15 kg</span></span>',
                  '<span id="docs-internal-guid-34b2ca93-7fff-171e-bab6-7cd0fee06fb4"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">35 kg</span></span>',
                  '<span id="docs-internal-guid-6128e19b-7fff-3887-8637-f2dd98dcb35d"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">65 kg</span></span>',
                  '<span id="docs-internal-guid-2ee3f8f9-7fff-64cd-d2df-eac1e8ef967c"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">95 kg</span></span>',
                ],
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
            ],
          },
          {
            name: "VARC",
            timing: 30,
            questions: [
              {
                _id: "eedae07e-d22f-46e4-aa4d-c6b02b2524e9",
                question:
                  '<span id="docs-internal-guid-541290ea-7fff-57cd-5f09-3d5874d9b0e9"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>There are 8 students appearing in an examination of which 3 have to appear in a mathematics paper and the remaining 5 in different subjects. In how many ways can they be made to sit in a row, if all candidates in mathematics cannot sit next to each other?</b></span></span>',
                section: "quants",
                type: 1,
                options: [
                  '<span id="docs-internal-guid-77bb248b-7fff-ef56-cefb-e40cf7af7a4f"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 7! X 3!</span></span>',
                  '<span id="docs-internal-guid-ca291cab-7fff-1900-a41a-50ceee1a84e8"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 6! X 3! </span></span>',
                  '<span id="docs-internal-guid-fca4734f-7fff-4235-4dd1-c1b33b2edbf5"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 5! X 3!</span></span>',
                  '<span id="docs-internal-guid-f3e91166-7fff-5eae-b8d6-1ac671f8a653"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">8! – 4! X 3!</span></span>',
                ],
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
            ],
          },
          {
            name: "LRDI",
            timing: 30,
            questions: [
              {
                _id: "41905979-07bd-4297-a969-3c241b2942d4",
                question:
                  '<span id="docs-internal-guid-f1e1fe37-7fff-8a8d-8241-5d276ce9455a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>The price of articles ‘A’ and ‘B’ is ₹‘X’ and ₹(X + 600), respectively. Article ‘A’ is sold at 15% profit while article ‘B’ is sold at a 10% loss. If the selling price of article ‘B’ is ₹240 more than that of article ‘A’ and article ‘B’ is sold after giving a discount of 25%, then find the marked price of article ‘B’.</b></span></span>',
                section: "quants",
                type: 0,
                options: null,
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
            ],
          },
          {
            name: "GK",
            timing: 30,
            questions: [
              {
                _id: "cd4daab0-1346-4e9b-a719-b3b4923e7471",
                question:
                  '<p><span id="docs-internal-guid-9a0d1a23-7fff-7525-59e3-3ae6a8a6f002"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>ABCD is a square and ∆ PBC is an equilateral triangle. If PQ&nbsp;⊥&nbsp;DC ,&nbsp;then find the measure of the&nbsp;∠DPQ </b></span></span></p><p><span id="docs-internal-guid-9a0d1a23-7fff-7525-59e3-3ae6a8a6f002"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span id="docs-internal-guid-2622bf67-7fff-3f7d-0c1a-12476ea33b31"><span style="font-size: 13pt; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline;"><span style="border:none;display:inline-block;overflow:hidden;width:146px;height:123px;"><img src="https://lh3.googleusercontent.com/3r230ZmReBT5nMmMCVL7e4AWmAaKF61SWNcHnR_sDtzNXBJZxHkqrLrhZixg3ZLNZVpMfJEdNzeXGsKPCwvcR1giA85fNmJ6wmn6_TViXNubBjF92wQmIYRVANp4E1Y-_SztYtNbUDEnT81EZmSYy9DBdHQEq-Ao" width="146" height="123" style="margin-left:0px;margin-top:0px;"></span></span></span><b><br></b></span></span></p>',
                section: "quants",
                type: 1,
                options: [
                  '<span id="docs-internal-guid-0913964d-7fff-e1a7-b059-edf6dd543d7a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">30</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                  '<span id="docs-internal-guid-4d907ec6-7fff-ffe9-f5bf-ff6c3d922867"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">15</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0&nbsp;</span></span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">&nbsp;</span></span>',
                  '<span id="docs-internal-guid-33191c4b-7fff-27a3-fbeb-d0c18c000632"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">25</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                  '<span id="docs-internal-guid-319ed457-7fff-445a-74b9-436780c7cc2a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">20</span><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="font-size:0.6em;vertical-align:super;">0</span></span></span>',
                ],
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
              {
                _id: "41905979-07bd-4297-a969-3c241b2942d4",
                question:
                  '<span id="docs-internal-guid-f1e1fe37-7fff-8a8d-8241-5d276ce9455a"><span style="font-size: 13pt; font-family: Calibri, sans-serif; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><b>The price of articles ‘A’ and ‘B’ is ₹‘X’ and ₹(X + 600), respectively. Article ‘A’ is sold at 15% profit while article ‘B’ is sold at a 10% loss. If the selling price of article ‘B’ is ₹240 more than that of article ‘A’ and article ‘B’ is sold after giving a discount of 25%, then find the marked price of article ‘B’.</b></span></span>',
                section: "quants",
                type: 0,
                options: null,
                isPara: "No",
                videoLink: "",
                stage: 0,
              },
            ],
          },
        ])
      );
      dispatch(setCurrentSectionIndex(0));
      const response = await getAttemptId(
        state.name,
        state.email,
        state.uid,
        state.mockId,
        state.setId
      );
      console.log(response);
      if (response?.status === 200) {
        localStorage.setItem("attemptId", response.data.attemptId);
        localStorage.setItem("currMockId", state.mockId);
        localStorage.setItem("mockName", response.data.title);
        // userAuthCheck();
        navigate(`/main`, {
          state: {
            mockId: state.mockId,
            attemptId: response.data.attemptId,
          },
        });
      } else if (response?.status == 201 || response?.status == 202) {
        showToastMessage(
          response?.data?.message || "Please Make a Purchase To Access!"
        );
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "https://www.iquanta.in/cat-mock-test";
        }, 4000);
      } else {
        showToastMessage(response?.data?.message);
        return;
      }
    } catch (err) {
      //console.log(err);
      showToastMessage();
    }
  };
  const showToastMessage = (msg) => {
    toast.error(
      msg == undefined
        ? "Some error occurred! Please reload the page."
        : msg.toUpperCase(),
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    return setLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "95vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loader ? (
          <>
            {" "}
            <RingLoader color="var(--orange)" size="150px" />
            <h5
              className="loader_title"
              style={{ textAlign: "center", marginTop: "1em" }}
            >
              Loading..... Please wait!
            </h5>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </React.Fragment>
  );
};
export default UserAuth;

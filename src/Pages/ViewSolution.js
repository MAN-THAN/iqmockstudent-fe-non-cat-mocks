import React, { useState } from "react";
import Box from "@mui/material/Box";
import { IoBookSharp } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { BootstrapButton, BootstrapTooltip } from "../styleSheets/Style";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { StyledMenu } from "../styleSheets/Style";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Paper } from "@mui/material";
import TempCompo from "../Components/tempCompo";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyButton } from "../styleSheets/Style";
import MenuDrawer from "../Components/MenuDrawer";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";

function ViewSolution() {
  const { handlePageClick } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Verbal Ability");

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sub) => {
    setAnchorEl(null);
    setSelected(sub);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100Vh" }}>
      <MenuDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2,width: "calc(100% - 240px)", height: "100%" }}
      >
        <Box component="div" sx={{ height: "10%" }}>
          <HeaderNew />
        </Box>
        {/* Navigation bar  */}
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,
            height: "10%",
            paddingTop: "1em",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexBasis: "10%" }}>
            <BootstrapButton
              id="demo-customized-button"
              aria-controls={openMenu ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              height={47}
              sx={{
                background: "#F1F4F9",
                "&:hover ,&:focus": { background: "#F1F4F9", color: "black" },
              }}
            >
              {selected}
            </BootstrapButton>

            <StyledMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ ml: 4 }}
            >
              <MenuItem
                sx={{
                  backgroundColor:
                    selected === "Verbal Ability" ? "#f5f5f5" : "",
                }}
                onClick={() => handleClose("Verbal Ability")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Verbal Ability
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                sx={{
                  backgroundColor:
                    selected === "Logical Reasoning" ? "#f5f5f5" : "",
                }}
                onClick={() => handleClose("Logical Reasoning")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Logical Reasoning
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                sx={{ backgroundColor: selected === "Quants" ? "#f5f5f5" : "" }}
                onClick={() => handleClose("Quants")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Quants
              </MenuItem>
            </StyledMenu>
          </div>

          <div
            style={{
              flexBasis: "80%",
              display: "flex",
              flexWrap: "wrap",
              columnGap: 6,
              rowGap: 3,
            }}
          >
            {[...Array(24)].map((item, index) => (
              <BootstrapTooltip
                title={
                  <div className="py-2">
                    <div
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontFamily: "var(--inter)",
                        fontWeight: 600,
                        lineHeight: "1",
                      }}
                    >
                      Difficulty
                    </div>
                    <span
                      style={{
                        color: "var(--orange)",
                        fontSize: "18px",
                        fontFamily: "var(--inter)",
                        fontWeight: 800,
                      }}
                    >
                      Moderate
                    </span>
                  </div>
                }
                placement="top"
                TransitionComponent={Zoom}
                arrow
                // open={index == 3 && true}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2196F3",
                    cursor: "pointer",
                    width: "33.95px",
                    height: "33.95px",
                    fontSize: "15px",
                    p: 2,
                  }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  <Typography variant="paragraph" sx={{ color: "white" }}>
                    {" "}
                    {index + 1}
                  </Typography>
                </Avatar>
              </BootstrapTooltip>
            ))}
          </div>
        </Box>
        {/* Navigation bar end */}

        {/* Main center start */}
        <Box
          component="div"
          sx={{ display: "flex", gap: 3, height: "61%", mt: "1em" }}
        >
          {/* LEFT Main start */}
          <Box
            sx={{
              width: "80%",

              display: "flex",
              boxShadow: 3,
              boder: "none",
              borderRadius: 5,
            }}
            component={Paper}
          >
            <Box
              component="div"
              sx={{
                flexBasis: "60% ",
                textAlign: "justify",
                height: "100%",
                overflow: "scroll",
                p: 3,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              doloribus pariatur quisquam, nostrum vero, eum cumque molestiae
              debitis optio molestias ipsa repellendus. Quidem eos est
              recusandae in eius hic explicabo quam maxime deleniti, quas illo.
              Dolores explicabo temporibus nemo, aspernatur eum nulla adipisci!
              Sint illo quis officiis vitae molestiae, dolor placeat aliquam
              non, repellat repellendus quidem, neque eveniet eligendi ab!
              Delectus, facilis atque distinctio commodi voluptatum aliquam, est
              sapiente incidunt alias perferendis officia rem ab libero dolorum
              nisi sunt eveniet corrupti. Distinctio ullam architecto, obcaecati
              facilis quos veniam soluta laborum et laboriosam, nesciunt magnam
              placeat pariatur blanditiis. Labore atque dicta, blanditiis
              cupiditate amet odio eaque possimus rem vel beatae, laudantium
              itaque suscipit? Excepturi ratione suscipit earum cumque molestiae
              repudiandae, quasi iusto quod id odio officiis, quisquam deserunt
              dicta rerum fugiat accusantium dignissimos voluptates maxime
              itaque. Sed perspiciatis deleniti molestias porro iure veniam
              eaque nam, magni sequi ullam tenetur sint repudiandae fugiat fugit
              eum, repellendus similique nostrum? Eaque eum odio saepe a quos
              consequuntur architecto repellendus, quia ad, esse possimus omnis.
              Ullam debitis perferendis deleniti numquam obcaecati cum molestias
              aliquid a neque voluptas, earum optio voluptatum, commodi sapiente
              quis assumenda nobis nisi at temporibus quo ea nulla quae.
              Voluptates ipsa eaque numquam, nulla perferendis similique tenetur
              eum aspernatur consequatur, sequi iusto maiores aliquam soluta
              assumenda explicabo cumque tempore est! Unde perspiciatis minus,
              labore dicta maiores beatae maxime consequatur iure explicabo
              numquam non pariatur alias debitis voluptatem eius nam vitae sunt,
              tempore, voluptates eveniet. Ipsum maiores voluptatibus, neque
              praesentium blanditiis suscipit, voluptatum quod fugiat totam
              consequatur officia magni sit, quos libero possimus voluptas
              sapiente harum assumenda voluptates natus. Voluptas animi nemo
              molestiae dolore vitae! Veniam velit voluptate sed rerum
              inventore? Repudiandae voluptatibus saepe reprehenderit, quae quod
              distinctio ratione, omnis debitis autem vero ad error id sit
              repellat in eveniet. Quis odit ea possimus excepturi. Optio ut
              amet neque autem eum facilis delectus quas dolorem voluptatibus
              dicta qui cumque incidunt beatae perspiciatis consectetur facere
              corrupti, officiis corporis ipsum, debitis sequi ullam aperiam
              magni veniam. Exercitationem asperiores odit veniam nisi esse
              inventore similique aliquam, error totam tempora aspernatur
              laborum quae quasi quia iure ex ut pariatur illum fugiat, tempore
              quisquam id cumque. Deserunt quia quibusdam, ullam dolore quo ipsa
              exercitationem tempore dolorem nulla adipisci a reiciendis
              facilis? Magni possimus quas eveniet quaerat doloremque
              necessitatibus, vel ab ipsa perferendis excepturi! Labore numquam
              unde, hic facilis soluta molestiae suscipit ducimus quo
              consectetur nesciunt temporibus magnam dolor repellat repudiandae
              quia voluptatum. Doloribus, autem accusantium fuga laboriosam qui
              veritatis voluptates nostrum. Debitis perferendis explicabo ut
              alias eos accusamus id voluptatem ipsam, doloribus consectetur
              omnis incidunt recusandae natus exercitationem ab amet at aliquid
              ipsa velit. Perspiciatis, nesciunt? Assumenda quae sapiente
              aliquid accusantium maxime deserunt porro impedit. Delectus est
              similique doloremque, culpa quisquam enim cum. Libero iste
              possimus cupiditate nostrum quibusdam placeat porro eum, vero qui
              inventore quod aperiam labore impedit vel quisquam. Omnis,
              praesentium perspiciatis! Magnam sed consequatur corrupti
              voluptate officiis eligendi alias sit natus distinctio, nihil
              nesciunt. Cumque quasi a impedit, blanditiis optio quia dolorum at
              voluptatem praesentium!
            </Box>
            <Box
              component="div"
              sx={{
                flexBasis: "40%",
                textAlign: "justify",
                height: "100%",
                overflow: "scroll",
                p: 3,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              autem odio sint harum corporis obcaecati amet recusandae, unde
              repellendus laboriosam cum reiciendis fugit sunt exercitationem
              ducimus facere. Atque similique quibusdam est pariatur velit ipsam
              odit soluta? Nulla ipsa aut doloremque autem nam tenetur aperiam
              expedita temporibus voluptate ut. Unde aperiam perspiciatis
              corrupti iusto aut, ea saepe natus sit illo magnam obcaecati
              officiis mollitia? Corrupti nemo in sed voluptas! Ex, quia?
              Commodi id expedita quisquam ipsa laudantium ad consequatur quo
              non magni saepe fugiat, facere nulla totam suscipit perspiciatis.
              Alias sit officiis facilis harum. Totam, nulla eveniet molestiae
              ex similique porro perspiciatis veritatis molestias, quas quis
              dolore sunt quasi? Quia optio, libero est expedita sit
              necessitatibus maiores ipsa. Suscipit doloribus minus, aliquam
              animi consequuntur ex perspiciatis assumenda facilis iusto. Ullam
              reprehenderit cum pariatur fugit vel odit eveniet quaerat non
              ducimus placeat praesentium, sunt adipisci, blanditiis dolorem.
              Mollitia reiciendis quis voluptates, repellat expedita debitis
              eum, voluptatum nisi, saepe necessitatibus recusandae. Earum
              obcaecati debitis cupiditate praesentium velit sunt alias quo
              ratione deserunt quam veritatis nostrum, aspernatur quaerat sit
              accusantium, voluptate dolorem id! Non dicta quas amet dolorem
              porro eligendi, veniam eos corporis ad voluptatem obcaecati
              accusantium eius molestiae sit eveniet error doloremque deserunt.
              <Box component="div" sx={{ display: "flex" }}>
                <MyButton
                  sx={{
                    background: "var(--blue-new)",
                    width: "auto",
                    "&:hover": { background: "var(--blue-new)" },
                  }}
                  height={54}
                  startIcon={
                    <img
                      src="/solutionButton.png"
                      alt=""
                      className="img-fluid"
                    />
                  }
                >
                  Solutions
                </MyButton>
                <MyButton
                  sx={{
                    background: "var(--blue-new)",
                    width: "auto",
                    "&:hover": { background: "var(--blue-new)" },
                  }}
                  height={54}
                  startIcon={
                    <img src="/viewSol-icon.png" alt="" className="img-fluid" />
                  }
                >
                  View Solution
                </MyButton>
                <MyButton
                  sx={{
                    background: "#CFCFCF",
                    color: "black",
                    width: "auto",
                    "&:hover": { background: "#CFCFCF" },
                  }}
                  height={54}
                  startIcon={
                    <img src="/playButton.png" alt="" className="img-fluid" />
                  }
                >
                  Video Solution
                </MyButton>
              </Box>
            </Box>
          </Box>
          {/* left Main end */}

          {/* Right main start */}
          <Box
            sx={{
              width: "25%",
              background: "#F1F4F9",
              boxShadow: 3,
              textAlign: "justify",
              height: "100%",
              overflow: "scroll",
              p: 6,
              borderRadius: 5,
              position: "relative",
            }}
            component={Paper}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ textAlign: "left", fontSize: "19.8px", fontWeight: 750 }}
              >
                Why did you get it wrong?
              </Typography>
              <FormControl sx={{ paddingTop: 1 }}>
                <FormLabel id="demo-radio-buttons-group-label">{""}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Did not understand the concept"
                    control={<Radio size="small" />}
                    label="Did not understand the concept"
                  />
                  <FormControlLabel
                    value="I understood the concept but failed to apply it correctly"
                    control={<Radio size="small" />}
                    label="I understood the concept but failed to apply it correctly"
                  />
                  <FormControlLabel
                    value="I misread the question"
                    control={<Radio size="small" />}
                    label="I misread the question"
                  />
                  <FormControlLabel
                    value="I ran out of time"
                    control={<Radio size="small" />}
                    label="I ran out of time"
                  />
                  <FormControlLabel
                    value="Made a silly mistake"
                    control={<Radio size="small" />}
                    label="Made a silly mistake"
                  />
                  <FormControlLabel
                    value="Fell for the trap answer"
                    control={<Radio size="small" />}
                    label="Fell for the trap answer"
                  />
                  <FormControlLabel
                    value="Guessed the answer"
                    control={<Radio size="small" />}
                    label="Guessed the answer"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <Box
                sx={{
                  height: "2.5em",
                  width: "80%",
                  background: "#3B36DB",
                  borderRadius: "1em",
                  position: "absolute",
                  top: 0,
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#FFE401" }}>Error Tracker</Typography>
                <img></img>
                <Typography>iQ GPT 1.0</Typography>
              </Box>
            </Box>
          </Box>
          {/* Right main end */}
        </Box>
        {/* Main center end */}

        {/* Lower cards section start */}
        <Box component="div" sx={{ height: "15%", py: "1em" }}>
          <TempCompo />
        </Box>
        {/* Lower cards section end */}
      </Box>
    </Box>
  );
}

export default ViewSolution;

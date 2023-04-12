import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { IoBookSharp } from "react-icons/io5";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { BootstrapButton, BootstrapTooltip } from "../styleSheets/Style";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { BiMenu } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { StyledMenu } from "../styleSheets/Style";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import ContentDrawer from "../Components/ContentDrawer"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Paper } from "@mui/material";
import TempCompo from "./tempCompo";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#F1F1F1",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  background: "#F1F1F1",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);
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
    <Box sx={{ display: "flex", width: "100vw" , height:"100Vh"}}>
      <CssBaseline />
  <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <RxCross1 className="fs-5 fw-bold text-dark" />
            ) : (
              <BiMenu className="fs-2 fw-bold text-dark" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "Home", icon: "Group138.png" },
            { text: "View Solution", icon: "podium1.png" },
            { text: "Leader Board", icon: "goal1.png" },
            { text: "Drafts", icon: "shopping-bag.png" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  mb: 3,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/" + item.icon}
                    className="img-fluid"
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <Typography variant="paragraph">{item.text}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List
          sx={{
            position: "absolute",
            bottom: 0,
          }}
        >
          {[
            {
              name: "Help",
              icon: "customerService.png",
            },
          ].map((item, index) => (
            <ListItem key={item} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img src={process.env.PUBLIC_URL + "/" + item.icon} alt="" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2, width: "80%" ,  }}>
        <header className="w-100 text-dark p-2 ">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="flex-item ">
              <NavLink to="/">
                <img
                  src="/iQuanta.png"
                  alt="iquanta_logo"
                  className="img-fluid iquanta_logo"
                />
              </NavLink>
            </div>

            <div className="d-flex gap-3 ">
              <div className="text-end">
                <Typography
                  sx={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "19px",
                    fontWeight: 600,
                  }}
                >
                  {"Gaurav"}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 400,
                  }}
                >
                  User id :{675788716}
                </Typography>
              </div>

              <div className="d-flex">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none "
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="50"
                    height="50"
                    className="rounded"
                  />
                </a>
              </div>
            </div>
          </div>
        </header>
        {/* Navigation bar  */}
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,
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
              height={59}
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
                    width: "35px",
                    height: "35px",

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
        <Box component="div" sx={{display:"flex" ,gap:3 ,height:"56vh",mt:"1em" }}>
         {/* LEFT Main start */}
          <Box  sx={{width:"70%" , display:"flex", boxShadow:3, boder:"none"}}component={Paper}>
           <Box component="div" sx={{flexBasis:"60% " ,textAlign:"justify",height:"100%", overflow:"scroll", p:3}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus pariatur quisquam, nostrum vero, eum cumque molestiae debitis optio molestias ipsa repellendus. Quidem eos est recusandae in eius hic explicabo quam maxime deleniti, quas illo. Dolores explicabo temporibus nemo, aspernatur eum nulla adipisci! Sint illo quis officiis vitae molestiae, dolor placeat aliquam non, repellat repellendus quidem, neque eveniet eligendi ab! Delectus, facilis atque distinctio commodi voluptatum aliquam, est sapiente incidunt alias perferendis officia rem ab libero dolorum nisi sunt eveniet corrupti. Distinctio ullam architecto, obcaecati facilis quos veniam soluta laborum et laboriosam, nesciunt magnam placeat pariatur blanditiis. Labore atque dicta, blanditiis cupiditate amet odio eaque possimus rem vel beatae, laudantium itaque suscipit? Excepturi ratione suscipit earum cumque molestiae repudiandae, quasi iusto quod id odio officiis, quisquam deserunt dicta rerum fugiat accusantium dignissimos voluptates maxime itaque. Sed perspiciatis deleniti molestias porro iure veniam eaque nam, magni sequi ullam tenetur sint repudiandae fugiat fugit eum, repellendus similique nostrum? Eaque eum odio saepe a quos consequuntur architecto repellendus, quia ad, esse possimus omnis. Ullam debitis perferendis deleniti numquam obcaecati cum molestias aliquid a neque voluptas, earum optio voluptatum, commodi sapiente quis assumenda nobis nisi at temporibus quo ea nulla quae. Voluptates ipsa eaque numquam, nulla perferendis similique tenetur eum aspernatur consequatur, sequi iusto maiores aliquam soluta assumenda explicabo cumque tempore est! Unde perspiciatis minus, labore dicta maiores beatae maxime consequatur iure explicabo numquam non pariatur alias debitis voluptatem eius nam vitae sunt, tempore, voluptates eveniet. Ipsum maiores voluptatibus, neque praesentium blanditiis suscipit, voluptatum quod fugiat totam consequatur officia magni sit, quos libero possimus voluptas sapiente harum assumenda voluptates natus. Voluptas animi nemo molestiae dolore vitae! Veniam velit voluptate sed rerum inventore? Repudiandae voluptatibus saepe reprehenderit, quae quod distinctio ratione, omnis debitis autem vero ad error id sit repellat in eveniet. Quis odit ea possimus excepturi. Optio ut amet neque autem eum facilis delectus quas dolorem voluptatibus dicta qui cumque incidunt beatae perspiciatis consectetur facere corrupti, officiis corporis ipsum, debitis sequi ullam aperiam magni veniam. Exercitationem asperiores odit veniam nisi esse inventore similique aliquam, error totam tempora aspernatur laborum quae quasi quia iure ex ut pariatur illum fugiat, tempore quisquam id cumque. Deserunt quia quibusdam, ullam dolore quo ipsa exercitationem tempore dolorem nulla adipisci a reiciendis facilis? Magni possimus quas eveniet quaerat doloremque necessitatibus, vel ab ipsa perferendis excepturi! Labore numquam unde, hic facilis soluta molestiae suscipit ducimus quo consectetur nesciunt temporibus magnam dolor repellat repudiandae quia voluptatum. Doloribus, autem accusantium fuga laboriosam qui veritatis voluptates nostrum. Debitis perferendis explicabo ut alias eos accusamus id voluptatem ipsam, doloribus consectetur omnis incidunt recusandae natus exercitationem ab amet at aliquid ipsa velit. Perspiciatis, nesciunt? Assumenda quae sapiente aliquid accusantium maxime deserunt porro impedit. Delectus est similique doloremque, culpa quisquam enim cum. Libero iste possimus cupiditate nostrum quibusdam placeat porro eum, vero qui inventore quod aperiam labore impedit vel quisquam. Omnis, praesentium perspiciatis! Magnam sed consequatur corrupti voluptate officiis eligendi alias sit natus distinctio, nihil nesciunt. Cumque quasi a impedit, blanditiis optio quia dolorum at voluptatem praesentium! 
           </Box>
           <Box component="div" sx={{flexBasis:"40%" ,textAlign:"justify",height:"100%", overflow:"scroll", p:3}} >
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem odio sint harum corporis obcaecati amet recusandae, unde repellendus laboriosam cum reiciendis fugit sunt exercitationem ducimus facere. Atque similique quibusdam est pariatur velit ipsam odit soluta? Nulla ipsa aut doloremque autem nam tenetur aperiam expedita temporibus voluptate ut. Unde aperiam perspiciatis corrupti iusto aut, ea saepe natus sit illo magnam obcaecati officiis mollitia? Corrupti nemo in sed voluptas! Ex, quia? Commodi id expedita quisquam ipsa laudantium ad consequatur quo non magni saepe fugiat, facere nulla totam suscipit perspiciatis. Alias sit officiis facilis harum. Totam, nulla eveniet molestiae ex similique porro perspiciatis veritatis molestias, quas quis dolore sunt quasi? Quia optio, libero est expedita sit necessitatibus maiores ipsa. Suscipit doloribus minus, aliquam animi consequuntur ex perspiciatis assumenda facilis iusto. Ullam reprehenderit cum pariatur fugit vel odit eveniet quaerat non ducimus placeat praesentium, sunt adipisci, blanditiis dolorem. Mollitia reiciendis quis voluptates, repellat expedita debitis eum, voluptatum nisi, saepe necessitatibus recusandae. Earum obcaecati debitis cupiditate praesentium velit sunt alias quo ratione deserunt quam veritatis nostrum, aspernatur quaerat sit accusantium, voluptate dolorem id! Non dicta quas amet dolorem porro eligendi, veniam eos corporis ad voluptatem obcaecati accusantium eius molestiae sit eveniet error doloremque deserunt.
           </Box>
          </Box>
            {/* LEFT Main end */}

          {/* Right main start */}
          <Box sx={{width:"30%" , boxShadow:3 ,textAlign:"justify",height:"100%", overflow:"scroll", p:3}} component={Paper}>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, deserunt at iure saepe quia quod consequatur ut doloremque cum cumque, temporibus debitis? Dicta ea ab quae obcaecati molestiae veritatis placeat libero laboriosam accusamus iusto, quasi laudantium iure ducimus officiis. Vel officia aperiam reprehenderit quidem alias officiis excepturi iure porro consequatur vero sit obcaecati unde odit quia quasi voluptatum praesentium, adipisci totam nostrum! Molestias id tempore maiores odio, ratione eligendi dolores magni ullam eius delectus blanditiis ducimus natus aut! Officiis nisi necessitatibus et aspernatur, ad aperiam ipsam ea voluptatibus obcaecati alias nam totam blanditiis numquam eos esse perspiciatis sapiente aliquam sequi nemo repudiandae sunt quis ipsum officia odit! Sunt minus, eius labore laudantium fuga culpa. Unde, consequuntur. Qui, facere quia. Impedit magnam commodi, temporibus accusamus itaque illum minima exercitationem nihil quo voluptatem ad et amet veritatis enim sint rerum voluptas autem? Nulla inventore earum quaerat hic quam odio. Voluptates harum explicabo eius nobis, tenetur porro cumque laudantium voluptate at possimus dicta incidunt, rerum minus ipsam? A magnam minus quo exercitationem porro atque laboriosam quibusdam illum non natus fugit eligendi velit animi placeat, vero accusantium ratione repudiandae quas similique illo quidem quia iste deserunt nesciunt. In, veniam placeat. Ullam consequatur ex animi!
          </Box>

             {/* Right main end */}

          
          </Box>
        {/* Main center end */}

        {/* Lower cards section start */}
        <TempCompo/>
        {/* Lower cards section end */}
      </Box>
    </Box>
  );
}

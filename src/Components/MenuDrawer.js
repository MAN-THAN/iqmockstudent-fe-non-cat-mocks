import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RxCross1 } from "react-icons/rx";
import { BiMenu } from "react-icons/bi";
import { useAuth } from "../services/Context";
import {  useParams } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect  } from "react";
import { useMemo } from "react";


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

function MenuDrawer() {
  const params = useParams();
  const navigate = useNavigate();
  const { menuBarOpen, setMenuBarOpen } = useAuth();
  const location =useLocation()
  useMemo(() =>setMenuBarOpen(false),[location.pathname])

  return (
    <Drawer
      variant="permanent"
      open={menuBarOpen}
      ModalProps={{ onBackdropClick: () => setMenuBarOpen(false) }}
    >
      <DrawerHeader>
        <IconButton onClick={() => setMenuBarOpen(!menuBarOpen)}>
          {menuBarOpen ? (
            <RxCross1 className="fs-5 fw-bold text-dark" />
          ) : (
            <BiMenu className="fs-2 fw-bold text-dark" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List >
        {[
          {
            text: "Analysis",
            icon: "Group138.png",
            path: `/analysis/${params.mockId}/${params.attemptId}/overall`,
          },
          {
            text: "View Solution",
            icon: "view-sol-menu.png",
            path: `/viewsolutions/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Leader Board",
            icon: "podium1.png",
            path: `/leaderboard/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Goal Tracker",
            icon: "goal1.png",
            path: `/goaltracker/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Market Place",
            icon: "shopping-bag.png",
            path: `/marketplace/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Error Tracker",
            icon: "errorTracker.png",
            path: `/errortracker/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Overall across analysis",
            icon: "overallAcross.png",
            path: `/analysisacross/${params.mockId}/${params.attemptId}`,
          },
          {
            text: "Mock comparison",
            icon: "mockCompare.png",
            path: `/mockcomparison/${params.mockId}/${params.attemptId}`,
          },
        ].map((item, _) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: menuBarOpen ? "initial" : "center",
                px: 2.5,
                mb: 1,
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: menuBarOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/" + item.icon}
                  className="img-fluid"
                  width={22}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: menuBarOpen ? 1 : 0 }}>
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
                justifyContent: menuBarOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: menuBarOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={process.env.PUBLIC_URL + "/" + item.icon} alt="" />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: menuBarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MenuDrawer;

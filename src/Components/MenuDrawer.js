import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
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
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { DrawerData } from "../services/DataFiles";
import { Tooltip } from "@mui/material";

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

function MenuDrawer() {
  const params = useParams();
  const navigate = useNavigate();
  const { menuBarOpen, setMenuBarOpen } = useAuth();
  const location = useLocation();
  useMemo(() => setMenuBarOpen(false), [location.pathname]);

  const drawer = DrawerData(params.mockId, params.attemptId);

  return (
    <>
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
        <List>
          {drawer &&
            drawer.map((item, ind) => (
            <Tooltip title={item.text} key={ind} placement="right" arrow> 
            <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "block",
                  background:
                    location.pathname === item.path ? "#d4d5d6" : "inherit",
                }}
              >
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
            </Tooltip>
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
    </>
  );
}

export default MenuDrawer;

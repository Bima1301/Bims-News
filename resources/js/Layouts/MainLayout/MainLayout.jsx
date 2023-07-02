import { useDispatch, useSelector } from "react-redux";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
} from "@mui/material";

// project imports
// import navigation from "menu-items";
import { drawerWidth } from "@/store/constant";
import { SET_MENU } from "@/store/actions";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Customization from "@/Layouts/Customization";
// import Header from "./Header";

// assets
// import { IconChevronRight } from "@tabler/icons";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        ...theme.typography.mainContent,
        ...(!open && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            [theme.breakpoints.up("md")]: {
                marginLeft: -(drawerWidth - 20),
                width: `calc(100% - ${drawerWidth}px)`,
            },
            [theme.breakpoints.down("md")]: {
                marginLeft: "20px",
                width: `calc(100% - ${drawerWidth}px)`,
                padding: "16px",
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: "10px",
                width: `calc(100% - ${drawerWidth}px)`,
                padding: "16px",
                marginRight: "10px",
            },
        }),
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.down("md")]: {
                marginLeft: "20px",
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: "10px",
            },
        }),
    })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children, props }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const propss = props;
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened
                        ? theme.transitions.create("width")
                        : "none",
                }}
            >
                <Toolbar>
                    <Header props={props} handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar props = {propss}
                drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                drawerToggle={handleLeftDrawerToggle}
            />

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened} sx={{ boxShadow:"1px 1px 5px #888888 inset" }}>
                {/* breadcrumb */}
                {/* <Breadcrumbs
                    separator={IconChevronRight}
                    navigation={navigation}
                    icon
                    title
                    rightAlign
                /> */}
                {children}
            </Main>
            {/* <Customization /> */}
        </Box>
    );
};

export default MainLayout;

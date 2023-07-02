import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useForm, usePage } from "@inertiajs/react";
import LoginIcon from "@mui/icons-material/Login";
import { HowToReg } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoIcon from "../../image/icon_logo.png"

const drawerWidth = 400;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function Sidebar(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    let style = null;
    if (props.show == true) {
        style = { backgroundColor: "black" };
    } else {
        style = { backgroundColor: "transparent" };
    }

    const { search: keyword } = usePage().props;
    const { data, setData, get, progress } = useForm({
        keyword: keyword,
    });

    function search(e) {
        e.preventDefault();
        // console.log(data);
        if (route().current("show.post")) {
            get("/");
        } else {
            get("");
        }
    }
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} style={style}>
                <Toolbar>
                    <div className="flex w-full xl:flex-row flex-row-reverse xl:justify-start justify-between">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2,paddingRight:0, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href="/">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                            >
                                <div className="flex flex-row items-center gap-1">
                                <img src={LogoIcon} className="h-14 md:ml-0 ml-2" alt="" />
                                <p
                                    style={{ fontFamily: "'Bitter', serif" }}
                                    className="text-2xl font-extrabold pb-0 xl:pl-0 pl-3 text-white"
                                >
                                    The <br />
                                    Bimss News
                                </p>
                                </div>
                            </Typography>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        minHeight: "120px !important",
                    }}
                >
                    <div className="flex w-full flex-row justify-between items-center px-[30px]">
                        <Link
                            href="/"
                            style={{
                                fontWeight: "700",
                                fontSize: "27px",
                                fontFamily: "'Bitter', serif"
                            }}
                            className="lg:pl-[30px] pl-0 "
                        >
                            The <br /> Bims News
                        </Link>
                        <IconButton
                            onClick={handleDrawerClose}
                            style={{ scale: "1.5" }}
                        >
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{
                        padding: "0px 0px 0px 50px",
                    }}
                >
                    <div className="d-flex justify-center items-center mt-3">
                        <form onSubmit={search}>
                            <button className="absolute">
                                <SearchIcon
                                    sx={{
                                        position: "absolute !important",
                                        margin: "8px 0px 0px 10px",
                                    }}
                                />
                            </button>
                            <input
                                value={data.keyword}
                                onChange={(e) =>
                                    setData("keyword", e.target.value)
                                }
                                type="text"
                                style={{ paddingLeft: "40px" }}
                                className="border-transparent focus:border-transparent focus:ring-0 bg-transparent"
                            />
                        </form>
                    </div>

                    {props.categories.map((text, index) => (
                        <ListItem key={index}>
                            <Link
                                href={route("category", {
                                    id: text.slug,
                                    keyword: keyword,
                                })}
                                className="w-full"
                            >
                                <ListItemButton>
                                    <ListItemText primary={text.name} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {props.auth.user ? (
                    <List sx={{ paddingLeft: "30px" }} className="">
                        {["Profile", "Dashboard", "Logout"].map(
                            (text, index) => (
                                <Link
                                    href={
                                        index == 0
                                            ? route("profile.edit")
                                            : index == 1
                                            ? route("dashboard")
                                            : route("logout")
                                    }
                                    method={`${index == 2 ? "post" : ""}`}
                                    key={index}
                                >
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index == 0 ? (
                                                    <AccountBoxIcon />
                                                ) : index == 1 ? (
                                                    <DashboardIcon />
                                                ) : (
                                                    <LogoutIcon />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )
                        )}
                    </List>
                ) : (
                    <List>
                        {["Login", "Register"].map((text, index) => (
                            <Link
                                href={
                                    index % 2 === 0
                                        ? route("login")
                                        : route("register")
                                }
                                key={index}
                            >
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? (
                                                <LoginIcon />
                                            ) : (
                                                <HowToReg />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                )}
            </Drawer>
        </Box>
    );
}

import { useState, useRef, useEffect } from "react";

// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography,
} from "@mui/material";

// third-party

// project imports
import MainCard from "@/ui-component/cards/MainCard";
import Transitions from "@/ui-component/extended/Transitions";
import User1 from "@/assets/images/users/user-round.svg";

// assets
import { IconLogout, IconSettings } from "@tabler/icons";
import { router } from "@inertiajs/react";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({props}) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    // const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState("");
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        router.post('/logout')
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = "") => {
        setSelectedIndex(index);
        handleClose(event);

        if(route == 'profile') {
            // console.log("asdasdasdasd");
            router.get('/profile')
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: "48px",
                    alignItems: "center",
                    borderRadius: "27px",
                    transition: "all .2s ease-in-out",
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        "& svg": {
                            stroke: theme.palette.primary.light,
                        },
                    },
                    "& .MuiChip-label": {
                        lineHeight: 0,
                    },
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: "8px 0 8px 8px !important",
                            cursor: "pointer",
                        }}
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={
                    <IconSettings
                        stroke={1.5}
                        size="1.5rem"
                        color={theme.palette.primary.main}
                    />
                }
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [0, 14],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    <Box sx={{ p: 2, paddingBottom:0 }}>
                                        <Stack>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                            >
                                                <Typography variant="h4">
                                                    Welcome Back,
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    sx={{ fontWeight: 400 }}
                                                >
                                                    {props.auth.user.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2" sx={{ paddingBottom:"10px" }}>
                                            {props.auth.user.role_name}
                                            </Typography>
                                        </Stack>
                                        <Divider />
                                    </Box>
                                        <Box sx={{ p: 2, paddingTop:0 }}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
                                                    borderRadius: "10px",
                                                    [theme.breakpoints.down(
                                                        "md"
                                                    )]: {
                                                        minWidth: "100%",
                                                    },
                                                    "& .MuiListItemButton-root":
                                                        {
                                                            mt: 0,
                                                        },
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={
                                                        selectedIndex === 0
                                                    }
                                                    onClick={(event) =>
                                                        handleListItemClick(
                                                            event,
                                                            0,
                                                            "profile"
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings
                                                            stroke={1.5}
                                                            size="1.3rem"
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2">
                                                                Account Settings
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={
                                                        selectedIndex === 4
                                                    }
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout
                                                            stroke={1.5}
                                                            size="1.3rem"
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2">
                                                                Logout
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;

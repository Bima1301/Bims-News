import { useDispatch, useSelector } from "react-redux";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import Logo from "@/ui-component/Logo";
import { MENU_OPEN } from "@/store/actions";
import { Link } from "@inertiajs/react";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    return (
        <ButtonBase
            disableRipple
            onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
            component={Link}
            href="/"
        >
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;

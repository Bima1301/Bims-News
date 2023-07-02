import ApplicationLogo from "@/Components/Dashboard/Other/ApplicationLogo";
import { Link } from "@inertiajs/react";
import BgLogin from "../../image/bg-login.jpg";
import Typography from "@mui/material/Typography";
export default function Guest({ children }) {
    // console.log(BgLogin);
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center md:pt-6 sm:pt-0 login-section backdrop-blur-md bg-cover"
            style={{ backgroundImage: `url(${BgLogin})` }}
        >
           
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-white" />
                </Link>
            </div> */}

            <div className=" backdrop-brightness-75 w-full md:h-full sm:h-full h-screen sm:max-w-xl md:mt-6 mt-0 md:pt-9 pt-12 md:px-11 px-9 md:py-8 py-4 bg-transparent backdrop-blur-sm shadow-md overflow-hidden sm:rounded-2xl lg:border md:border sm:border md:border-x-slate-200 sm:flex flex-col md:items-stretch sm:items-stretch items-center justify-center">
            <Link href="/">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    marginTop: "15px",
                                }}
                            >
                                <p
                                    style={{ fontFamily: "'Bitter', serif" }}
                                    className="text-sm font-extrabold  text-white absolute top-0 right-0 pt-2 pr-3 bg-black pl-3 pb-3 rounded-bl-lg"
                                >
                                    The <br />
                                    Bimss News
                                </p>
                            </Typography>
                        </Link>
                {children}
            </div>
        </div>
    );
}

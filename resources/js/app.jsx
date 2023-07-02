import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import NavigationScroll from '@/Layouts/NavigationScroll';
import themes from "./themes";
import "@/assets/scss/style.scss";
import config from "./config";
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText ||
    "The Bimms News";
import React from "react";
import { BrowserRouter } from "react-router-dom";

export function BaseAPP({ children }) {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>{children}</NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

createInertiaApp({
    title: (title) => `${title}  ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // console.log("PROPS PUSAT",props);

        root.render(
            <Provider store={store}>
                <BrowserRouter basename={config.basename}>
                    <BaseAPP>
                        <App {...props} />{" "}
                    </BaseAPP>
                </BrowserRouter>
            </Provider>
            // <StyledEngineProvider injectFirst>
            //     {/* <ThemeProvider theme={themes(customization)}> */}
            //     <Provider store={store}>
            //         <App {...props} />
            //     </Provider>
            //     {/* </ThemeProvider> */}
            // </StyledEngineProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

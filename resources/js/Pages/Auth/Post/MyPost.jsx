import MainLayout from "@/Layouts/MainLayout/MainLayout";
import React, { Suspense } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { Head } from "@inertiajs/react";
export default function MyPost(props) {
    // function category(params) {
    //     console.log(params);
    //     Category.map(function(item,i){
    //         if (item.id == params) {
    //             return item.name
    //         }
    //     })
    // }
    const override = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
        height: "100%",
        // margin: "0 auto",
        borderColor: "red",
      };
    // console.log("post", props);
    const ListPost = React.lazy(() => import("./ListPost"));
    return (
        <MainLayout props={props}>
            {/* <ClimbingBoxLoader cssOverride={override} color={"rgb(29 78 216)"} /> */}
            <Head title="All Post |" />
            <Suspense fallback={<ClimbingBoxLoader cssOverride={override} color={"rgb(29 78 216)"}/>}>
                <ListPost {...props} />
            </Suspense>
        </MainLayout>
    );
}

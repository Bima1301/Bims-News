import React from "react";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TablePost from "@/Components/Dashboard/Table/TablePost";
import Swal from "sweetalert2";

export default function ListPost(props) {
    const { flash } = usePage().props;
    // const [show, setShow] = useState(true);
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShow(false);
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [flash]);
    if (flash.message) {
        Swal.fire("Good job!", flash.message, "success");
    }
    return (
        <div className="">
            <div className="max-w-7xl mx-auto ">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <TablePost {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
}

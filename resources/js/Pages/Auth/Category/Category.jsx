import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import TableCategory from "@/Components/Dashboard/Table/TableCategory";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";
import Modal from "@/Components/Modal";
import CreateCategory from "./CreateCategory";

export default function Category(props) {
    const { flash } = usePage().props;
    // console.log(flash);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [flash]);
    // console.log(flash.error);
    return (
        <>
            <MainLayout props={props}>
                <MainCard>
                    <div className=" flex justify-between">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Category
                        </h2>
                        {/* <Link
                        href={route("category.create")}
                        active={route().current("category.index")}
                    >
                        <button className="btn btn-outline">
                            Add New Category
                        </button>
                    </Link> */}
                        <button
                            className="btn btn-outline"
                            onClick={() => setShowModal(true)}
                        >
                            Add New Category
                        </button>
                        <CreateCategory show={showModal} onClose={() => setShowModal(false)} />
                    </div>
                    <Head title="Categories |" />

                    <div className="">
                        <div className="max-w-7xl mx-auto ">
                            {flash.message && (
                                <div
                                    className={`alert alert-success shadow-lg mb-5 ${
                                        show ? "" : "hidden"
                                    }`}
                                >
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-current flex-shrink-0 h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>{flash.message}</span>
                                    </div>
                                </div>
                            )}
                            {flash.error && (
                                <div
                                    className={`alert alert-error shadow-lg mb-5 ${
                                        show ? "" : "hidden"
                                    }`}
                                >
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-current flex-shrink-0 h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-white">
                                            {flash.error}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <TableCategory {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </MainCard>
            </MainLayout>
        </>
    );
}

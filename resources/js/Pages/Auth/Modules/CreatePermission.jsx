import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Transfer } from 'antd';
import PermissionManage from "../../../Components/PermissionManage";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";

export default function CreatePermission(props) {
    // console.log(props);
    const { errors } = usePage().props;
    const { data, setData, post, progress } = useForm({
        permission: null,
    });
    function submit(e) {
        e.preventDefault()
        // console.log(data);
        post(route('permissions.create', props.module_id))
      }
return (
    <MainLayout props={props}>
        <MainCard>
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Permission
                </h2>
                <Head title="Modules Permissions |" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 w-full flex justify-center items-center flex-col">
                            <PermissionManage {...props} onChange={(e)=> setData("permission",e)}/>
                        <button onClick={submit} className="btn mt-5" >Save Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    </MainLayout>
);
}

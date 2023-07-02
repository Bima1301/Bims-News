import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Transfer } from "antd";
import RolePermissionManagement from "@/Components/RolePermissionManagement";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";

export default function ManageRolePermission(props) {
    // console.log(props);
    const { errors } = usePage().props;
    const { data, setData, post, progress } = useForm({
        permission: null,
    });
    function submit(e) {
        router.post(route("manage.role.permissions.create", props.id_role), {
            permissions: e,
        });
    }
    return (
        <MainLayout props={props}>
            <MainCard>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Role Permission
                </h2>
                <Head title="Roles Permissions |" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 w-full flex justify-center items-center flex-col">
                            <RolePermissionManagement
                                {...props}
                                onChange={(e) => setData("permission", e)}
                                submit={submit}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </MainCard>
        </MainLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";

export default function EditUser(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // console.log(editorRef.current.getContent());
        }
    };
    // console.log(props.users.roles[0].pivot.role_id);
    const { errors } = usePage().props;
    const { data, setData, post, progress } = useForm({
        role: props.users.roles[0].pivot.role_id,
    });
    function submit(e) {
        e.preventDefault();
        // console.log(data);
        post(route("alluser.update", props.users.id));
    }

    return (
        <>
            <MainLayout props={props}>
                <MainCard>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit User : {props.users.name}
                    </h2>
                    <Head title="Edit User |" />

                    <div className="">
                        <div className="max-w-7xl mx-auto ">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <form onSubmit={submit}>
                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Change Role
                                                </span>
                                            </label>
                                            <select
                                                className={`select select-bordered w-full ${
                                                    errors.users &&
                                                    "input-error"
                                                }`}
                                                onChange={(e) =>
                                                    setData(
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {/* <option value={''}>Pilih Kategori</option> */}
                                                {props.roles.map(function (
                                                    role,
                                                    i
                                                ) {
                                                    if (
                                                        role.id ===
                                                        props.users.roles[0]
                                                            .pivot.role_id
                                                    ) {
                                                        return (
                                                            <option
                                                                selected
                                                                value={role.id}
                                                            >
                                                                {role.name}
                                                            </option>
                                                        );
                                                    } else {
                                                    }
                                                    return (
                                                        <option value={role.id}>
                                                            {role.name}
                                                        </option>
                                                    );
                                                })}

                                                {/* {users.map((item,i) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))} */}
                                            </select>
                                            {errors.users && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.users}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-row w-full justify-end mt-10">
                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainCard>
            </MainLayout>
        </>
    );
}

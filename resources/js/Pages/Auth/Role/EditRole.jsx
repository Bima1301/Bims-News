import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";

export default function EditCategory(props) {
    const { errors } = usePage().props;
    const { data, setData, put, progress } = useForm({
        name: props.role.name,
        description: props.role.description,
    });
    function submit(e) {
        e.preventDefault();
        // console.log(data);
        put(route('roles.update', props.role.id));
    }

    return (
<>
<MainLayout props={props}>
    <MainCard>
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Role : {props.role.name}
                </h2>
                <Head title="Edit Role |" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="form-control w-full mb-3">
                                    <label className="label">
                                        <span className="label-text">
                                            Modul
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan Nama Modul"
                                        className={`input input-bordered w-full ${
                                            errors.name && "input-error"
                                        }`}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="form-control w-full mb-3">
                                    <label className="label">
                                        <span className="label-text">
                                            Description
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan Deskripsi"
                                        className={`input input-bordered w-full ${
                                            errors.description && "input-error"
                                        }`}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-row w-full justify-end mt-10">
                                    <button type="submit" className="btn">
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

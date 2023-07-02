import { useForm, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";

export default function EditCategory({ name, slug }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, put, progress, errors } = useForm({
        name: name,
    });
    function onClose() {
        setShowModal(false);
    }
    function submit(e) {
        e.preventDefault();
        // console.log(data);
        put(route("category.update", slug));
    }
    return (
        <>
            <button
                className="btn btn-sm btn-warning my-3"
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            <Modal show={showModal}>
                <div className="flex flex-col bg-white">
                    {/* START HEAD MODAL */}
                    <div className="flex flex-row justify-between px-5 items-center py-5">
                        <p className="text-xl">Add New Category</p>
                        <button
                            onClick={onClose}
                            className="font-extrabold text-xl"
                        >
                            x
                        </button>
                        {/* END HEAD MODAL */}
                    </div>
                    <div className="border-b-gray-300 border-b mb-5" />
                    <form onSubmit={submit} className="px-5 mb-5">
                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text">Kategori</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan Nama Kategori"
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

                        <div className="flex flex-row w-full justify-end mt-10">
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div></div>
                </div>
            </Modal>
        </>
    );
}

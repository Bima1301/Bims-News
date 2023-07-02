import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Space } from "antd";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";

export default function CreatePost(props) {
    const { Option } = Select;

    const editorRef = useRef(null);

    // console.log(props);
    const { errors } = usePage().props;
    const { data, setData, post, progress } = useForm({
        title: null,
        content: null,
        image: null,
        category: [],
        date: null,
    });

    // console.log(data.category.length);
    function submit(e) {
        e.preventDefault();
        console.log(data);
        post("/dashboard/mypost");
    }

    return (
        <>
            <MainLayout props={props}>
                <MainCard>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Buat Post Baru
                    </h2>
                    <Head title="Create Post |" />

                    <div className="">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <form onSubmit={submit}>
                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Judul
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Masukkan Judul"
                                                className={`input input-bordered w-full ${
                                                    errors.title &&
                                                    "input-error"
                                                }`}
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.title && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Kategori
                                                </span>
                                            </label>
                                            <Select
                                                mode="multiple"
                                                style={{
                                                    width: "100%",
                                                }}
                                                placeholder="Select Category"
                                                defaultValue={data.category}
                                                onChange={(e) =>
                                                    setData("category", e)
                                                }
                                                // onChange={handleChangeCategory}
                                                optionLabelProp="label"
                                            >
                                                {props.categories.map(
                                                    (x, i) => {
                                                        return (
                                                            <Option
                                                                value={x.id}
                                                                label={x.name}
                                                                key={i}
                                                            >
                                                                <Space>
                                                                    <span
                                                                        role="img"
                                                                        aria-label={
                                                                            x.name
                                                                        }
                                                                    ></span>
                                                                    {x.name}
                                                                </Space>
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                            {/* <select
                            className={`select select-bordered w-full ${
                                errors.category && "input-error"
                            }`}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                        >
                            <option value={""}>
                                Pilih Kategori
                            </option>
                            {Category.map((item, i) => (
                                <option value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select> */}
                                            {errors.category && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.category}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Konten
                                                </span>
                                            </label>
                                            <Editor
                                                value={data.content}
                                                onChange={(e) =>
                                                    setData(
                                                        "content",
                                                        e.target.getContent()
                                                    )
                                                }
                                                apiKey="s55plkm84jgrd94bbl7s9wglazjglr77clvhr9m0gvozf9e5"
                                                onInit={(evt, editor) =>
                                                    (editorRef.current = editor)
                                                }
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        "advlist autolink lists link image charmap print preview anchor",
                                                        "searchreplace visualblocks code fullscreen",
                                                        "insertdatetime media table paste code help wordcount",
                                                    ],
                                                    toolbar:
                                                        "undo redo | formatselect | " +
                                                        "bold italic backcolor | alignleft aligncenter " +
                                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                                        "removeformat | help",
                                                    content_style:
                                                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                                }}
                                            />
                                            {/* <textarea
                            type="text"
                            placeholder="Masukkan Konten"
                            className={`textarea  textarea-bordered w-full ${
                                errors.content && "input-error"
                            }`}
                            value={data.content}
                            onChange={(e) =>
                                setData("content", e.target.value)
                            }
                        /> */}
                                            {errors.content && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.content}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Tanggal Publish
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                placeholder="Masukkan Judul"
                                                className={`input input-bordered w-full ${
                                                    errors.date && "input-error"
                                                }`}
                                                value={data.date}
                                                onChange={(e) =>
                                                    setData(
                                                        "date",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.date && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.date}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-control w-full mb-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Gambar
                                                </span>
                                            </label>
                                            <input
                                                type="file"
                                                className={`file-input file-input-bordered w-full ${
                                                    errors.image &&
                                                    "input-error"
                                                }`}
                                                // value={data.image}
                                                onChange={(e) =>
                                                    setData(
                                                        "image",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            {errors.image && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.image}
                                                </p>
                                            )}
                                            {progress && (
                                                <progress
                                                    value={progress.percentage}
                                                    max="100"
                                                    className="w-full"
                                                >
                                                    {progress.percentage}%
                                                </progress>
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

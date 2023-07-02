import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";
import { Head } from "@inertiajs/react";
import dateFormat from "dateformat";
export default function Dashboard(props) {
    // console.log(props);
    function timeSince(date) {
        const commentTime = new Date(date);
        // menghitung selisih waktu antara tanggal komentar dan tanggal saat ini
        const seconds = Math.floor((new Date() - commentTime) / 1000);

        // mengubah selisih waktu menjadi format yang diinginkan
        if (seconds < 60) {
            return seconds + " detik yang lalu";
        } else if (seconds < 60 * 60) {
            return Math.floor(seconds / 60) + " menit yang lalu";
        } else if (seconds < 60 * 60 * 24) {
            return Math.floor(seconds / (60 * 60)) + " jam yang lalu";
        } else {
            return Math.floor(seconds / (60 * 60 * 24)) + " hari yang lalu";
        }
    }
    return (
        <>
            <MainLayout props={props}>
                <MainCard>
                    <Head title={`${props.post.title} |`} />
                    <div className="">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className=" text-gray-900 p-6">
                                    <h1 className="text-3xl font-bold">
                                        {props.post.title}
                                    </h1>
                                    <small className="font-semibold border-solid border-2 border-sky-500 rounded-md px-3 flex flex-row w-fit mt-4">
                                {props.post.categories.map((item, i) => (
                                    <p className="w-fit">
                                        {item.name}{" "}
                                        {props.post.categories.length - 1 > i
                                            ? ","
                                            : ""}
                                    </p>
                                ))}
                            </small>
                                    <img
                                        className="w-3/6 aspect-video my-10"
                                        src={`/storage/${props.post.image}`}
                                        alt=""
                                    />
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: props.post.content,
                                        }}
                                        className="my-5"
                                    ></p>
                                    <small className=" font-bold">
                                        {dateFormat(
                                            props.post.date,
                                            "mediumDate"
                                        )}
                                    </small>
                                </div>
                                <div className="mt-8">
                                    <p className="font-bold p-3">
                                    Comment On This Post :
                                    </p>
                                    {props.post.comments.map((item, i) => (
                                        <div
                                            className=" p-3 mt-5 shadow-lg mb-8"
                                            data-aos="fade-up"
                                        >
                                            <div className="flex flex-row gap-5   ">
                                                <div className="avatar">
                                                    <div className="w-12 rounded-full">
                                                        <img src="https://source.unsplash.com/random/?Children/" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-center items-center gap-5">
                                                    <p className="font-bold">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {dateFormat(
                                                            item.created_at,
                                                            "mediumDate"
                                                        )}
                                                        <span> - </span>
                                                        <span className="italic">
                                                            {timeSince(
                                                                item.created_at
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-3 border-l-4 border-slate-500 pl-3">
                                                {item.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainCard>
            </MainLayout>
        </>
    );
}

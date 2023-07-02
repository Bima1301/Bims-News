import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import { Link, Head, useForm, usePage, router } from "@inertiajs/react";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import AOS from "aos";
const ShowPost = (props) => {
    useEffect(() => {
        AOS.init();
    }, []);
    // console.log(props);
    const [visitors, setVisitors] = useState(0);
    // VISITOR COUNT
    useEffect(() => {
        // Panggil fungsi untuk menghitung jumlah pengunjung
        countVisitors();
    }, []);

    const countVisitors = () => {
        // Ambil jumlah pengunjung dari API atau local storage
        const storedVisitors = localStorage.getItem(
            `visitors-${props.post.id}`
        );
        const currentVisitors = storedVisitors
            ? parseInt(storedVisitors, 10)
            : 0;

        // Update state dengan jumlah pengunjung yang baru
        setVisitors(currentVisitors + 1);

        // Simpan jumlah pengunjung ke local storage
        localStorage.setItem(`visitors-${props.post.id}`, currentVisitors + 1);
    };
    //END  VISITOR COUNT

    const { search: keyword } = usePage().props;
    const { data, setData, post, progress } = useForm({
        keyword: keyword,
    });

    // console.log(props.post.categories[0].slug);
    // const category = props.categories.map(function (item, i) {
    //     if (item.slug == props.post.categories[0].slug) {
    //         return console.log(item.name) ;
    //     }
    // });

    const [commentdata, setComment] = useState({
        post_slug: props.post.slug,
        comment: "",
    });
    function handleChangeComment(e) {
        const key = e.target.id;
        const value = e.target.value;
        setComment((commentdata) => ({
            ...commentdata,
            [key]: value,
        }));
    }
    function handleSubmitComment(e) {
        e.preventDefault();
        // console.log(commentdata);
        router.post("/comment", commentdata, {
            preserveState: false,
            preserveScroll: true,
        });
    }
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
        <div className="md:bg-white bg-black ">
            <Head title={`${props.post.title} |`} />
            {/* <Navbar props={props} /> */}
            <Sidebar {...props} />
            <div className="container mx-auto mb-52 lg:mt-20 mt-16 lg:px-0 px-3">
                <div className="mycard flex flex-wrap flex-col justify-center ">
                    <div className="flex lg:flex-row flex-col-reverse mt-10 gap-5 ">
                        <div className="flex-1 justify-between flex flex-col ">
                            <div className="flex flex-row gap-3 items-center justify-between px-1">
                                <div className="lg:flex hidden flex-row gap-2 items-center px-1">
                                    {props.post.categories.map((item, i) => (
                                        <>
                                            <Link
                                                href={route("category", {
                                                    id: item.slug,
                                                    keyword: keyword,
                                                })}
                                                className="text-slate-700 font-extrabold duration-300 hover:rounded-md hover:border hover:px-4 hover:border-slate-600"
                                            >
                                                {item.name}
                                            </Link>
                                            {props.post.categories.length - 1 >
                                            i
                                                ? ","
                                                : ""}
                                        </>
                                    ))}
                                    <p className="text-sm text-gray-400">
                                        {dateFormat(
                                            props.post.date,
                                            "mediumDate"
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center border md:border-slate-600 bg-slate-200 rounded-lg px-3 gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        ></path>
                                    </svg>{" "}
                                    {visitors}
                                </div>
                            </div>
                            <p className="lg:text-6xl text-xl lg:my-10 my-4 md:text-blue-900 text-blue-500 font-serif lg:font-normal font-bold">
                                {props.post.title}
                            </p>
                            <div className="flex flex-row gap-5">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://source.unsplash.com/random/?Children/" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold md:text-black text-slate-300">
                                        {props.post.user_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {props.post.user_email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 justify-center flex flex-col ">
                            <div className="lg:hidden flex flex-row gap-2 items-center px-1 lg:mb-0 mb-5">
                                {props.post.categories.map((item, i) => (
                                    <>
                                        <Link
                                            href={route("category", {
                                                id: item.slug,
                                                keyword: keyword,
                                            })}
                                            className="md:text-black text-slate-200 font-extrabold duration-300 hover:rounded-md hover:border hover:px-4 hover:border-slate-600 lg:text-base text-sm"
                                        >
                                            {item.name}
                                        </Link>
                                        {props.post.categories.length - 1 > i
                                            ? ","
                                            : ""}
                                    </>
                                ))}
                                <p className="text-sm text-gray-400">
                                    {dateFormat(props.post.date, "mediumDate")}
                                </p>
                            </div>
                            <img
                                className="w-full h-full object-cover"
                                src={`/storage/${props.post.image}`}
                                alt=""
                            />
                        </div>
                    </div>
                    <p
                        dangerouslySetInnerHTML={{ __html: props.post.content }}
                        className="mt-14 font-serif lg:text-base md:text-black text-white"
                    ></p>
                </div>
                <div className="mt-20">
                    <h1 className="text-2xl font-bold mb-5 md:text-black text-white">
                        Comment On This Post
                    </h1>
                    {props.auth.user_permission.includes("create comment") ? (
                        <form onSubmit={handleSubmitComment}>
                            <div>
                                <textarea
                                    value={commentdata.comment}
                                    onChange={handleChangeComment}
                                    id="comment"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm md:text-gray-900 text-white md:bg-gray-50 bg-gray-500 rounded-lg border md:border-gray-300 border-gray-500 focus:ring-slate-500 focus:border-slate-500 duration-300  dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500"
                                    placeholder="Write your comment here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-transparent hover:bg-slate-500 duration-150 md:text-slate-700 text-slate-300 font-semibold hover:text-white py-2 mt-3 px-4 border md:border-slate-500 border-slate-300 hover:border-transparent rounded"
                            >
                                Add Comment
                            </button>
                        </form>
                    ) : (
                        ""
                    )}
                    {!props.post.comments ? (
                        "no comment"
                    ) : (
                        
                        <div className="mt-8">
                            {props.post.comments.map((item, i) => (
                                <div
                                    className="  p-3 mt-5 md:shadow-lg md:bg-white bg-slate-800 md:rounded-none rounded-lg"
                                    data-aos="fade-up"
                                >
                                    <div className="flex flex-row gap-5   ">
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src="https://source.unsplash.com/random/?Children/" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center md:gap-5 gap-2 md:text-black text-slate-300">
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
                                                    {timeSince(item.created_at)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 border-l-4 border-slate-500 pl-3 md:text-black text-white">
                                        {item.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ShowPost;

import { Link, useForm, usePage } from "@inertiajs/react";

const HeroNav = (props) => {
    console.log("HERONAV", props);
    const { search: keyword } = usePage().props;
    const { data, setData, get, progress } = useForm({
        keyword: keyword,
    });

    function search(e) {
        e.preventDefault();
        // console.log(data);
        if (route().current("show.post")) {
            get("/");
        } else {
            get("");
        }
    }
    return (
        <div className="container mx-auto md:block hidden">
            <div className="flex flex-row justify-center items-center xl:gap-52 md:gap-2">
                <div className="flex flex-row justify-between w-full font-extrabold h-full md:gap-10 gap-0 xl:overflow-visible lg:overflow-scroll md:overflow-scroll">
                    {props.categories.map((item, i) => (
                        <Link
                            key={i}
                            data-aos="zoom-in"
                            data-aos-delay={`${i * 300}`}
                            data-aos-duration="500"
                            className="relative group active"
                            href={route("category", {
                                id: item.slug,
                                keyword: keyword,
                            })}
                        >
                            <p>{item.name.toUpperCase()}</p>
                            <div
                                className={`${
                                    item.name == props.category_name
                                        ? "w-full"
                                        : "w-0"
                                } transition-all duration-150 bg-black h-1 group-hover:w-full `}
                            />
                        </Link>
                    ))}
                </div>
                <div className="flex flex-row justify-center items-center bg-slate-300">
                    <div className="search-form w-32">
                        <form onSubmit={search}>
                            <input
                                type="text"
                                placeholder="Search"
                                className=" border-transparent focus:border-transparent focus:ring-0 bg-transparent"
                                value={data.keyword}
                                onChange={(e) =>
                                    setData("keyword", e.target.value)
                                }
                            />
                            <button type="submit" className="hidden"></button>
                        </form>
                    </div>
                    {props.auth.user ? (
                        <div className="group flex flex-col relative w-48 z-40">
                            <p className=" px-5 py-5 bg-blue-700  text-white font-extrabold text-center cursor-pointer">
                                {props.auth.user.name
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .substring(0, 15)}
                            </p>
                            {/* <!-- the menu here --> */}
                            <div className="hidden group-hover:flex group-hover:w-full selection:flex-col bg-blue-700  group-hover:!flex-col absolute top-[3.6rem] left-0 font-semibold z-40">
                                <Link
                                    className="px-5 py-3 hover:bg-gray-200 w-full text-white hover:text-black"
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    className="px-5 py-3 hover:bg-gray-200 w-full text-white hover:text-black"
                                    href={route("logout")}
                                    method="post"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="group flex flex-col relative w-56 z-40">
                            <p className=" px-5 py-5 bg-blue-700 w-full text-white font-extrabold text-center cursor-pointer">
                                JOIN US NOW
                            </p>
                            {/* <!-- the menu here --> */}
                            <div className="hidden group-hover:flex group-hover:w-full selection:flex-col bg-blue-700  group-hover:!flex-col absolute top-[3.6rem] left-0 font-semibold z-40">
                                <Link
                                    className="px-5 py-3 hover:bg-gray-200 w-full text-white hover:text-black"
                                    href={route("login")}
                                >
                                    Login
                                </Link>
                                <Link
                                    className="px-5 py-3 hover:bg-gray-200 w-full text-white hover:text-black"
                                    href={route("register")}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroNav;

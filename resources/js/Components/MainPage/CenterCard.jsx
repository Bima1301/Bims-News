import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import Aos from "aos";
const CenterCard = ({
    categories,
    title = "",
    content = "",
    author = "",
    image,
    slug,
    isEvent,
    dataAos,
}) => {
    useEffect(() => {
        Aos.init();
    }, []);
    console.log("CENTER CARD", dataAos);
    return (
        <div className="w-full" data-aos={dataAos} data-aos-offset={`${isEvent == 1 ? "0" : ""}`}>
            <div
                className={` flex ${
                    isEvent % 2 == 0
                        ? "lg:flex-row-reverse  flex-col"
                        : "lg:flex-row flex-col"
                } flex-row lg:gap-10 gap-2 lg:px-0 md:px-0 px-3`}
            >
                <Link
                    href={route("show.post", slug)}
                    className="w-full overflow-hidden"
                >
                    <img
                        className="xl:w-[440px] xl:h-[440px] lg:w-[540px] lg:h-[540px] object-cover hover:scale-105 duration-150 "
                        src={`/storage/${image}`}
                        alt=""
                    />
                </Link>
                <div
                    className={`flex flex-col xl:w-auto lg:w-[90%] justify-start ${
                        isEvent % 2 == 0 ? "lg:items-end" : ""
                    } lg:gap-5 gap-2`}
                >
                    <div className="w-fit">
                        <div className="bg-black h-2 mb-5 lg:block hidden" />
                        <div className="flex flex-row">
                            {categories.map((category, i) => (
                                <div className="w-full flex" key={i}>
                                    <Link
                                        href={route("category", category.slug)}
                                        className={`font-extrabold text-blue-600 lg:text-xl text-sm w-fit hover:text-blue-400 duration-500`}
                                    >
                                        {category.name}
                                    </Link>
                                    {categories.length - 1 > i ? (
                                        <p
                                            className={`font-extrabold text-blue-600 lg:text-xl text-sm ${
                                                isEvent % 2 == 0
                                                    ? "pr-5 "
                                                    : "pr-5"
                                            }`}
                                        >
                                            ,
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        href={route("show.post", slug)}
                        className={`font-extrabold lg:text-3xl text-xl hover:text-blue-900 image:hover:scale-150 md:text-black text-white ${
                            isEvent % 2 == 0 ? "lg:text-end text-start" : ""
                        }`}
                    >
                        {title}
                    </Link>
                    <span className="lg:text-sm text-xs text-blue-600 font-medium">
                        {author}
                    </span>
                    <p
                        className={`lg:text-base text-sm md:text-black text-white  ${
                            isEvent % 2 == 0 ? "lg:text-end" : ""
                        }`}
                    >
                        {content
                            .replace(/(<([^>]+)>)/gi, "")
                            .substring(0, 200) + "..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CenterCard;

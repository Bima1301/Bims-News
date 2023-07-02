import { Link } from "@inertiajs/react";

const SideCard = ({
    title = "",
    author = "",
    image,
    slug,
    content,
    categories,
    dataAos,
    isEvent,
}) => {
    return (
        <Link
            data-aos={dataAos}
            data-aos-offset="0"
            href={route("show.post", slug)}
            className="flex flex-col lg:gap-4 gap-2 lg:px-0 md:px-0 px-3 lg:mb-0 mb-11 hover:text-blue-900  hover:contrast-75"
        >
            <div className="bg-black h-2 w-[60px] hidden lg:block" />
            <img
                className="lg:w-[120px] lg:h-[120px]  object-cover"
                src={`/storage/${image}`}
                alt=""
            />
            <div className="flex flex-row lg:hidden ">
                {categories.map((category, i) => (
                    <div key={i}>
                        <Link
                            className={`font-extrabold text-blue-600 lg:text-xl text-sm w-fit hover:text-blue-400 duration-500`}
                        >
                            Voices
                        </Link>
                        {categories.length - 1 > i ? (
                            <p
                                className={`font-extrabold text-blue-600 lg:text-xl text-sm `}
                            >
                                ,
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                ))}
            </div>
            <p className="font-extrabold lg:text-base text-xl md:text-black text-white">
                {title}
            </p>
            <small className=" text-blue-600 font-medium">{author}</small>
            <p
                className={`lg:text-base text-sm lg:hidden block md:text-black text-white`}
            >
                {content.replace(/(<([^>]+)>)/gi, "").substring(0, 200) + "..."}
            </p>
        </Link>
    );
};

export default SideCard;

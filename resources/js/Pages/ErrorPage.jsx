import { Link } from "@inertiajs/react";

export default function ErrorPage({ status }) {
    const title = {
        503: "Service Unavailable",
        500: "Server Error",
        404: "Page Not Found",
        403: "Forbidden",
    }[status];

    const code = {
        503: "503",
        500: "500",
        404: "404",
        403: "403",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                {code}
            </h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute mb-14">
                {title}
            </div>
            <button className="mt-5">
                <p className="text-white mb-5">{description}</p>
                <Link
                    href={route("index")}
                    className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        <p>Go Home</p>
                    </span>
                </Link>
            </button>
        </main>
    );
}

import { IconNews } from "@tabler/icons";
import React from "react";

export default function StaticCard({
    title,
    subtitle,
    total,
    color,
    Icon = IconNews,
}) {
    return (
        <div
            className={`px-4 py-3 shadow-xl border-l-[8px] lg:w-[25%] rounded-sm hover:scale-105 duration-150`}
            style={{
                borderColor: color,
            }}
        >
            <p
                className={`font-bold  mb-4`}
                style={{
                    color: color,
                }}
            >
                {title}
            </p>
            <div className="flex flex-row justify-between items-center mb-2">
                <div className="flex flex-col">
                    <p className="font-extrabold text-4xl">{total}</p>
                    <p className="font-bold">{subtitle}</p>
                </div>
                <div
                    className={`p-4  rounded-full`}
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <Icon className="text-white scale-125" />
                </div>
            </div>
        </div>
    );
}

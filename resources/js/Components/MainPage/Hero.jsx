import React from "react";

const Hero = (props) => {
    // console.log("HERO", props.posts.data[0].image);
    return (
        <div 
            className="relative w-full  "
            style={{
                backgroundImage: `url(/storage/${props.posts.data[0].image})`,
                backgroundSize: "cover",
                height: "500px",
            }}
        >
            <div
                className="div-bg top-0 left-0 absolute w-full h-full"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                <div className="absolute md:bottom-16 bottom-5 md:left-40 left-5 md:px-0 px-5">
                <p className="text-white mb-7 font-extrabold bg-black w-fit p-2 lg:text-base text-sm" data-aos="fade-down">Headline News</p>
                    <p data-aos="zoom-in" className="xl:text-4xl lg:text-4xl text-2xl text-white mb-5 md:w-[50%] font-extrabold">
                        {props.posts.data[0].title}
                    </p>
                    <span className="text-blue-400 lg:text-base text-sm" data-aos="fade-up">
                        {props.posts.data[0].author}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Hero;

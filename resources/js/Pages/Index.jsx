
import CenterCard from "@/Components/MainPage/CenterCard";
import Footer from "@/Components/Footer";
import Hero from "@/Components/MainPage/Hero";
import HeroNav from "@/Components/MainPage/HeroNav";
import Pagination from "@/Components/MainPage/Pagination";
import Sidebar from "@/Components/Sidebar";
import SideCard from "@/Components/MainPage/SideCard";
import { Link, Head } from "@inertiajs/react";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const Index = (props) => {
    useEffect(() => {
        AOS.init();
    }, []);
    // console.log(props);
    if (props.posts.data.length != 0) {
        return (
            <div className=" overflow-hidden md:bg-white bg-black">
                <Head title="" />
                <Sidebar {...props} />
                <Link href={route("show.post", props.posts.data[0].slug)}>
                    <Hero {...props} />
                </Link>
                <HeroNav {...props} />
                {/* <Navbar props={props}  /> */}
                <p
                    className="container lg:text-5xl text-2xl lg:px-0 px-5 mt-3 lg:mb-10 font-extrabold md:text-start text-center md:text-black text-white"
                    data-aos="fade-up" data-aos-offset="0"
                >
                    Top Story
                </p>
                <div className="container mx-auto mb-32">
                    <div className="mycard flex flex-wrap flex-row justify-center mt-5">
                        <div className="w-full flex lg:flex-row flex-col gap-11">
                            <div className="flex flex-col gap-10">
                                {props.posts.data.map(function (post, i) {
                                    if (i > 0 && i < 4) {
                                        return (
                                            <CenterCard
                                                dataAos={
                                                    i % 2 == 0
                                                        ? "fade-right"
                                                        : "fade-left"
                                                }
                                                image={post.image}
                                                key={i}
                                                isEvent={i}
                                                categories={post.categories}
                                                author={post.author}
                                                slug={post.slug}
                                                content={post.content}
                                                title={post.title}
                                            />
                                        );
                                    }
                                })}
                            </div>
                            <div className="lg:w-[30%] w-full flex flex-col justify-between">
                                {props.posts.data.map(function (post, i) {
                                    if (i > 3) {
                                        return (
                                            <SideCard
                                                dataAos="fade-up"
                                                key={i}
                                                isEvent={i}
                                                slug={post.slug}
                                                title={post.title}
                                                content={post.content}
                                                image={post.image}
                                                author={post.author}
                                                categories={post.categories}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        {/* {props.posts.data.map(function (post, i) {
                            if (i > 0) {
                                if (i > 2) {
                                    return (
                                        <Card
                                            key={i}
                                            slug={post.slug}
                                            title={post.title}
                                            content={post.content}
                                            image={post.image}
                                            categories={post.categories}
                                            author={post.author}
                                            sepia={"sepia"}
                                        />
                                    );
                                } else {
                                    return (
                                        <Card
                                            key={i}
                                            slug={post.slug}
                                            title={post.title}
                                            content={post.content}
                                            image={post.image}
                                            categories={post.categories}
                                            author={post.author}
                                            // sepia={'sepia'}
                                        />
                                    );
                                }
                            }
                        })} */}
                    </div>
                    <Pagination post={props.posts} />
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Head title="The Bimss News" />
                <div className="bg-black w-full h-16">
                    <Sidebar {...props} />
                </div>
                {/* <Link href={route("show.post", props.posts.data[0].slug)}>
                    <Hero {...props} />
                </Link> */}
                <HeroNav {...props} />
                <div className="container">
                    <p className="container lg:text-5xl text-2xl lg:px-0 px-5 mt-5 lg:mb-10 font-bold">
                        Top Story
                    </p>

                    <p className="lg:text-5xl text-xl lg:px-0 px-3 mt-5">
                        {props.category_name} Is Null
                    </p>
                </div>
            </div>
        );
    }
};

export default Index;

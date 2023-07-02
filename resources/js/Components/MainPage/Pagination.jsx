import { Link } from "@inertiajs/react";


const Pagination = ({post}) => {
    // console.log('paginate' , post);
    const pref = post.links[0].url;
    const next = post.links[post.links.length -1].url;
    const current =post.current_page;
    return (
        <div className="btn-group flex lg:justify-end justify-center w-full mt-10 px-2">
            {pref && 
            <Link href={pref} className="btn !rounded-none !bg-black">«</Link>
            }
            <button className="btn !rounded-none !bg-black mx-3">Page {current}</button>
            {next && 
            <Link href={next} className="btn !rounded-none !bg-black">»</Link>
            }
        </div>
    );
};

export default Pagination;

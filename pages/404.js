import Link from "next/link";

const Error404 = props => {
    return (
        <div className="text-white text-xl flex justify-center items-center flex-col gap-12">
            How did you get here? Anyways, click below to go to safety.
            <div className=" w-[10vw] rounded-full transition-all hover:scale-110 bg-sky-500 hover:bg-sky-600 text-white">
                <Link href="/">
                    <h1 className="text-2xl p-2 cursor-pointer text-center">
                        Home Page
                    </h1>
                </Link>
            </div>
        </div>
    )
};

export default Error404;
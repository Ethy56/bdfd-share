import Link from "next/link";
import Image from "next/image";

const Header = props => {
    return (
        <div className="flex justify-center items-center gap-2">
            <div className="rounded-full cursor-pointer">
                <Link href="https://bdfd-share.vercel.app/" className="w-full h-full">
                    <Image src="/bdfdshare.png" alt="BDFD Share's Logo" width={60} height={60} className="cursor-pointer rounded-full" />
                </Link>
            </div>
            <Link href="https://ethy.vercel.app/" className="cursor-pointer">
                <Image src="/ethylogo.png" alt="Ethy's Logo" width={60} height={60} className="cursor-pointer rounded-full" />
            </Link>
        </div>
    )
}

export default Header;
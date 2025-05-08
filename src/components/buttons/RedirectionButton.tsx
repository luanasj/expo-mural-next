import "./RedirectionButton.scss"

import Link from "next/link";

const RedirectionButton = ({ text, link }: { text: string; link: string }) => {
    return (
        <Link href={link} passHref>
            <button className="redirectionButton">
                {text}
            </button>
        </Link>
    );
};

export default RedirectionButton;
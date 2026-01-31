import {Link} from "@/types/link";

export const TextLinkCard = ({link}: { link: Link }) => {

    const {title, url} = link;
    return (
        <div>
            <a href="">{title}</a>
        </div>
    )
}
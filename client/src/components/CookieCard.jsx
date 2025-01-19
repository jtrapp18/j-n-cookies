import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags"

const StyledCookieCard = styled.article`
    height: 300px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;

    img {
        height: 50%;
        box-shadow: var(--shadow);
        // border-radius: 10px;
    }
`

const CookieCard = ({id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting}) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    const tags = []
    if (isVegan) {
        tags.push("Vegan")
    }

    if (isGlutenFree) {
        tags.push("GF")
    }

    if (hasNuts) {
        tags.push("Contains Nuts")
    }

    return (
        <StyledCookieCard
            onClick={handleClick}
        >
            <h2>{name}</h2>
            <h3>`Frosting: {frosting ? frosting : 'None'}`</h3>
            <img
                src={`images/menu_items/${image}`}
                alt={name}
            >
            </img>

            <Tags
                tags={tags}
            />

        </StyledCookieCard>
    );
}

export default CookieCard;

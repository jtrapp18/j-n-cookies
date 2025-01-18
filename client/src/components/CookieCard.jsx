import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags"

const StyledCookieCard = styled.article`
    height: 300px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;

    img {
        width: 100%;
        height: 85%;
        object-fit: cover;
        overflow: hidden;
        border-radius: 5px;
        cursor: pointer;
    }
`

const CookieCard = ({id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting}) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    const tags = []
    if (isVegan) {
        tags.append("Vegan")
    }

    if (isGlutenFree) {
        tags.append("GF")
    }

    if (hasNuts) {
        tags.append("Contains Nuts")
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

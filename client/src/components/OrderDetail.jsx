import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledOrderDetail = styled.article`
    height: 100%;
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;
`

const OrderDetail = ({cartItems}) => {

    return (
        <StyledOrderDetail>
            {cartItems.map(cartItem =>
                <li>{cartItem.cookie.name} | {cartItem.numCookies}</li>
            )}
        </StyledOrderDetail>
    );
}

export default OrderDetail;

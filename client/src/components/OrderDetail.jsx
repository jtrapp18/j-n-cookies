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

    span {
        border-bottom: 1px solid gray;
    }
`

const OrderDetail = ({cartItems, setActiveReview}) => {

    return (
        <StyledOrderDetail>
            {cartItems.map(cartItem =>
                <span>
                    {cartItem.cookie.name} 
                    ({cartItem.numCookies}) | 
                    ${cartItem.cookie.price} each
                    <button 
                        onClick={()=>setActiveReview(cartItem.cookie)}
                    >
                        Add Review
                    </button>
                    
                </span>
            )}
        </StyledOrderDetail>
    );
}

export default OrderDetail;

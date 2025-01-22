import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledOrderDetail = styled.article`
    height: 100%;
    width: 60%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    flex-direction: column;

    span {
        border-bottom: 1px solid var(--dark-chocolate);
        line-height: 3;
    }

    button {
        margin-left: 20px;
        height: 40px;
        align-items: center;
    }
`

const OrderDetail = ({cartItems, setActiveReview}) => {

    return (
        <StyledOrderDetail>
            {cartItems.map(cartItem =>
                <span key={cartItem.cookie.name}>
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

import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledOrderSummary = styled.article`
    height: 100%;
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;
`

const OrderSummary = ({id, purchaseComplete, orderDate, deliveryDate, orderTotal}) => {

    return (
        <StyledOrderSummary>
            <p>{id}</p>
            <p>Complete: {purchaseComplete}</p>
            <p>Date: {orderDate}</p>
            <p>{deliveryDate}</p>
            <p>{orderTotal}</p>
        </StyledOrderSummary>
    );
}

export default OrderSummary;

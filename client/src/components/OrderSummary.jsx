import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledOrderSummary = styled.article`
    height: 100%;
    width: 40%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
`

const OrderSummary = ({id, purchaseComplete, orderDate, deliveryDate, orderTotal}) => {

    return (
        <StyledOrderSummary>
            <p>Order ID: {id}</p>
            <p>Order Date: {orderDate}</p>
            <p>Delivery Date: {deliveryDate}</p>
            <hr />
            <strong>Total: ${orderTotal}</strong>
        </StyledOrderSummary>
    );
}

export default OrderSummary;

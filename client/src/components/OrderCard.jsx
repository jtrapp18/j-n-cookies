import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledOrderCard = styled.article`
    height: 300px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;
`

const OrderCard = ({id, purchase_complete, order_date, delivery_date, order_total}) => {

    return (
        <StyledOrderCard>
            <p>{id}</p>
            <p>{purchase_complete}</p>
            <p>{order_date}</p>
            <p>{delivery_date}</p>
            <p>{order_total}</p>
        </StyledOrderCard>
    );
}

export default OrderCard;

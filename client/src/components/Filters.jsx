import React from 'react';
import styled from 'styled-components';
import ToggleButton from 'react-bootstrap/ToggleButton';

const FilterContainer = styled.div`

`

const Filters = ({filterInput, setFilterInput}) => {
    
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.type==="checkbox" ? event.target.checked : event.target.value;

        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                [name]: value,
            }
        });
    }
    // price: 0,
    // rating: 0,
    return (
        <FilterContainer>
            <h2>Apply Filters</h2>
            <ToggleButton
                id="toggle-check"
                name="isVegan"
                type="checkbox"
                variant="secondary"
                checked={filterInput.isVegan}
                onChange={handleChange}
            >
                Vegan
            </ToggleButton>
            <ToggleButton
                id="toggle-check"
                name="isGlutenFree"
                type="checkbox"
                variant="secondary"
                checked={filterInput.isGlutenFree}
                onChange={handleChange}
            >
                Gluten-Free
            </ToggleButton>
            <ToggleButton
                id="toggle-check"
                name="hasNuts"
                type="checkbox"
                variant="secondary"
                checked={filterInput.hasNuts}
                onChange={handleChange}
            >
                Contains Nuts
            </ToggleButton>
            <ToggleButton
                id="toggle-check"
                name="hasFrosting"
                type="checkbox"
                variant="secondary"
                checked={filterInput.hasFrosting}
                onChange={handleChange}
            >
                Frosted
            </ToggleButton>
        </FilterContainer>
    );
}

export default Filters;

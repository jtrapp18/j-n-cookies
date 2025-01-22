import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const StyledMain = styled.main`
  height: var(--size-body);
  // padding: 20px;
  // margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, var(--green), white);

  h1 {
    font-size: clamp(2rem, 6vw, 5rem);
    background: var(--dark-chocolate);
    color: var(--cookie);
    font-family: 'RubikMoonrocks';
    border-radius: 200px;
  }

  .carousel {
    height: 90%;
    width: 90%;
  }
`

const Image = styled.img`
  width: 100%;
`

function Home() {
  return (
    <StyledMain>
      <Carousel>
        <Carousel.Item>
          <Image
              src="/images/cookies_falling.png" // Provide the relative or absolute path to the image
              alt="First slide"
          />
          <Carousel.Caption>
            <h1>J&N Cookies</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
              src="/images/cookies_falling.png" // Provide the relative or absolute path to the image
              alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
        <Image
              src="/images/cookies_falling.png" // Provide the relative or absolute path to the image
              alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </StyledMain>
  );
}

export default Home;
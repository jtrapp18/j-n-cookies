import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const Image = styled.img`
  height: var(--size-body);
`

function Home() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
            src="/images/cookies_falling.png" // Provide the relative or absolute path to the image
            alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
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
  );
}

export default Home;
import React from 'react'; 
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption,} from 'mdb-react-ui-kit';
export default function Home(){
  return (
    // header
    <MDBCarousel showIndicators showControls fade>
    <MDBCarouselItem itemId={1}>
      <img src='https://media1.s-nbcnews.com/i/newscms/2019_25/2904476/190620-student-teachers-classroom-stock-cs-502p_e4bbcb02cc8f70402ff6ce4a9735f6ef.jpg' className='d-block w-100' alt='...' />
      <MDBCarouselCaption>
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselCaption>
    </MDBCarouselItem>

    <MDBCarouselItem itemId={2}>
      <img src='https://www.adoptaclassroom.org/wp-content/uploads/2021/03/school-children.jpeg' className='d-block w-100' alt='...' />
      <MDBCarouselCaption>
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselCaption>
    </MDBCarouselItem>

    <MDBCarouselItem itemId={3}>
      <img src='https://www.simplykinder.com/wp-content/uploads/2022/04/Free-Helping-Hands-For-Meet-The-Teacher-1024x1024.jpg' className='d-block w-100' alt='...' />
      <MDBCarouselCaption>
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselCaption>
    </MDBCarouselItem>
  </MDBCarousel>

    
  );
}
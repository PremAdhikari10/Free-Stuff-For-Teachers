import React from 'react'; 
import { MDBCarousel, MDBCarouselItem} from 'mdb-react-ui-kit';
import Footer from '../Footer';
export default function Home(){
 
  return (
    // header
    <>
    <MDBCarousel showIndicators showControls fade interval={2000}>
    <MDBCarouselItem itemId={1}>
      <img src='https://media1.s-nbcnews.com/i/newscms/2019_25/2904476/190620-student-teachers-classroom-stock-cs-502p_e4bbcb02cc8f70402ff6ce4a9735f6ef.jpg' className='d-block w-100' style={{height: '500px'}} alt='...' />
    </MDBCarouselItem>
  
    <MDBCarouselItem itemId={2}>
      <img src='https://www.adoptaclassroom.org/wp-content/uploads/2021/03/school-children.jpeg' className='d-block w-100' style={{height: '500px'}} alt='...' />
    </MDBCarouselItem>
  
    <MDBCarouselItem itemId={3}>
      <img src='https://www.simplykinder.com/wp-content/uploads/2022/04/Free-Helping-Hands-For-Meet-The-Teacher-1024x1024.jpg' className='d-block w-100' style={{height: '500px'}} alt='...' />
    </MDBCarouselItem>
  </MDBCarousel>
  <Footer/>
  </>
   );
}
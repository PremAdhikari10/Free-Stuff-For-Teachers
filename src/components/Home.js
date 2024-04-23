import React from 'react'; 
import { MDBCarousel, MDBCarouselItem} from 'mdb-react-ui-kit';
import { FaInfoCircle, FaUserFriends } from 'react-icons/fa'; // Import icons from Font Awesome
import Footer from  "../components/Footer";

export default function Home(){
  return (
    <>
    <MDBCarousel showIndicators showControls fade interval={2000} className="carousel">
      <MDBCarouselItem itemId={1}>
        <img src='https://media1.s-nbcnews.com/i/newscms/2019_25/2904476/190620-student-teachers-classroom-stock-cs-502p_e4bbcb02cc8f70402ff6ce4a9735f6ef.jpg' className='d-block w-100 img-fluid' alt='...' />
      </MDBCarouselItem>
  
      <MDBCarouselItem itemId={2}>
        <img src='https://images.unsplash.com/photo-1629652487043-fb2825838f8c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwc3VwcGxpZXN8ZW58MHx8MHx8fDA%3D' className='d-block w-100 img-fluid' alt='...' />
      </MDBCarouselItem>
  
      <MDBCarouselItem itemId={3}>
        <img src='https://www.shutterstock.com/image-photo/happy-elementary-school-teacher-giving-600nw-2183363749.jpg' className='d-block w-100 img-fluid' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>

    <div className="container mt-5">
      <h2><FaInfoCircle /> About Us</h2>
      <p>Welcome to our site! We are dedicated to helping teachers and students connect by providing a platform where teachers can list their classroom needs, and donors can support them. Our mission is to facilitate the educational process by ensuring that every classroom has the resources it needs for effective learning.</p>
    </div>

    <div className="container mt-5">
      <h2><FaUserFriends /> How to Use</h2>
      <p>Using our site is easy! Teachers can create listings for classroom needs, including supplies, equipment, and projects. Donors can browse these listings and choose which projects they want to support. Once a project is funded, we facilitate the delivery of the resources directly to the teacher's classroom. Together, we can make a difference in the lives of students!</p>
    </div>
    
    <Footer/>
    </>
  );
}

import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
// import { useStateValue } from "../StateProvider";
// import Navbar from "./Navbar";
 import HeaderM from "./HeaderM";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import Footer from "./Footer";


function Product() {
  const [products, setProducts] = useState([]);
  let navigate= useNavigate();
 

  
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/products/get");
     setProducts(data.data);
    };
    fetchdata();
  }, []);
  

  return (
    <ProductContainer>
        <Div>
           <HeaderM/>
        </Div>
      {/* <Navbar/>
      */}
      
     
      <Main >
        {products.map((product) => (
            <StyledLink  to={`/product/${product._id}`}
            key={product._id}>
              <Card className="main"
             key={product._id}
               id={product._id}
              // image={product.imageURL}
                image={`http://localhost:8000${product.imageURL}`} 
              //  img src={`${API.defaults.baseURL}${product.image}`} alt={product.title} 
              price={product.price}
             rating={product.averageRating}
              title={product.title}
              gst={product.gst} 
            />
          </StyledLink>
            
          ))}
      </Main>
      <Footer/>
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  width: 100%;
//   background-color: rgba(23, 24, 24, 1);
//   max-width: 1400px;
 margin: auto;
  height: fit-content;

//  display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//   gap: 40px;
//   padding: 40px;
//   max-width: 1200px;
//   margin: auto;
  
`;
const Div= styled.div`
  margin-bottom: 200px;
   position: sticky;
  top: 0;
  z-index: 1000; 
`;


const Banner = styled.div`
  width: 100%;
  img {
    width: 90%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );

    &:nth-child(2) {
      display: none;
    }

    @media only screen and (max-width: 767px) {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
    }
  }
`;

const Main = styled.div`
  display: grid;
//  positon:static;
  justify-content: center;
  place-items: center;
  width: 100%;
  grid-auto-rows: 420px;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 20px;

  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }

  /* Tablets */

  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }

  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
`;const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

  export default Product;





// import axios from "../axios";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import HeaderM from "./HeaderM";

// function Product() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   let navigate = useNavigate();

//   useEffect(() => {
//     const fetchdata = async () => {
//       const response = await axios.get("/products/get");
//       setProducts(response.data);
//     };
//     fetchdata();
//   }, []);

//   const handleEnquiryClick = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//     setShowModal(false);
//   };

//   return (
//     <Container>
//      <StickyHeader>
//   <HeaderM />
// </StickyHeader>
//       <Main>
//         {products.map((product) => (
//           <Card key={product._id}>
//             <img src={`http://localhost:8000${product.imageURL}`} alt={product.title} />
//             <h3>{product.title}</h3>
//             <p>₹ {product.price}</p>
//             <button onClick={() => handleEnquiryClick(product)}>Enquiry Now</button>
//           </Card>
//         ))}
//       </Main>

//       {showModal && selectedProduct && (
//         <ModalOverlay>
//           <ModalContent>
//             <h2>{selectedProduct.title}</h2>
//             <img src={`http://localhost:8000${selectedProduct.imageURL}`} alt={selectedProduct.title} />
//             <p><strong>Description:</strong> {selectedProduct.description}</p>
//             <p><strong>Price:</strong> ₹ {selectedProduct.price}</p>
//             <p><strong>Rating:</strong> ⭐ {selectedProduct.rating}</p>
//             <CloseButton onClick={handleCloseModal}>Close</CloseButton>
//           </ModalContent>
//         </ModalOverlay>
//       )}

//       <footer>
//         <p>© 2025 <strong className='grin'> GRIN ENERGY</strong>. All rights reserved.</p>
//         <div>
//           <a href="/">Home</a>
//           <a href="/product">Products</a>
//           <a href="/contact">Contact</a>
//           <a href="/aboutUs">Privacy Policy</a>
//         </div>
//       </footer>
//     </Container>
//   );
// }

// // Styled Components
// const Container = styled.div`
//   width: 100%;
//   margin: auto;
//   height: fit-content;
// `;

// // const Div = styled.div`
// //   margin-bottom: 200px;
// // `;
// const StickyHeader = styled.div`
//  margin-bottom: 200px;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
//   background-color: white;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
// `;

// const Main = styled.div`
//   display: grid;
//   justify-content: center;
//   place-items: center;
//   width: 100%;
//   grid-auto-rows: 420px;
//   grid-template-columns: repeat(4, 280px);
//   grid-gap: 20px;

//   @media (max-width: 767px) {
//     grid-template-columns: repeat(2, 50%);
//     grid-gap: 0;
//   }

//   @media (min-width: 767px) and (max-width: 1200px) {
//     grid-template-columns: repeat(3, 30%);
//   }

//   @media (min-width: 767px) {
//     margin-top: -130px;
//     padding: 10px 0;
//   }
// `;

// const Card = styled.div`
//   background: #f5f5f5;
//   border-radius: 8px;
  
//   padding: 15px;
//   text-align: center;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   img {
//     width: 200px;
//     height: 200px;
//     object-fit: contain;
//   }
//   h3 {
//     margin: 10px 0;
    
     
//   }
//   button {
//     background-color: #007bff;
//     color: white;
//     border: none;
//     padding: 10px;
//     border-radius: 5px;
//     cursor: pointer;
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 30px;
//   border-radius: 8px;
//   width: 60%;
//   //  height: 80%;
//   max-width: 100%;
//   text-align: center;
//   img {
//     width: 100%;
//     height: 200px;
//     object-fit: contain;
//   }
// `;

// const CloseButton = styled.button`
//   margin-top: 20px;
//   background-color: #dc3545;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export default Product;


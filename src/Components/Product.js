import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
 import HeaderM from "./HeaderM";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import Footer from "./Footer";


function Product() {
  const [products, setProducts] = useState("");
  let navigate= useNavigate();

  
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/products/get");
      setProducts(data);
    };
    fetchdata();
  }, []);

  

  return (
    <Container>
        <Div>
           <HeaderM/>
        </Div>
     
      <Main >
        {products &&
          products?.data.map((product) => (
            <StyledLink  to={`/product/${product._id}`}
            key={product._id}>
              <Card className="main"
             key={product._id}
               id={product._id}
            
               image={`http://localhost:8000${product.imageURL}`} 
              price={product.price}
              rating={product.rating}
              title={product.title}
            />
          </StyledLink>
            
          ))}
      </Main>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

 margin: auto;
  height: fit-content;
  
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
    width: 100%;
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

  justify-content: center;
  place-items: center;
  width: 100%;

  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;

 
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }

 

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






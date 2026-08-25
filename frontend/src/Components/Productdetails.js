// src/Components/ProductDetails.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useStateValue } from "../StateProvider";
import Rating from "@material-ui/lab/Rating";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [, dispatch] = useStateValue();

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    axios
      .get(`/products/update/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (!product) {
    return (
      <>
        <Header />

        <Loading>
          Loading product details...
        </Loading>

        <Footer />
      </>
    );
  }

  // =====================================================
  // ADD TO BASKET
  // =====================================================

  const addToBasket = () => {
    const price = Number(product.price) || 0;
    const gst = Number(product.gst) || 0;

    const gstAmount = (price * gst) / 100;
    const totalPrice = price + gstAmount;

    dispatch({
      type: "ADD_TO_BASKET",

      item: {
        id: product._id,
        title: product.title,

        image: `${process.env.REACT_APP_API_URL}${product.imageURL}`,

        price: price,
        gst: gst,
        gstAmount: gstAmount,
        totalPrice: totalPrice,

        description: product.description,
      },
    });

    navigate("/cart");
  };

  // =====================================================
  // INQUIRY
  // =====================================================

  const handleInquiry = () => {
    navigate("/contactus");
  };

  // =====================================================
  // GET SPECIFICATIONS
  // =====================================================

  const getSpecifications = () => {
    if (!product || !product.customFields) {
      return {};
    }

    let fields = product.customFields;

    // If customFields is JSON string
    if (typeof fields === "string") {
      try {
        fields = JSON.parse(fields);
      } catch (error) {
        console.error("Error parsing customFields:", error);
        return {};
      }
    }

    // Handle nested customFields
    if (fields.customFields) {
      let nestedFields = fields.customFields;

      if (typeof nestedFields === "string") {
        try {
          nestedFields = JSON.parse(nestedFields);
        } catch (error) {
          console.error(
            "Error parsing nested customFields:",
            error
          );

          return {};
        }
      }

      fields = nestedFields;
    }

    // Fields that should not appear in specifications
    const excludedFields = [
      "gst",
      "gstAmount",
      "totalPrice",
      "price",
      "rating",
      "averageRating",
      "title",
      "description",
      "image",
      "imageURL",
    ];

    const specifications = {};

    Object.entries(fields).forEach(([key, value]) => {
      if (!excludedFields.includes(key)) {
        specifications[key] = value;
      }
    });

    return specifications;
  };

  const specifications = getSpecifications();

  // =====================================================
  // PRICE
  // =====================================================

  const price = Number(product.price) || 0;
  const gst = Number(product.gst) || 0;

  const gstAmount = (price * gst) / 100;
  const totalPrice = price + gstAmount;

  const isInquiryProduct = price > 100000;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Page>
      <Header />

      {/* ================================
          BACK BUTTON
      ================================= */}

      <BackContainer>
        <BackButton onClick={() => navigate("/Product")}>
          <img
            src="/back.png"
            alt="Back"
          />
        </BackButton>
      </BackContainer>

      {/* ================================
          PRODUCT DETAILS
      ================================= */}

      <DetailsContainer>

        {/* ================================
            IMAGE
        ================================= */}

        <ImageSection>

          <ProductImage
            src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
            alt={product.title}
          />

        </ImageSection>

        {/* ================================
            PRODUCT INFORMATION
        ================================= */}

        <InfoSection>

          <ProductTitle>
            {product.title}
          </ProductTitle>

          {/* DESCRIPTION */}

          <Description>
            <strong>Description:</strong>
            <br />

            {product.description}
          </Description>

          {/* ================================
              PRICE
          ================================= */}

          {isInquiryProduct ? (

            <PriceOnRequest onClick={handleInquiry}>
              Price on Request
            </PriceOnRequest>

          ) : (

            <PriceSection>

              <PriceRow>
                <PriceLabel>
                  Base Price:
                </PriceLabel>

                <PriceValue>
                  ₹{price.toFixed(2)}
                </PriceValue>
              </PriceRow>

              <PriceRow>
                <PriceLabel>
                  GST ({gst}%):
                </PriceLabel>

                <PriceValue>
                  ₹{gstAmount.toFixed(2)}
                </PriceValue>
              </PriceRow>

              <TotalRow>
                <PriceLabel>
                  Total (incl. GST):
                </PriceLabel>

                <TotalValue>
                  ₹{totalPrice.toFixed(2)}
                </TotalValue>
              </TotalRow>

            </PriceSection>
          )}

          {/* ================================
              RATING
          ================================= */}

          <RatingContainer>

            <Rating
              value={
                Number(product.averageRating) || 0
              }
              precision={0.5}
              readOnly
            />

          </RatingContainer>

          {/* ================================
              BUTTON
          ================================= */}

          <ButtonGroup>

            {isInquiryProduct ? (

              <InquiryButton
                onClick={handleInquiry}
              >
                Inquiry Now
              </InquiryButton>

            ) : (

              <CartButton
                onClick={addToBasket}
              >
                Add to Cart
              </CartButton>

            )}

          </ButtonGroup>

        </InfoSection>

      </DetailsContainer>

      {/* ================================
          SPECIFICATIONS
      ================================= */}

      {Object.keys(specifications).length > 0 && (

        <SpecSection>

          <SpecTitle>
            Specifications
          </SpecTitle>

          <SpecGrid>

            {Object.entries(specifications).map(
              ([key, value]) => (

                <SpecRow key={key}>

                  <SpecKey>
                    {key}
                  </SpecKey>

                  <SpecValue>

                    {String(value)
                      .split("\\n")
                      .map((line, index, array) => (

                        <React.Fragment
                          key={index}
                        >
                          {line}

                          {index <
                            array.length - 1 && (
                            <br />
                          )}

                        </React.Fragment>

                      ))}

                  </SpecValue>

                </SpecRow>

              )
            )}

          </SpecGrid>

        </SpecSection>

      )}

      <Footer />

    </Page>
  );
}


// =====================================================
// PAGE
// =====================================================

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
`;


// =====================================================
// LOADING
// =====================================================

const Loading = styled.div`
  min-height: 400px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  color: #555;
`;


// =====================================================
// BACK BUTTON
// =====================================================

const BackContainer = styled.div`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 10px 20px;

  box-sizing: border-box;

  display: flex;
  justify-content: flex-end;
`;

const BackButton = styled.button`
  border: none;
  background: transparent;

  padding: 0;

  cursor: pointer;

  img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    img {
      width: 38px;
      height: 38px;
    }
  }
`;


// =====================================================
// PRODUCT DETAILS CONTAINER
// =====================================================

const DetailsContainer = styled.div`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 40px;

  box-sizing: border-box;

  background: #f8f8f8;

  border-radius: 10px;

  display: grid;

  grid-template-columns: 450px 1fr;

  gap: 50px;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 30px;

    padding: 25px;
  }

  @media (max-width: 600px) {
    padding: 15px;

    border-radius: 0;

    gap: 20px;
  }
`;


// =====================================================
// IMAGE SECTION
// =====================================================

const ImageSection = styled.div`
  width: 100%;

  display: flex;

  justify-content: center;

  align-items: flex-start;
`;


// =====================================================
// PRODUCT IMAGE
// =====================================================

const ProductImage = styled.img`
  width: 100%;

  max-width: 450px;

  height: 450px;

  object-fit: contain;

  border-radius: 10px;

  background: white;

  padding: 20px;

  box-sizing: border-box;

  box-shadow:
    0px 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    max-width: 500px;

    height: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;

    height: auto;

    max-height: 350px;

    padding: 15px;
  }
`;


// =====================================================
// INFORMATION SECTION
// =====================================================

const InfoSection = styled.div`
  width: 100%;

  min-width: 0;

  box-sizing: border-box;
`;


// =====================================================
// TITLE
// =====================================================

const ProductTitle = styled.h1`
  margin: 0 0 20px;

  font-size: 30px;

  line-height: 1.3;

  color: #222;

  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;


// =====================================================
// DESCRIPTION
// =====================================================

const Description = styled.p`
  margin: 0 0 20px;

  font-size: 16px;

  line-height: 1.7;

  color: #444;

  word-break: break-word;

  strong {
    color: #222;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;


// =====================================================
// PRICE SECTION
// =====================================================

const PriceSection = styled.div`
  width: 100%;

  margin-top: 15px;

  padding: 15px;

  box-sizing: border-box;

  background: white;

  border-radius: 8px;

  border: 1px solid #ddd;
`;


// =====================================================
// PRICE ROW
// =====================================================

const PriceRow = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  padding: 8px 0;

  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;


// =====================================================
// TOTAL ROW
// =====================================================

const TotalRow = styled(PriceRow)`
  border-top: 1px solid #ddd;

  margin-top: 5px;

  padding-top: 12px;
`;


// =====================================================
// PRICE LABEL
// =====================================================

const PriceLabel = styled.span`
  color: #444;

  font-weight: 600;
`;


// =====================================================
// PRICE VALUE
// =====================================================

const PriceValue = styled.span`
  color: #222;

  font-weight: 500;

  white-space: nowrap;
`;


// =====================================================
// TOTAL VALUE
// =====================================================

const TotalValue = styled.span`
  color: #000;

  font-weight: 700;

  white-space: nowrap;
`;


// =====================================================
// PRICE ON REQUEST
// =====================================================

const PriceOnRequest = styled.p`
  margin: 20px 0;

  color: red;

  font-size: 18px;

  font-weight: bold;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


// =====================================================
// RATING
// =====================================================

const RatingContainer = styled.div`
  margin-top: 20px;

  display: flex;

  align-items: center;
`;


// =====================================================
// BUTTON GROUP
// =====================================================

const ButtonGroup = styled.div`
  margin-top: 25px;

  display: flex;

  gap: 15px;

  width: 100%;

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;


// =====================================================
// CART BUTTON
// =====================================================

const CartButton = styled.button`
  width: 180px;

  background: #28a745;

  color: white;

  padding: 12px 22px;

  border: none;

  border-radius: 6px;

  cursor: pointer;

  font-size: 16px;

  font-weight: 600;

  &:hover {
    background: #1e7e34;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;


// =====================================================
// INQUIRY BUTTON
// =====================================================

const InquiryButton = styled.button`
  width: 180px;

  background: #28a745;

  color: white;

  padding: 12px 22px;

  border: none;

  border-radius: 6px;

  cursor: pointer;

  font-size: 16px;

  font-weight: 600;

  &:hover {
    background: #1e7e34;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;


// =====================================================
// SPECIFICATION SECTION
// =====================================================

const SpecSection = styled.div`
  width: 100%;

  max-width: 1200px;

  margin: 40px auto;

  padding: 0 40px;

  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 30px auto;

    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;

    margin: 25px auto;
  }
`;


// =====================================================
// SPECIFICATION TITLE
// =====================================================

const SpecTitle = styled.h2`
  margin: 0 0 20px;

  padding: 10px 15px;

  background: #48474d;

  color: white;

  border-radius: 8px;

  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 23px;
  }

  @media (max-width: 480px) {
    font-size: 20px;

    padding: 9px 12px;
  }
`;


// =====================================================
// SPECIFICATION GRID
// =====================================================

const SpecGrid = styled.div`
  width: 100%;

  border: 1px solid #ddd;

  border-radius: 8px;

  overflow: hidden;

  background: white;
`;


// =====================================================
// SPECIFICATION ROW
// =====================================================

const SpecRow = styled.div`
  width: 100%;

  display: flex;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    display: block;
  }
`;


// =====================================================
// SPECIFICATION KEY
// =====================================================

const SpecKey = styled.div`
  width: 35%;

  padding: 16px 18px;

  box-sizing: border-box;

  font-weight: bold;

  color: #111;

  background: #f5f5f5;

  word-break: break-word;

  @media (max-width: 600px) {
    width: 100%;

    padding: 11px 14px;

    font-size: 14px;
  }
`;


// =====================================================
// SPECIFICATION VALUE
// =====================================================

const SpecValue = styled.div`
  width: 65%;

  padding: 16px 18px;

  box-sizing: border-box;

  color: #333;

  background: white;

  line-height: 1.6;

  white-space: normal;

  word-break: break-word;

  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    width: 100%;

    padding: 11px 14px;

    font-size: 14px;
  }
`;


export default ProductDetails;



// // src/Components/ProductDetails.js
// import React, { useEffect, useState } from "react";
// import {  useNavigate, useParams } from "react-router-dom";
// import axios from "../axios";
// import styled from "styled-components";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useStateValue } from "../StateProvider";
// import Rating from "@material-ui/lab/Rating";

// function ProductDetails() {
//    const navigate = useNavigate();
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//     const [, dispatch] = useStateValue();

//   useEffect(() => {
//     axios.get(`/products/update/${id}`) // your backend GET by ID
//       .then(res => setProduct(res.data))
//       .catch(err => console.error("Error fetching product:", err));
//   }, [id]);

//    if (!product) return <p>Loading product details...</p>;

//     // ✅ Add to Basket function
//   const addToBasket = () => {
//     const gst = Number(product.gst || 0);
//     const gstAmount = (product.price * gst) / 100;
//     const totalPrice = product.price + gstAmount;

//     dispatch({
//       type: "ADD_TO_BASKET",
//       item: {
//         id: product._id,
//         title: product.title,
//        image: `${process.env.REACT_APP_API_URL}${product.imageURL}`,
//         // image: product.image,
//         price: product.price,
//         gst: gst,
//         gstAmount: gstAmount,
//         totalPrice: totalPrice,
//         description: product.description,
//       },
//     });

//     navigate("/cart");
//   };

//   const handleInquiry = () => {
//   // navigate(`/inquiry/${product._id}`);
//   navigate("/contactus");
// };
// // Prepare custom specifications
// const getSpecifications = () => {
//   if (!product || !product.customFields) {
//     return {};
//   }

//   let fields = product.customFields;

//   // If customFields is stored as a JSON string
//   if (typeof fields === "string") {
//     try {
//       fields = JSON.parse(fields);
//     } catch (error) {
//       console.error("Error parsing customFields:", error);
//       return {};
//     }
//   }

//   // Handle old data where customFields contains another customFields
//   if (fields.customFields) {
//     let nestedFields = fields.customFields;

//     if (typeof nestedFields === "string") {
//       try {
//         nestedFields = JSON.parse(nestedFields);
//       } catch (error) {
//         console.error("Error parsing nested customFields:", error);
//         return {};
//       }
//     }

//     fields = nestedFields;
//   }

//   // Remove fields that should NOT be specifications
//   const excludedFields = [
//     "gst",
//     "gstAmount",
//     "totalPrice",
//     "price",
//     "rating",
//     "title",
//     "description",
//     "image",
//     "imageURL"
//   ];

//   const specifications = {};

//   Object.entries(fields).forEach(([key, value]) => {
//     if (!excludedFields.includes(key)) {
//       specifications[key] = value;
//     }
//   });

//   return specifications;
// };

// const specifications = getSpecifications();

//   return (
//      <Div>
//     <Header/>
//     {/* <a href="/Product"><img src="../back.png" style={{width:"50px",height:"50px",}}></img></a> */}

//     <a href="/Product" style={{ display: "block", textAlign: "right" }}>
//   <img
//     src="../back.png"
//     style={{ width: "50px", height: "50px",  position: "sticky",
//   top:"0" }}
//     alt="Back"
//   />
// </a>

//     <DetailsContainer>
//        <div className="details-container"
//       //  style={{ padding: "20px"}}
//        >
//       {product ? (
//         <div>
          
//         <div className="details-header">
//          <Image
//             //  src={`http://localhost:8000${product.imageURL}`}
//               src={`${process.env.REACT_APP_API_URL}${product.image}`}
//             alt={product.title}
//               // style={{ width: "300px", height: "auto" }}
//           />
//           <Info>
//           <div className="detailsdiv" >
//           <div className="details-info" >
//                <h1 className="detailsh1">{product.title}</h1>
//                <p><strong style={{marginBottom:"10px"}}>Description:</strong> {product.description}</p>
//               {Number(product.price) > 100000 ? (

//  <p
//   style={{fontWeight:"bold", color:"red", cursor:"pointer"}}
//   onClick={handleInquiry}
// >
//   Price on Request 
// </p>

// ) : (

//   <>
//     <p>
//       <strong>Base Price:</strong> ₹{Number(product.price).toFixed(2)}
//     </p>

//     <p>
//       <strong>GST ({product.gst || 0}%):</strong> ₹
//       {((product.price * (product.gst || 0)) / 100).toFixed(2)}
//     </p>

//     <p>
//       <strong>Total (incl. GST):</strong> ₹
//       {(
//         product.price +
//         (product.price * (product.gst || 0)) / 100
//       ).toFixed(2)}
//     </p>
//   </>

// )}
//           {/* <p><strong>Price:</strong> ₹{product.price}</p> */}
//          <Rating
//   value={Number(product.averageRating) || 0}
//   precision={0.5}
//   readOnly
// />
//             </div>
          
//           <ButtonGroup>

// {product.price > 100000 ? (

//   <InquiryButton onClick={handleInquiry}>
//     Inquiry Now
//   </InquiryButton>

// ) : (

//   <>
//     <CartButton onClick={addToBasket}>
//       Add to Cart
//     </CartButton>
//   </>

// )}

// </ButtonGroup>
//           </div>
//          </Info>
          

//           {/* 🔽🔽 Use this to show custom fields 🔽🔽 */}
        
//           {/* {product.customFields && (
//              <div className="spec-section" >
//               <p style={{margin:"5%"}}><strong>Specifications:</strong></p>
              
//               </div>
//           )} */}

//           {/* Specifications */}
// {/* {product.customFields &&
//   Object.keys(product.customFields).length > 0 && (
//     <div className="spec-section">
//       <h2>Specifications</h2>

//       <div className="spec-grid">
//         {Object.entries(product.customFields).map(([key, value]) => (
//           <div className="spec-row" key={key}>
//             <div className="spec-key">
//               {key}
//             </div>

//             <div className="spec-value">
//               {value}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
// )} */}

// {/* {product.customFields &&
//   Object.entries(product.customFields).length > 0 && (
//     <div className="spec-section">

//       <h2>Specifications</h2>

//       <div className="spec-grid">
//         {Object.entries(product.customFields).map(([key, value]) => (
//           <div className="spec-row" key={key}>

//             <div className="spec-key">
//               {key}
//             </div>

//             <div className="spec-value">
//               {value}
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
// )} */}
//        {Object.keys(specifications).length > 0 && (
//   <SpecSection>
//     <h2>Specifications</h2>

//     <SpecGrid>
//       {Object.entries(specifications).map(([key, value]) => (
//         <SpecRow key={key}>

//           <SpecKey>
//             {key}
//           </SpecKey>

//           <SpecValue>
//             {String(value)
//               .split("\\n")
//               .map((line, index) => (
//                 <React.Fragment key={index}>
//                   {line}
//                   {index <
//                     String(value).split("\\n").length - 1 && <br />}
//                 </React.Fragment>
//               ))}
//           </SpecValue>

//         </SpecRow>
//       ))}
//     </SpecGrid>
//   </SpecSection>
// )}   
//         </div>
//         </div>
       
//       ) : (
//         <p>Loading product details...</p>
//       )}
//     </div>
   
//     </DetailsContainer>
//     <Footer/>
//     </Div>
//   );
// }

// const DetailsContainer = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   display: flex;
//   gap: 50px;
//   padding: 40px;
//   background: #f8f8f8;
//   border-radius: 10px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 20px;
//   }
// `;

// const Image = styled.img`
//   width: 450px;
//   height: 450px;
//   object-fit: contain;
//   border-radius: 10px;
//   background: white;
//   padding: 20px;
//   box-shadow: 0px 4px 15px rgba(0,0,0,0.1);

//   @media (max-width:768px){
//     width:100%;
//     height:auto;
//   }
// `;

// const Info = styled.div`
//   flex: 1;

//   h1 {
//     font-size: 28px;
//     margin-bottom: 15px;
//     color: #222;
//   }

//   p {
//     margin: 10px 0;
//     font-size: 16px;
//     color: #444;
//     line-height: 1.6;
//   }
// `;
// const Div= styled.div`
//   // margin-bottom: 200px;
//   //  position: sticky;
//   // top: 0;
//   z-index: 1000; 
// `;
// const ButtonGroup = styled.div`
//   margin-top: 20px;
//   display: flex;
//   gap: 15px;
// `;

// const CartButton = styled.button`
//  background: #28a745;
//   color: white;
//   padding: 12px 22px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 16px;
//    margin-left:70px;

//   &:hover{
//     background:#1e7e34;
//   }
// `;

// const InquiryButton = styled.button`
//   background: #28a745;
//   color: white;
//   padding: 12px 22px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 16px;
//    margin-left:70px;
//   &:hover{
//     background:#1e7e34;
//   }
// `;
// const SpecSection = styled.div`
//   margin-top: 40px;
//   width: 100%;

//   h2 {
//     font-size: 28px;
//     margin-bottom: 20px;
//     color: #fdfbfb;
//     padding:2px;
//      border-radius: 8px;
//     background: #48474d;
//   }

//   @media (max-width: 768px) {
//     margin-top: 30px;

//     h2 {
//       font-size: 24px;
//     }
//   }
// `;

// const SpecGrid = styled.div`
//   width: 100%;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   overflow: hidden;
//   background: white;
// `;


// const SpecRow = styled.div`
//   display: flex;
//   border-bottom: 1px solid #ddd;

//   &:last-child {
//     border-bottom: none;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const SpecKey = styled.div`
//   width: 35%;
//   padding: 16px 18px;

//   font-weight: bold;
//   color: #0a0a0a;

//   background: #f5f5f5;

//   word-break: break-word;

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 12px 15px;
//   }
// `;

// const SpecValue = styled.div`
//   width: 65%;
//   padding: 16px 18px;

//   color: #333;
//   background: white;

//   line-height: 1.6;
//   white-space: normal;
//   word-break: break-word;

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 12px 15px;
//   }
// `;

// export default ProductDetails;




// import React, { useState,useEffect } from "react";
// import styled from "styled-components";
// import axios from "../../axios";
// import { Navigate } from "react-router-dom";

// function AddProduct() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [rating, setRating] = useState("");
//   const [image, setImage] = useState(null);
//   const [gst, setGst] = useState("");
//     const [gstAmount, setGstAmount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [dynamicFields, setDynamicFields] = useState([]);

//   // ✅ Calculate GST automatically when price or gst changes
//   useEffect(() => {
//     if (price && gst) {
//       const gstValue = (Number(price) * Number(gst)) / 100;
//       setGstAmount(gstValue);
//       setTotalPrice(Number(price) + gstValue);
//     } else {
//       setGstAmount(0);
//       setTotalPrice(Number(price) || 0);
//     }
//   }, [price, gst]);

//  const handleAddField = () => {
//     setDynamicFields([...dynamicFields, { label: "", value: "" }]);
//   };
//   const handleRemoveField = (index) => {
//     const updatedFields = [...dynamicFields];
//     updatedFields.splice(index, 1);
//     setDynamicFields(updatedFields);
//   };

//   const handleFieldChange = (index, fieldType, fieldValue) => {
//     const updatedFields = [...dynamicFields];
//     updatedFields[index][fieldType] = fieldValue;
//     setDynamicFields(updatedFields);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("price", Number(price));
//     formData.append("rating", Number(rating));
//     formData.append("image",image);
//      formData.append("gst", Number(gst));
//        formData.append("gstAmount", gstAmount); // GST value ₹
//     formData.append("totalPrice", totalPrice); 
//     // Add dynamic fields to FormData
//     // dynamicFields.forEach(({ label, value }) => {
//     //   if (label && value) {
//     //     formData.append(label, value);
//     //   }
//     // });
//     // Add custom fields as JSON
// const customFields = {};

// dynamicFields.forEach(({ label, value }) => {
//   if (label.trim() && value.trim()) {
//     customFields[label.trim()] = value.trim();
//   }
// });

// formData.append("customFields", JSON.stringify(customFields));

//     try {
//       const res = await axios.post("/products/add", formData,
//         {headers: { "Content-Type": "multipart/form-data" },});
//       alert("Product added successfully!");
//       setTitle("");
//       setDescription("");
//       setPrice("");
//       setRating("");
//       setImage(null);
//       setGst("");
//         setGstAmount(0);
//        setTotalPrice(0);
//       setDynamicFields([]);
      
//     } catch (err) {
//       console.error(err);
//       alert("Error while adding product");
//     }
   
//   };
   

//   return (
//     <Container onSubmit={handleSubmit}>
//         <Logo>
//         <img src="./GRIN ENERGY.png" alt="Logo" />
//        </Logo>
//       <h2>Add Product</h2>

//       <label>Title:</label>
//       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

//       <label>Description:</label>
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

//       <label>Price:</label>
//       <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}    required />

//       <label>Rating:</label>
//       <input type="number"  value={rating} step="0.1" onChange={(e) => setRating(e.target.value)}  />

//       <label>GST Rate(%):</label>
//        <input type="number"    step="0.1" value={gst}   onChange={(e)=>setGst(e.target.value)} required />
//        {/* <input type="number" value={gst} onChange={totalPrice} required /> */}
      
//         {/* <div style={{ marginTop: "10px" }}>
//         <p>GST Amount: ₹ {gstAmount.toFixed(2)}</p>
//         <p><strong>Total Price (incl. GST): ₹ {totalPrice.toFixed(2)}</strong></p>
//       </div> */}

//       <label>Image:</label>
//       <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

//       <hr />

//       <h3>Custom Fields</h3>
      
//       {dynamicFields.map((field, index) => (
//         <CustomField key={index}>
//           <input
//            style={{width:"50%"}}
//             type="text"
//             placeholder="Field Name "
//             value={field.label}
//             onChange={(e) => handleFieldChange(index, "label", e.target.value)}
//             required />
          
//           <textarea style={{width:"50%"}}
//             type="textarea" row="5"
//             placeholder="Value "
//             value={field.value}
//             onChange={(e) => handleFieldChange(index, "value", e.target.value)}
//             required
//           />
//            <button style={{width:'9px', border:"none"}} type="button" onClick={() => handleRemoveField(index)}>❌</button>
//         </CustomField>
//       ))}
      
//       <button type="button" onClick={handleAddField}>+ Add Custom Field</button>

//       <SubmitButton type="submit">Add Product</SubmitButton>
      
//     </Container>
//   );
// }

// export default AddProduct;

// const Container = styled.form`
//   display: flex;
//  flex-direction: column;
//   gap: 15px;
//   max-width: 600px;
//   margin: auto;
//   padding: 20px;
// `;

// const CustomField = styled.div`
//   display: flex;
//   gap: 10px;
//   input {
//     flex: 1;
   
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 10px;
//   background: #0066ff;
//   color: white;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
// `;
// const Logo = styled.div`
//   // width: 400px;
//   //  margin-bottom: 20px;
// margin-inline-start:5%;
//   img {
//      width: 100%;
//       width: 500px;
//      height:100px;
//    }
//       @media only screen and (max-width: 767px) {
//       width:90%;
    
//       margin-inline-start:-30%;
//       // margin: 10%;
//       img {
//      width: 400px;
//      height:100px;
//    }}
//  `;
 


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../axios";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [gstAmount, setGstAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [image, setImage] = useState(null);

  // Custom fields
  const [dynamicFields, setDynamicFields] = useState([]);

  // --------------------------------
  // Calculate GST
  // --------------------------------
  useEffect(() => {
    if (price && gst) {
      const gstValue =
        (Number(price) * Number(gst)) / 100;

      setGstAmount(gstValue);
      setTotalPrice(Number(price) + gstValue);
    } else {
      setGstAmount(0);
      setTotalPrice(Number(price) || 0);
    }
  }, [price, gst]);

  // --------------------------------
  // Add Custom Field
  // --------------------------------
  const handleAddField = () => {
    setDynamicFields([
      ...dynamicFields,
      {
        label: "",
        value: "",
      },
    ]);
  };

  // --------------------------------
  // Remove Custom Field
  // --------------------------------
  const handleRemoveField = (index) => {
    const updatedFields = [...dynamicFields];

    updatedFields.splice(index, 1);

    setDynamicFields(updatedFields);
  };

  // --------------------------------
  // Change Custom Field
  // --------------------------------
  const handleFieldChange = (
    index,
    fieldType,
    fieldValue
  ) => {
    const updatedFields = [...dynamicFields];

    updatedFields[index][fieldType] = fieldValue;

    setDynamicFields(updatedFields);
  };

  // --------------------------------
  // Submit Product
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --------------------------------
    // Basic validation
    // --------------------------------

    if (!image) {
      alert("Please select a product image.");
      return;
    }

    // --------------------------------
    // Create FormData
    // --------------------------------

    // const formData = new FormData();

    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("price", Number(price));
    // formData.append("gst", Number(gst));

    // // Image
    // formData.append("image", image);

    const formData = new FormData();

formData.append("title", title);
formData.append("description", description);

const priceValue = Number(price) || 0;
const gstValue = Number(gst) || 0;

const calculatedGstAmount =
  (priceValue * gstValue) / 100;

const calculatedTotalPrice =
  priceValue + calculatedGstAmount;

formData.append("price", priceValue);
formData.append("gst", gstValue);
formData.append("gstAmount", calculatedGstAmount);
formData.append("totalPrice", calculatedTotalPrice);

formData.append("image", image);

    // --------------------------------
    // Create Custom Fields Object
    // --------------------------------

    const customFields = {};

    dynamicFields.forEach(({ label, value }) => {
      const cleanLabel = label.trim();
      const cleanValue = value.trim();

      if (cleanLabel && cleanValue) {
        customFields[cleanLabel] = cleanValue;
      }
    });

    // Convert object to JSON
    formData.append(
      "customFields",
      JSON.stringify(customFields)
    );

    // --------------------------------
    // Send Product to Backend
    // --------------------------------

    try {
      const res = await axios.post(
        "/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "Product added:",
        res.data
      );

      alert("Product added successfully!");

      // --------------------------------
      // Reset Form
      // --------------------------------

      setTitle("");
      setDescription("");
      setPrice("");
      setGst("");
      setGstAmount(0);
      setTotalPrice(0);
      setImage(null);
      setDynamicFields([]);

      // Reset file input
      const fileInput =
        document.getElementById("productImage");

      if (fileInput) {
        fileInput.value = "";
      }

    } catch (err) {
      console.error(
        "Error adding product:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Error while adding product"
      );
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <Container onSubmit={handleSubmit}>

      {/* Logo */}
      <Logo>
        <img
          src="/GRIN ENERGY.png"
          alt="GRIN ENERGY"
        />
      </Logo>

      <h2>Add Product</h2>

      {/* Title */}
      <label>Title:</label>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        required
      />

      {/* Description */}
      <label>Description:</label>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        required
      />

      {/* Price */}
      <label>Price:</label>

      <input
        type="number"
        min="0"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        required
      />

      {/* GST */}
      <label>GST Rate (%):</label>

      <input
        type="number"
        min="0"
        step="0.1"
        value={gst}
        onChange={(e) =>
          setGst(e.target.value)
        }
        required
      />

      {/* GST Display */}
      {price && gst && (
        <PriceBox>
          <p>
            GST Amount: ₹{" "}
            {gstAmount.toFixed(2)}
          </p>

          <strong>
            Total Price (including GST): ₹{" "}
            {totalPrice.toFixed(2)}
          </strong>
        </PriceBox>
      )}

      {/* Image */}
      <label>Image:</label>

      <input
        id="productImage"
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
        required
      />

      <hr />

      {/* Custom Fields */}
      <h3>Custom Fields</h3>

      {dynamicFields.map(
        (field, index) => (
          <CustomField key={index}>

            {/* Field Name */}
            <input
              type="text"
              placeholder="Field Name"
              value={field.label}
              onChange={(e) =>
                handleFieldChange(
                  index,
                  "label",
                  e.target.value
                )
              }
              required
            />

            {/* Field Value */}
            <textarea
              rows="5"
              placeholder="Value"
              value={field.value}
              onChange={(e) =>
                handleFieldChange(
                  index,
                  "value",
                  e.target.value
                )
              }
              required
            />

            {/* Remove */}
            <RemoveButton
              type="button"
              onClick={() =>
                handleRemoveField(index)
              }
            >
              ❌
            </RemoveButton>

          </CustomField>
        )
      )}

      {/* Add Custom Field */}
      <AddFieldButton
        type="button"
        onClick={handleAddField}
      >
        + Add Custom Field
      </AddFieldButton>

      {/* Submit */}
      <SubmitButton type="submit">
        Add Product
      </SubmitButton>

    </Container>
  );
}

export default AddProduct;


// ========================================
// STYLES
// ========================================

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  max-width: 600px;

  margin: auto;

  padding: 20px;

  box-sizing: border-box;

  label {
    font-weight: 600;
  }

  input,
  textarea {
    padding: 10px;

    border: 1px solid #ccc;

    border-radius: 5px;

    font-size: 15px;

    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
  }

  hr {
    width: 100%;
    margin: 10px 0;
  }

  h2,
  h3 {
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 15px;
  }
`;


// ========================================
// LOGO
// ========================================

const Logo = styled.div`
  width: 100%;

  margin-bottom: 10px;

  img {
    width: 500px;
    height: 100px;
    object-fit: contain;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }
`;


// ========================================
// CUSTOM FIELD
// ========================================

const CustomField = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 10px;

  width: 100%;

  input {
    width: 40%;
    flex: 1;
  }

  textarea {
    width: 50%;
    flex: 1;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;

    input,
    textarea {
      width: 100%;
    }
  }
`;


// ========================================
// REMOVE BUTTON
// ========================================

const RemoveButton = styled.button`
  border: none;

  background: transparent;

  cursor: pointer;

  font-size: 18px;

  padding: 8px;

  width: 40px;
`;


// ========================================
// ADD FIELD BUTTON
// ========================================

const AddFieldButton = styled.button`
  padding: 10px;

  background: #555;

  color: white;

  border: none;

  border-radius: 5px;

  cursor: pointer;

  font-size: 15px;

  &:hover {
    opacity: 0.9;
  }
`;


// ========================================
// SUBMIT BUTTON
// ========================================

const SubmitButton = styled.button`
  padding: 12px;

  background: #0066ff;

  color: white;

  border: none;

  border-radius: 5px;

  cursor: pointer;

  margin-top: 20px;

  font-size: 16px;

  &:hover {
    background: #0052cc;
  }
`;


// ========================================
// PRICE BOX
// ========================================

const PriceBox = styled.div`
  padding: 10px 15px;

  background: #f5f5f5;

  border-radius: 5px;

  p {
    margin: 0 0 5px 0;
  }

  strong {
    display: block;
  }
`;
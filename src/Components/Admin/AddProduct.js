

import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../axios";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [dynamicFields, setDynamicFields] = useState([]);

  const handleAddField = () => {
    setDynamicFields([...dynamicFields, { label: "", value: "" }]);
  };
  const handleRemoveField = (index) => {
    const updatedFields = [...dynamicFields];
    updatedFields.splice(index, 1);
    setDynamicFields(updatedFields);
  };

  const handleFieldChange = (index, fieldType, fieldValue) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][fieldType] = fieldValue;
    setDynamicFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("image", image);

    dynamicFields.forEach(({ label, value }) => {
      if (label && value) {
        formData.append(label, value);
      }
    });

    try {
      const res = await axios.post("/products/add", formData);
      alert("Product added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setRating("");
      setImage(null);
      setDynamicFields([]);
    } catch (err) {
      console.error(err);
      alert("Error while adding product");
    }
  };
 

  return (
    <Container onSubmit={handleSubmit}>
        <Logo>
        <img src="./GRIN ENERGY.png" alt="Logo" />
       </Logo>
      <h2>Add Product</h2>

      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

      <label>Rating:</label>
      <input type="number" value={rating} step="0.1" onChange={(e) => setRating(e.target.value)} required />

      <label>Image:</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

      <hr />

      <h3>Custom Fields</h3>
      
      {dynamicFields.map((field, index) => (
        <CustomField key={index}>
          <input style={{width:"50%",textTransform:"uppercase"}}
            type="text"
            placeholder="Field Name "
            value={field.label}
            onChange={(e) => handleFieldChange(index, "label", e.target.value.toUpperCase())}
            required
          />
          <textarea style={{width:"50%"}}
            type="textarea" row="5"
            placeholder="Value "
            value={field.value}
            onChange={(e) => handleFieldChange(index, "value", e.target.value)}
            required
          />
           <button style={{width:'9px', border:"none"}} type="button" onClick={() => handleRemoveField(index)}>❌</button>
        </CustomField>
      ))}
      <button type="button" onClick={handleAddField}>+ Add Custom Field</button>

      <SubmitButton type="submit">Add Product</SubmitButton>
      
    </Container>
  );
}

export default AddProduct;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const CustomField = styled.div`
  display: flex;
  gap: 10px;
  input {
    flex: 1;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #0066ff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
const Logo = styled.div`

margin-inline-start:5%;
  img {
     width: 100%;
      width: 500px;
     height:100px;
   }
      @media only screen and (max-width: 767px) {
      width:90%;
    
      margin-inline-start:-30%;
      img {
     width: 400px;
     height:100px;
   }}
 `;


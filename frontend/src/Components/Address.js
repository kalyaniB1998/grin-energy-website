import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import HeaderM from "./HeaderM";
function Address() {
  const [{}, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const deliver = (e) => {
    e.preventDefault();

     if (
    !fullName.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !flat.trim() ||
    !area.trim() ||
    !city.trim() ||
    !state.trim()
  ) {
    alert("⚠️ Please fill all required fields!");
    return;
  }

  // ✅ Simple phone & email check
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("⚠️ Please enter a valid 10-digit phone number!");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("⚠️ Please enter a valid email address!");
    return;
  }

    dispatch({
      type: "SET_ADDRESS",
      item: {
        fullName,
        phone,
        email,
        flat,
        area,
        city,
        state,
        landmark, // optional
      },
    });

    navigate("/payment");
  };

  return (
    <Container>
      <HeaderM />
      <Main>
        <FormContainer>
          <InputContainer>
            <p>Full Name <strong style={{color:"red"}}>*</strong></p>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              value={fullName}
            />
          </InputContainer>
          <InputContainer>
            <p>Phone Number <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </InputContainer>
            <InputContainer>
            <p>E-Mail <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputContainer>
          <InputContainer>
            <p>Flat, House no. Building, Company <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setFlat(e.target.value)}
              value={flat}
            />
          </InputContainer>
          <InputContainer>
            <p>Area, Colony, Street <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </InputContainer>
          <InputContainer>
            <p>Landmark</p>
            <input
              type="text"
               placeholder="(Optional)"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
            />
          </InputContainer>
          <InputContainer>
            <p>Town/City <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </InputContainer>
          <InputContainer>
            <p>State/Province <strong style={{color:"red"}}>*</strong></p>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </InputContainer>

          <button  className="cta-button secondary" onClick={deliver}>Deliver to this Address</button>
        </FormContainer>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;

  margin: auto;
  background-color: rgb(234, 237, 237);

  position: relative;
`;

const Main = styled.div`
  padding: 15px;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  min-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fff;
  margin: auto;

  button {
    align-self: flex-start;
    height: 33px;
    width: 250px;
    margin-top: 20px;
    background-color: #ffa32a;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;
export default Address;

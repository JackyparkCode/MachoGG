import React, {useState} from 'react'
import "./Pro.css";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PostMain from "../PostMain";
import {useNavigate} from "react-router-dom";
function ProMain() {
    //search를 위한 state
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleInput = (e) => {
        setUsername(e.target.value);
        console.log(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        navigate("/pro/" + username);
    };
    return(
        <>
            <World>
                <Imagecontent>
                    <img src='/img/Promain.png' />
                </Imagecontent>

                <Searchbar>
                    <Form className="d-flex" autoComplete="off" onSubmit={handleSubmit}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Control
                            type="search"
                            name="username"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleInput}
                            placeholder="프로와의 비교"
                            autoComplete="off"

                        />
                        <Button type="submit">.GG</Button>

                    </Form>
                    <Main1>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        <MainLeft>
                            <PostMain/>
                        </MainLeft>
                    </Main1>
                </Searchbar>
            </World>


        </>
    );
}
export default ProMain;


let Searchbar = styled.div`
  left: 40px;
  width : 80%;
  justify-content: center;
`

let Imagecontent = styled.div`
  display: flex;
  width : 80%;
  justify-content: center;
  align-items: center;
`
let Main1 = styled.div`
  margin-top: 36px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
`
let MainLeft = styled.div`
  display: flex;
  background-color: White;
  width: 100%;
  border-radius: 4px;
`
let World = styled.div`
  display: block;
  width: 1080px;
  margin: 0 auto;
`
import TopBox from '../component/Header';
import {useNavigate} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import styled from 'styled-components';
import PostMain from "./post/PostMain";


function Main(){
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
        navigate("/summoner/" + username);
    };

    return(
        <>
            <World>
            <br/>
            <Imagecontent>
                <img src='/img/main1111.png' />
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
                        placeholder="소환사명 ..."
                        autoComplete="off"

                    />
                    <Button type="submit">.GG</Button>

                </Form>
                <Main1>
                    <MainLeft>
                        <PostMain/>
                    </MainLeft>
                    {/*<MainRight>*/}

                    {/*</MainRight>*/}
                </Main1>
            </Searchbar>
            </World>


        </>
    )
}
export default Main;

let Searchbar = styled.div`
  left: 40px;
  width : 80%;
  justify-content: center;
`

let Imagecontent = styled.div`
  display: flex;
  width : 100%;
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
  background-color: White;
  width: 536px;
  border-radius: 4px;
`
let World = styled.div`
  display: block;
  width: 1080px;
  margin: 0 auto;
`
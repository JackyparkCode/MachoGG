import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import {useLocation, useNavigate} from 'react-router-dom';
function Navigate() {
    const location = useLocation(); //url정보 담는 변수

    const [show, setShow] = useState(false);

    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handle2Close = () => setShow2(false);
    const handle2Show = () => setShow2(true);

    //회원가입 변수
    const [id,setId] = useState(""); // 로그인과 공용
    const [pw,setPw] = useState(""); // 로그인과 공용
    const [nickname,setNickname] = useState("");
    const [email,setEmail] = useState("");
    const [phnum,setPhnum] = useState("");
    const [birth,setBirth] = useState("");

    //회원가입 중복 체크
    const [checkId,setCheckId] = useState(false);
    const [checkEmail,setCheckEmail] = useState(false);
    const [checkNickname,setCheckNickname] = useState(false);


    //회원 가입 동작
    const join = () => {
        console.log("회원가입 액션");
        if(checkId === false){
            alert("아이디 중복체크를 해주세요");
            return;
        }
        else if(checkEmail === false){
            alert("이메일 중복체크를 해주세요");
            return;
        }
        else if(checkNickname == false){
            alert("닉네임 중복체크를 해주세요");
            return;
        }

        axios.post('/fow/join',null,{
            params:{
                id:id,
                pw:pw,
                nickname:nickname,
                email:email,
                phnum:phnum,
                birth:birth
            }
        })
            .then(res => {
                console.log(res.data);
                alert("회원가입 성공~!");
                setShow2(false);
            })
            .catch(function (error){
                alert("제대로 기입해주세요.");
                console.log(error);
            })
    }

    //회원가입시 아이디 체크
    const chId =() =>{
        console.log("아이디 체크")
        if(id==="")
        {
            alert("아이디를 입력해주세요.");
            return;
        }
        axios.post('/fow/checkId',null,{
            params:{
                id:id
            }
        }).then(res =>{
            console.log("아이디 중복 여부 : " + res.data);
            if(res.data === true){
                alert("이미 존재하는 아이디입니다.");
                setCheckId(false);
                return;
            }
            else{
                alert("사용 가능한 아이디입니다.");
                setCheckId(true);
                return;
            }
        })
            .catch(function(error){
                console.log(error);
            })
    }

    //회원가입시 이메일 체크
    const chEm =() =>{
        console.log("이메일 체크")
        if(email==="")
        {
            alert("이메일을 입력해주세요.");
            return;
        }
        axios.post('/fow/checkEmail',null,{
            params:{
                email:email
            }
        }).then(res =>{
            console.log("이메일 중복 여부 : " + res.data);
            if(res.data === true){
                alert("이미 등록된 이메일입니다..");
                setCheckEmail(false);
                return;
            }
            else{
                alert("사용 가능한 이메일입니다.");
                setCheckEmail(true);
                return;
            }
        })
            .catch(function(error){
                console.log(error);
            })
    }
    //회원가입시 닉네임 체크
    const chNick =() =>{
        console.log("닉네임 체크")
        if(nickname==="")
        {
            alert("닉네임을 입력해주세요.");
            return;
        }
        axios.post('/fow/checkNickname',null,{
            params:{
                nickname:nickname
            }
        }).then(res =>{
            console.log("닉네임 중복 여부 : " + res.data);
            if(res.data === true){
                alert("이미 등록된 닉네임입니다..");
                setCheckNickname(false);
                return;
            }
            else{
                alert("사용 가능한 닉네임입니다.");
                setCheckNickname(true);
                return;
            }
        })
            .catch(function(error){
                console.log(error);
            })
    }

    //로그인 동작
    const login = () =>{
        console.log("로그인 실행");
        axios.post('/fow/login',null,{
            params:{
                id:id,
                pw:pw
            }
        })
            .then(res => {
                if(id ===""){
                    alert("아이디를 입력해주세요.");

                }else if(pw === ""){
                    alert("비밀번호를 입력해주세요");
                }

                console.log(res.data);
                if(res.data != null){
                    alert("로그인에 성공하셨습니다.");
                    setShow(false);
                    sessionStorage.setItem("nickname",res.data);

                    document.location.href ='/';
                } else{
                    alert("로그인 실패");
                }

            })
            .catch(function (error){
                console.log(error);
            })
    }
    //로그아웃 동작
    const logout =() =>{
        console.log("로그아웃 동작");
        sessionStorage.removeItem("nickname"); // 세션 제거
        alert("로그아웃 하셨습니다.");
        document.location.href ='/';
    }

    //마이페이지로 이동
    const myPage =() =>{
        console.log("마이페이지 이동");
        document.location.href ='/myPage';
    }
    //useLocation 으로 현재의 주소값 받기
    useEffect(() => {
        console.log(location);
    }, [ location ])
    //search bar
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
        window.location.reload()
    };
    return (
        <>
            <Navbar bg="light" expand="lg" >
                <Container fluid>
                    <Navbar.Brand href="#">MACHO.GG</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">홈</Nav.Link>
                            <Nav.Link href="/ranking">챔피언 분석</Nav.Link>
                            <Nav.Link href="/pro">프로와의 비교</Nav.Link>
                            <Nav.Link href="/post">커뮤니티</Nav.Link>
                            <Nav.Link href="#action2">유저신고</Nav.Link>
                        </Nav>
                        &nbsp; &nbsp;
                        <div>
                            {location.pathname !== "/" ?
                                <Form className="d-flex" autoComplete="off" onSubmit={handleSubmit}>
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
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

                                </Form>: null}
                        </div>
                        <div>
                            {sessionStorage.getItem("nickname")==null?
                                <Button variant="primary" onClick={handleShow} >로그인</Button>:
                                <><>{sessionStorage.getItem("nickname")}님 안녕하세요.{" "}</><Button variant="primary" onClick={logout}>로그아웃</Button></>}

                        </div>

                    </Navbar.Collapse>
                </Container>
            </Navbar>




            <>

                {/*로그인*/}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Header closeButton>
                        <Modal.Title>로그인인데용</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" placeholder="id" onChange={(event)=>setId(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>패스워드</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event)=>setPw(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="아이디 저장" />
                            </Form.Group>
                            <Button variant="primary" onClick={login}>
                                로그인
                            </Button>


                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="button" onClick={handle2Show} >회원가입</Button>
                    </Modal.Footer>
                </Modal>


                {/*회원가입*/}
                <Modal
                    show={show2}
                    onHide={handle2Close}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Header closeButton>
                        <Modal.Title>회원가입</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>아이디</Form.Label>{" "}<Button variant="primary" onClick={chId}>아이디 확인</Button>
                                <Form.Control type="text" placeholder="id" onChange={event => setId(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>패스워드</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={event => setPw(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>이메일</Form.Label>{" "}<Button variant="primary" onClick={chEm}>이메일 확인</Button>
                                <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    이메일 공유가 안됩니다.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" >
                                <Form.Label>닉네임</Form.Label>{" "}<Button variant="primary" onClick={chNick}>닉네임 확인</Button>
                                <Form.Control type="text" placeholder="Nickname" onChange={event => setNickname(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>휴대폰</Form.Label>
                                <Form.Control type="text" placeholder="Phone Number Ex) 01012345678" onChange={event => setPhnum(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>생년월일</Form.Label>
                                <Form.Control type="text" placeholder="Brith Ex) 000522" onChange={event => setBirth(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="아이디 저장" />
                            </Form.Group>
                            <Button variant="primary" onClick={join}>
                                Submit
                            </Button>


                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handle2Close}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>



    );
}

export default Navigate;
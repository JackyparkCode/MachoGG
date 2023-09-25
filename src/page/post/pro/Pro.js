import React, {useEffect,useState} from "react"
import "./Pro.css";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
function Pro() {


    let params = useParams()
    const navigate = useNavigate();

        if (useParams() === null) {
            navigate(-1);
        }

    // 뒤로가기
    // 인덱스로 처리, 두번 뒤로 가고싶으면 -2
    const handleGoBack = () => {
        navigate(-1);
    }

    // 홈으로 가기
    const handleGoHome = () => {
        navigate('/');
    }
    const [summonerName, setSummonerName] = useState(params.username);


    // useEffect(() => {
    //     console.log("aaaa");
    //     if (
    //         summonerName == null ||
    //         summonerName === "" ||
    //         summonerName === undefined
    //     ) {
    //         alert("소환사명을 입력하세요");
    //         navigate('/');
    //     } else {

    //     }
    // }, [summonerName]);


    return(
        <>
            <ProBody>
                <LeftBody>
                    <SummonerName>
                        <a href="/summoner/바른청년" className="textsize">{summonerName}</a>
                        <img src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/1153.png"
                             width="48" height="48" className="summonerImage"/>
                    </SummonerName>
                    <Mybody>
                        dd
                    </Mybody>

                </LeftBody>

                <MiddleBody>
                    <br/>
                    <div className="textsize">vs</div>
                    <Boxx>
                    <Percentage>
                        <span className="percentage">54%</span>
                        <span className="center1">승률</span>
                        <span className="percentage">60%</span>
                    </Percentage>
                    <Percentage>
                        <span className="percentage">1.08</span>
                        <span className="center1">KDA</span>
                        <span className="percentage">3.03</span>
                    </Percentage>
                    <Percentage>
                        <span className="percentage">54%</span>
                        <span className="center1">킬 관여율</span>
                        <span className="percentage">60%</span>
                    </Percentage>
                    </Boxx>
                    <Boxx>
                        <Percentage>
                            <span className="percentage">458</span>
                            <span className="center1">분당딜량</span>
                            <span className="percentage">386</span>
                        </Percentage>
                        <Percentage>
                            <span className="percentage">1618</span>
                            <span className="center1">데스당 딜량</span>
                            <span className="percentage">3494</span>
                        </Percentage>
                        <Percentage>
                            <span className="percentage">148%</span>
                            <span className="center1">골드당 딜량</span>
                            <span className="percentage">131%</span>
                        </Percentage>
                    </Boxx>

                    <Boxx>
                        <Percentage>
                            <span className="percentage">1.11</span>
                            <span className="center1">분당 CS</span>
                            <span className="percentage">1.13</span>
                        </Percentage>
                        <Percentage>
                            <span className="percentage">312</span>
                            <span className="center1">분당 골드</span>
                            <span className="percentage">292</span>
                        </Percentage>
                        <Percentage>
                            <span className="percentage">1.49</span>
                            <span className="center1">분당 비전 스코어</span>
                            <span className="percentage">2.43</span>
                        </Percentage>
                        <Percentage>
                            <span className="percentage">0.37</span>
                            <span className="center1">분당 제어와드 구매</span>
                            <span className="percentage">0.35</span>
                        </Percentage>
                    </Boxx>

                        <Boxx>
                            <Percentage>
                                <span className="percentage">1.11</span>
                                <span className="center1">킬</span>
                                <span className="percentage">1.13</span>
                            </Percentage>
                            <Percentage>
                                <span className="percentage">8.15</span>
                                <span className="center1">데스</span>
                                <span className="percentage">2.92</span>
                            </Percentage>
                            <Percentage>
                                <span className="percentage">1.49</span>
                                <span className="center1">어시스트</span>
                                <span className="percentage">2.43</span>
                            </Percentage>
                            <Percentage>
                                <span className="percentage">0.37</span>
                                <span className="center1">솔로킬</span>
                                <span className="percentage">0.35</span>
                            </Percentage>
                            <Percentage>
                                <span className="percentage">0.37</span>
                                <span className="center1">솔로킬 허용</span>
                                <span className="percentage">0.35</span>
                            </Percentage>
                            <Percentage>
                                <span className="percentage">0.37</span>
                                <span className="center1">첫 킬 관여율</span>
                                <span className="percentage">0.35</span>
                            </Percentage>
                        </Boxx>

                </MiddleBody>
                <RightBody>
                    <SummonerName>
                        <img src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/1153.png"
                             width="48" height="48"  className="summonerImage"/>
                        <a href="/summoner/바른청년" className="textsize">Hide on bush</a>

                    </SummonerName>
                    <Mybody>
                        dd
                    </Mybody>

                </RightBody>
            </ProBody>
            <div>

            </div>
        </>
    );
}
export default Pro;

let ProBody = styled.div`
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  width: 1400px;
  background-color: white;
  margin: 0px auto;
  border-radius: 4px;
  flex-direction: row;
`
let Mybody = styled.div`
  margin-inline: 20px;
  background-color: lightblue;
  border-radius: 4px;
`
let LeftBody = styled.div`
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`
let MiddleBody = styled.div`
  width: 100%;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
`
let RightBody = styled.div`
  width: 100%;
  border-radius: 4px;
  display: flex;
  text-align: right;
  flex-direction: column;
`
let SummonerName = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:center;
  
 `
let Percentage = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:center;
  align-self: center;
  gap: 40px;
`
let Boxx = styled.div`
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

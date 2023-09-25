
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect,useState} from "react"
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import "./Summoner.css"
import axios from "axios";
import {Link,useNavigate, useParams} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";


function Summoner(){

    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
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

    const [expandedRows, setExpandedRows] = useState([]);

    const [expandState, setExpandState] = useState({});

    const handleEpandRow = (event, userId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(userId);

        let obj = {};
        isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
        setExpandState(obj);

        // If the row is expanded, we are here to hide it. Hence remove
        // it from the state variable. Otherwise add to it.
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);

        setExpandedRows(newExpandedRows);
    }

// 숫자 시간을 분과 초로 변경
  const getDuration = (duration) => {
    let minutes = (duration / 60).toFixed(0);
    let seconds = (duration % 60).toFixed(0);

    if ((minutes + "").length === 1) {
      minutes = "0" + minutes;
    }

    if ((seconds + "").length === 1) {
      seconds = "0" + seconds;
    }

    return minutes + "분" + seconds+"초";
  };
// 롱 시간을 날짜로 변경
  const getCreation = (creation) => {
    // Date의 프로토타입에 함수추가
    Date.prototype.yyyymmdd = function () {
      var yyyy = this.getFullYear().toString();
      var mm = (this.getMonth() + 1).toString();
      var dd = this.getDate().toString();

      return (
        yyyy +
        "-" +
        (mm[1] ? mm : "0" + mm[0]) +
        "-" +
        (dd[1] ? dd : "0" + dd[0])
      );
    };

    if (creation + 86400000 > Date.now()) {
      let temp = Date.now() - creation;
      if (temp < 60000) {
        return (temp / 1000).toFixed(0) + "초 전";
      } else if (temp < 3600000) {
        return (temp / 60000).toFixed(0) + "분 전";
      } else {
        return (temp / 3600000).toFixed(0) + "시간 전";
      }
    }
    return new Date(creation).yyyymmdd();
  };

    // 스펠 이미지 가져오기
    const getSpellImg = (spellId) => {
        if (spellId == null || spellId === "" || spellId === "null") {
          return;
        }
    
        let spellName = null;
    
        if (spellId === 21) {
          spellName = "SummonerBarrier";
        } else if (spellId === 1) {
          spellName = "SummonerBoost";
        } else if (spellId === 14) {
          spellName = "SummonerDot";
        } else if (spellId === 3) {
          spellName = "SummonerExhaust";
        } else if (spellId === 4) {
          spellName = "SummonerFlash";
        } else if (spellId === 6) {
          spellName = "SummonerHaste";
        } else if (spellId === 7) {
          spellName = "SummonerHeal";
        } else if (spellId === 13) {
          spellName = "SummonerMana";
        } else if (spellId === 30) {
          spellName = "SummonerPoroRecall";
        } else if (spellId === 31) {
          spellName = "SummonerPoroThrow";
        } else if (spellId === 11) {
          spellName = "SummonerSmite";
        } else if (spellId === 39) {
          spellName = "SummonerSnowURFSnowball_Mark";
        } else if (spellId === 32) {
          spellName = "SummonerSnowball";
        } else if (spellId === 12) {
          spellName = "SummonerTeleport";
        }
    
        return (
          "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" +
          spellName +
          ".png"
        );
      };





    const setApikey='api_key=*******************';
    const defaultURL='https://kr.api.riotgames.com/lol/';
    const asiaURL='https://asia.api.riotgames.com/lol/';


    const [respDto, setRespDto] = useState({}); //소환사명
    const [leagueEntryDto, setLeagueEntryDto] = useState([]); // 솔랭티어
    const [leagueEntryDto2, setLeagueEntryDto2] = useState({}); // 자랭티어
    const [matchList, setMatchList] = useState([]); // 경기 리스트
    const [summonerName, setSummonerName] = useState(params.username);
    const [matchDto , setMatchDto] =useState([]);
    const [myItemDto,setMyItemDto] =useState([]);
    const [itemDto,setItemDto] =useState([]);
    const [myTeamDto,setMyTeamDto] =useState([]);
    const [awayTeamDto,setAwayTeamDto] =useState([]);

    function findScore(data){
        for(var j=0;j<data.info.participants.length;j++){
            if(data.info.participants[j].summonerId == respDto.id){
                if(data.info.participants[j].win == true){
                    return "승리"                           
                }else{
                    return "패배"  
                }
            }
        }
    }
    function findScoreColor(data){
        console.log("콘솔"+data);
        for(var j=0;j<data.info.participants.length;j++){
            if(data.info.participants[j].summonerId == respDto.id){
                return data.info.participants[j].win;                 
            }
        }
    }

    function findMyChamp(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].championName;
            }
        }
    }

    function findMySpell1(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return getSpellImg(data.info.participants[i].summoner1Id);
            }
        }
    }

    function findMySpell2(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return getSpellImg(data.info.participants[i].summoner2Id);
            }
        }
    }
    
    function findMyPerks1(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].perks.styles[0].selections[0].perk;
            }
        }
    }

    function findMyPerks2(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].perks.styles[1].style;
            }
        }
    }

    function findMyItems(data,id){
        console.log("sqerasdfzx"+data.length);

        for(var j=0;j<data.length;j++){
            const a=[];
            for(var i=0;i<data[j].info.participants.length;i++){
                if(data[j].info.participants[i].summonerId == id){
                    a.push(findItems(data[j].info.participants[i].item0));
                    a.push(findItems(data[j].info.participants[i].item1));
                    a.push(findItems(data[j].info.participants[i].item2));
                    a.push(findItems(data[j].info.participants[i].item3));
                    a.push(findItems(data[j].info.participants[i].item4));
                    a.push(findItems(data[j].info.participants[i].item5));
                    a.push(findItems(data[j].info.participants[i].item6));
                    break;
                }            
            }  
            itemDto.push(a);            
        }
        setItemDto(itemDto=>[...itemDto]);
    }

    function findItems(data){
        if(data==0){
            return "https://raw.communitydragon.org/latest/game/assets/items/itemmodifiers/goldcornersoverlay.png";
        }else{
             return "https://opgg-static.akamaized.net/images/lol/item/"+data+".png?image=q_auto,f_webp,w_44&amp;v=1666684602578"
        }
    }

    function teamData(data,id){
        for(var j=0;j<data.length;j++){
            const a=[];
            const b=[];
            for(var i=0;i<data[j].info.participants.length;i++){
                if(data[j].info.participants[i].summonerId == id){
                    if(i<5){
                        a.push(data[j].info.participants[0]);
                        a.push(data[j].info.participants[1]);
                        a.push(data[j].info.participants[2]);
                        a.push(data[j].info.participants[3]);
                        a.push(data[j].info.participants[4]);
                        b.push(data[j].info.participants[5]);
                        b.push(data[j].info.participants[6]);
                        b.push(data[j].info.participants[7]);
                        b.push(data[j].info.participants[8]);
                        b.push(data[j].info.participants[9]);
                        break;
                    }                 
                    b.push(data[j].info.participants[0]);
                    b.push(data[j].info.participants[1]);
                    b.push(data[j].info.participants[2]);
                    b.push(data[j].info.participants[3]);
                    b.push(data[j].info.participants[4]);
                    a.push(data[j].info.participants[5]);
                    a.push(data[j].info.participants[6]);
                    a.push(data[j].info.participants[7]);
                    a.push(data[j].info.participants[8]);
                    a.push(data[j].info.participants[9]);
                    break;
                }            
            }  
            myTeamDto.push(a);         
            awayTeamDto.push(b);         
        }
        setMyTeamDto(myTeamDto=>[...myTeamDto]);
        setAwayTeamDto(awayTeamDto=>[...awayTeamDto]);
    }

    //일반,자유,솔랭,특별겜 판별
    function gameType(data){
        let gT=data.info.queueId;
        if(gT==420){
            return "솔랭"
        }else if(gT==430){
            return "일반"
        }else if(gT==440){
            return "자유 5:5 랭크"
        }else if(gT==450){
            return "무작위총력전"
        }else{
            return "특별게임"
        }


    }


    
    //평점
    const getGrade = (kill, death, assist) => {
        if (death === 0) {
          return "Perfect 평점";
        }
    
        let grade = ((kill + assist) / death).toFixed(2);
    
        return grade + ":1 평점";
      };

      function findMyKILL(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].kills;
            }
        }
    }

    function findMyAssist(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].assists;
            }
        }
    }

    function findMyDeath(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].deaths;
            }
        }
    }

    function findMyKillRate(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                if(data.info.participants[i].teamId == data.info.teams[0].teamId){
                    return Math.floor((findMyKILL(data)+findMyAssist(data))/(data.info.teams[0].objectives.champion.kills)*100);
                }else{
                    return Math.floor((findMyKILL(data)+findMyAssist(data))/(data.info.teams[1].objectives.champion.kills)*100);
                }
            }
        }
    }

    function findMyWard(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].visionWardsBoughtInGame;
            }
        }
    }

    function findMyCss(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                let cs=data.info.participants[i].totalMinionsKilled+data.info.participants[i].neutralMinionsKilled;
                let duration=data.info.gameDuration;
                return "CS " + cs + " (" + (cs / (duration / 60)).toFixed(1) + ")";
            }
        }
    }

    function sendMyCsDB(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                let cs=data.info.participants[i].totalMinionsKilled+data.info.participants[i].neutralMinionsKilled;
                return cs;
            }
        }
    }

    function findMyDPA(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].totalDamageDealtToChampions;
            }
        }
    }

    function findChampLevel(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return data.info.participants[i].champLevel;
            }
        }
    }

    function findMyPerformance(data){
        for(var i=0;i<data.info.participants.length;i++){
            if(data.info.participants[i].summonerId == respDto.id){
                return getMyPerformance(data.info.participants[i]);
            }
        }
    }

    function getMyPerformance(data){
        const me = data; 
        let numberKill="";
        if(me.doubleKills>0){
            numberKill =(<><div className="css-stv58e2 e1j3rwa93">더블킬</div></>);
        }
        if(me.tripleKills>0){
            numberKill=(<><div className="css-stv58e3 e1j3rwa93">트리플킬</div></>);
        }
        if(me.quadraKills>0){
            numberKill=(<><div className="css-stv58e4 e1j3rwa93">쿼드라킬</div></>);
        }
        if(me.pentaKills>0){
            numberKill=(<><div className="css-stv58e5 e1j3rwa93">펜타킬</div></>);
        }

        return numberKill;
    }

    function baronDeath(myTeam,allData){
        let teamId=myTeam.teamId;
        for(var i=0;i<allData.info.teams.length;i++){
            if(teamId == allData.info.teams[i].teamId){
                return allData.info.teams[i].objectives.baron.kills;
            }
        }
    }
    function dragonDeath(myTeam,allData){
        let teamId=myTeam.teamId;
        for(var i=0;i<allData.info.teams.length;i++){
            if(teamId == allData.info.teams[i].teamId){
                return allData.info.teams[i].objectives.dragon.kills;
            }
        }
    }

    function towerDeath(myTeam,allData){
        let teamId=myTeam.teamId;
        for(var i=0;i<allData.info.teams.length;i++){
            if(teamId == allData.info.teams[i].teamId){
                return allData.info.teams[i].objectives.tower.kills;
            }
        }
    }

    function totalKill(myTeam,allData){
        let teamId=myTeam.teamId;
        for(var i=0;i<allData.info.teams.length;i++){
            if(teamId == allData.info.teams[i].teamId){
                return allData.info.teams[i].objectives.champion.kills;
            }
        }
    }
    function totalGold(myTeam){
        let gold=0;
        for(var i=0;i<myTeam.length;i++){
            gold+=myTeam[i].goldEarned;
        }
        return gold;        
    }

    function sumTotalKill(allData){
       return  allData.info.teams[0].objectives.champion.kills+allData.info.teams[1].objectives.champion.kills;
    }

    function bestDealth(myDamage,index){
        let team=myTeamDto[index]
        let max=maxDamage(team);
        
        return (myDamage/max)*100;
    }

    function bestTotalDamage(myDamage,index){
        let team=myTeamDto[index]
        let max=maxTotalDamage(team);
        
        return (myDamage/max)*100;
    }

    function maxDamage(arr) {
        let max = -Infinity;
        for (let i = 0; i < arr.length; i++) {
          if (max < arr[i].totalDamageDealtToChampions) {
            max = arr[i].totalDamageDealtToChampions;
          }
        }
        return max;
      }

      function maxTotalDamage(arr) {
        let max = -Infinity;
        for (let i = 0; i < arr.length; i++) {
          if (max < arr[i].totalDamageTaken) {
            max = arr[i].totalDamageTaken;
          }
        }
        return max;
      }

    async function sendToDatabase(data){
        let matchId = data.metadata.matchId;
        let id = respDto.id;
        let myKill=findMyKILL(data);
        let myDeath=findMyDeath(data);
        let myAssist=findMyAssist(data);
        let myKillRate=findMyKillRate(data);
        let myCs=sendMyCsDB(data);
        let myChampion=findMyChamp(data);
        let gameTime=data.info.gameDuration;
        let myDamage=findMyDPA(data);

       await axios.post('/summoner/info',null,{
            params:{
                matchId:matchId,
                nickName:id,
                kill:myKill,
                death:myDeath,
                assist:myAssist,
                killRate:myKillRate,
                cs:myCs,
                damage:myDamage,
                champion:myChampion,
                gameTime:gameTime
            }
       })
    }

    async function getPlayerInfo(playerName){
        await axios.get(defaultURL+"summoner/v4/summoners/by-name/"+playerName+"?"+setApikey)//소환사명으로 고유아이디 등 가져옴
        .then((response)=>{
            if (response.data !== null && response.data !== undefined) {
                console.log("들어왔나?"+ response.data.id);
                setRespDto(response.data);
            }
        })
    }
    //고유id로 소환사 티어(리그)정보 가져옴
    async function getPlayerTier(player){
        await axios.get(defaultURL+"league/v4/entries/by-summoner/"+player+"?"+setApikey) //고유id로 소환사 티어(리그)정보 가져옴
        .then((res)=>{
            console.log(res.data);
            let e=[];
            e.push(res.data);
            e[0].map((league)=>{
                console.log("안나옴?"+league.queueType);
                if(league.queueType=="RANKED_SOLO_5x5"){
                    console.log("trueeeee");
                    leagueEntryDto.push(league);
                    setLeagueEntryDto(leagueEntryDto =>[...leagueEntryDto]);     
                }
                }
            )

            e[0].map((league)=>{
                console.log("안나옴?"+league.queueType);
                if(league.queueType=="RANKED_FLEX_SR"){
                    console.log("trueeeee");
                    setLeagueEntryDto2(league);     
                }
                }
            )

        })
    }
    async function getMatchList(player){
        await axios.get(asiaURL+"match/v5/matches/by-puuid/"+player+"/ids?start=0&count=5&"+setApikey)
        .then((response)=>{
            console.log(response.data);
            matchList.push(response.data);
            setMatchList(matchList=>[...matchList]);    
        })
    }

    async function getMatchInfo(match){
        if(match!=null){
            for(var i =0; i<match.length;i++){
                console.log("getmatc");
                const matchId=match[i];
                const matchData =await axios.get(asiaURL+"match/v5/matches/"+matchId+"?"+setApikey)
                .then((res)=>res.data).catch(err => err)
                matchDto.push(matchData);
                sendToDatabase(matchData);
              
            }
            const id=respDto.id
            setMatchDto(matchDto=>[...matchDto]); 
            findMyItems(matchDto,id);
            teamData(matchDto,id);        
        }
    }



    useEffect(() => {
        console.log("aaaa");
        if (
            summonerName == null ||
            summonerName === "" ||
            summonerName === undefined
        ) {
            alert("소환사명을 입력하세요");
            navigate('/');
        } else {
            //getPlayerInfo(summonerName);
            getPlayerInfo(summonerName);

        }
    }, []);

    useEffect(() => {
            console.log("summonerName: " +params);
            if (
                summonerName == null ||
                summonerName === "" ||
                summonerName === undefined
            ) {
                alert("소환사명을 입력하세요");
                navigate('/');
            } else {
                getPlayerTier(respDto.id);

            }
        }, [respDto]); 

    useEffect(() => {
            console.log("summonerName: " +params);
            if (
                summonerName == null ||
                summonerName === "" ||
                summonerName === undefined
            ) {
                alert("소환사명을 입력하세요");
                navigate('/');
            } else {
                getMatchList(respDto.puuid);
            }
    }, [respDto]); 

    
    useEffect(() => {
        console.log("몇번실행함?");
        if (
            matchList.length ==null
        ) {
            alert("소환사명을 입력하세요");
            navigate('/');
        } else {
            getMatchInfo(matchList[0]);
        }
}, [matchList[0]]); 








    return(
        
        <>
            <SummonerHeader>
            <SearchSummoner>
                {/*소환사 정보- 아이콘 , 소환사 명, 전적갱신버튼*/}
                <SummonerInfo>
                    {/*소환사 아이콘*/}
                    <SummonerIcon>
                        <img
                            className="profile"
                        src={
                        respDto != null
                            ? "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" +
                            respDto.profileIconId+
                            ".png"
                            : null
                        }
                        alt=""
                        />
                    </SummonerIcon>

                    <SummonerContents>
                        {/*티어*/}
                        <div>
                            <Button variant="secondary">level: {
                                respDto != null
                                ? respDto.summonerLevel
                                : null
                            }</Button>
                        </div>

                        {/*소환사 명*/}
                        <div>
                            <h2>
                            {
                                respDto != null
                                ? respDto.name 
                                : null
                            }
                            </h2>
                        </div>
                        {/*전적갱신 버튼*/}
                        <div>
                            <Button variant = "primary">전적갱신</Button>{' '}
                            <Button variant="outline-primary">종합</Button>{' '}
                            <Button variant="success">챔피언</Button>{' '}
                        </div>
                    </SummonerContents>
                </SummonerInfo>
            </SearchSummoner>
                <br/>
            </SummonerHeader>
            <br/>
            {/*<SummonerBody>*/}
                {/*왼쪽카드*/}
                {/*솔랭티어 카드*/}
            <div className="contentWrap">
                <div className="tabItem__content">
                    <div className="sideContent">
                <div className="tierbox">
                    <div className="summonerRating">
                        <div className="medal">
                            {
                                leagueEntryDto !=undefined && leagueEntryDto[0]!=undefined
                                ?<img src={"https://opgg-static.akamaized.net/images/medals_new/"+leagueEntryDto[0].tier+".png?image=q_auto,f_webp,w_144&v=1666343253548"} className="medalImage"/>
                                :<img src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6df2d66-13da-4ce4-ae85-8009742c5c94/d6u36gz-f28de47d-e50d-4d0b-b1fc-851910c761ca.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q2ZGYyZDY2LTEzZGEtNGNlNC1hZTg1LTgwMDk3NDJjNWM5NFwvZDZ1MzZnei1mMjhkZTQ3ZC1lNTBkLTRkMGItYjFmYy04NTE5MTBjNzYxY2EucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UlRixcuE7uqOAjzGtMf-6e9Gm-f0mNAJbUJoVpFRCgA"} className="medalImage"/>
                            }
                        </div>
                        <div className="tierRankInfo">
                            <div className="rankType">솔로랭크</div>
                            <div className="tierRank">
                            {
                                leagueEntryDto !=undefined && leagueEntryDto[0]!=undefined
                                ? leagueEntryDto[0].tier+"  "+leagueEntryDto[0].rank
                                : "UNRANKED"
                            }
                            </div>
                           <div className="tierInfo">
                        <span className="leaguePoints">
                          {" "}
                            {
                                leagueEntryDto !=undefined&& leagueEntryDto[0] !=undefined 
                                ? leagueEntryDto[0].leaguePoints
                                : null
                            } LP{" "}  
                        </span>
                               <span className="winLose">
                         <span className="wins">
                            {
                               leagueEntryDto !=undefined && leagueEntryDto[0]!=undefined
                                ? leagueEntryDto[0].wins
                                : null
                            }승{" "}   
                          </span>
                         <span className="lossers">
                            {
                                leagueEntryDto !=undefined && leagueEntryDto[0]!=undefined
                                ? leagueEntryDto[0].losses
                                : null
                            }패 
                          </span>
                          <br />
                          <span className="winRatio">
                            승률 {
                                leagueEntryDto !=undefined&& leagueEntryDto[0]!=undefined
                                ? Math.ceil((leagueEntryDto[0].wins/(leagueEntryDto[0].wins+leagueEntryDto[0].losses))*100)
                                : null
                            }%
                          </span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>




                {/*오른쪽 카드*/}
                {/*전적들*/}
                <div className="contentWrap">
                    <div className="tabItem__content">
                        <div className="sideContent">
                            <div className="tierbox">
                                <div className="summonerRating">
                                    <div className="medal">
                                        {
                                                leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                                                ? <img src={"https://opgg-static.akamaized.net/images/medals_new/"+leagueEntryDto2.tier+".png?image=q_auto,f_webp,w_144&v=1666343253548"} className="medalImage"/>
                                                     :<img src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6df2d66-13da-4ce4-ae85-8009742c5c94/d6u36gz-f28de47d-e50d-4d0b-b1fc-851910c761ca.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q2ZGYyZDY2LTEzZGEtNGNlNC1hZTg1LTgwMDk3NDJjNWM5NFwvZDZ1MzZnei1mMjhkZTQ3ZC1lNTBkLTRkMGItYjFmYy04NTE5MTBjNzYxY2EucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UlRixcuE7uqOAjzGtMf-6e9Gm-f0mNAJbUJoVpFRCgA"} className="medalImage"/>
                                        }   
                                    </div>
                                    <div className="tierRankInfo">
                            <div className="rankType">자유랭크<br></br>
                            </div>
                            <div className="tierRank">
                                         {
                                                leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                                                ?leagueEntryDto2.tier+" "+leagueEntryDto2.rank
                                                :"UNRANKED"
                                        }
                            </div>
                           <div className="tierInfo">
                        <span className="leaguePoints">
                          {" "}
                          {
                                                leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                                                ?leagueEntryDto2.leaguePoints+"LP "
                                                :null
                                        }  
                        </span>
                               <span className="winLose">
                         <span className="wins">
        
                            {
                               leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                               ?leagueEntryDto2.wins +"승 "   
                               :null
                            }   
                          </span>
                         <span className="lossers">
                            {
                                leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                                ?leagueEntryDto2.losses+"패 "
                                :null
                            }
                          </span>
                          <br />
                          <span className="winRatio">
                             {
                                leagueEntryDto2 !=undefined && leagueEntryDto2.tier !=undefined
                                ?"승률"+ Math.ceil((leagueEntryDto2.wins/(leagueEntryDto2.wins+leagueEntryDto2.losses))*100)+"%"
                                : null
                            }
                          </span>
                        </span>
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* 전적 카드 */}
            <div className="sideContent2">
                        <div className="rightbody">
                            <Container>
                                <Row>
                                    <Col>
                                       <br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} >
                                        <Table responsive variant="" className="table_light">
                                            {/*여기 thead는 그냥 디자인*/}
                                            <thead>
                                            <tr>

                                            </tr>
                                            </thead>
                                            <tbody>                                          
                                            {
                                                matchList.length != 0 && matchList[0].length != 0 && matchDto.length !== 0 
                                                ?matchList[0].map((match,index) =>
                                                    <>
                                                    {console.log("SEXX"+matchList[0].length)}
                                                    {console.log("SEXXXXXX"+matchDto)}
                                                        <tr key={index} className={"css-"+findScoreColor(matchDto[index])}>
                                                            <td>
                                                                {/*글씨창*/}
                                                                {
                                                                matchDto.length !== 0                                                             
                                                                ?<>                                                              
                                                               <div className={"solrang-"+findScoreColor(matchDto[index])}>{gameType(matchDto[index])}</div>{console.log(getCreation(matchDto[index].info.gameEndTimestamp))}
                                                                <div  className="type">{getCreation(matchDto[index].info.gameEndTimestamp)}</div>
                                                                <div className={"bar-"+findScoreColor(matchDto[index])}></div>
                                                                <div  className="type">
                                                                {
                                                                    findScore(matchDto[index])                                                                
                                                                }                                                                
                                                                </div>
                                                                <div  className="type">{getDuration(matchDto[index].info.gameDuration)}</div>
                                                                </>
                                                                :null
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                        matchDto.length!=0
                                                                        ?<> 
                                                                    <div className="champ-spell">
                                                                        {/*챔프이미지 창*/}
                                                                        <img src={"https://opgg-static.akamaized.net/images/lol/champion/"+findMyChamp(matchDto[index])+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_96&v=1666684602578"} width="48" alt="카사딘" height="48" className="champ-img-box"/>
                                                                        {/*챔프 레벨*/}
                                                                        <span className="champion-level" >{findChampLevel(matchDto[index])}</span>
                                                                        <div className="champspell">
                                                                            <img src={findMySpell1(matchDto[index])} width="22" alt="순간이동" height="22" className="item-image"/>
                                                                            <img src={findMySpell2(matchDto[index])} width="22" alt="점멸" height="22" className="item-image"/>
                                                                        </div>
                                                                        <div className="champspell">
                                                                            <img src={"https://opgg-static.akamaized.net/images/lol/perk/"+findMyPerks1(matchDto[index]) +".png?image=q_auto,f_webp,w_44&amp;v=1666684602578"} width="22" alt="봉인 풀린 주문서" height="22" className="ward-image"/>
                                                                            <img src={"https://opgg-static.akamaized.net/images/lol/perkStyle/"+findMyPerks2(matchDto[index])+".png?image=q_auto,f_webp,w_44&amp;v=1666684602578"} width="22" alt="결의" height="22" className="ward-image"/>
                                                                        </div>
                                                                        <div>
                                                                            <div className="kill-death">
                                                                                <div className="kill-death1">
                                                                                    <span>{findMyKILL(matchDto[index])}</span> / <span
                                                                                    className="d">{findMyDeath(matchDto[index])}</span> / <span>{findMyAssist(matchDto[index])}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="ratio1">
                                                                                <span>{getGrade(findMyKILL(matchDto[index]),findMyDeath(matchDto[index]),findMyAssist(matchDto[index]))}</span>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                        
                                                                    <div className="my-item">
                                                                        <img src={itemDto[index][0]} width="22" alt="아이템1" height="22" className="item-image"/>{" "}
                                                                        <img src={itemDto[index][1]} width="22" alt="아이템2" height="22" className="item-image"/>{" "}
                                                                        <img src={itemDto[index][2]} width="22" alt="아이템3" height="22" className="item-image"/>{" "}

                                                                        <img src={itemDto[index][3]} width="22" alt="아이템4" height="22" className="item-image"/>{" "}
                                                                        <img src={itemDto[index][4]} width="22" alt="아이템5" height="22" className="item-image"/>{" "}
                                                                        <img src={itemDto[index][5]} width="22" alt="아이템6" height="22" className="item-image"/>{" "}
                                                                         {/*와드창*/}
                                                                        <img src={itemDto[index][6]} width="22" alt="장신구" height="22" className="ward-image"/>
                                                                    </div>
                                                                    </>
                                                                    :null
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    matchDto!=0
                                                                    ?<>
                                                                <div className="sInfo">
                                                                    <div className="kill-death2">킬관여 {findMyKillRate(matchDto[index])}%</div>
                                                                    <div className="ctrl-ward">제어 와드 {findMyWard(matchDto[index])}</div>
                                                                    <div className="minion">{findMyCss(matchDto[index])}</div>
                                                                    <div className="my-tier">
                                                                    {
                                                                    leagueEntryDto !=undefined && leagueEntryDto[0]!=undefined
                                                                    ?leagueEntryDto[0].tier
                                                                    :"unranked"
                                                                    }</div>
                                                                    <div className='doublekill'>
                                                                    {findMyPerformance(matchDto[index])}
                                                                    </div>
                                                                </div>                                                                
                                                                </>                                                                    
                                                                :null
                                                                }
                                                            </td>
                                                                    
                                                            <td>
                                                                {
                                                                    matchDto !=0
                                                                    ?<>
                                                                    
                                                                <div className="participants">
                                                                    <div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[0].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16"  height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[0].summonerName}
                                                                                                     target="_blank" rel="noreferrer">{matchDto[index].info.participants[0].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[1].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[1].summonerName} target="_blank" rel="noreferrer" >{matchDto[index].info.participants[1].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[2].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16"  height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[2].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[2].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[3].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16"  height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[3].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[3].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1" ><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[4].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16"  height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[4].summonerName} target="_blank"
                                                                                                     rel="noreferrer">{matchDto[index].info.participants[4].summonerName}</Link></div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[5].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" alt="아트록스" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[5].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[5].summonerName}</Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[6].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" alt="뽀삐" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[6].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[6].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[7].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" alt="카사딘" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[7].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[7].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[8].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" alt="사미라" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[8].summonerName} target="_blank" rel="noreferrer">{matchDto[index].info.participants[8].summonerName}</Link></div>
                                                                        </div>
                                                                        <div className="one-champ">
                                                                            <div className="icon1"><img
                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+matchDto[index].info.participants[9].championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_32&amp;v=1666684602578"}
                                                                                width="16" alt="노틸러스" height="16"/></div>
                                                                            <div className="name1"><Link to={"/summoner/"+matchDto[index].info.participants[9].summonerName} target="_blank"
                                                                                                     rel="noreferrer">{matchDto[index].info.participants[9].summonerName}</Link></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </>
                                                                :null
                                                                }
                                                            </td>


                                                            <td>
                                                                <Button 
                                                                    onClick={event => handleEpandRow(event, index)}>
                                                                    {
                                                                        expandState[index] ?
                                                                            'Hide' : 'Show'
                                                                    }
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                        <>
                                                            {
                                                                expandedRows.includes(index) ?
                                                                    <tr>
                                                                        {/*전체*/}
                                                                        <td colSpan="10">
                                                                                
                                                                            <div className="champ-Info-Bar">
                                                                        
                                                                                <table result="WIN" className="css-1478wry e15ptgz10">
                                                                                    <colgroup>
                                                                                        <col width="44"/>
                                                                                        <col width="18"/>
                                                                                        <col width="18"/>
                                                                                        <col width="100"/>
                                                                                        <col width="68"/>
                                                                                        <col width="98"/>
                                                                                        <col width="120"/>
                                                                                        <col width="48"/>
                                                                                        <col width="56"/>
                                                                                        <col width="175"/>
                                                                                    </colgroup>
                                                                                    <thead>
                                                                                    <tr className='tr-change'>
                                                                                        <th colSpan="4">
                                                                                        {
                                                                                        myTeamDto[index][0].win == true
                                                                                        ?<>
                                                                                        <span className="css-win">승리</span>
                                                                                        </>
                                                                                        :<>
                                                                                        <span className="css-lose">패배</span>
                                                                                        </>                                                                                        
                                                                                        }                                                                                        
                                                                                        (
                                                                                        {
                                                                                        myTeamDto[index][0].teamId == 100
                                                                                        ?"블루팀"
                                                                                        :"레드팀"
                                                                                        }
                                                                                        )</th>
                                                                                        <th >Performance</th>
                                                                                        <th >KDA</th>
                                                                                        <th >피해량</th>
                                                                                        <th>와드</th>
                                                                                        <th>CS</th>
                                                                                        <th >아이템</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody className={"css-"+myTeamDto[index][0].win}>
                                                                                    {
                                                                                    myTeamDto[index].map((myTeamDto)=>                                                                                        
                                                                                    
                                                                                    <tr key={myTeamDto.puuid} result="WIN" className="css-12kdhht e1j3rwa94" >
                                                                                        <td className="champion"><a href="/champions/aatrox" target="_blank" rel="noreferrer">
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+myTeamDto.championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_64&amp;v=1666684602578"}
                                                                                                width="32" alt="아트록스"/>
                                                                                                <div className="level">{myTeamDto.champLevel}</div></div>
                                                                                        </a></td>
                                                                                        <td className="spells">
                                                                                            <div className=""><img
                                                                                                src={getSpellImg(myTeamDto.summoner1Id)}
                                                                                                /></div>
                                                                                            <div className=""><img
                                                                                                src={getSpellImg(myTeamDto.summoner2Id)}
                                                                                                alt="점멸"/></div>
                                                                                        </td>
                                                                                        <td className="runes">
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/perk/"+myTeamDto.perks.styles[0].selections[0].perk+".png?image=q_auto,f_webp,w_auto&amp;v=1666684602578"}
                                                                                                alt="정복자"/></div>
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/perkStyle/"+myTeamDto.perks.styles[1].style+".png?image=q_auto,f_webp,w_auto&amp;v=1666684602578"}
                                                                                                alt="결의"/></div>
                                                                                        </td>
                                                                                        <td className="name"><a href={"/summoner/"+myTeamDto.summonerName} target="_blank" rel="noreferrer">{myTeamDto.summonerName}</a>
                                                                                            <div className="tier">
                                                                                                <div className="">레벨{" "+myTeamDto.summonerLevel}</div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="op-score">
                                                                                            <div className="wrapper">
                                                                                                <div className="rank">
                                                                                                    {
                                                                                                            getMyPerformance(myTeamDto)

                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="kda">
                                                                                            <div className="k-d-a">{myTeamDto.kills}/{myTeamDto.deaths}/{myTeamDto.assists} <div className="">({Math.floor((myTeamDto.challenges.killParticipation).toFixed(2)*100)}%)</div></div>
                                                                                            <div className="css-ufjp55 e1j3rwa90">{myTeamDto.challenges.kda.toFixed(2)}:1</div>
                                                                                        </td>
                                                                                        <td className="damage">
                                                                                            <div>
                                                                                                <div className="">
                                                                                                    <div className="dealt">{myTeamDto.totalDamageDealtToChampions}</div>
                                                                                                    <div className="progress--taken"  data-for={myTeamDto.puuid} data-tip>                                                                                                        
                                                                                                        <ProgressBar striped variant="danger" now={bestDealth(myTeamDto.totalDamageDealtToChampions,index)} />
                                                                                                    </div>
                                                                                                    <ReactTooltip id={myTeamDto.puuid}>챔피언에게 가한 피해량:{myTeamDto.totalDamageDealtToChampions}</ReactTooltip>
                                                                                                </div>
                                                                                                <div className="">
                                                                                                    <div className="taken">{myTeamDto.totalDamageTaken}</div>
                                                                                                    <div className="progress--taken" data-for={myTeamDto.summonerName} data-tip>                                                                                                        
                                                                                                        <ProgressBar  now={bestTotalDamage(myTeamDto.totalDamageTaken,index)} />
                                                                                                    </div>
                                                                                                    <ReactTooltip id={myTeamDto.summonerName}>총 피해량:{myTeamDto.totalDamageTaken}</ReactTooltip>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="ward">
                                                                                            <div data-for={myTeamDto.summonerId} data-tip>
                                                                                                <div>{myTeamDto.visionWardsBoughtInGame}</div>
                                                                                                <div>{myTeamDto.wardsPlaced} / {myTeamDto.wardsKilled}</div>
                                                                                            </div>
                                                                                            <ReactTooltip id={myTeamDto.summonerId}>제어와드: {myTeamDto.visionWardsBoughtInGame}<br></br>와드 설치: {myTeamDto.wardsPlaced}<br></br>와드 제거: {myTeamDto.wardsKilled} </ReactTooltip>
                                                                                        </td>
                                                                                        <td className="cs">
                                                                                            <div>{myTeamDto.neutralMinionsKilled+myTeamDto.totalMinionsKilled}</div>
                                                                                            <div>분당 {((myTeamDto.neutralMinionsKilled+myTeamDto.totalMinionsKilled)/(matchDto[index].info.gameDuration/60)).toFixed(1)}</div>
                                                                                        </td>
                                                                                        <td className="items">
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item0)}
                                                                                                    width="22"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item1)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item2)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item3)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <br/>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item4)}
                                                                                                    width="22" alt="화공 펑크 사슬검"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item5)}
                                                                                                    width="22" alt="판금 장화"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(myTeamDto.item6)}
                                                                                                    width="22" alt="예언자의 렌즈"/></div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    )
                                                                                }
                                                                                    </tbody>

                                                                                </table>
                                                                                <div className="middle-bar">
                                                                                <div className="summary">
                                                                                    <div className="team">
                                                                                        <div className="object">
                                                                                            <div >
                                                                                                {
                                                                                                    myTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1666684602578"
                                                                                                    alt="바론"/><span>{baronDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-baron.svg?v=1666684602578"
                                                                                                    alt="바론"/><span>{baronDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }

                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="object">
                                                                                            <div >
                                                                                            {
                                                                                                    myTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1666684602578"
                                                                                                    alt="드래곤"/><span>{dragonDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-dragon.svg?v=1666684602578"
                                                                                                    alt="드래곤"/><span>{dragonDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }
                                                                   
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="object">
                                                                                            <div >
                                                                                            {
                                                                                                    myTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1666684602578"
                                                                                                    alt="타워"/><span>{towerDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-tower.svg?v=1666684602578"
                                                                                                    alt="타워"/><span>{towerDeath(myTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }                                                                            
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="summary-graph">
                                                                                        <div>
                                                                                            <div className="graph">                                                                                                
                                                                                                <div
                                                                                                    className="title1" >
                                                                                                        <ProgressBar  variant="info" now={((totalKill(myTeamDto[index][0],matchDto[index]))/sumTotalKill(matchDto[index]))*100} label={`${totalKill(myTeamDto[index][0],matchDto[index])}킬`} />
                                                                                                        Total Kill
                                                                                                        <ProgressBar  variant="danger" now={((totalKill(awayTeamDto[index][0],matchDto[index]))/sumTotalKill(matchDto[index]))*100} label={`${totalKill(awayTeamDto[index][0],matchDto[index])}킬`}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <br></br>
                                                                                            <div className="graph">
                                                                                                <div
                                                                                                    className="title1">
                                                                                                        <ProgressBar variant="info" now={((totalGold(myTeamDto[index]))/((totalGold(myTeamDto[index]))+(totalGold(awayTeamDto[index]))))*100} label={`${totalGold(myTeamDto[index])}골드`} />
                                                                                                             Total Gold
                                                                                                        <ProgressBar variant="danger" now={((totalGold(awayTeamDto[index]))/((totalGold(myTeamDto[index]))+(totalGold(awayTeamDto[index]))))*100} label={`${totalGold(awayTeamDto[index])}골드`} />
                                                                                                </div>
                                                                                                <div className="lose"
                                                                                                     ></div>
                                                                                                <div className="win"
                                                                                                     ></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="team">
                                                                                        <div className="object">
                                                                                            <div >
                                                                                                {
                                                                                                    awayTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1666684602578"
                                                                                                    alt="바론"/><span>{baronDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-baron.svg?v=1666684602578"
                                                                                                    alt="바론"/><span>{baronDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }

                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="object">
                                                                                            <div >
                                                                                            {
                                                                                                    awayTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1666684602578"
                                                                                                    alt="드래곤"/><span>{dragonDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-dragon.svg?v=1666684602578"
                                                                                                    alt="드래곤"/><span>{dragonDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }
                                                                   
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="object">
                                                                                            <div >
                                                                                            {
                                                                                                    awayTeamDto[index][0].win != true
                                                                                                    ?
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1666684602578"
                                                                                                    alt="타워"/><span>{towerDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    <img
                                                                                                    src="https://s-lol-web.op.gg/images/icon/icon-tower.svg?v=1666684602578"
                                                                                                    alt="타워"/><span>{towerDeath(awayTeamDto[index][0],matchDto[index])}</span>
                                                                                                    </>
                                                                                                }                                                                            
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                </div>                                                                                
                                                                                <table result="LOSE" className="css-8keylx e15ptgz10">
                                                                                    <colgroup>
                                                                                        <col width="44"/>
                                                                                        <col width="18"/>
                                                                                        <col width="18"/>
                                                                                        <col width="100"/>
                                                                                        <col width="68"/>
                                                                                        <col width="98"/>
                                                                                        <col width="120"/>
                                                                                        <col width="48"/>
                                                                                        <col width="56"/>
                                                                                        <col width="175"/>
                                                                                    </colgroup>
                                                                                    <thead>
                                                                                    <tr className='tr-change'>
                                                                                        <th colSpan="4">
                                                                                        {
                                                                                        awayTeamDto[index][0].win == true
                                                                                        ?<>
                                                                                        <span className="css-win">승리</span>
                                                                                        </>
                                                                                        :<>
                                                                                        <span className="css-lose">패배</span>
                                                                                        </>                                                                                        
                                                                                        }      
                                                                                        ({
                                                                                        awayTeamDto[index][0].teamId == 100
                                                                                        ?"블루팀"
                                                                                        :"레드팀"
                                                                                        })</th>
                                                                                        <th >OP Score</th>
                                                                                        <th >KDA</th>
                                                                                        <th >피해량</th>
                                                                                        <th>와드</th>
                                                                                        <th>CS</th>
                                                                                        <th >아이템</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody className={"css-"+awayTeamDto[index][0].win}>
                                                                                    {
                                                                                    awayTeamDto[index].map((awayTeamDto)=>                                                                                        
                                                                                    
                                                                                    <tr key={awayTeamDto.puuid} result="WIN" className="css-12kdhht e1j3rwa94" >
                                                                                        <td className="champion"><a href="/champions/aatrox" target="_blank" rel="noreferrer">
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/champion/"+awayTeamDto.championName+".png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_64&amp;v=1666684602578"}
                                                                                                width="32" alt="아트록스"/>
                                                                                                <div className="level">{awayTeamDto.champLevel}</div></div>
                                                                                        </a></td>
                                                                                        <td className="spells">
                                                                                            <div className=""><img
                                                                                                src={getSpellImg(awayTeamDto.summoner1Id)}
                                                                                                /></div>
                                                                                            <div className=""><img
                                                                                                src={getSpellImg(awayTeamDto.summoner2Id)}
                                                                                                alt="점멸"/></div>
                                                                                        </td>
                                                                                        <td className="runes">
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/perk/"+awayTeamDto.perks.styles[0].selections[0].perk+".png?image=q_auto,f_webp,w_auto&amp;v=1666684602578"}
                                                                                                alt="정복자"/></div>
                                                                                            <div className=""><img
                                                                                                src={"https://opgg-static.akamaized.net/images/lol/perkStyle/"+awayTeamDto.perks.styles[1].style+".png?image=q_auto,f_webp,w_auto&amp;v=1666684602578"}
                                                                                                alt="결의"/></div>
                                                                                        </td>
                                                                                        <td className="name"><a href={"/summoner/"+awayTeamDto.summonerName} target="_blank" rel="noreferrer">{awayTeamDto.summonerName}</a>
                                                                                            <div className="tier">
                                                                                                <div className="">레벨{" "+awayTeamDto.summonerLevel}</div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="op-score">
                                                                                            <div className="wrapper">
                                                                                                <div className="rank">
                                                                                                    {
                                                                                                            getMyPerformance(awayTeamDto)

                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="kda">
                                                                                            <div className="k-d-a">{awayTeamDto.kills}/{awayTeamDto.deaths}/{awayTeamDto.assists} <div className="">({Math.floor((awayTeamDto.challenges.killParticipation).toFixed(2)*100)}%)</div></div>
                                                                                            <div className="css-ufjp55 e1j3rwa90">{awayTeamDto.challenges.kda.toFixed(2)}:1</div>
                                                                                        </td>
                                                                                        <td className="damage">
                                                                                            <div>
                                                                                            <div className="">
                                                                                                    <div className="dealt">{awayTeamDto.totalDamageDealtToChampions}</div>
                                                                                                    <div className="progress--taken"  data-for={awayTeamDto.puuid} data-tip>                                                                                                        
                                                                                                        <ProgressBar striped variant="danger" now={bestDealth(awayTeamDto.totalDamageDealtToChampions,index)} />
                                                                                                    </div>
                                                                                                    <ReactTooltip id={awayTeamDto.puuid}>챔피언에게 가한 피해량:{awayTeamDto.totalDamageDealtToChampions}</ReactTooltip>
                                                                                                </div>
                                                                                                <div className="">
                                                                                                    <div className="taken">{awayTeamDto.totalDamageTaken}</div>
                                                                                                    <div className="progress--taken" data-for={awayTeamDto.summonerName} data-tip>                                                                                                        
                                                                                                        <ProgressBar  now={bestTotalDamage(awayTeamDto.totalDamageTaken,index)} />
                                                                                                    </div>
                                                                                                    <ReactTooltip id={awayTeamDto.summonerName}>총 피해량:{awayTeamDto.totalDamageTaken}</ReactTooltip>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="ward">
                                                                                        <div data-for={awayTeamDto.summonerId} data-tip>
                                                                                                <div>{awayTeamDto.visionWardsBoughtInGame}</div>
                                                                                                <div>{awayTeamDto.wardsPlaced} / {awayTeamDto.wardsKilled}</div>
                                                                                            </div>
                                                                                            <ReactTooltip id={awayTeamDto.summonerId}>제어와드: {awayTeamDto.visionWardsBoughtInGame}<br></br>와드 설치: {awayTeamDto.wardsPlaced}<br></br>와드 제거: {awayTeamDto.wardsKilled} </ReactTooltip>
                                                                                        </td>
                                                                                        <td className="cs">
                                                                                            <div>{awayTeamDto.neutralMinionsKilled+awayTeamDto.totalMinionsKilled}</div>
                                                                                            <div>분당 {((awayTeamDto.neutralMinionsKilled+awayTeamDto.totalMinionsKilled)/(matchDto[index].info.gameDuration/60)).toFixed(1)}</div>
                                                                                        </td>
                                                                                        <td className="items">
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item0)}
                                                                                                    width="22"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item1)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item2)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item3)}
                                                                                                    width="22" /></div>
                                                                                            </div>
                                                                                            <br/>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item4)}
                                                                                                    width="22" alt="화공 펑크 사슬검"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item5)}
                                                                                                    width="22" alt="판금 장화"/></div>
                                                                                            </div>
                                                                                            <div className="item">
                                                                                                <div className=""><img
                                                                                                    src={findItems(awayTeamDto.item6)}
                                                                                                    width="22" alt="예언자의 렌즈"/></div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    )
                                                                                }
                                                                                    </tbody>

                                                                                </table>


                                                                            </div>


                                                                        </td>
                                                                    </tr> : null
                                                            }
                                                        </>
                                                    </>
                                                )
                                            :null
                                            }
                                                
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
            



            {/*</SummonerBody>*/}
                    </div></div>
        </>

    )
}
export default Summoner;
let SummonerInfo = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 30px;
  margin-top: 20px;
  margin-left: 30px;
`
let SummonerContents= styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  
`

let SummonerNavi = styled.div`
  background-color: white;
  margin: 0px auto;
`

let SearchSummoner = styled.div`

  display: flex;
  width: 1080px;
  margin: 0px auto;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background-color: white;
  //padding : 상, 좌=우, 하 ;
  box-sizing: border-box;
`
let SummonerIcon= styled.div`
  border-radius : 30%;
`
let SummonerHeader= styled.div`
  background-color: white;
`

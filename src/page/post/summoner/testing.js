useEffect(() => {
    console.log("summonerName: " +params);
    const fn = async()=>{
    
    if (
        summonerName == null ||
        summonerName === "" ||
        summonerName === undefined
    ) {
        alert("소환사명을 입력하세요");
        navigate('/');
    } else {
        await axios
            .get(defaultURL+"summoner/v4/summoners/by-name/"+summonerName+"?"+setApikey)//소환사명으로 고유아이디 등 가져옴
            .then(async (response) => {                    
                const datas = response.data;
                if (response.data !== null && response.data !== undefined) {
                    console.log("들어왔나?"+ response);
                    setRespDto(response.data);
                    await axios
                        .get(defaultURL+"league/v4/entries/by-summoner/"+datas.id+"?"+setApikey) //고유id로 소환사 티어(리그)정보 가져옴
                        .then(async (res)=>{
                            console.log(res.data);
                            leagueEntryDto.push(res.data);
                            setLeagueEntryDto(leagueEntryDto =>[...leagueEntryDto]);
                            console.log(leagueEntryDto)
                            console.log(leagueEntryDto[0][0].tier);
                            console.log(leagueEntryDto[0].length);
                            if((leagueEntryDto[0].length > 1) && (leagueEntryDto[0][1].queueType != "RANKED_TFT_DOUBLE_UP")){
                                setLeagueEntryDto2(leagueEntryDto[0][1]);
                                console.log(leagueEntryDto[0][1]);
                            }else if((leagueEntryDto[0].length > 1) && (leagueEntryDto[0][1].queueType == "RANKED_TFT_DOUBLE_UP")){
                                setLeagueEntryDto2(leagueEntryDto[0][2]);
                                console.log(leagueEntryDto[0][2]);
                            }
                            const sex=datas.puuid;
                            if(res.data !=null && res.data !== undefined && sex !==null){
                                await axios
                                .get(asiaURL+"match/v5/matches/by-puuid/"+sex+"/ids?start=0&count=2&"+setApikey)
                                .then(async (response)=>{
                                    console.log(response.data);
                                    matchList.push(response.data);
                                    setMatchList(matchList=>[...matchList]);
                                    console.log("type: "+ matchList[0]);//제일 최근경기
                                    console.log("??????  :" +matchDto.length);
                                    if(matchDto.length ==0){
                                    for(var i=0;i<matchList[0].length;i++){          
                                        await axios
                                            .get(asiaURL+"match/v5/matches/"+matchList[0][i]+"?"+setApikey)                                                
                                            .then((res)=>{                                                  
                                            matchDto.push(res.data);
                                            setMatchDto(matchDto=>[...matchDto]);
                                            console.log("확인:" +res.data.info.participants[0].summonerId);                                                
                                            console.log("dd"+getCreation(res.data.info.gameEndTimestamp));
                                            findMyItems(res.data,datas.id);
                                            console.log("아이템: "+myItemDto[0]);    
                                           // console.log("dddddd"+matchDto.info.gameDuration);
                                           // console.log("dddddd"+matchDto.info.gameDuration);                                                
                                            }).catch((err) => {
                                                console.log(err);
                                            }).finally(()=>{
                                                //setMatchDto(matchDto);
                                                //sleep(2000);
                                                console.log("시발련아 돌공ㅆ냐");
                                            })
                                            //setMatchDto(matchDto => [...matchDto]);
                                            //sleep(2000);
                                            //console.log("시발련아 돌공ㅆ냐");
                                            //console.log("길이 : " + matchDto[0].length);
                                    }
                                }                                       
                                   
                                }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

            // Promise.all(
            //     matchList[0].map((match,index)=>{
            //         axios
            //         .get(asiaURL+"match/v5/matches/"+match+"?"+setApikey)
            //         .then((res)=>{
            //             matchDto.push(res.data);
            //             setMatchDto(matchDto =>[...matchDto]);
            //             console.log("dd"+getCreation(matchDto[0].info.gameEndTimestamp));
            //             findMyItems(matchDto[index],datas.id);
            //             console.log("아이템: "+myItemDto[index]);    
            //             console.log("길이 : " + matchDto.length);
            //             console.log("dddddd"+matchDto[index].info.gameDuration); 

            //         }).catch((err)=>{
            //             console.log("ERRRRRR");
            //         })

            //     })
            // )

    }
    }
}, []);
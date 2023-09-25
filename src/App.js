
import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./page/Main";
import Navigate from "./component/Navigate";
import PostMain from "./page/post/PostMain";
import PostView from "./page/post/PostView";
// import PostWrite from './page/post/PostWrite';
// import PostModify from './page/post/PostModify';
import Ranking from "./page/post/ranking/Ranking";
import Summoner from "./page/post/summoner/Summoner";
import Pro from "./page/post/pro/Pro";
import ProMain from "./page/post/pro/ProMain";
function App() {
  return (
        <BrowserRouter>
            <Navigate/>

            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path='/postView/:no' element={<PostView/>} />
                <Route path='/post' element={<PostMain/>} />
                <Route path='/ranking/*' element={<Ranking/>} />
                <Route path='/summoner/:username' element={<Summoner/>} />
                <Route path='/pro/:username' element={<Pro/>} />
                <Route path='/pro' element={<ProMain/>} />
                <Route path='/board/view/:no' element={<PostView/>} />
                <Route path='/board/list' element={<PostMain/>} />
                {/* <Route path='/board/write' element={<PostWrite/>} />
                <Route path='/board/modify/:no' element={<PostModify/>}/> */}
            </Routes>

        </BrowserRouter>

  );
}

export default App;

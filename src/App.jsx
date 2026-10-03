import {useState} from 'react';
import VideoFeed from './components/VideoFeed';
import CodeEditor from './components/CodeEditor';
import Chatbot from './components/Chatbot';
import LiveChat from './components/LiveChat';
export default function App(){
  const [tab,setTab]=useState('videos');
  const tabs=[['videos','Videos'],['editor','Code Editor'],['ai','AI Assistant']];
  return(<div className="app">
    <nav><b className="logo">▶ LearnTube</b>
      {tabs.map(([k,l])=><button key={k} className={tab===k?'on':''} onClick={()=>setTab(k)}>{l}</button>)}</nav>
    <main>
      {tab==='videos'&&<VideoFeed/>}
      {tab==='editor'&&<CodeEditor/>}
      {tab==='ai'&&<div className="split"><Chatbot/><LiveChat/></div>}
    </main></div>);
}

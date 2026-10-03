import {useEffect,useRef} from 'react';import {useDispatch,useSelector} from 'react-redux';import {addLive} from '../store';
const NAMES=['Asha','Rohan','Mia','Dev','Sam'];
const LINES=['Great explanation!','Can you share the repo?','useEffect finally makes sense','Loving this series','What about Redux Toolkit?'];
const pick=a=>a[Math.floor(Math.random()*a.length)];
export default function LiveChat(){
  const dispatch=useDispatch();const msgs=useSelector(s=>s.live.messages);const end=useRef();
  useEffect(()=>{const t=setInterval(()=>dispatch(addLive({id:Date.now(),name:pick(NAMES),text:pick(LINES)})),1500);return()=>clearInterval(t);},[]);
  useEffect(()=>{end.current?.scrollIntoView();},[msgs]);
  return(<div className="panel"><h3>Live Chat</h3>
    <div className="msgs">{msgs.map(m=><p key={m.id}><b>{m.name}:</b> {m.text}</p>)}<div ref={end}/></div></div>);
}

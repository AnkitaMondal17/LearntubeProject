import {useState,useRef,useEffect} from 'react';import {useDispatch,useSelector} from 'react-redux';import {addChat} from '../store';
export default function Chatbot(){
  const dispatch=useDispatch();const msgs=useSelector(s=>s.chat.messages);
  const [text,setText]=useState('');const [busy,setBusy]=useState(false);const end=useRef();
  useEffect(()=>{end.current?.scrollIntoView();},[msgs]);
  const send=async()=>{
    if(!text.trim()||busy)return;const user={role:'user',content:text};setText('');setBusy(true);dispatch(addChat(user));
    try{const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${import.meta.env.VITE_GROQ_KEY}`},
      body:JSON.stringify({model:'openai/gpt-oss-120b',
        messages:[{role:'system',content:'You are a helpful coding tutor.'},...msgs,user]})});
     const d=await r.json();
if(!r.ok)throw new Error(d.error?.message||'Request failed');
dispatch(addChat({role:'assistant',content:d.choices[0].message.content}));}
catch(e){dispatch(addChat({role:'assistant',content:'Error: '+e.message}));}
    setBusy(false);
  };
  return(<div className="panel"><h3>AI Assistant</h3>
    <div className="msgs">{msgs.map((m,i)=><p key={i} className={m.role}>{m.content}</p>)}{busy&&<p>…</p>}<div ref={end}/></div>
    <div className="row"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything about code"/>
    <button onClick={send}>Send</button></div></div>);
}

import {useState,useEffect,useRef,useCallback} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {cacheSuggestions} from '../store';
const KEY=import.meta.env.VITE_YT_KEY;
export default function VideoFeed(){
  const dispatch=useDispatch();const cache=useSelector(s=>s.search.cache);
  const [input,setInput]=useState('');const [query,setQuery]=useState('web development tutorial');
  const [sugg,setSugg]=useState([]);const [videos,setVideos]=useState([]);
  const [token,setToken]=useState('');const [loading,setLoading]=useState(false);
  const [playing,setPlaying]=useState(null);
  // Debounced (200ms) autocomplete with Redux cache
  useEffect(()=>{
    if(!input.trim()){setSugg([]);return;}
    if(cache[input]){setSugg(cache[input]);return;}
    const t=setTimeout(async()=>{
      try{const r=await fetch('https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='+encodeURIComponent(input));
        const list=(await r.json())[1]||[];dispatch(cacheSuggestions({q:input,list}));setSugg(list);}catch{}
    },200);
    return()=>clearTimeout(t);
  },[input]);
  const load=useCallback(async(reset,pt)=>{
    setLoading(true);
    try{const u=`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${KEY}${pt?`&pageToken=${pt}`:''}`;
      const d=await (await fetch(u)).json();
      setVideos(v=>reset?d.items||[]:[...v,...(d.items||[])]);setToken(d.nextPageToken||'');}
    catch{}setLoading(false);
  },[query]);
  useEffect(()=>{load(true);},[query]);
  // Infinite scroll via Intersection Observer
  const obs=useRef();
  const sentinel=useCallback(n=>{
    obs.current?.disconnect();if(!n)return;
    obs.current=new IntersectionObserver(([e])=>{if(e.isIntersecting&&token&&!loading)load(false,token);});
    obs.current.observe(n);
  },[token,loading,load]);
  const go=q=>{setInput(q);setSugg([]);setQuery(q);};
  return(<div>
    <div className="search"><input value={input} placeholder="Search videos" onChange={e=>setInput(e.target.value)}
      onKeyDown={e=>e.key==='Enter'&&go(input)}/>
      {sugg.length>0&&<ul>{sugg.map(s=><li key={s} onClick={()=>go(s)}>{s}</li>)}</ul>}</div>
    {playing&&<iframe className="player" src={`https://www.youtube.com/embed/${playing}?autoplay=1`} allow="autoplay;fullscreen" allowFullScreen/>}
    <div className="grid">{videos.map(v=>{const id=v.id.videoId||v.id;return(
      <div key={id+v.etag} className="card" onClick={()=>setPlaying(id)}>
        <img src={v.snippet.thumbnails.medium.url} alt=""/><p>{v.snippet.title}</p><small>{v.snippet.channelTitle}</small></div>);})}</div>
    <div ref={sentinel} style={{height:40}}>{loading&&'Loading…'}</div>
  </div>);
}

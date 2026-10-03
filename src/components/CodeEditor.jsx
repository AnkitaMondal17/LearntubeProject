import {useState} from 'react';import Editor from '@monaco-editor/react';
const LANGS={javascript:'console.log("Hello, LearnTube!");',typescript:'const greet=(n:string):string=>`Hello ${n}`;',
python:'print("Hello, LearnTube!")',java:'public class Main{public static void main(String[] a){System.out.println("Hello");}}',
cpp:'#include <iostream>\nint main(){std::cout<<"Hello";}',go:'package main\nimport "fmt"\nfunc main(){fmt.Println("Hello")}',
rust:'fn main(){println!("Hello");}',html:'<h1>Hello, LearnTube!</h1>'};
export default function CodeEditor(){
  const [lang,setLang]=useState('javascript');const [code,setCode]=useState(LANGS.javascript);
  return(<div><select value={lang} onChange={e=>{setLang(e.target.value);setCode(LANGS[e.target.value]);}}>
    {Object.keys(LANGS).map(l=><option key={l}>{l}</option>)}</select>
    <Editor height="70vh" theme="vs-dark" language={lang} value={code} onChange={v=>setCode(v||'')}/></div>);
}

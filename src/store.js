import {configureStore,createSlice} from '@reduxjs/toolkit';
// Caches search suggestions per query -> avoids repeat API calls
const search=createSlice({name:'search',initialState:{cache:{}},reducers:{
  cacheSuggestions:(s,{payload:{q,list}})=>{s.cache[q]=list;}}});
// AI chatbot history (sent back to Groq for context)
const chat=createSlice({name:'chat',initialState:{messages:[]},reducers:{
  addChat:(s,{payload})=>{s.messages.push(payload);}}});
// Simulated live chat, capped at 50 messages
const live=createSlice({name:'live',initialState:{messages:[]},reducers:{
  addLive:(s,{payload})=>{s.messages.push(payload);s.messages=s.messages.slice(-50);}}});
export const {cacheSuggestions}=search.actions;
export const {addChat}=chat.actions;
export const {addLive}=live.actions;
export default configureStore({reducer:{search:search.reducer,chat:chat.reducer,live:live.reducer}});

import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS (extracted from AnyCrave screenshots) ─── */
const T = {
  teal:      "#0BBDBD",
  tealDark:  "#089898",
  tealLight: "#E6F9F9",
  tealBg:    "#0BBDBD",          // full-screen teal backgrounds
  white:     "#FFFFFF",
  offWhite:  "#F5F6F8",
  cardBg:    "rgba(255,255,255,0.18)",
  cardBgSolid: "#FFFFFF",
  navy:      "#1A1A2E",
  navyBtn:   "#1C1C2E",
  textDark:  "#111111",
  textMid:   "#444444",
  textLight: "#888888",
  green:     "#22C55E",
  red:       "#EF4444",
  gold:      "#F59E0B",
  shadow:    "0 4px 24px rgba(0,0,0,0.10)",
  shadowMd:  "0 8px 32px rgba(0,0,0,0.14)",
  shadowLg:  "0 16px 48px rgba(0,0,0,0.18)",
  radius:    "18px",
  radiusSm:  "12px",
  radiusLg:  "24px",
  radiusPill:"50px",
};

/* ─── HEROIC SVG ICONS (outlined, teal) ─── */
const Icon = {
  fork: (c="#fff",s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  mapPin: (c="#fff",s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  heart: (c="#fff",s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  x: (c="#fff",s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  bell: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  search: (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  home: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  map: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  star: (c,s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c||T.gold} stroke={c||T.gold} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  shuffle: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  video: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  award: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  user: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  live: (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||"#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.88 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.18v1.74z"/></svg>,
  directions: (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  shield: (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  camera: (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  smartphone: (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  menu: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  sparkles: (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"/><path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z"/></svg>,
  trophy: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4h10v6a5 5 0 01-10 0V4z"/><path d="M4 4h3v4a3 3 0 01-3-3V4z"/><path d="M17 4h3v1a3 3 0 01-3 3V4z"/></svg>,
  check: (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  play: (c,s=28) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c||T.white} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  chevRight: (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||T.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
};

/* ─── LOGO ─── */
const Logo = ({color=T.teal, size=26}) => (
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:size,height:size,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {Icon.fork("#fff",size*0.55)}
    </div>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:size*0.73,color:color,letterSpacing:"-0.3px"}}>AnyCrave</span>
  </div>
);

/* ─── BOTTOM NAV ─── */
const BottomNav = ({active, onNav}) => {
  const items = [
    ["Home",   Icon.home,    2],
    ["Explore",Icon.search,  4],
    ["Live",   Icon.video,   6],
    ["Orders", Icon.map,     8],
    ["Profile",Icon.user,    9],
  ];
  return (
    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"10px 0 20px",borderTop:"1px solid #F0F0F0",background:T.white}}>
      {items.map(([label, IconFn, s]) => {
        const isActive = active===s;
        return (
          <div key={label} onClick={()=>onNav(s)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",minWidth:50}}>
            {IconFn(isActive?T.teal:T.textLight, 22)}
            <span style={{fontSize:10,fontWeight:isActive?700:500,color:isActive?T.teal:T.textLight,fontFamily:"'DM Sans',sans-serif"}}>{label}</span>
            {isActive && <div style={{width:4,height:4,borderRadius:"50%",background:T.teal}}/>}
          </div>
        );
      })}
    </div>
  );
};

/* ─── STATUS BAR ─── */
const StatusBar = () => null;

const restaurants = [
  {id:1, name:"Manila Lechon House",   cuisine:"Filipino",  rating:4.9, dist:"850m",  bestSeller:"Crispy Lechon",       emoji:"🥩", color:"#FF6B35"},
  {id:2, name:"Sakura Ramen Bar",       cuisine:"Japanese",  rating:4.8, dist:"1.2km", bestSeller:"Black Garlic Tonkotsu",emoji:"🍜", color:"#E91E63"},
  {id:3, name:"Kanto Freestyle Kitchen",cuisine:"Filipino",  rating:4.7, dist:"2.3km", bestSeller:"Tapsilog Supreme",     emoji:"🍳", color:"#9C27B0"},
  {id:4, name:"Verde Garden",           cuisine:"Plant-based",rating:4.6, dist:"0.9km", bestSeller:"Truffle Cauli Steak",  emoji:"🥗", color:"#4CAF50"},
];

/* ══════════════════════════════════════════════
   REAL MAP SCREEN — Leaflet + OpenStreetMap
══════════════════════════════════════════════ */
function MapScreen({ T, Icon, restaurants, setScreen }) {
  const mapRestaurants = [
    { ...restaurants[0], x: 310, y: 120 },
    { ...restaurants[1], x: 520, y: 480 },
    { ...restaurants[2], x: 160, y: 200 },
    { ...restaurants[3], x: 420, y: 310 },
    { id:5, name:"Mang Inasal BGC", cuisine:"Filipino",  rating:4.5, dist:"0.4km", bestSeller:"Chicken Inasal", emoji:"🍗", color:"#F59E0B", x:490, y:440 },
    { id:6, name:"Jollibee Cubao",  cuisine:"Fast Food", rating:4.3, dist:"1.1km", bestSeller:"Chickenjoy",    emoji:"🍟", color:"#EF4444", x:270, y:180 },
  ];

  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dragOrigin = useRef(null);

  const onDown = (e) => {
    setDragging(true);
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    dragOrigin.current = { sx: cx - offset.x, sy: cy - offset.y };
  };
  const onMove = (e) => {
    if (!dragging || !dragOrigin.current) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    setOffset({ x: cx - dragOrigin.current.sx, y: cy - dragOrigin.current.sy });
  };
  const onUp = () => { setDragging(false); dragOrigin.current = null; };

  return (
    <div style={{flex:1, display:"flex", flexDirection:"column", position:"relative", background:"#e8f4f0", overflow:"hidden", minHeight:600}}>

      {/* SVG Map canvas — pannable */}
      <div
        style={{position:"absolute", inset:0, overflow:"hidden", cursor: dragging ? "grabbing" : "grab"}}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
      >
        <svg
          width="800" height="800"
          style={{position:"absolute", left: offset.x - 100, top: offset.y - 50, userSelect:"none"}}
          viewBox="0 0 800 800"
        >
          {/* Background */}
          <rect width="800" height="800" fill="#e8ede0"/>

          {/* Water / bay area */}
          <ellipse cx="680" cy="600" rx="180" ry="220" fill="#b8d4e8" opacity="0.6"/>
          <ellipse cx="720" cy="700" rx="140" ry="160" fill="#a8c8e0" opacity="0.5"/>

          {/* Parks / green areas */}
          <rect x="200" y="250" width="80" height="60" rx="8" fill="#c8e6c9" opacity="0.8"/>
          <rect x="360" y="380" width="60" height="50" rx="6" fill="#c8e6c9" opacity="0.8"/>
          <rect x="100" y="400" width="90" height="70" rx="8" fill="#c8e6c9" opacity="0.7"/>

          {/* City blocks */}
          {[
            [80,80,100,70],[200,80,110,70],[330,80,90,70],[440,80,100,70],
            [80,170,80,60],[180,170,90,60],[290,170,80,60],[390,170,90,60],[500,170,90,60],
            [80,260,80,60],[390,260,80,60],[500,260,90,60],[600,260,80,60],
            [80,350,80,60],[180,350,70,60],[490,350,80,60],[590,350,80,60],
            [80,440,80,60],[480,440,90,60],[590,440,80,60],
            [80,530,80,60],[180,530,90,60],[400,530,80,60],[500,530,90,60],
            [80,620,80,60],[180,620,90,60],[290,620,80,60],
          ].map(([x,y,w,h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#f5f0e8" stroke="#ddd8cc" strokeWidth="0.5" opacity="0.9"/>
          ))}

          {/* Major roads - horizontal */}
          <rect x="0" y="155" width="800" height="10" fill="#fff" opacity="0.9"/>
          <rect x="0" y="245" width="800" height="8" fill="#fff" opacity="0.85"/>
          <rect x="0" y="335" width="800" height="10" fill="#fff" opacity="0.9"/>
          <rect x="0" y="425" width="800" height="8" fill="#fff" opacity="0.85"/>
          <rect x="0" y="515" width="800" height="10" fill="#fff" opacity="0.9"/>
          <rect x="0" y="610" width="800" height="8" fill="#fff" opacity="0.8"/>

          {/* Major roads - vertical */}
          <rect x="155" y="0" width="10" height="800" fill="#fff" opacity="0.9"/>
          <rect x="270" y="0" width="8" height="800" fill="#fff" opacity="0.85"/>
          <rect x="370" y="0" width="10" height="800" fill="#fff" opacity="0.9"/>
          <rect x="475" y="0" width="8" height="800" fill="#fff" opacity="0.85"/>
          <rect x="575" y="0" width="10" height="800" fill="#fff" opacity="0.9"/>

          {/* Road labels */}
          <text x="20" y="152" fontSize="8" fill="#999" fontFamily="sans-serif">EDSA</text>
          <text x="20" y="242" fontSize="8" fill="#999" fontFamily="sans-serif">Commonwealth Ave</text>
          <text x="20" y="332" fontSize="8" fill="#999" fontFamily="sans-serif">Quezon Ave</text>
          <text x="20" y="422" fontSize="8" fill="#999" fontFamily="sans-serif">España Blvd</text>
          <text x="158" y="30" fontSize="8" fill="#999" fontFamily="sans-serif" transform="rotate(90,158,30)">Katipunan</text>
          <text x="373" y="30" fontSize="8" fill="#999" fontFamily="sans-serif" transform="rotate(90,373,30)">Aurora Blvd</text>

          {/* You are here */}
          <circle cx="370" cy="335" r="14" fill="#4285F4" opacity="0.25"/>
          <circle cx="370" cy="335" r="8" fill="#4285F4"/>
          <circle cx="370" cy="335" r="4" fill="#fff"/>

          {/* Restaurant pins */}
          {mapRestaurants.map(res => {
            const isSel = selected && selected.id === res.id;
            return (
              <g key={res.id} onClick={() => setSelected(isSel ? null : res)} style={{cursor:"pointer"}}>
                <circle cx={res.x} cy={res.y} r={isSel ? 22 : 16} fill={res.color} opacity={0.25}/>
                <circle cx={res.x} cy={res.y} r={isSel ? 14 : 10} fill={res.color}/>
                <circle cx={res.x} cy={res.y} r={isSel ? 7 : 5} fill="white"/>
                <text x={res.x} y={res.y + (isSel ? 35 : 26)} textAnchor="middle" fontSize={isSel ? 10 : 8} fontWeight="700" fill="#222" fontFamily="sans-serif">{res.name.split(" ").slice(0,2).join(" ")}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating header */}
      <div style={{position:"absolute", top:0, left:0, right:0, zIndex:100, padding:"14px 16px 0", pointerEvents:"none"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, pointerEvents:"all"}}>
          <div style={{display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.97)", borderRadius:T.radiusPill, padding:"8px 16px", boxShadow:T.shadowMd}}>
            {Icon.fork(T.teal, 18)}
            <span style={{fontSize:15, fontWeight:800, color:T.teal}}>AnyCrave</span>
          </div>
          <div style={{width:40, height:40, borderRadius:12, background:"rgba(255,255,255,.97)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:T.shadow, cursor:"pointer", pointerEvents:"all"}}>
            {Icon.menu(T.textDark, 18)}
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.97)", borderRadius:T.radiusPill, padding:"12px 18px", display:"flex", alignItems:"center", gap:10, boxShadow:T.shadowMd, pointerEvents:"all"}}>
          {Icon.search(T.textLight, 17)}
          <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search restaurants, cuisines..." style={{flex:1, border:"none", outline:"none", fontSize:14, color:T.textDark, background:"transparent", fontFamily:"'DM Sans',sans-serif"}}/>
          {searchText && <div onClick={() => setSearchText("")} style={{cursor:"pointer", color:T.textLight, fontSize:18}}>×</div>}
          <div style={{background:T.teal, borderRadius:T.radiusPill, padding:"5px 14px", fontSize:12, color:"#fff", fontWeight:700, cursor:"pointer", flexShrink:0}}>Filter</div>
        </div>
      </div>

      {/* Selected restaurant sheet */}
      {selected && (
        <div style={{position:"absolute", bottom:0, left:0, right:0, zIndex:200, background:T.white, borderRadius:"24px 24px 0 0", padding:"16px 20px 32px", boxShadow:"0 -8px 40px rgba(0,0,0,.18)"}}>
          <div style={{width:40, height:4, background:"#E0E0E0", borderRadius:2, margin:"0 auto 16px"}}/>
          <div style={{display:"flex", gap:14, alignItems:"center", marginBottom:14}}>
            <div style={{width:56, height:56, borderRadius:16, background:"linear-gradient(135deg," + selected.color + "," + selected.color + "88)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0}}>{selected.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:900, fontSize:17, color:T.textDark}}>{selected.name}</div>
              <div style={{fontSize:12, color:T.textLight, marginTop:2}}>{selected.cuisine} · {selected.dist} away</div>
              <div style={{display:"flex", alignItems:"center", gap:4, marginTop:3}}>
                {Icon.star(T.gold, 13)}
                <span style={{fontSize:12, fontWeight:700, color:T.textDark}}>{selected.rating}</span>
                <span style={{fontSize:11, color:T.textLight, marginLeft:4}}>🏆 {selected.bestSeller}</span>
              </div>
            </div>
            <div onClick={() => setSelected(null)} style={{width:32, height:32, borderRadius:10, background:T.offWhite, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:T.textLight}}>✕</div>
          </div>
          <div style={{display:"flex", gap:10}}>
            <button onClick={() => setScreen(3)} style={{flex:1, padding:"13px", background:T.teal, border:"none", borderRadius:T.radiusPill, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer"}}>View Details</button>
            <button style={{width:48, height:48, borderRadius:"50%", background:T.offWhite, border:"none", cursor:"pointer", fontSize:22}}>📍</button>
          </div>
        </div>
      )}

      {/* Bottom tray */}
      {!selected && (
        <div style={{position:"absolute", bottom:0, left:0, right:0, zIndex:200, background:"rgba(255,255,255,.97)", borderRadius:"20px 20px 0 0", padding:"12px 0 20px", boxShadow:"0 -4px 24px rgba(0,0,0,.12)"}}>
          <div style={{width:36, height:4, background:"#E0E0E0", borderRadius:2, margin:"0 auto 12px"}}/>
          <div style={{padding:"0 16px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
            <span style={{fontWeight:800, fontSize:15, color:T.textDark}}>6 restaurants near you</span>
            <span style={{fontSize:12, color:T.teal, fontWeight:700, cursor:"pointer"}}>Sort ↕</span>
          </div>
          <div style={{display:"flex", gap:12, padding:"0 16px", overflowX:"auto", paddingBottom:4}}>
            {mapRestaurants.map((res, i) => (
              <div key={i} onClick={() => setSelected(res)} style={{minWidth:130, background:T.offWhite, borderRadius:16, padding:10, cursor:"pointer", flexShrink:0}}>
                <div style={{width:"100%", height:68, borderRadius:12, background:"linear-gradient(135deg," + res.color + "cc," + res.color + "66)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, marginBottom:8}}>{res.emoji}</div>
                <div style={{fontWeight:800, fontSize:12, color:T.textDark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{res.name}</div>
                <div style={{fontSize:11, color:T.textLight, marginTop:2}}>⭐ {res.rating} · {res.dist}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   SWIPE CARD — drag/touch gesture component
══════════════════════════════════════════════ */
function SwipeScreen({ r, rNext, T, Icon, swipe, setScreen, screen }) {
  const cardRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, startY: 0 });
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flinging, setFlinging] = useState(null);
  const [entering, setEntering] = useState(false); // next card entrance animation

  const THRESHOLD = 90;
  const getOverlayOpacity = () => Math.min(Math.abs(dragX) / THRESHOLD, 1);
  const getRotation = () => dragX * 0.08;

  const onPointerDown = (e) => {
    if (flinging) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY };
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    setDragX(e.clientX - dragState.current.startX);
    setDragY((e.clientY - dragState.current.startY) * 0.3);
  };

  const onPointerUp = (e) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setIsDragging(false);
    const dx = e.clientX - dragState.current.startX;

    if (Math.abs(dx) < 8) {
      setDragX(0); setDragY(0);
      setScreen(3);
      return;
    }

    if (dx > THRESHOLD) {
      setFlinging("right");
      setDragX(700); setDragY(0);
      setTimeout(() => {
        setEntering(true);
        swipe("right");
        setDragX(0); setDragY(0); setFlinging(null);
        setTimeout(() => setEntering(false), 420);
      }, 360);
    } else if (dx < -THRESHOLD) {
      setFlinging("left");
      setDragX(-700); setDragY(0);
      setTimeout(() => {
        setEntering(true);
        swipe("left");
        setDragX(0); setDragY(0); setFlinging(null);
        setTimeout(() => setEntering(false), 420);
      }, 360);
    } else {
      setDragX(0); setDragY(0);
    }
  };

  const cardTransform = flinging
    ? `translateX(${dragX}px) rotate(${dragX > 0 ? 28 : -28}deg) scale(0.9)`
    : isDragging
    ? `translateX(${dragX}px) translateY(${dragY}px) rotate(${getRotation()}deg)`
    : `translateX(0px) rotate(0deg)`;

  const cardTransition = (isDragging && !flinging) ? "none" : "transform 0.36s cubic-bezier(.25,.46,.45,.94)";
  const likeOpacity = dragX > 20 ? getOverlayOpacity() : 0;
  const nopeOpacity = dragX < -20 ? getOverlayOpacity() : 0;

  // Next-card entrance: scales from 0.82→1 and translates up slightly
  const nextScale = entering ? 1 : (isDragging ? 0.82 + (Math.min(Math.abs(dragX)/THRESHOLD,1) * 0.14) : 0.88);
  const nextTranslateY = entering ? 0 : (isDragging ? 10 - (Math.min(Math.abs(dragX)/THRESHOLD,1)*10) : 14);

  return (
    <div style={{flex:1,background:T.tealBg,display:"flex",flexDirection:"column"}}>
      <StatusBar light />

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px 6px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {Icon.fork("#fff",22)}
          <div>
            <div style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,.7)"}}>2026</div>
            <div style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1}}>AnyCrave</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{background:"rgba(255,255,255,.18)",backdropFilter:"blur(10px)",borderRadius:T.radiusPill,padding:"6px 14px",display:"flex",alignItems:"center",gap:6}}>
            {Icon.mapPin("#fff",14)}
            <span style={{fontSize:12,fontWeight:700,color:"#fff"}}>Quezon City</span>
          </div>
          <div style={{width:44,height:26,borderRadius:13,background:"rgba(255,255,255,.25)",position:"relative"}}>
            <div style={{position:"absolute",right:3,top:3,width:20,height:20,borderRadius:"50%",background:"#fff"}}/>
          </div>
        </div>
      </div>

      {/* Card stack */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 20px 0",position:"relative"}}>

        {/* ── CARD BEHIND (next restaurant) — animates to center on swipe ── */}
        <div style={{
          position:"absolute", top:16, left:"50%",
          transform: entering
            ? `translateX(-50%) translateY(0px) scale(1)`
            : `translateX(-50%) translateY(${nextTranslateY}px) scale(${nextScale})`,
          transition: entering
            ? "transform 0.42s cubic-bezier(.34,1.56,.64,1)"
            : isDragging ? "none" : "transform 0.3s ease",
          width:"100%", maxWidth:400,
          borderRadius:T.radiusLg,
          background:"rgba(255,255,255,0.16)",
          backdropFilter:"blur(12px)",
          border:"1px solid rgba(255,255,255,0.22)",
          overflow:"hidden",
          zIndex:1,
          pointerEvents:"none",
        }}>
          <div style={{height:220,background:`linear-gradient(135deg,${rNext.color}cc,${rNext.color}77)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:100}}>
            <span style={{filter:"drop-shadow(0 4px 16px rgba(0,0,0,.3))",opacity:0.85}}>{rNext.emoji}</span>
          </div>
          <div style={{padding:"18px 20px 22px"}}>
            <div style={{fontSize:26,fontWeight:900,color:"rgba(255,255,255,.9)",letterSpacing:"-0.5px",lineHeight:1.1,marginBottom:4}}>{rNext.name}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>{rNext.cuisine}</div>
          </div>
        </div>

        {/* ── ACTIVE CARD (current restaurant) ── */}
        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            width:"100%", maxWidth:400,
            borderRadius:T.radiusLg,
            background:"rgba(255,255,255,0.20)",
            backdropFilter:"blur(16px)",
            border:"1px solid rgba(255,255,255,0.32)",
            zIndex:2, position:"relative",
            cursor: isDragging ? "grabbing" : "grab",
            overflow:"hidden",
            boxShadow:"0 24px 64px rgba(0,0,0,.26)",
            transform: cardTransform,
            transition: cardTransition,
            userSelect:"none", touchAction:"none",
          }}
        >
          {/* LIKE overlay */}
          <div style={{position:"absolute",inset:0,background:"rgba(34,197,94,.18)",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",opacity:likeOpacity,pointerEvents:"none"}}>
            <span style={{fontSize:52,fontWeight:900,color:T.green,border:`4px solid ${T.green}`,borderRadius:14,padding:"6px 20px",transform:"rotate(-15deg)"}}>LIKE</span>
          </div>
          {/* NOPE overlay */}
          <div style={{position:"absolute",inset:0,background:"rgba(239,68,68,.18)",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",opacity:nopeOpacity,pointerEvents:"none"}}>
            <span style={{fontSize:52,fontWeight:900,color:T.red,border:`4px solid ${T.red}`,borderRadius:14,padding:"6px 20px",transform:"rotate(15deg)"}}>NOPE</span>
          </div>

          {/* Restaurant hero */}
          <div style={{height:220,background:`linear-gradient(135deg,${r.color}cc,${r.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:100,position:"relative"}}>
            <span style={{filter:"drop-shadow(0 4px 16px rgba(0,0,0,.35))"}}>{r.emoji}</span>
            <div style={{position:"absolute",top:14,left:14,background:"rgba(255,255,255,.2)",backdropFilter:"blur(8px)",borderRadius:10,padding:"5px 12px",display:"flex",alignItems:"center",gap:4}}>
              {Icon.star(T.gold,14)}<span style={{fontSize:13,fontWeight:800,color:"#fff"}}>{r.rating}</span>
            </div>
            <div style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.2)",backdropFilter:"blur(8px)",borderRadius:10,padding:"5px 12px",display:"flex",alignItems:"center",gap:4}}>
              {Icon.mapPin("#fff",13)}<span style={{fontSize:13,fontWeight:800,color:"#fff"}}>{r.dist}</span>
            </div>
          </div>

          <div style={{padding:"18px 20px 22px"}}>
            <div style={{fontSize:26,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1.1,marginBottom:4}}>{r.name}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.75)",marginBottom:14}}>{r.cuisine}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
                <path d="M4 14 L40 14 M32 6 L40 14 L32 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 8px rgba(255,255,255,.9))"}}/>
              </svg>
              <span style={{fontSize:13,color:"rgba(255,255,255,.8)",fontWeight:600}}>Swipe or tap for details</span>
            </div>
            <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:700,color:"#fff"}}>
              🏆 Best Seller: {r.bestSeller}
            </div>
          </div>
        </div>

        {/* Swipe hint */}
        <div style={{display:"flex",justifyContent:"space-between",width:"100%",maxWidth:400,marginTop:12,padding:"0 8px",opacity:isDragging?0:0.65,transition:"opacity .2s"}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:18,color:T.red}}>←</span>
            <span style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600}}>NOPE</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600}}>LIKE</span>
            <span style={{fontSize:18,color:T.green}}>→</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{display:"flex",gap:28,marginTop:16,alignItems:"center"}}>
          <button onClick={()=>{ setEntering(true); swipe("left"); setTimeout(()=>setEntering(false),420); }}
            style={{width:68,height:68,borderRadius:"50%",background:"rgba(239,68,68,.15)",border:"2px solid #EF4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(239,68,68,.5), 0 0 32px rgba(239,68,68,.25)",animation:"neonPulse 2.5s infinite",transition:"transform .15s"}}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.88)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}>
            {Icon.x("#EF4444",26)}
          </button>
          <button onClick={()=>setScreen(5)}
            style={{width:50,height:50,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.4)",backdropFilter:"blur(8px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {Icon.shuffle("#fff",20)}
          </button>
          <button onClick={()=>{ setEntering(true); swipe("right"); setTimeout(()=>setEntering(false),420); }}
            style={{width:68,height:68,borderRadius:"50%",background:"rgba(34,197,94,.15)",border:"2px solid #22C55E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(34,197,94,.5), 0 0 32px rgba(34,197,94,.25)",animation:"neonPulse 2.5s infinite",transition:"transform .15s"}}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.88)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}>
            {Icon.heart("#22C55E",26)}
          </button>
        </div>

        {/* Motion Swipe pill */}
        <div style={{marginTop:14,background:"rgba(255,255,255,.18)",backdropFilter:"blur(10px)",borderRadius:T.radiusPill,padding:"10px 20px",display:"flex",alignItems:"center",gap:10,border:"1px solid rgba(255,255,255,.25)"}}>
          {Icon.smartphone("#fff",16)}
          <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>Motion Swipe ON</span>
          {Icon.directions("#fff",14)}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"14px 0 28px",marginTop:12}}>
        {[[Icon.home,"Home",2],[Icon.search,"Explore",4],[Icon.video,"Live",6],[Icon.map,"Orders",8],[Icon.user,"Profile",9]].map(([Ic,label,s])=>(
          <div key={label} onClick={()=>setScreen(s)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}>
            {Ic(screen===s?"#fff":"rgba(255,255,255,.5)", 22)}
            <span style={{fontSize:10,fontWeight:screen===s?700:500,color:screen===s?"#fff":"rgba(255,255,255,.5)",fontFamily:"'DM Sans',sans-serif"}}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen]   = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [shuffling, setShuffling] = useState(false);
  const [shuffleFrame, setShuffleFrame] = useState(0);
  const [shuffleDone, setShuffleDone] = useState(false);
  const [timer, setTimer] = useState(47);
  const [liked, setLiked] = useState({});
  const [points, setPoints] = useState(1240);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef(null);

  const SCREENS = ["🍽 Splash","🔒 Privacy","🔥 Swipe","📋 Detail","📱 Feed","🎲 Shuffle","🔴 Live","👥 Group","🗺 Map","⭐ Rewards"];

  useEffect(()=>{
    if(screen===7){ setTimer(47); setTimerActive(true); }
    else setTimerActive(false);
  },[screen]);

  useEffect(()=>{
    if(!timerActive) return;
    intervalRef.current = setInterval(()=>setTimer(t=>t>0?t-1:0),1000);
    return ()=>clearInterval(intervalRef.current);
  },[timerActive]);

  const swipe = (dir) => {
    setSwipeDir(dir);
    if(dir==="right") setPoints(p=>p+5);
    setTimeout(()=>{ setSwipeDir(null); setCardIdx(c=>(c+1)%restaurants.length); },420);
  };

  const startShuffle = () => {
    setShuffling(true); setShuffleDone(false);
    let f=0;
    const iv = setInterval(()=>{ f=(f+1)%restaurants.length; setShuffleFrame(f); },280);
    setTimeout(()=>{ clearInterval(iv); setShuffleFrame(2); setShuffling(false); setShuffleDone(true); },5000);
  };

  const r = restaurants[cardIdx % restaurants.length];

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:T.white,fontFamily:"'DM Sans',sans-serif"}}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}
      @keyframes floatUp{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-80px);opacity:0}}
      @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes neonPulse{0%,100%{box-shadow:0 0 8px currentColor,0 0 16px currentColor}50%{box-shadow:0 0 16px currentColor,0 0 32px currentColor}}
      .pulse{animation:pulse 2s infinite}
      .slideUp{animation:slideUp .4s cubic-bezier(.2,.8,.2,1) both}
      `}</style>

      {/* Screen Tabs */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"12px 16px",justifyContent:"center",background:"#fff",borderBottom:`2px solid ${T.tealLight}`,position:"sticky",top:0,zIndex:200}}>
        {SCREENS.map((s,i)=>(
          <button key={i} onClick={()=>setScreen(i)} style={{
            padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",
            background:screen===i?T.teal:"#f0f0f0",color:screen===i?"#fff":T.textMid,
            boxShadow:screen===i?`0 4px 14px ${T.teal}55`:"none",
            transition:"all .2s"
          }}>{s}</button>
        ))}
      </div>

      {/* ── SCREEN (no phone frame, full width) ── */}
      <div style={{
        flex:1,width:"100%",background:T.white,position:"relative",
        display:"flex",flexDirection:"column",minHeight:"calc(100vh - 60px)"
      }}>

        {/* ══ SCREEN 0 — SPLASH / ONBOARDING ══ */}
        {screen===0 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",padding:"0 28px 40px"}}>
            <StatusBar />
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:48}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:T.teal,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icon.fork("#fff",18)}
              </div>
              <span style={{fontSize:18,fontWeight:800,color:T.teal,letterSpacing:"-0.3px"}}>AnyCrave</span>
            </div>

            <h1 style={{fontSize:36,fontWeight:900,color:T.textDark,lineHeight:1.1,letterSpacing:"-1px",marginBottom:36,fontFamily:"'Playfair Display',serif"}}>
              Swipe, Live,<br/>Group &<br/>Discover Anything
            </h1>

            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
              {[
                [Icon.fork, "Swipe", "Tinder-style restaurant discovery"],
                [Icon.video,"Live",  "Watch restaurants cook in real-time"],
                [Icon.shuffle,"Shuffle","Mystery restaurant roulette"],
                [Icon.map,  "Map",   "Airbnb-style restaurant map search"],
                [Icon.sparkles,"Points","Earn & redeem food vouchers"],
              ].map(([Ic,label,desc])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:14,background:T.offWhite,borderRadius:T.radiusSm,padding:"12px 16px"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:T.tealLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {Ic(T.teal,18)}
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:T.textDark}}>{label}</div>
                    <div style={{fontSize:12,color:T.textLight}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy tooltip */}
            <div style={{background:T.white,borderRadius:14,padding:"12px 16px",boxShadow:T.shadowMd,marginBottom:20,border:`1px solid #eee`,position:"relative",alignSelf:"flex-end",maxWidth:220}}>
              <div style={{fontWeight:800,fontSize:13,color:T.textDark}}>Your privacy is<br/>our priority.</div>
              <div style={{fontSize:11,color:T.textMid,marginTop:2}}>We never share your data.</div>
              <div style={{position:"absolute",bottom:-8,right:28,width:16,height:16,background:T.white,transform:"rotate(45deg)",border:"1px solid #eee",borderTop:"none",borderLeft:"none"}}/>
            </div>

            <button onClick={()=>setScreen(1)} style={{width:"100%",padding:"17px",background:T.teal,color:"#fff",border:"none",borderRadius:T.radiusPill,fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:`0 8px 24px ${T.teal}55`,letterSpacing:"0.3px"}}>
              Get Started
            </button>
            <div style={{textAlign:"center",fontSize:11,color:T.textLight,marginTop:12}}>
              By tapping Get Started, you agree to our{" "}
              <span style={{color:T.teal,fontWeight:700}}>Terms of Service</span>{" "}and{" "}
              <span style={{color:T.teal,fontWeight:700}}>Privacy Policy</span>.
            </div>
          </div>
        )}

        {/* ══ SCREEN 1 — PRIVACY / LOCATION CONSENT ══ */}
        {screen===1 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",}}>
            <StatusBar />
            {/* blurred backdrop */}
            <div style={{flex:1,background:"rgba(0,0,0,0.06)",display:"flex",alignItems:"flex-end"}}>
              <div style={{background:T.white,borderRadius:"28px 28px 0 0",width:"100%",padding:"8px 24px 40px",boxShadow:"0 -8px 40px rgba(0,0,0,0.12)"}}>
                <div style={{width:40,height:4,background:"#E0E0E0",borderRadius:2,margin:"12px auto 20px"}}/>

                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                  <div style={{width:52,height:52,borderRadius:16,background:T.teal,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {Icon.shield("#fff",24)}
                  </div>
                  <div>
                    <div style={{fontWeight:900,fontSize:18,color:T.textDark,fontFamily:"'Playfair Display',serif"}}>Privacy & Location</div>
                    <div style={{fontSize:11,color:T.textLight,marginTop:2}}>Data Privacy Act of 2012 (RA 10173)</div>
                  </div>
                </div>

                {[
                  [Icon.mapPin,    "Location Access",    "Find restaurants near you"],
                  [Icon.camera,    "Camera & Gallery",   "Upload food reviews & reels"],
                  [Icon.bell,      "Notifications",      "Live events & group orders"],
                  [Icon.smartphone,"Usage Analytics",    "Personalize your feed"],
                ].map(([Ic,title,sub])=>(
                  <div key={title} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #F5F5F5"}}>
                    <div style={{width:38,height:38,borderRadius:12,background:T.tealLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {Ic(T.teal,18)}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:T.textDark}}>{title}</div>
                      <div style={{fontSize:11,color:T.textLight}}>{sub}</div>
                    </div>
                    <div style={{width:44,height:26,borderRadius:13,background:T.teal,position:"relative",flexShrink:0}}>
                      <div style={{position:"absolute",right:3,top:3,width:20,height:20,borderRadius:"50%",background:"#fff"}}/>
                    </div>
                  </div>
                ))}

                <div style={{fontSize:10,color:T.textLight,lineHeight:1.6,margin:"16px 0"}}>
                  RA 10173 Philippines Consent: the Data Privacy Act. The system carol ture the formal of Insulin ger sumet and and plism tlie for a 110 nte the Vornl Indinge System, alty envowdgetes fault tharse and things on 30 pae to fic an politics.
                </div>

                {/* Allow location toggle row */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.offWhite,borderRadius:14,padding:"14px 16px",marginBottom:16}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:T.textDark}}>Allow precise location</div>
                    <div style={{fontSize:11,color:T.teal,marginTop:2}}>Required for nearby restaurants</div>
                  </div>
                  <div style={{width:48,height:28,borderRadius:14,background:T.teal,position:"relative",cursor:"pointer"}}>
                    <div style={{position:"absolute",right:3,top:3,width:22,height:22,borderRadius:"50%",background:"#fff",boxShadow:"0 2px 6px rgba(0,0,0,.2)"}}/>
                  </div>
                </div>

                <button onClick={()=>setScreen(2)} style={{width:"100%",padding:"16px",background:T.teal,color:"#fff",border:"none",borderRadius:T.radiusPill,fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:`0 8px 24px ${T.teal}44`}}>
                  Allow & Continue
                </button>
                <button style={{width:"100%",padding:12,background:"transparent",color:T.textLight,border:"none",fontSize:13,cursor:"pointer",marginTop:6,fontFamily:"'DM Sans',sans-serif"}}>
                  Manage Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ SCREEN 2 — SWIPE MAIN ══ */}
        {screen===2 && (
          <SwipeScreen
            r={r} rNext={restaurants[(cardIdx+1)%restaurants.length]} T={T} Icon={Icon}
            swipe={swipe}
            setScreen={setScreen} screen={screen}
          />
        )}

        {/* ══ SCREEN 3 — RESTAURANT DETAIL (Hold) ══ */}
        {screen===3 && (
          <div style={{flex:1,background:T.teal,display:"flex",flexDirection:"column",overflowY:"auto"}}>
            <StatusBar light />
            {/* Header */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px 16px"}}>
              <div style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>setScreen(2)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.7)"}}>Hold to view details</div>
              </div>
              <div style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </div>
            </div>

            {/* Restaurant card */}
            <div style={{margin:"0 16px 16px",background:"rgba(255,255,255,.18)",backdropFilter:"blur(16px)",borderRadius:T.radiusLg,border:"1px solid rgba(255,255,255,.25)",overflow:"hidden"}}>
              <div style={{display:"flex",gap:14,padding:16}}>
                <div style={{width:100,height:80,borderRadius:14,background:`linear-gradient(135deg,${r.color},${r.color}aa)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,flexShrink:0}}>
                  {r.emoji}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:18,color:"#fff",letterSpacing:"-0.3px"}}>{r.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginBottom:8}}>{r.cuisine} · Quezon City</div>
                  <div style={{display:"flex",gap:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>{Icon.star(T.gold,14)}<span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.rating}</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>{Icon.star(T.gold,14)}<span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.dist}</span></div>
                  </div>
                </div>
                <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {Icon.chevRight("#fff",14)}
                </div>
              </div>
              {/* Phone numbers */}
              <div style={{padding:"0 16px 16px",display:"flex",flexDirection:"column",gap:6}}>
                {["📞  19190","📞  11062332"].map((num,i)=>(
                  <div key={i} style={{fontSize:13,color:"rgba(255,255,255,.85)",fontWeight:600}}>{num}</div>
                ))}
                <button style={{marginTop:6,display:"flex",alignItems:"center",gap:8,background:T.tealDark,border:"none",borderRadius:T.radiusPill,padding:"10px 18px",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",alignSelf:"flex-start"}}>
                  <span>🗺</span> Directions
                </button>
              </div>
            </div>

            {/* Menu section */}
            <div style={{padding:"0 16px"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>Menu</div>
              <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:12}}>
                {/* Menu card */}
                <div style={{minWidth:130,background:"rgba(255,255,255,.18)",backdropFilter:"blur(12px)",borderRadius:T.radius,padding:14,border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:10}}>Menu</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.9)",fontWeight:700,marginBottom:6}}>🔥 Best Sellers</div>
                  <button style={{background:T.tealDark,border:"none",borderRadius:T.radiusPill,padding:"6px 14px",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>🔥 New</button>
                </div>
                {/* Tagged Posts */}
                <div style={{minWidth:140,background:"rgba(255,255,255,.18)",backdropFilter:"blur(12px)",borderRadius:T.radius,padding:14,border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:10}}>Tagged Posts<br/>& Videos</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                    {["🍜😋","🔥💯","😍🍱","👨‍🍳✨"].map((e,i)=>(
                      <div key={i} style={{width:48,height:40,borderRadius:8,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{e}</div>
                    ))}
                  </div>
                </div>
                {/* Reviews */}
                <div style={{minWidth:140,background:"rgba(255,255,255,.18)",backdropFilter:"blur(12px)",borderRadius:T.radius,padding:14,border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:8}}>Reviews</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.8)",lineHeight:1.5,marginBottom:6}}>Sample fr... same fro... and fire th... down from</div>
                  <div style={{display:"flex",gap:2}}>{[1,2,3].map(i=><span key={i}>⭐</span>)}</div>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div style={{margin:"12px 16px 24px",borderRadius:T.radius,background:"rgba(255,255,255,.15)",height:100,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"1px solid rgba(255,255,255,.2)"}} onClick={()=>setScreen(8)}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:28}}>🗺</div>
                <div style={{fontSize:12,fontWeight:700,color:"#fff",marginTop:4}}>Open Map & Get Directions</div>
              </div>
            </div>
          </div>
        )}

        {/* ══ SCREEN 4 — SOCIAL FEED ══ */}
        {screen===4 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",}}>
            <StatusBar />
            {/* Header */}
            <div style={{padding:"10px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Logo />
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:36,height:36,borderRadius:12,background:T.offWhite,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {Icon.search(T.textMid,18)}
                </div>
                <div style={{position:"relative",width:36,height:36,borderRadius:12,background:T.offWhite,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {Icon.bell(T.textMid,18)}
                  <div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:T.red}}/>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div style={{margin:"12px 16px",background:T.offWhite,borderRadius:T.radiusPill,padding:"11px 16px",display:"flex",gap:8,alignItems:"center"}}>
              {Icon.search(T.textLight,16)}
              <span style={{fontSize:13,color:T.textLight}}>Search restaurants, cuisines, and dishes</span>
            </div>

            {/* Stories row */}
            <div style={{display:"flex",gap:10,padding:"0 16px 14px",overflowX:"auto"}}>
              {restaurants.map((res,i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${res.color},${res.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:i<2?`2.5px solid ${T.teal}`:`2.5px solid #E0E0E0`}}>{res.emoji}</div>
                  <span style={{fontSize:10,color:T.textMid,fontWeight:600,maxWidth:56,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{res.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>

            {/* Feed posts */}
            <div style={{flex:1,overflowY:"auto"}}>
              {/* Ad Card */}
              <div style={{background:T.white,borderBottom:"8px solid #F5F6F8"}}>
                <div style={{padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:T.textDark}}>Mang Inasal</div>
                    <div style={{fontSize:11,color:T.textLight}}>Sponsored · Mang Inasal</div>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {Icon.heart(T.textLight,18)}
                    </div>
                  </div>
                </div>
                {/* Ad image */}
                <div style={{margin:"0 16px",borderRadius:T.radius,background:"linear-gradient(135deg,#8B1A1A,#C0392B)",padding:20,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",bottom:0,right:10,fontSize:80,opacity:0.4}}>🍗</div>
                  <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"3px 10px",display:"inline-block",marginBottom:10}}>
                    <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>Heroic Ad</span>
                  </div>
                  <div style={{fontSize:26,fontWeight:900,color:"#fff",marginBottom:16,lineHeight:1.1}}>Buy 1 Take 1<br/>Crispy Chicken</div>
                  <button style={{background:T.white,border:"none",borderRadius:T.radiusPill,padding:"10px 24px",color:T.textDark,fontWeight:700,fontSize:13,cursor:"pointer"}}>Learn more</button>
                </div>
                <div style={{padding:"10px 16px 12px",display:"flex",justifyContent:"center"}}>
                  <span style={{fontSize:12,color:T.textLight}}>Swipe to skip ad</span>
                </div>
              </div>

              {/* Regular posts */}
              {[
                {user:"@foodie_jake",tag:"Manila Lechon House",emoji:"🥩",caption:"The crispy lechon skin is UNREAL 🤤 Best I've had in QC!",likes:342,comments:28,time:"2h",pts:50},
                {user:"@maria_eats",tag:"Sakura Ramen Bar",emoji:"🍜",caption:"Black garlic tonkotsu hits different at midnight 🌙",likes:891,comments:67,time:"4h",pts:100},
              ].map((post,i)=>(
                <div key={i} style={{background:T.white,borderBottom:"8px solid #F5F6F8"}}>
                  <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:`hsl(${i*120+40},55%,85%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👤</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:13,color:T.textDark}}>{post.user}</div>
                      <div style={{fontSize:11,color:T.teal,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>{Icon.mapPin(T.teal,11)} {post.tag}</div>
                    </div>
                    <span style={{fontSize:11,color:T.textLight}}>{post.time}</span>
                  </div>
                  <div style={{height:220,background:`hsl(${i*60+20},55%,90%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:90}}>{post.emoji}</div>
                  <div style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",gap:16,alignItems:"center"}}>
                        <button onClick={()=>setLiked(l=>({...l,[i]:!l[i]}))} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                          {Icon.heart(liked[i]?T.red:T.textLight,20)}
                          <span style={{fontSize:13,fontWeight:700,color:T.textDark}}>{post.likes+(liked[i]?1:0)}</span>
                        </button>
                        <div style={{display:"flex",alignItems:"center",gap:4}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                          <span style={{fontSize:13,fontWeight:700,color:T.textDark}}>{post.comments}</span>
                        </div>
                      </div>
                      <div style={{background:`linear-gradient(135deg,${T.teal},${T.tealDark})`,borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:800,color:"#fff"}}>+{post.pts} pts</div>
                    </div>
                    <div style={{fontSize:13,color:T.textMid,lineHeight:1.5}}>{post.caption}</div>
                  </div>
                </div>
              ))}
            </div>

            <BottomNav active={4} onNav={setScreen}/>
          </div>
        )}

        {/* ══ SCREEN 5 — RANDOM SHUFFLE ══ */}
        {screen===5 && (
          <div style={{flex:1,background:T.tealBg,display:"flex",flexDirection:"column",alignItems:"center",}}>
            <StatusBar light />
            {/* Header */}
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>◎</div>
                <span style={{fontSize:16,fontWeight:800,color:"#fff"}}>AnyCrave</span>
              </div>
              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icon.search("#fff",16)}
              </div>
            </div>

            <div style={{fontSize:26,fontWeight:900,color:"#fff",marginTop:20,marginBottom:6,letterSpacing:"-0.5px"}}>Random Shuffle</div>

            {/* Timer badge */}
            <div style={{background:"rgba(255,255,255,.2)",backdropFilter:"blur(8px)",borderRadius:T.radiusPill,padding:"4px 16px",marginBottom:20,display:"flex",flexDirection:"column",alignItems:"center"}}>
              <span style={{fontSize:18,fontWeight:900,color:"#fff"}}>{shuffling?"5s":shuffleDone?"0s":"5s"}</span>
              <div style={{fontSize:10,color:"rgba(255,255,255,.7)"}}>○</div>
            </div>

            {/* Roulette wheel visual */}
            <div style={{position:"relative",width:260,height:260,marginBottom:20}}>
              {/* Outer ring of food items */}
              {restaurants.concat(restaurants).map((res,i)=>{
                const angle=(i/8)*360;
                const rad=(angle*Math.PI)/180;
                const cx=Math.cos(rad)*108+130;
                const cy=Math.sin(rad)*108+130;
                return (
                  <div key={i} style={{position:"absolute",left:cx-24,top:cy-24,width:48,height:48,borderRadius:12,background:`${res.color}cc`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                    transform:shuffling?`rotate(${shuffleFrame*45}deg)`:"none",transition:"transform 0.1s",
                    boxShadow:"0 4px 12px rgba(0,0,0,.2)"
                  }}>{res.emoji}</div>
                );
              })}
              {/* Center roulette wheel */}
              <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:110,height:110,borderRadius:"50%",
                background:"radial-gradient(circle,#2c2c2c 40%,#1a1a1a 100%)",
                border:"4px solid #888",boxShadow:"0 0 0 2px #555, inset 0 0 20px rgba(0,0,0,.5)",
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                {/* spokes */}
                {[0,45,90,135].map(a=>(
                  <div key={a} style={{position:"absolute",width:2,height:"80%",background:"rgba(255,255,255,.15)",transform:`rotate(${a}deg)`,transformOrigin:"center"}}/>
                ))}
                {/* center hub */}
                <div style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#ccc,#888)",border:"2px solid #555",boxShadow:"0 2px 6px rgba(0,0,0,.5)",zIndex:1}}/>
              </div>
            </div>

            {/* Distance badge */}
            {(shuffling||shuffleDone) && (
              <div style={{background:"rgba(255,255,255,.18)",backdropFilter:"blur(8px)",borderRadius:T.radiusPill,padding:"6px 18px",marginBottom:16,fontSize:12,color:"#fff",fontWeight:600}}>
                You are 48m away
              </div>
            )}

            {/* Result card */}
            {shuffleDone && (
              <div style={{width:"calc(100% - 32px)",background:"rgba(255,255,255,.18)",backdropFilter:"blur(16px)",borderRadius:T.radiusLg,padding:"18px 20px",border:"1px solid rgba(255,255,255,.25)",marginBottom:16,textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:4}}>Surbrise! 🎉</div>
                <div style={{fontSize:15,color:"rgba(255,255,255,.9)",fontWeight:700}}>Kanto Freestyle Breakfast —</div>
                <div style={{fontSize:15,color:"rgba(255,255,255,.9)",fontWeight:700,marginBottom:16}}>2.3 km away</div>
                <button onClick={()=>setScreen(8)} style={{width:"100%",padding:"14px",background:"transparent",border:"2px solid rgba(255,255,255,.6)",borderRadius:T.radiusPill,color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",backdropFilter:"blur(8px)"}}>
                  Instant Directions
                </button>
              </div>
            )}

            {!shuffleDone && (
              <button onClick={startShuffle} disabled={shuffling} style={{padding:"16px 48px",background:shuffling?"rgba(255,255,255,.2)":T.white,color:shuffling?"rgba(255,255,255,.6)":T.teal,border:"none",borderRadius:T.radiusPill,fontSize:15,fontWeight:900,cursor:shuffling?"not-allowed":"pointer",boxShadow:shuffling?"none":T.shadowLg,transition:"all .2s"}}>
                {shuffling?"Shuffling...":"🎲 Shuffle!"}
              </button>
            )}
          </div>
        )}

        {/* ══ SCREEN 6 — LIVE SHOWCASE ══ */}
        {screen===6 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",}}>
            <StatusBar />
            {/* Header */}
            <div style={{padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#4FACFE,#00F2FE)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>◎</div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <div style={{width:36,height:36,borderRadius:12,background:T.offWhite,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textMid} strokeWidth="2"><line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
                </div>
                <div style={{position:"relative",width:36,height:36,borderRadius:12,background:T.offWhite,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textMid} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                  <div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:T.red}}/>
                </div>
              </div>
            </div>

            <div style={{padding:"0 16px 14px"}}>
              <div style={{fontSize:13,color:T.textLight,fontWeight:600}}>Feature 5</div>
              <div style={{fontSize:22,fontWeight:900,color:T.textDark,fontFamily:"'Playfair Display',serif",lineHeight:1.15}}>Restaurant Live<br/>Showcase</div>
            </div>

            {/* Video card */}
            <div style={{margin:"0 16px",borderRadius:T.radiusLg,overflow:"hidden",background:"#111",position:"relative",height:280}}>
              {/* Video placeholder */}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.3) 0%,transparent 40%,rgba(0,0,0,.7) 100%)"}}>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80}}>🍗</div>
              </div>
              {/* Overlays */}
              <div style={{position:"absolute",top:12,left:12,display:"flex",gap:8,alignItems:"center"}}>
                <div style={{background:T.red,borderRadius:8,padding:"4px 10px",display:"flex",gap:4,alignItems:"center"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#fff",animation:"pulse 1.5s infinite"}}/>
                  <span style={{fontSize:11,fontWeight:800,color:"#fff"}}>LIVE</span>
                </div>
                <div style={{background:"rgba(0,0,0,.5)",borderRadius:8,padding:"4px 10px",display:"flex",gap:4,alignItems:"center"}}>
                  {Icon.check("#fff",12)}
                  <span style={{fontSize:11,color:"#fff"}}>1.2K</span>
                </div>
                <div style={{marginLeft:"auto",position:"absolute",right:-8}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {Icon.chevRight("#fff",12)}
                  </div>
                </div>
              </div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px"}}>
                <div style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:8}}>Manila Lechon House LIVE 🔥</div>
                {["AnyCraveFan123","Foodie4Life"].map((u,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>👤</div>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.9)",fontWeight:600}}>{u}</span>
                    {i===1 && <div style={{marginLeft:"auto",background:T.red,borderRadius:8,padding:"2px 8px",display:"flex",gap:4,alignItems:"center"}}><span style={{width:6,height:6,borderRadius:"50%",background:"#fff",display:"block"}}></span><span style={{fontSize:10,fontWeight:800,color:"#fff"}}>LIVE</span></div>}
                  </div>
                ))}
                <div style={{display:"flex",gap:10,marginTop:10}}>
                  <button style={{flex:1,padding:"11px",background:T.teal,border:"none",borderRadius:T.radiusPill,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Swipe up to menu</button>
                  <button style={{flex:1,padding:"11px",background:T.navyBtn,border:"none",borderRadius:T.radiusPill,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    <span style={{fontSize:14}}>◎</span> Join Live
                  </button>
                </div>
              </div>
            </div>

            <div style={{flex:1}}/>
            <BottomNav active={6} onNav={setScreen}/>
          </div>
        )}

        {/* ══ SCREEN 7 — GROUP SWIPE ══ */}
        {screen===7 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",}}>
            <StatusBar />
            {/* Header */}
            <div style={{padding:"10px 16px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icon.menu(T.textDark,22)}
              </div>
              <span style={{fontSize:18,fontWeight:800,color:T.teal,fontFamily:"'DM Sans',sans-serif"}}>AnyCrave</span>
              <div style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icon.bell(T.textDark,20)}
              </div>
            </div>

            <div style={{padding:"0 16px 14px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:28,height:28,borderRadius:8,background:T.navyBtn,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:12,fontWeight:800,color:"#fff"}}>6</span>
              </div>
              <span style={{fontSize:18,fontWeight:800,color:T.textDark}}>Group Swipe Session</span>
            </div>

            {/* Group pill */}
            <div style={{margin:"0 16px 14px"}}>
              <div style={{background:T.teal,borderRadius:T.radiusPill,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>Group Room - 4 friends</span>
                <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {Icon.users("#fff",14)}
                </div>
              </div>
            </div>

            {/* Member vote cards */}
            <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:8,flex:1}}>
              {[
                {name:"Alex +",  vote:true,  emoji:"🍛"},
                {name:"Sam -",   vote:false, emoji:"🥘"},
                {name:"Jamie +", vote:false, emoji:"🥩"},
                {name:"Tina +",  vote:true,  emoji:"🍳"},
              ].map((m,i)=>(
                <div key={i} style={{borderRadius:T.radius,overflow:"hidden",height:68,position:"relative",boxShadow:T.shadow}}>
                  <div style={{position:"absolute",inset:0,background:`hsl(${i*40+20},45%,40%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,opacity:0.5}}>{m.emoji}</div>
                  <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.2) 100%)`}}/>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",border:`2px solid ${m.vote?"rgba(34,197,94,.5)":"rgba(239,68,68,.4)"}`,borderRadius:T.radius}}>
                    <span style={{fontSize:17,fontWeight:800,color:"#fff"}}>{m.name}</span>
                    <div style={{width:32,height:32,borderRadius:"50%",background:m.vote?T.green:T.red,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {m.vote ? Icon.heart("#fff",16) : Icon.x("#fff",16)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timer + progress */}
            <div style={{padding:"14px 16px"}}>
              <div style={{textAlign:"center",fontSize:13,color:T.textMid,fontWeight:600,marginBottom:8}}>
                Majority wins in {timer}s
              </div>
              <div style={{height:6,background:T.offWhite,borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(timer/47)*100}%`,height:"100%",background:T.teal,borderRadius:3,transition:"width 1s linear"}}/>
              </div>
            </div>

            {/* Mini map */}
            <div style={{margin:"0 16px 0",borderRadius:T.radius,overflow:"hidden",height:100,background:"#E8F4E8",position:"relative"}}>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:T.textLight,fontWeight:600}}>
                Squad Live Map — Tap to expand
              </div>
              {/* Simulated map pins */}
              {[{x:"25%",y:"30%",emoji:"👨"},{x:"55%",y:"50%",emoji:"👩"},{x:"70%",y:"25%",emoji:"🧑"},{x:"40%",y:"65%",emoji:"👦"}].map((p,i)=>(
                <div key={i} style={{position:"absolute",left:p.x,top:p.y,transform:"translate(-50%,-100%)"}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:T.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,border:"2px solid #fff",boxShadow:T.shadow}}>{p.emoji}</div>
                  <div style={{width:8,height:8,background:T.teal,borderRadius:"50% 50% 0 50%",transform:"rotate(-45deg) translateX(50%)",margin:"0 auto"}}/>
                </div>
              ))}
            </div>
            <div style={{height:16}}/>
          </div>
        )}

        {/* ══ SCREEN 8 — MAP SEARCH (Real Leaflet Map) ══ */}
        {screen===8 && <MapScreen T={T} Icon={Icon} restaurants={restaurants} setScreen={setScreen} />}

        {/* ══ SCREEN 9 — POINTS & REWARDS ══ */}
        {screen===9 && (
          <div style={{flex:1,background:T.white,display:"flex",flexDirection:"column",overflowY:"auto"}}>
            <StatusBar />
            {/* Header */}
            <div style={{padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Logo />
              <div style={{display:"flex",gap:10}}>
                {Icon.search(T.textMid,20)}
                {Icon.bell(T.textMid,20)}
              </div>
            </div>

            <div style={{padding:"8px 16px 20px"}}>
              <div style={{fontSize:28,fontWeight:900,color:T.textDark,fontFamily:"'Playfair Display',serif",letterSpacing:"-0.5px"}}>Points & Rewards</div>
            </div>

            {/* Tabs */}
            <div style={{padding:"0 16px 16px"}}>
              <div style={{display:"flex",background:T.white,borderRadius:T.radiusPill,padding:4,gap:4,boxShadow:`0 2px 10px rgba(0,0,0,.08)`}}>
                {["Points","Vouchers"].map((tab,i)=>(
                  <div key={tab} style={{flex:1,padding:"8px",textAlign:"center",borderRadius:T.radiusPill,background:i===0?T.textDark:"transparent",cursor:"pointer"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                      {i===0 && <span>🏆</span>}
                      <span style={{fontSize:13,fontWeight:700,color:i===0?"#fff":T.textLight}}>{tab}</span>
                      {i===0 && <span style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>2on?</span>}
                    </div>
                    {i===0 && <div style={{width:24,height:2,background:T.teal,margin:"4px auto 0",borderRadius:1}}/>}
                  </div>
                ))}
              </div>
            </div>

            {/* User section */}
            <div style={{padding:"0 16px 16px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:16,fontWeight:700,color:T.textDark}}>Dext Nigh</span>
                <div style={{display:"flex",gap:4}}>{[1,2,3].map(i=><div key={i} style={{width:4,height:4,borderRadius:"50%",background:T.textLight}}/>)}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:14,fontWeight:700,color:T.textDark}}>Recent Activity</span>
                <span style={{fontSize:13,color:T.teal,fontWeight:600}}>Seg/th</span>
              </div>
            </div>

            {/* Points row */}
            <div style={{margin:"0 16px 12px",background:T.offWhite,borderRadius:T.radius,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.textMid}}>Voucher</div>
                <div style={{fontSize:11,color:T.textLight}}>Tornts</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:15,fontWeight:800,color:T.green}}>+150 pts</div>
                <div style={{fontSize:11,color:T.textLight}}>from Pancit Reel</div>
              </div>
            </div>

            {/* Voucher cards */}
            {[
              {icon:"⭐",pts:"+1 270",label:"Redm Voucher",sub:"5- Pancit Reel",bg:"linear-gradient(135deg,#f59e0b,#d97706)"},
              {icon:"✅",pts:"+5 379",label:"Redm Voucher",sub:"8- Pancit Reel",bg:"linear-gradient(135deg,#22c55e,#16a34a)"},
              {icon:"🎫",pts:"+2 100",label:"Redm Voucher",sub:"3- Lechon Reel",bg:"linear-gradient(135deg,#8b5cf6,#7c3aed)"},
            ].map((v,i)=>(
              <div key={i} style={{margin:"0 16px 10px",background:T.white,borderRadius:T.radius,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:T.shadow}}>
                <div style={{width:44,height:44,borderRadius:12,background:v.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{v.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:T.textDark}}>{v.label}</div>
                  <div style={{fontSize:13,fontWeight:700,color:T.green}}>{v.pts}</div>
                  <div style={{fontSize:11,color:T.textLight}}>{v.sub}</div>
                </div>
                <button style={{padding:"10px 18px",background:T.navyBtn,color:"#fff",border:"none",borderRadius:T.radiusSm,fontSize:13,fontWeight:700,cursor:"pointer"}}>Redeem</button>
              </div>
            ))}

            <div style={{height:8}}/>
            <BottomNav active={9} onNav={setScreen}/>
          </div>
        )}

      </div>
    </div>
  );
}

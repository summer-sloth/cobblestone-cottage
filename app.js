'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const mapsUrl = 'https://maps.app.goo.gl/HvjsmKe73hzMs3zd9';
const channels = {
  suite: {
    airbnb: 'https://www.airbnb.co.in/rooms/1667205852296143749',
    booking: 'https://www.booking.com/hotel/in/cobblestone-cottage-solar-powered-2-bhk-ac-breakfast.html',
    mmt: 'https://www.makemytrip.com/hotels/cobblestone_cottage_2bhk_upper_floor-details-vaikom.html',
    goibibo: 'https://www.goibibo.com/hotels/cobblestone-cottage-2bhk-upper-floor-hotel-in-vaikom-202606281332183498/'
  },
  grove: {
    airbnb: 'https://www.airbnb.co.in/rooms/1692118904382795451',
    booking: 'https://www.booking.com/hotel/in/the-cobblestone-grove.en-gb.html',
    mmt: 'https://www.makemytrip.com/hotels/the_cobblestone_grove_3_bhk_2_ac_breakfast-details-vaikom.html',
    goibibo: 'https://www.goibibo.com/hotels/the-cobblestone-grove-3-bhk-2-ac-breakfast-hotel-in-vaikom-202607051124471887/'
  }
};
const photos = [
  {id:'aerial',file:'aerial-setting',label:'Among the coconut palms',stay:'suite',category:'drone'},
  {id:'suite-bed',file:'suite-bedroom',label:'Room to unwind',stay:'suite',category:'interior'},
  {id:'suite-kitchen',file:'suite-kitchen',label:'Kitchen & dining',stay:'suite',category:'interior'},
  {id:'grove-front',file:'grove-0',label:'A home in the greenery',stay:'grove',category:'exterior'},
  {id:'grove-bed',file:'grove-2',label:'A restful Grove bedroom',stay:'grove',category:'interior'},
  {id:'suite-balcony',file:'suite-balcony',label:'An evening on the balcony',stay:'suite',category:'interior'},
  {id:'grove-living',file:'grove-1',label:'Make yourself comfortable',stay:'grove',category:'interior'},
  {id:'suite-bath',file:'suite-bathroom',label:'Suite bathroom',stay:'suite',category:'interior'},
  {id:'front-drone',file:'suite-exterior',label:'The cobblestone welcome',stay:'suite',category:'drone'},
  {id:'grove-dining',file:'grove-3',label:'Gather around the table',stay:'grove',category:'interior'},
  {id:'suite-drone',file:'suite-drone',label:'A different perspective',stay:'suite',category:'drone'},
  {id:'grove-parking',file:'grove-4',label:'A place for your car, too',stay:'grove',category:'exterior'}
];
const stays = {
  suite: {name:'The Cobblestone Suite',type:'YOUR OWN UPPER-FLOOR RETREAT',description:'Bright rooms, a generous balcony, and a private entrance. Our independent upper-floor apartment gives you space to settle into village life, with the host family close by downstairs.',bedrooms:'2',bedsLabel:'AC bedrooms',bathrooms:'2',guests:'6',primary:'suite-bed',inset:'front-drone',features:['Private living, dining & fully equipped kitchen','Two attached bathrooms, hot water & fresh linen','Wi-Fi, a workspace, washer & covered parking','Solar backup for lights, fans & small devices']},
  grove: {name:'The Cobblestone Grove',type:'A WHOLE HOME, WRAPPED IN GREEN',description:'A separate house with the quiet feel of a farm stay. Bring the family, linger over meals, and enjoy the greenery, with Deepu and the family at the neighbouring property.',bedrooms:'3',bedsLabel:'bedrooms · 2 AC, 1 non-AC',bathrooms:'2',guests:'6',primary:'grove-front',inset:'grove-bed',features:['Whole-house privacy for your group','Private kitchen, living & dining spaces','Wi-Fi, workspace, washer & on-site parking','Green surroundings & outdoor badminton nearby']}
};
let selectedStay = 'suite', activeAmenityType = 'comfort';
const photoById = id => photos.find(p=>p.id===id);
const photoSrc = p => `assets/${p.file}.webp`;
const stayShort = key => key === 'suite' ? 'The Suite' : 'The Grove';
function renderStay(key, updateBooking = true) {
  selectedStay=key; const s=stays[key];
  $$('[data-stay]').forEach(b=>{const active=b.dataset.stay===key;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  const panel=$('#stay-panel');panel.setAttribute('aria-labelledby',`${key}-tab`);
  panel.innerHTML=`<div class="stay-photos"><button class="stay-main-photo" data-photo="${s.primary}" aria-label="Enlarge ${stayShort(key)} ${photoById(s.primary).label}"><img src="${photoSrc(photoById(s.primary))}" alt="${photoById(s.primary).label} at ${s.name}" width="960" height="722" loading="lazy"><span class="photo-hint">EXPLORE THE SPACE ↗</span></button><button class="stay-inset-photo" data-photo="${s.inset}" aria-label="Enlarge ${photoById(s.inset).label}"><img src="${photoSrc(photoById(s.inset))}" alt="${photoById(s.inset).label} at ${s.name}" width="480" height="300" loading="lazy"></button></div><div class="stay-copy"><p class="eyebrow">${s.type}</p><h3 class="property-title"><img src="assets/${key}-icon.svg" alt="" width="40" height="40"><span>${s.name}</span></h3><p>${s.description}</p><div class="stay-stats"><div><b>${s.bedrooms}</b><span>${s.bedsLabel}</span></div><div><b>${s.bathrooms}</b><span>bathrooms</span></div><div><b>Up to ${s.guests}</b><span>guests on Airbnb</span></div></div><ul class="stay-features">${s.features.map(f=>`<li>${f}</li>`).join('')}</ul><div class="stay-booking"><div class="stay-actions"><a class="button airbnb-button" href="${channelUrl('airbnb').replaceAll('&','&amp;')}" target="_blank" rel="noopener noreferrer" data-stay-channel="airbnb" aria-label="Book now in Airbnb for ${s.name}"><img class="airbnb-mark" src="assets/brands/airbnb.png" alt="" width="23" height="23"><span>book now in airbnb</span><span aria-hidden="true">↗</span></a><button class="text-button" data-open-gallery="${key}">See the photos ↗</button></div><div class="stay-secondary-channels" aria-label="Other booking options"><span class="other-channel-label">Also available on</span>${[['booking','Booking.com'],['mmt','MakeMyTrip'],['goibibo','Goibibo']].map(([channel,name])=>`<a href="${channelUrl(channel).replaceAll('&','&amp;')}" target="_blank" rel="noopener noreferrer" data-stay-channel="${channel}" aria-label="Book ${s.name} on ${name}"><img src="assets/brands/${channel}.png" alt="" width="16" height="16"><span>${name}</span><span aria-hidden="true">↗</span></a>`).join('')}</div></div></div>`;
  if(updateBooking){$('#stay-select').value=key;updateTrip();renderAmenities(activeAmenityType);}
}
$$('[data-stay]').forEach(b=>b.addEventListener('click',()=>renderStay(b.dataset.stay)));
function wireTabs(selector, callback){
  $$(selector).forEach(b=>b.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault();const tabs=$$(selector);let i=tabs.indexOf(b);
    i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    tabs[i].focus();callback(tabs[i]);
  }));
}
wireTabs('[data-stay]',b=>renderStay(b.dataset.stay));
$('#compare-toggle').addEventListener('click',()=>{const open=$('#comparison').hidden;$('#comparison').hidden=!open;$('#compare-toggle').setAttribute('aria-expanded',String(open));$('#compare-toggle').innerHTML=open?'Close comparison <span aria-hidden="true">×</span>':'Compare the two <span aria-hidden="true">↗</span>';});

let galleryFilter='all', galleryExpanded=false;
function filteredPhotos(){return photos.filter(p=>galleryFilter==='all'||(galleryFilter==='drone'?p.category==='drone':p.stay===galleryFilter));}
function renderGallery(){
  const list=filteredPhotos(),shown=galleryExpanded?list:list.slice(0,5);
  $('#gallery-grid').innerHTML=shown.map(p=>`<button class="gallery-item" data-photo="${p.id}" aria-label="View ${p.label} at ${stayShort(p.stay)}"><img src="${photoSrc(p)}" alt="${p.label} at ${stayShort(p.stay)}" loading="lazy" width="960" height="720"><span><small>${stayShort(p.stay)}${p.category==='drone'?' · DRONE VIEW':''}</small>${p.label} ↗</span></button>`).join('');
  $('#gallery-count').textContent=`${shown.length} of ${list.length} photographs`;
  $('#gallery-more').hidden=list.length<=5;
  $('#gallery-more').innerHTML=galleryExpanded?'Show fewer photos <span aria-hidden="true">↑</span>':'View all photos <span aria-hidden="true">↗</span>';
}
function setGalleryFilter(filter){galleryFilter=filter;galleryExpanded=false;$$('[data-gallery-filter]').forEach(b=>{const a=b.dataset.galleryFilter===filter;b.classList.toggle('active',a);b.setAttribute('aria-pressed',String(a));});renderGallery();}
$$('[data-gallery-filter]').forEach(b=>b.addEventListener('click',()=>setGalleryFilter(b.dataset.galleryFilter)));
$('#gallery-more').addEventListener('click',()=>{galleryExpanded=!galleryExpanded;renderGallery();if(!galleryExpanded)$('#gallery').scrollIntoView({behavior:motionPreference.matches?'instant':'smooth'});});

const iconPaths={
  wifi:'<path d="M3 9c5-5 13-5 18 0M6 13c3-3 9-3 12 0M9 17c2-2 4-2 6 0"/><circle cx="12" cy="21" r=".8"/>',
  kitchen:'<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v19M20 22V3c-4 1-5 6-5 10h5"/>',
  bed:'<path d="M3 18V6m18 12V9M3 12h18v7H3m2 0v3m14-3v3M5 12V7h6v5m2 0V7h6v5"/>',
  car:'<path d="m4 10 2-6h12l2 6M3 10h18v9H3zM5 19v3m14-3v3M6 14h2m8 0h2M8 2h8"/>',
  washer:'<rect x="4" y="2" width="16" height="20" rx="1"/><circle cx="12" cy="14" r="5"/><path d="M5 7h14M7 4h2m2 0h1M8 14q4 4 8 0"/>',
  leaf:'<path d="M20 3C7 1 1 9 5 16c7 5 16-1 15-13ZM3 22 17 7M8 17V10m4 3h6"/>',
  food:'<path d="M3 14h18M5 14a7 7 0 0 1 14 0M12 5V2M3 19h18M5 22h14"/>',
  game:'<path d="M7 7h10c3 0 5 8 4 11s-4 0-6-1H9c-2 1-5 4-6 1S4 7 7 7Z"/><path d="M8 10v5m-2.5-2.5h5M15 11h1m1 3h1M12 7V3"/>',
  pizza:'<path d="m4 21 7-17c4 1 7 4 9 8L4 21ZM10 6c4 1 6 3 8 7"/><circle cx="10" cy="13" r="1"/><circle cx="13" cy="16" r="1"/>',
  badminton:'<ellipse cx="9" cy="8" rx="5" ry="7" transform="rotate(30 9 8)"/><path d="m6 14-4 8M8 2l7 6M5 6l7 6M18 16l4 4-5 2-2-4 3-2Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  chat:'<path d="M3 4h18v13H9l-6 5V4Z"/><path d="M7 8h10M7 12h7"/>'
};
const icon = name=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
// Complete amenity lists checked in each home's Airbnb amenities panel on 29 October 2026.
// An item with extra detail still counts as one Airbnb amenity. Exclusions are kept separate.
const sharedBathroom=[['Hairdryer'],['Cleaning products'],['Shampoo'],['Conditioner'],['Body soap'],['Hot water'],['Shower gel']];
const sharedLinen=[['Essentials','Towels, bed sheets, soap and toilet paper'],['Hangers'],['Bed linen'],['Extra pillows and blankets'],['Iron']];
const propertyAmenities={
  suite:{groups:[
    ['Bathroom','washer',sharedBathroom],
    ['Bedroom and laundry','bed',[[ 'Free washer – in unit'],...sharedLinen,['Clothes drying rack'],['Safe'],['Mosquito net'],['Clothes storage: wardrobe']]],
    ['Entertainment','game',[[ 'Ethernet connection'],['32-inch HDTV','Amazon Prime Video, Apple TV, Chromecast, Disney+, Netflix'],['Games console'],['Exercise equipment'],['Books and reading material']]],
    ['Family','chat',[[ 'Window guards'],['Board games']]],
    ['Heating and cooling','sun',[[ 'AC – split-type ductless system'],['Ceiling fan'],['Heating']]],
    ['Home safety','chat',[[ 'Exterior security cameras','Entrance, parking and outdoor areas covered by 24/7 CCTV'],['First aid kit']]],
    ['Internet and office','wifi',[[ 'Wifi – 79 Mbps','Speed verified on Airbnb'],['Dedicated workspace']]],
    ['Kitchen and dining','kitchen',[[ 'Kitchen','Guests can cook their own meals'],['Fridge'],['Microwave'],['Cooking basics','Pots and pans, oil, salt and pepper'],['Crockery and cutlery','Plates, bowls, cups, cutlery and utensils'],['Freezer'],['Kettle'],['Dining table']]],
    ['Outdoor','leaf',[[ 'Patio or balcony'],['Shared back garden']]],
    ['Parking and facilities','car',[[ 'Free residential garage – 1 space','On premises, with controlled access and security'],['Gated community'],['Recycling']]],
    ['Services','chat',[[ 'Pets allowed'],['Smoking allowed','Terrace only'],['Self check-in'],['Lockbox']]]
  ],unavailable:[['Tumble dryer'],['Smoke alarm'],['Carbon monoxide alarm']]},
  grove:{groups:[
    ['Bathroom','washer',sharedBathroom],
    ['Bedroom and laundry','bed',[[ 'Washing machine'],...sharedLinen,['Safe'],['Mosquito net'],['Clothes storage: chest of drawers']]],
    ['Entertainment','game',[[ 'Games console']]],
    ['Heating and cooling','sun',[[ 'Air conditioning'],['Ceiling fan'],['Heating']]],
    ['Home safety','chat',[[ 'Exterior security cameras','Three cameras outside']]],
    ['Internet and office','wifi',[[ 'Wifi'],['Dedicated workspace']]],
    ['Kitchen and dining','kitchen',[[ 'Kitchen','Guests can cook their own meals'],['Fridge'],['Cooking basics','Pots and pans, oil, salt and pepper'],['Dining table'],['Coffee']]],
    ['Parking and facilities','car',[[ 'Free parking on premises'],['Gated community']]],
    ['Services','chat',[[ 'Pets allowed'],['Smoking allowed','Terrace and outdoors only'],['Long-term stays allowed','28 days or more'],['Self check-in'],['Lockbox']]]
  ],unavailable:[['HDTV with Amazon Prime Video, Disney+'],['Tumble dryer'],['Smoke alarm'],['Carbon monoxide alarm']]}
};
const optionalExtras=[
  ['food','A homely breakfast','Arrange a Kerala breakfast with the host. Some channel rate plans already include it.','₹119 / person on Airbnb'],
  ['game','Play a little','Ask for a PS5 and Logitech G29 wheel-and-pedal racing setup during your stay.','From ₹799 / day · on request'],
  ['pizza','Pizza by the host','Ask about the host’s 10-inch margherita pizza, prepared subject to availability.','₹499 · listed on Grove Airbnb','grove'],
  ['badminton','A friendly match','An outdoor badminton court adjacent to the Grove, with rackets and shuttle available.','Ask Deepu to arrange','grove'],
  ['sun','A little solar support','The Suite has solar power backup for lights, fans, and small devices.','Confirm appliance needs with the host','suite'],
  ['chat','Make it your stay','Need fewer bedrooms, a longer visit, or local suggestions? Start with a conversation with Deepu.','Subject to availability']
];
function amenityGroup(title,ic,items,open=false,unavailable=false){
  return `<details class="amenity-group${unavailable?' amenity-unavailable':''}"${open?' open':''}><summary><span class="amenity-group-heading">${icon(ic)}<span>${title}</span></span><span class="amenity-group-count" aria-hidden="true">${items.length}</span><span class="amenity-chevron" aria-hidden="true">+</span></summary><ul class="amenity-list">${items.map(([name,detail])=>`<li><span class="amenity-check" aria-hidden="true">${unavailable?'−':'✓'}</span><div><b>${name}</b>${detail?`<small>${detail}</small>`:''}</div></li>`).join('')}</ul></details>`;
}
function renderAmenities(type){
  activeAmenityType=type;
  $$('[data-amenity]').forEach(b=>{const a=b.dataset.amenity===type;b.setAttribute('aria-selected',String(a));b.tabIndex=a?0:-1;});
  $$('[data-comfort-stay]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.comfortStay===selectedStay)));
  const grid=$('#amenity-grid'),data=propertyAmenities[selectedStay],count=data.groups.reduce((sum,group)=>sum+group[2].length,0);
  grid.setAttribute('aria-labelledby',type==='comfort'?'comfort-tab':'extra-tab');
  grid.classList.toggle('amenity-categories',type==='comfort');
  $('#amenity-home').textContent=stays[selectedStay].name;
  $('#amenity-summary').textContent=type==='comfort'?`${count} amenities listed on Airbnb`:'Little extras for your stay';
  $('#amenity-source').href=channels[selectedStay].airbnb;
  $('#amenity-expand').hidden=type!=='comfort';
  $('#amenity-expand').textContent='Expand all';
  $('#amenity-expand').setAttribute('aria-expanded','false');
  grid.innerHTML=type==='comfort'
    ?data.groups.map(([title,ic,items])=>amenityGroup(title,ic,items,title==='Internet and office'||title==='Kitchen and dining')).join('')+amenityGroup('Not included','chat',data.unavailable,false,true)
    :optionalExtras.filter(item=>!item[4]||item[4]===selectedStay).map(([ic,title,desc,price])=>`<article class="amenity">${icon(ic)}<div><h3>${title}</h3><p>${desc}</p><span class="price">${price}</span></div></article>`).join('');
  $('#amenity-note').textContent=type==='comfort'?'Airbnb amenity list checked on 29 October 2026.':'Optional services are subject to availability. Prices above come from the current Airbnb descriptions; confirm with Deepu before arranging extras.';
}
$$('[data-comfort-stay]').forEach(b=>b.addEventListener('click',()=>renderStay(b.dataset.comfortStay)));
$('#amenity-expand').addEventListener('click',()=>{
  const groups=$$('.amenity-group'),expand=groups.some(group=>!group.open);
  groups.forEach(group=>{group.open=expand;});
  $('#amenity-expand').textContent=expand?'Collapse all':'Expand all';
  $('#amenity-expand').setAttribute('aria-expanded',String(expand));
});
$('#amenity-grid').addEventListener('toggle',()=>{
  const groups=$$('.amenity-group'),allOpen=groups.length>0&&groups.every(group=>group.open);
  $('#amenity-expand').textContent=allOpen?'Collapse all':'Expand all';
  $('#amenity-expand').setAttribute('aria-expanded',String(allOpen));
},true);
$$('[data-amenity]').forEach(b=>b.addEventListener('click',()=>renderAmenities(b.dataset.amenity)));
wireTabs('[data-amenity]',b=>renderAmenities(b.dataset.amenity));

const places=[
  {id:'malliyoor',name:'Malliyoor Ganapathy Temple',type:'heritage',distance:'~2 km',query:'Malliyoor Sree Maha Ganapathy Temple Kerala',desc:'A nearby temple stop for a quiet local outing. Check visiting times before you leave.'},
  {id:'muttuchira',name:'Muttuchira Church',type:'heritage',distance:'~3 km',query:'Holy Ghost Forane Church Muttuchira Kerala',desc:'Explore the area’s Syrian Christian heritage at Holy Ghost Forane Church in Muttuchira.'},
  {id:'kuravilangad',name:'Kuravilangad Church',type:'heritage',distance:'~6 km',query:'St Marys Forane Church Kuravilangad Kerala',desc:'Make time for a visit to St. Mary’s Forane Church in nearby Kuravilangad.'},
  {id:'mango',name:'Mango Meadows',type:'nature',distance:'~7 km',query:'Mango Meadows Agricultural Theme Park Kerala',desc:'Plan a family day out at the agricultural theme park. Check opening hours, activities, and tickets with the park.'},
  {id:'koorumala',name:'Koorumala Viewpoint',type:'nature',distance:'~20 km',query:'Koorumala Viewpoint Kerala',desc:'A hilltop detour for wider views of the countryside. Check the weather and access before setting out.'},
  {id:'kumarakom',name:'Kumarakom backwaters',type:'nature',distance:'~23 km',query:'Kumarakom Kerala backwaters',desc:'Slow the day down around Kerala’s backwaters. Ask Deepu for suggestions for your route and time available.'}
];
let placeFilter='all',selectedPlace=null;
function renderPlaces(){
  $('#places-list').innerHTML=places.filter(p=>placeFilter==='all'||p.type===placeFilter).map(p=>`<button class="place ${selectedPlace===p.id?'selected':''}" data-place="${p.id}" aria-pressed="${selectedPlace===p.id}"><span><span class="place-name">${p.name}</span><small>${p.type==='nature'?'NATURE & DAYS OUT':'HERITAGE & PILGRIMAGE'}</small></span><span class="place-distance">${p.distance}<b aria-hidden="true">↗</b></span></button>`).join('');
}
$$('[data-place-filter]').forEach(b=>b.addEventListener('click',()=>{placeFilter=b.dataset.placeFilter;$$('[data-place-filter]').forEach(x=>{const a=x===b;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a));});renderPlaces();}));
function selectPlace(id){
  selectedPlace=id;const p=places.find(p=>p.id===id);
  $('#map-category').textContent=p?`${p.type==='nature'?'NATURE & DAYS OUT':'HERITAGE & PILGRIMAGE'} · ${p.distance}`:'YOUR STARTING POINT';
  $('#map-title').textContent=p?p.name:'The Cobblestone neighbourhood';
  $('#map-description').textContent=p?p.desc:'Behind Kuruppanthara Private Bus Stand. Local shops and everyday essentials are a short walk away.';
  $('#map-link').href=p?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`:mapsUrl;
  $('#map-link').setAttribute('aria-label',p?`Open ${p.name} in Google Maps`:'Open Cobblestone location in Google Maps');
  $('#area-map-link').href=$('#map-link').href;$('#area-map-link').setAttribute('aria-label',$('#map-link').getAttribute('aria-label'));renderPlaces();
}
$('#reset-map').addEventListener('click',()=>selectPlace(null));

// Attributed complete short reviews, excerpts, and summaries are labeled separately.
const reviewSymbols = {'Google':'google','Airbnb':'airbnb','Booking.com':'booking'};
const reviews=[
  {name:'Pradeep',source:'Airbnb',stay:'grove',date:'October 2026',rating:'5 / 5',kind:'full',quote:'Dear Deepu\nThanks for hosting us\nGood night stay with calm surroundings',highlights:['calm surroundings'],url:channels.grove.airbnb},
  {name:'Elena Izzo',source:'Google',stay:'suite',date:'A month ago',rating:'5 / 5',kind:'excerpt',quote:'It is a beautiful location.',highlights:['beautiful location'],summary:'Elena appreciated the Wi-Fi, kitchen and laundry facilities for an easy stay.',url:mapsUrl},
  {name:'Vishnu',source:'Airbnb',stay:'suite',date:'August 2026',rating:'5 / 5',kind:'full',quote:'Great stay, feels like home',highlights:['feels like home'],url:channels.suite.airbnb},
  {name:'Akhil',source:'Airbnb',stay:'grove',date:'October 2026',rating:'5 / 5',kind:'excerpt',quote:'The house was exceptionally clean, beautifully maintained, spacious, and comfortable.',highlights:['exceptionally clean','spacious, and comfortable'],summary:'Akhil praised the care given to the home and the peaceful surroundings.',url:channels.grove.airbnb},
  {name:'Muhammad',source:'Booking.com',stay:'suite',date:'Guest review',rating:'10 / 10',kind:'full',quote:"An awesome house stay with a perfectly clean atmosphere. Well maintained property. Don't have any demerits ❤️",highlights:['perfectly clean atmosphere','Well maintained property'],url:channels.suite.booking},
  {name:'Vivin',source:'Airbnb',stay:'suite',date:'May 2026',rating:'5 / 5',kind:'excerpt',quote:'He and his family are very hospitable and are very welcoming!',highlights:['very hospitable','very welcoming'],summary:'Vivin found the home matched its description and would return for another visit.',url:channels.suite.airbnb},
  {name:'Priya',source:'Booking.com',stay:'suite',date:'Guest review',rating:'10 / 10',kind:'summary',summary:'Priya highlighted a restful visit, a friendly welcome, and the Kerala breakfast.',highlights:['restful visit','friendly welcome'],url:channels.suite.booking}
];
function escapeReview(text){return text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function highlightedReview(text,phrases=[]){let result=escapeReview(text);for(const phrase of phrases){const safe=escapeReview(phrase);result=result.replace(safe,`<mark>${safe}</mark>`);}return result.replaceAll('\n','<br>');}
function reviewCard(r){
  const label=r.kind==='full'?'Full guest review':r.kind==='excerpt'?'Selected excerpt':'Review summary';
  const body=r.quote?`<blockquote>“${highlightedReview(r.quote,r.highlights)}”</blockquote>${r.summary?`<p>${escapeReview(r.summary)}</p>`:''}`:`<p class="review-summary">${highlightedReview(r.summary,r.highlights)}</p>`;
  return `<article class="review-card"><div class="review-top"><span class="review-source"><img src="assets/brands/${reviewSymbols[r.source]}.png" alt="" width="20" height="20"><span>${r.source} · ${stayShort(r.stay)}</span></span><b>★ ${r.rating}</b></div><span class="review-type ${r.kind}">${label}</span>${body}<div class="review-person"><span class="avatar" aria-hidden="true">${r.name.charAt(0)}</span><span><b>${r.name}</b><small>${r.date}</small></span><a href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="Read ${r.name}'s review on ${r.source}">↗</a></div></article>`;
}
let reviewFilter='all',reviewPage=0;
function filteredReviews(){return reviews.filter(r=>(reviewFilter==='all'||r.source===reviewFilter)&&($('#review-stay').value==='all'||r.stay===$('#review-stay').value));}
function renderReviews(){
  const list=filteredReviews(),size=3,pages=Math.max(1,Math.ceil(list.length/size));reviewPage=Math.min(reviewPage,pages-1);
  $('#review-grid').innerHTML=list.length?list.slice(reviewPage*size,(reviewPage+1)*size).map(reviewCard).join(''):'<p class="no-results">No featured reviews match this combination. Choose another source or both homes to see more stories.</p>';
  $('#review-count').textContent=list.length?`${reviewPage*size+1}–${Math.min((reviewPage+1)*size,list.length)} of ${list.length} featured stories`:'0 featured stories';
  $('#reviews-prev').disabled=reviewPage===0;$('#reviews-next').disabled=reviewPage>=pages-1;
}
$$('[data-review-filter]').forEach(b=>b.addEventListener('click',()=>{reviewFilter=b.dataset.reviewFilter;reviewPage=0;$$('[data-review-filter]').forEach(x=>{const a=x===b;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a));});renderReviews();}));
$('#review-stay').addEventListener('change',()=>{reviewPage=0;renderReviews();});
$('#reviews-prev').addEventListener('click',()=>{reviewPage--;renderReviews();});
$('#reviews-next').addEventListener('click',()=>{reviewPage++;renderReviews();});

const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function nextDay(iso){const d=new Date(`${iso}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10);}
$('#check-in').min=today;$('#check-out').min=nextDay(today);
function validDates(){const a=$('#check-in').value,b=$('#check-out').value;return a&&b&&a>=today&&b>a;}
function dateLabel(iso){return new Intl.DateTimeFormat(document.documentElement.lang==='ml'?'ml-IN':'en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${iso}T12:00:00Z`));}
function channelUrl(key){
  const u=new URL(channels[selectedStay][key]),g=$('#guests').value;
  if(key==='airbnb'){u.searchParams.set('adults',g);if(validDates()){u.searchParams.set('check_in',$('#check-in').value);u.searchParams.set('check_out',$('#check-out').value);}}
  if(key==='booking'){u.searchParams.set('group_adults',g);u.searchParams.set('no_rooms','1');u.searchParams.set('group_children','0');if(validDates()){u.searchParams.set('checkin',$('#check-in').value);u.searchParams.set('checkout',$('#check-out').value);}}
  return u.href;
}
function updateTrip(){
  const s=stays[selectedStay],g=$('#guests').value;
  $('#trip-property').textContent=s.name;
  $('#trip-icon').src=`assets/${selectedStay}-icon.svg`;
  const dates=validDates()?`${dateLabel($('#check-in').value)} – ${dateLabel($('#check-out').value)}`:'Choose dates above';
  $('#trip-summary').textContent=`${dates} · ${g} ${g==='1'?'adult':'adults'}`;
  const entries=[['airbnb','Airbnb','Explore the home & host reviews','book now in airbnb'],['booking','Booking.com','Compare available rate plans','Check dates on Booking.com'],['mmt','MakeMyTrip','GoMMT booking option','Open the listing'],['goibibo','Goibibo','GoMMT booking option','Open the listing']];
  $('#channel-grid').innerHTML=entries.map(([key,name,desc,cta])=>`<a class="channel${key==='airbnb'?' channel-primary':''}" href="${channelUrl(key).replaceAll('&','&amp;')}" target="_blank" rel="noopener noreferrer" data-channel="${key}" aria-label="${cta} for ${s.name}"><div class="channel-identity"><img class="ota-symbol" src="assets/brands/${key}.png" alt="" width="48" height="48"><span class="channel-arrow" aria-hidden="true">↗</span></div><span class="channel-name">${name}</span><p>${stayShort(selectedStay)} · ${desc}</p><small>${cta} <span aria-hidden="true">→</span></small></a>`).join('');
  $$('[data-stay-channel]', $('#stay-panel')).forEach(link=>{link.href=channelUrl(link.dataset.stayChannel);});
  const text='I have an enquiry on rental booking in Cobblestone Homestays, kuruppanthara';
  $('#whatsapp-link').href=`https://wa.me/919495961171?text=${encodeURIComponent(text)}`;
}
$('#stay-select').addEventListener('change',e=>renderStay(e.target.value));
$('#guests').addEventListener('change',updateTrip);
$('#check-in').addEventListener('input',()=>{const a=$('#check-in').value;if(a){$('#check-out').min=nextDay(a);if(!$('#check-out').value||$('#check-out').value<=a)$('#check-out').value=nextDay(a);}updateTrip();});
$('#check-out').addEventListener('input',()=>{updateTrip();$('#date-feedback').classList.toggle('error',!!$('#check-out').value&&!validDates());$('#date-feedback').textContent=$('#check-out').value&&!validDates()?'Choose a check-out date after check-in, with check-in today or later.':'Availability and final prices are confirmed on your chosen booking channel.';});
$('#date-form').addEventListener('submit',e=>{e.preventDefault();if(!validDates()){$('#date-feedback').textContent='Choose a check-in date today or later and a later check-out date.';$('#date-feedback').classList.add('error');return;}updateTrip();$('#date-feedback').textContent='Your trip is ready. Choose a booking channel below to check availability.';$('#date-feedback').classList.remove('error');$('#booking').scrollIntoView({behavior:motionPreference.matches?'instant':'smooth'});history.replaceState(null,'','#booking');});

const menuButton=$('.menu-toggle'),menu=$('#mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!$('.header').contains(e.target))closeMenu();});
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo=$('#hero-video'),motionToggle=$('#motion-toggle');
let videoReady=false;
function loadHeroVideo(){if(!videoReady){const source=$('source',heroVideo);source.src=source.dataset.src;heroVideo.load();videoReady=true;}}
function setMotion(playing){if(playing){loadHeroVideo();heroVideo.play().then(()=>{heroVideo.classList.add('playing');motionToggle.setAttribute('aria-pressed','true');motionToggle.setAttribute('aria-label','Pause background video');motionToggle.textContent='Ⅱ';}).catch(()=>pauseMotion());}else pauseMotion();}
function pauseMotion(){heroVideo.pause();motionToggle.setAttribute('aria-pressed','false');motionToggle.setAttribute('aria-label','Play background video');motionToggle.textContent='▶';}
motionToggle.addEventListener('click',()=>setMotion(heroVideo.paused));
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){pauseMotion();heroVideo.classList.remove('playing');}});
// Open with the owner's requested 0232 → 0233 footage; preserve reduced-motion and data-saving preferences.
if(!motionPreference.matches&&!navigator.connection?.saveData)setMotion(true);

const dialog=$('#media-dialog');let lightboxPhotos=[],lightboxIndex=0,dialogMode='photo';
function renderPhoto(){const p=lightboxPhotos[lightboxIndex];$('#dialog-content').innerHTML=`<img src="${photoSrc(p)}" alt="${p.label} at ${stayShort(p.stay)}">`;$('#photo-caption').innerHTML=`${p.label}<small>${stayShort(p.stay)} · ${lightboxIndex+1} / ${lightboxPhotos.length}</small>`;$('#photo-prev').hidden=lightboxPhotos.length<2;$('#photo-next').hidden=lightboxPhotos.length<2;}
function openPhoto(id){dialogMode='photo';lightboxPhotos=filteredPhotos();if(!lightboxPhotos.some(p=>p.id===id))lightboxPhotos=photos;lightboxIndex=lightboxPhotos.findIndex(p=>p.id===id);renderPhoto();dialog.setAttribute('aria-label','Property photo viewer');document.body.classList.add('dialog-open');dialog.showModal();}
function openFilm(){dialogMode='film';pauseMotion();$('#dialog-content').innerHTML='<video src="assets/cobblestone-drone-0232-0233.mp4" poster="assets/drone-opening-0232.webp" controls playsinline autoplay muted aria-label="Drone film of Cobblestone Suite"></video>';$('#photo-caption').innerHTML='Cobblestone from above<small>Filmed on October 20, 2026 · sound-free film</small>';$('#photo-prev').hidden=true;$('#photo-next').hidden=true;dialog.setAttribute('aria-label','Cobblestone drone film');document.body.classList.add('dialog-open');dialog.showModal();}
function movePhoto(dir){if(dialogMode!=='photo')return;lightboxIndex=(lightboxIndex+dir+lightboxPhotos.length)%lightboxPhotos.length;renderPhoto();}
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{const v=$('video',dialog);if(v)v.pause();$('#dialog-content').innerHTML='';document.body.classList.remove('dialog-open');});
$('#photo-prev').addEventListener('click',()=>movePhoto(-1));$('#photo-next').addEventListener('click',()=>movePhoto(1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();movePhoto(1);}if(e.key==='ArrowLeft'){e.preventDefault();movePhoto(-1);}});
document.addEventListener('click',e=>{const photo=e.target.closest('[data-photo]'),film=e.target.closest('[data-film]'),gallery=e.target.closest('[data-open-gallery]'),place=e.target.closest('[data-place]');if(photo)openPhoto(photo.dataset.photo);if(film)openFilm();if(gallery){setGalleryFilter(gallery.dataset.openGallery);$('#gallery').scrollIntoView({behavior:motionPreference.matches?'instant':'smooth'});}if(place)selectPlace(place.dataset.place);});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${e.target.id}`));}});},{rootMargin:'-20% 0px -65% 0px',threshold:0});
$$('main section[id]').forEach(s=>sectionObserver.observe(s));
$('#year').textContent=new Date().getFullYear();
renderStay('suite',false);renderGallery();renderAmenities('comfort');renderPlaces();renderReviews();updateTrip();

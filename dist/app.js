
'use strict';
const main = document.querySelector('#main');
const dialog = document.querySelector('#dialog');
const body = document.querySelector('#dialog-body');
const storageKey = 'sonali-tailoring-v1';
let data = {orders:[], customers:[], measurements:[], designs:[], contact:{}};
try { data = {...data, ...JSON.parse(localStorage.getItem(storageKey))}; }
catch { document.querySelector('#notice').textContent = 'Saved records could not be loaded.'; }
const categories = ['Dresses','Blouses','Maggam','Embroidery'];
const statuses = ['Booked','Cutting','Stitching','Fitting','Ready','Delivered'];
const designs = [
  ['Rose Anarkali','Dresses','Flared panels, fitted bodice and a full-length skirt.','0% 0%'],
  ['Ivory Straight Kurta','Dresses','Straight-cut silhouette with a split neckline and side slits.','50% 0%'],
  ['Sweetheart Silk Blouse','Blouses','Curved sweetheart neckline and tailored short sleeves.','100% 0%'],
  ['Potli Button Blouse','Blouses','High neckline with a row of fabric-covered potli buttons.','0% 100%'],
  ['Bridal Gold Maggam','Maggam','Gold zari, beads and hand-worked bridal motifs.','50% 100%'],
  ['Lavender Floral Blouse','Embroidery','Soft floral threadwork around the neckline and sleeves.','100% 100%']
].map(([name,category,notes,position],index)=>({id:'sample-'+index,name,category,notes,position}));
designs.push(...[
  ['Pink Party Frock','Dresses','Tiered skirt and fitted bodice.','0% 0%'],
  ['Peacock Silk Pavadai Blouse','Blouses','Short sleeves with contrast gold trim.','100% 0%'],
  ['Maroon Leaf Maggam Blouse','Maggam','Hand-worked gold leaf motifs and beads.','0% 100%'],
  ['Yellow Floral Kurta','Embroidery','A-line kurta with floral thread embroidery.','100% 100%']
].map(([name,category,notes,position],index)=>({id:'girls-'+index,name,category,notes,position,audience:'Girls'})));
designs.push(...[
  ["Emerald Princess-Seam Gown","Dresses","Long fitted panels with a flared hem.","Women","0% 0%"],
  ["Peplum Sharara Set","Dresses","Burgundy peplum kurta paired with ivory flared trousers.","Women","50% 0%"],
  ["Rust Angrakha Dress","Dresses","Overlap bodice, side tie and a flared skirt.","Women","100% 0%"],
  ["Indigo Square-Neck Blouse","Blouses","Structured square neckline in indigo silk.","Women","0% 50%"],
  ["Emerald Dori-Tie Blouse","Blouses","Deep U-back with a dori tie fastening.","Women","50% 50%"],
  ["Bridal Peacock Maggam","Maggam","Gold zari, beads and a peacock motif on red silk.","Women","100% 50%"],
  ["Navy Mirror-Work Blouse","Embroidery","Small mirrors framed with decorative stitches.","Women","0% 100%"],
  ["Lavender Puff-Sleeve Frock","Dresses","Puffed sleeves and a gathered skirt for parties.","Girls","50% 100%"],
  ["Turquoise Pavadai Set","Dresses","Coordinated skirt and blouse with a woven gold border.","Girls","100% 100%"],
  ["Pink Lotus Maggam Blouse","Maggam","Lotus motifs, gold thread and fine beadwork.","Girls","0% 0%"],
  ["Blue Floral Cotton Frock","Embroidery","Blue floral threadwork on a cream cotton frock.","Girls","100% 0%"],
  ["Black Floral Sleeve Blouse","Embroidery","Red and green thread embroidery across the sleeves.","Women","0% 100%"],
  ["Teal Pearl Maggam Blouse","Maggam","Pearl accents along a scalloped neckline.","Women","100% 100%"]
].map(([name,category,notes,audience,position],index)=>({
  id:'variety-'+index,name,category,notes,audience,position,sheet:index<9?'variety-nine':'variety-four'
})));
const photoViews = ['Front','Back','Close-up'];
designs.push(...[
  ['Ivory Cape Anarkali','Dresses','Women','Full-length Anarkali with cape sleeves and berry embroidery.'],
  ['Peach Bow Frock','Dresses','Girls','Tiered skirt, puff sleeves and a bow at the back.'],
  ['Royal Blue Keyhole Blouse','Blouses','Women','Square front neckline, elbow sleeves and a keyhole back.'],
  ['Emerald Tie-Back Pavadai Blouse','Blouses','Girls','Short sleeves, gold piping and a back tie.'],
  ['Wine Paisley Bridal Maggam','Maggam','Women','Paisley beadwork with a gold sleeve border.'],
  ['Yellow Lotus Kurta','Embroidery','Girls','Yellow silk kurta with lotus motifs and blue thread accents.'],
  ['Violet Floral Maggam Blouse','Maggam','Girls','Silk blouse with gold floral beads and a tie-back.'],
  ['Teal Floral Threadwork Blouse','Embroidery','Women','Floral threadwork on the sleeves and back neckline.']
].map(([name,category,audience,notes],index)=>({
  id:'views-'+index,name,category,audience,notes,
  sheet:'views-'+Math.floor(index/2),position:'0% '+(index%2?'100%':'0%'),
  photoRow:index%2?'100%':'0%'
})));
designs.push(...[
  ['Plum V-Neck Straight Dress','Women','V-neck and a straight skirt with minimal flare.','0% 0%'],
  ['Sky Blue Square-Neck A-Line Gown','Women','Square neckline with a gently flared hem.','100% 0%'],
  ['Rose Round-Neck Full-Flare Anarkali','Girls','Round neckline and a wide circular skirt.','0% 100%'],
  ['Ivory Sweetheart Tiered Frock','Girls','Sweetheart neckline and gathered tiers.','100% 100%']
].map(([name,audience,notes,position],index)=>({id:'silhouette-'+index,name,category:'Dresses',audience,notes,position,sheet:'silhouettes'})));
const designGroups = {Dresses:['Neckline','Skirt shape'],Blouses:['Neckline','Back style'],Maggam:['Motif','Embellishment'],Embroidery:['Technique','Placement']};
const designTraits = {"sample-0":["Round neck","Full flare"],
  "sample-1":["Split neck","Straight cut"],
  "sample-2":["Sweetheart neck",""],
  "sample-3":["High neck",""],
  "sample-4":["Bridal floral","Zari and beads"],
  "sample-5":["Floral threadwork","Neck and sleeves"],
  "girls-0":["","Tiered skirt"],
  "girls-1":["Round neck",""],
  "girls-2":["Leaf","Zari and beads"],
  "girls-3":["Floral threadwork","Body"],
  "variety-0":["Scoop neck","A-line"],
  "variety-1":["Round neck","Sharara set"],
  "variety-2":["V-neck","Full flare"],
  "variety-3":["Square neck",""],
  "variety-4":["","Dori tie"],
  "variety-5":["Peacock","Zari and beads"],
  "variety-6":["Mirror work","Body and sleeves"],
  "variety-7":["Square neck","Gathered skirt"],
  "variety-8":["Round neck","Pavadai set"],
  "variety-9":["Lotus","Zari and beads"],
  "variety-10":["Floral threadwork","Bodice and skirt"],
  "variety-11":["Floral threadwork","Sleeves"],
  "variety-12":["Scalloped border","Pearls"],
  "views-0":["Round neck","Full flare"],
  "views-1":["Round neck","Tiered skirt"],
  "views-2":["Square neck","Keyhole"],
  "views-3":["Square neck","Dori tie"],
  "views-4":["Paisley","Zari and beads"],
  "views-5":["Lotus threadwork","Body and sleeves"],
  "views-6":["Floral","Gold beads"],
  "views-7":["Floral threadwork","Neck and sleeves"],
  "silhouette-0":["V-neck","Straight cut"],
  "silhouette-1":["Square neck","A-line"],
  "silhouette-2":["Round neck","Full flare"],
  "silhouette-3":["Sweetheart neck","Tiered skirt"]};
const featuresOf = design => Object.hasOwn(designTraits,design.id)?designTraits[design.id]:[design.styleType||'',design.styleDetail||''];
const audiences = ['Women','Girls'];
const audienceOf = record => record.audience || 'Women';
const sizes = ['Chest / bust','Waist','Hip','Shoulder','Armhole','Sleeve length','Sleeve round','Front neck depth','Back neck depth','Blouse length','Dress length','Skirt length'];
const currency = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2});
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const money = value => currency.format(Number(value || 0));
const today = () => new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
const dateLabel = value => value ? new Date(value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
const customer = id => data.customers.find(item=>item.id===id);
const catalog = () => [...designs,...data.designs];
const button = (label,action,id='',secondary=false) => '<button type="button" class="'+(secondary?'secondary':'')+'" data-action="'+action+'" data-id="'+esc(id)+'">'+label+'</button>';
const heading = (title,desc,action='') => '<div class="heading"><div><h1>'+title+'</h1><p>'+desc+'</p></div>'+action+'</div>';
const table = (heads,rows,empty) => '<div class="panel table">'+(rows.length ? '<table><thead><tr>'+heads.map(h=>'<th scope="col">'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(cell=>'<td>'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table>' : '<div class="empty">'+empty+'</div>')+'</div>';
const art = (design,large=false,description=design.name) => '<div class="art '+(large?'dialog-art ':'')+(design.sheet?design.sheet+' ':design.position&&audienceOf(design)==='Girls'?'girls-art ':'')+(design.photo?'upload':'')+'" '+(design.position?'style="background-position:'+design.position+'" role="img" aria-label="'+esc(description)+'"':'')+'>'+(design.photo?'<img src="'+esc(design.photo)+'" alt="'+esc(design.name)+'">':'')+'</div>';
const designCards = list => list.length ? '<div class="grid">'+list.map(d=>'<article class="card"><div class="card-image">'+art(d)+'</div>'+'<div class="card-body"><small>'+esc(d.category)+' &middot; '+audienceOf(d)+(d.position?' · Reference design':'')+'</small><h3>'+esc(d.name)+'</h3>'+button('View design','view-design',d.id,true)+'</div></article>').join('')+'</div>' : '<div class="panel empty">No matching designs.</div>';
function orderDue(order){
  const date=dateLabel(order.due);
  return order.due&&order.due<today()&&order.status!=='Delivered'&&order.status!=='Ready'
    ? date+'<small class="overdue">Overdue</small>' : date;
}
function orderStatus(status){
  const step=statuses.indexOf(status);
  if(step<0)return '<span class="tag">'+esc(status)+'</span>';
  return '<span class="tag status-'+status.toLowerCase()+'">'+status+'</span>'+
    '<progress class="order-progress" max="'+statuses.length+'" value="'+(step+1)+'" aria-label="Order progress"></progress>';
}
const orderRows = list => list.map(o=>[esc(o.number),esc(customer(o.customer)?.name)+(o.wearerName?'<small>For '+esc(o.wearerName)+'</small>':''),esc(o.garment)+' &middot; '+audienceOf(o),orderDue(o),orderStatus(o.status),money(o.total-o.advance),button('Edit','order',o.id,true)]);
const orderTable = list => table(['Order','Customer','Garment','Due date','Status','Balance',''],orderRows(list),'No orders to show.');
const names = {overview:'Overview',orders:'Orders',designs:'Design catalog',customers:'Customers',contact:'Shop contact',backup:'Backup & Restore'};
let category = 'All designs';
let designFilters = ['',''];
let audience = '';
let query = '';
let activePage = '';
let activeRoute = '';
let orderView = 'open';
const orderViews = [['open','Open orders'],['today','Due today'],['ready','Ready for pickup'],['delivered','Delivered'],['all','All orders']];
const matches = (...values) => values.join(' ').toLowerCase().includes(query.toLowerCase().trim());
const search = placeholder => '<input id="search" type="search" aria-label="'+placeholder+'" placeholder="'+placeholder+'" value="'+esc(query)+'">';
function render() {
  const hash = location.hash.slice(1);
  const [route, customerId] = hash.split('/');
  const page = route==='measurements' ? 'customers' : Object.hasOwn(names,route) ? route : 'overview';
  if(hash!==activeRoute || page!==activePage){
    query='';category='All designs';audience='';designFilters=['',''];
    orderView=page==='orders'&&orderViews.some(([value])=>value===customerId)?customerId:'open';
    activeRoute=hash;activePage=page;
  }
  document.querySelector('.top-title').textContent=names[page];
  document.querySelector('.top-date').textContent=dateLabel(today());
  document.title = names[page]+' | Sonali Ladies Tailor';
  document.querySelectorAll('nav a').forEach(link=>{
    if(link.hash==='#'+page) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  const open = data.orders.filter(o=>o.status!=='Delivered');
  if(page==='overview'){
    const stats=[['Open orders',open.length,'orders/open'],['Due today',open.filter(o=>o.due===today()).length,'orders/today'],['Ready for pickup',open.filter(o=>o.status==='Ready').length,'orders/ready'],['Customers',data.customers.length,'customers']];
    const upcoming = [...open].sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
    main.innerHTML=heading('Shop overview','Orders, customer fittings, and your design catalog in one place.')+
      '<section class="hero"><div class="hero-copy"><h2>Custom tailoring for women and girls</h2><p>Browse dresses, blouses, maggam work and embroidery for the next fitting.</p><a class="button" href="#designs">Explore designs</a></div><div class="hero-gallery"><div class="hero-photo hero-dress" role="img" aria-label="Rose Anarkali dress"></div><div class="hero-photo hero-blouse" role="img" aria-label="Red bridal blouse with gold maggam work"></div></div></section>'+
      '<div class="stats">'+stats.map(([label,count,route])=>'<a class="stat" href="#'+route+'"><span>'+label+'</span><strong>'+count+'</strong></a>').join('')+'</div>'+
      '<div class="section-head"><h2>Upcoming orders</h2><a href="#orders">View orders</a></div>'+(upcoming.length?orderTable(upcoming):'<div class="panel overview-empty"><div><h3>No open orders</h3><p>Add an order to track its due date and payment.</p></div>'+button('New order','order','',true)+'</div>')+
      '<div class="section-head"><h2>Featured designs</h2><a href="#designs">Browse catalog</a></div>'+designCards([designs[0],designs[4],designs[6]]);
    return;
  }
  if(page==='designs'){
    main.innerHTML=heading('Design catalog','Choose a category to see its neckline, shape, or handwork filters.',button('＋ Add design','design'))+
      '<div class="toolbar">'+search('Search designs')+'<select id="audience-filter" aria-label="Filter by wearer" style="width:auto">'+option('','Women & girls',audience)+audiences.map(group=>option(group,group,audience)).join('')+'</select></div><div class="chips" aria-label="Design categories">'+['All designs',...categories].map(c=>'<button data-category="'+c+'" aria-pressed="'+(c===category)+'" class="'+(c===category?'':'secondary')+'">'+c+'</button>').join('')+'</div><div id="design-filters"></div><div id="results"></div>';
    renderDesignFilters();
  }
  if(page==='orders'){
    main.innerHTML=heading('Orders','Find orders by customer name, phone number, or order number.')+
      '<div class="toolbar order-search">'+search('Search orders')+'</div>'+
      '<div class="chips order-filters" aria-label="Show orders">'+orderViews.map(([value,label])=>
        '<button type="button" data-order-view="'+value+'" aria-pressed="'+(value===orderView)+'" class="'+(value===orderView?'':'secondary')+'">'+label+'</button>'
      ).join('')+'</div><div id="results"></div>';
  }
  if(page==='backup'){
    renderBackup();
    return;
  }
  if(page==='contact'){
    renderContact();
    return;
  }
  if(page==='customers' && customerId){
    renderCustomerDetails(customer(customerId));
    return;
  }
  if(page==='customers'){
    main.innerHTML=heading('Customers','Keep contact information and fitting preferences.',button('＋ Add customer','customer'))+
      '<div class="toolbar">'+search('Search customers')+'</div><div id="results"></div>';
  }
  renderResults();
}
function inOrderView(order){
  if(orderView==='open')return order.status!=='Delivered';
  if(orderView==='today')return order.status!=='Delivered'&&order.due===today();
  if(orderView==='ready')return order.status==='Ready';
  if(orderView==='delivered')return order.status==='Delivered';
  return true;
}
function renderOrderCards(orders){
  if(!orders.length){
    const message=query?'No orders match your search.':data.orders.length?'No orders in this view.':'No orders yet.';
    return '<div class="panel empty">'+message+'</div>';
  }
  return '<div class="order-list">'+orders.map(order=>{
    const contact=customer(order.customer);
    const remaining=Number(order.total||0)-Number(order.advance||0);
    const next=order.status==='Ready'?'Mark delivered':'Mark ready';
    return '<article class="panel order-card"><div class="order-summary"><small>'+esc(order.number)+'</small><h2>'+esc(contact?.name||'Customer')+'</h2>'+
      '<p>'+esc(order.garment)+(order.wearerName?' for '+esc(order.wearerName):'')+(order.design?' &middot; '+esc(order.design):'')+'</p></div>'+
      '<dl class="order-facts"><div><dt>Due date</dt><dd>'+orderDue(order)+'</dd></div>'+
      '<div><dt>Amount to collect</dt><dd>'+(remaining>0?money(remaining):Number(order.total)>0?'Paid in full':'No amount set')+'</dd></div>'+
      '<div><dt>Status</dt><dd>'+orderStatus(order.status)+'</dd></div></dl>'+
      '<div class="actions order-actions">'+button('View or edit','order',order.id,true)+
      (contact?'<a class="button secondary" href="#customers/'+encodeURIComponent(contact.id)+'/measurements">Measurements</a>':'')+
      (order.status==='Delivered'?'':button(next,'order-next',order.id))+'</div></article>';
  }).join('')+'</div>';
}
function changeOrderStatus(id){
  const order=data.orders.find(item=>item.id===id);
  if(!order||order.status==='Delivered')return;
  const nextStatus=order.status==='Ready'?'Delivered':'Ready';
  const next={...data,orders:data.orders.map(item=>item.id===id?{...item,status:nextStatus}:item)};
  try{localStorage.setItem(storageKey,JSON.stringify(next));}
  catch{notify('The status could not be saved.');return;}
  data=next;
  renderResults();
  document.querySelector('[data-order-view][aria-pressed="true"]')?.focus();
  notify(nextStatus==='Ready'?'Order marked ready for pickup.':'Order marked delivered.');
}
function designPhoto(design,index=0){
  if(!design.photoRow)return art(design,true);
  const position=(index*50)+'% '+design.photoRow;
  return art({...design,position},true,design.name+' - '+photoViews[index]);
}
function designGallery(design){
  if(!design.photoRow)return art(design,true);
  return '<div class="design-gallery"><div id="design-photo">'+designPhoto(design)+'</div>'+
    '<div class="chips design-views" aria-label="Design photo views">'+photoViews.map((label,index)=>
      '<button type="button" class="'+(index?'secondary':'')+'" data-photo-view="'+index+'" data-id="'+design.id+'" aria-pressed="'+(index===0)+'" aria-controls="design-photo">'+label+'</button>'
    ).join('')+'</div></div>';
}
function renderDesignFilters(){
  const target=document.querySelector('#design-filters');
  const labels=designGroups[category];
  target.innerHTML=labels?'<div class="design-filters">'+labels.map((label,index)=>{
    const values=[...new Set(catalog().filter(d=>d.category===category).map(d=>featuresOf(d)[index]).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    return '<label>'+label+'<select data-design-filter="'+index+'">'+option('','Any '+label.toLowerCase(),designFilters[index])+
      values.map(value=>option(value,value,designFilters[index])).join('')+'</select></label>';
  }).join('')+'</div>':'';
}
function designStyleInputs(group,record){
  const labels=designGroups[group];
  return input(labels[0]+' (optional)','styleType','text',record.styleType,'maxlength="60"')+
    input(labels[1]+' (optional)','styleDetail','text',record.styleDetail,'maxlength="60"');
}
function designFeatureDetails(design){
  const labels=designGroups[design.category];
  if(!labels)return '';
  const values=featuresOf(design);
  const rows=labels.map((label,index)=>values[index]?'<div><dt>'+label+'</dt><dd>'+esc(values[index])+'</dd></div>':'').join('');
  return rows?'<dl class="design-feature-details">'+rows+'</dl>':'';
}
function renderResults(){
  const target=document.querySelector('#results');
  if(!target)return;
  if(activePage==='designs'){
    const list=catalog().filter(d=>(category==='All designs'||d.category===category)&&(!audience||audienceOf(d)===audience)&&designFilters.every((value,index)=>!value||featuresOf(d)[index]===value)&&matches(d.name,d.category,d.notes,audienceOf(d),...featuresOf(d)));
    target.innerHTML='<p class="result-count" role="status">'+list.length+(list.length===1?' design':' designs')+'</p>'+designCards(list);
  }
  if(activePage==='orders'){
    const orders=data.orders.filter(o=>inOrderView(o)&&matches(o.number,o.garment,o.wearerName,audienceOf(o),customer(o.customer)?.name,customer(o.customer)?.phone,o.design));
    orders.sort((a,b)=>orderView==='delivered'?(b.due||'').localeCompare(a.due||''):(a.due||'9999').localeCompare(b.due||'9999'));
    target.innerHTML=renderOrderCards(orders);
  }
  if(activePage==='customers')target.innerHTML=table(
    ['Name','Phone','Orders',''],
    data.customers.filter(c=>matches(c.name,c.phone)).map(c=>[
      esc(c.name),esc(c.phone),data.orders.filter(o=>o.customer===c.id).length,
      '<a class="button secondary" href="#customers/'+esc(c.id)+'">View details</a>'
    ]),
    'No matching customers.'
  );
}
const contactNumber = value => String(value||'').replace(/[\s().-]/g,'');
const validContactNumber = value => /^\+[1-9]\d{6,14}$/.test(value);
const defaultContact = {phone:'',whatsapp:''};
const shopContact = () => ({...defaultContact,...data.contact});
const phoneHandset = '<path d="M5.5 3H9l1.7 4.4-2.3 1.8a14 14 0 0 0 6.4 6.4l1.8-2.3L21 15v3.5a2 2 0 0 1-2.2 2A18.7 18.7 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z"/>';
const phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+phoneHandset+'</svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 11.8a9.5 9.5 0 0 1-14 8.4L2.5 21.5l1.3-4.8A9.5 9.5 0 1 1 21.5 11.8Z"/><g transform="translate(5.3 4.5) scale(.56)">'+phoneHandset+'</g></svg>';
function renderContact(){
  const {phone,whatsapp}=shopContact();
  const links = [
    ['Phone',phone,number=>'tel:'+number,'phone',phoneIcon],
    ['WhatsApp',whatsapp,number=>'https://wa.me/'+number.slice(1),'whatsapp',whatsappIcon]
  ].filter(([,number])=>validContactNumber(number));
  main.innerHTML=heading('Shop contact','Manage the phone and WhatsApp numbers for Sonali Ladies Tailor.',button('Edit contact','contact','',true))+
    (links.length?links.map(([label,number,href,kind,icon])=>'<section class="panel contact-detail"><span class="contact-icon contact-icon-'+kind+'">'+icon+'</span><a class="contact-link" href="'+href(number)+'"><h2>'+label+'</h2><p>'+esc(number)+'</p></a></section>').join(''):
    '<div class="panel empty">Add a phone or WhatsApp number to show contact buttons.</div>');
}
function editContact(){
  const {phone,whatsapp}=shopContact();
  showDialog('Edit shop contact','<form id="contact-editor"><p class="measurement-customer">Include the country code, such as +91 for India.</p><div class="fields">'+
    input('Phone','phone','tel',phone,'maxlength="30" autocomplete="tel"')+
    input('WhatsApp','whatsapp','tel',whatsapp,'maxlength="30"')+
    '</div><p class="error" role="alert"></p><div class="actions"><button type="submit">Save contact</button>'+button('Cancel','close','',true)+'</div></form>');
  const form=body.querySelector('form');
  form.onsubmit=event=>{
    event.preventDefault();
    const fields=new FormData(form);
    const contact={phone:contactNumber(fields.get('phone')),whatsapp:contactNumber(fields.get('whatsapp'))};
    const error=form.querySelector('.error');
    if(Object.values(contact).some(number=>number&&!validContactNumber(number))){
      error.textContent='Enter each number with a + and its country code.';
      return;
    }
    const next={...data,contact};
    try{localStorage.setItem(storageKey,JSON.stringify(next));}
    catch{error.textContent='The browser could not save the contact details.';return;}
    data=next;
    dialog.close();
    render();
    notify('Shop contact saved.');
  };
}
const backupFields = {
  orders:['id','number','customer','garment','audience','wearerName','design','due','fitting','status','notes','total','advance'],
  customers:['id','name','phone','notes'],
  measurements:['id','customer','garment','audience','wearerName','date','unit','notes',...sizes.map((_,i)=>'size'+i)],
  designs:['id','name','category','audience','notes','photo','styleType','styleDetail']
};
function parseBackup(text){
  const backup=JSON.parse(text);
  if(backup?.format!=='sonali-tailoring-backup'||backup.version!==1)throw Error('Choose a backup file downloaded from Sonali Ladies Tailor.');
  const restored={contact:{}};
  for(const [group,fields] of Object.entries(backupFields)){
    const list=backup.records?.[group];
    if(!Array.isArray(list))throw Error('The backup is missing '+group+'.');
    const ids=new Set();
    restored[group]=list.map(row=>{
      if(!row||typeof row.id!=='string'||!/^[-a-z0-9_]+$/i.test(row.id)||ids.has(row.id))throw Error('The backup contains an invalid record.');
      ids.add(row.id);
      const record={};
      for(const field of fields){
        const value=row[field];
        if(value===undefined)continue;
        if(field==='total'||field==='advance'){
          if(typeof value!=='number'||!Number.isFinite(value)||value<0)throw Error('The backup contains an invalid payment.');
        }else if(typeof value!=='string')throw Error('The backup contains an invalid record.');
        if(field==='photo'&&!/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+=*$/.test(value))throw Error('The backup contains an invalid design photo.');
        if(field==='audience'&&!audiences.includes(value))throw Error('The backup contains an invalid wearer.');
        record[field]=value;
      }
      return record;
    });
  }
  const customerIds=new Set(restored.customers.map(record=>record.id));
  if([...restored.orders,...restored.measurements].some(record=>!customerIds.has(record.customer)))throw Error('An order or measurement has no matching customer.');
  if(restored.orders.some(order=>!/^\d{4}-\d{2}-\d{2}$/.test(order.due||'')||!statuses.includes(order.status)))throw Error('The backup contains an invalid order.');
  for(const key of ['phone','whatsapp']){
    const value=backup.records.contact?.[key];
    if(value===''||validContactNumber(value))restored.contact[key]=value;
  }
  return restored;
}
function renderBackup(){
  main.innerHTML=heading('Backup & Restore','Save a copy of the shop records or move them to another browser.')+
    '<div class="backup-grid"><section class="panel backup-card"><h2>Download backup</h2><p>Includes orders, customers, measurements, uploaded designs, and shop contact settings.</p>'+
    button('Download backup','backup-download')+'</section><section class="panel backup-card"><h2>Restore backup</h2><p>Choose a backup file and review it before replacing the records in this browser.</p>'+
    button('Choose backup file','backup-choose','',true)+'</section></div>';
}
function downloadBackup(){
  const backup={format:'sonali-tailoring-backup',version:1,records:data};
  const url=URL.createObjectURL(new Blob([JSON.stringify(backup)],{type:'application/json'}));
  const link=document.createElement('a');
  link.href=url;
  link.download='sonali-tailor-backup-'+today()+'.json';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function chooseBackup(){
  showDialog('Choose backup file','<form id="backup-form"><div class="fields"><label class="wide">Sonali Tailor backup file<input type="file" name="backup" accept=".json,application/json" required></label></div><p class="error" role="alert"></p><div class="actions"><button type="submit">Review backup</button>'+button('Cancel','close','',true)+'</div></form>');
  const form=body.querySelector('form');
  form.onsubmit=async event=>{
    event.preventDefault();
    const file=form.elements.backup.files[0];
    if(!file)return;
    const submit=form.querySelector('[type=submit]');
    submit.disabled=true;
    try{
      if(file.size>12*1024*1024)throw Error('The backup file is too large.');
      const restored=parseBackup(await file.text());
      if(dialog.open&&form.isConnected)reviewBackup(restored);
    }catch(error){form.querySelector('.error').textContent=error instanceof SyntaxError?'This file is not a valid backup.':error.message;}
    finally{submit.disabled=false;}
  };
}
function reviewBackup(restored){
  const counts=['orders','customers','measurements','designs'].map(key=>'<li>'+restored[key].length+' '+(key==='designs'?'uploaded designs':key)+'</li>').join('');
  showDialog('Restore these records?','<p>Restoring replaces the current shop records in this browser.</p><ul>'+counts+'</ul><form><p class="error" role="alert"></p><div class="actions"><button type="submit">Replace records and restore</button>'+button('Cancel','close','',true)+'</div></form>');
  const form=body.querySelector('form');
  form.onsubmit=event=>{
    event.preventDefault();
    try{localStorage.setItem(storageKey,JSON.stringify(restored));}
    catch{form.querySelector('.error').textContent='There is not enough browser storage to restore this backup.';return;}
    data=restored;
    dialog.close();
    render();
    notify('Backup restored.');
  };
}
function renderCustomerDetails(record){
  const back = '<p class="customer-back"><a href="#customers">All customers</a></p>';
  if(!record){
    main.innerHTML=back+heading('Customer unavailable','Choose a customer from your list.');
    return;
  }
  document.title=record.name+' | Sonali Ladies Tailor';
  const measurements=data.measurements.filter(m=>m.customer===record.id)
    .sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  main.innerHTML=back+heading(esc(record.name),'Customer details',button('Edit details','customer',record.id,true))+
    '<div class="panel"><h3>Phone</h3><p>'+esc(record.phone)+'</p>'+
    (record.notes?'<h3 class="customer-notes-title">Address or fitting preferences</h3><p class="customer-notes">'+esc(record.notes)+'</p>':'')+'</div>'+
    '<div class="section-head" id="customer-measurements" tabindex="-1"><h2>Measurements</h2>'+button('Add measurements','measure-for',record.id)+'</div>'+
    table(['Garment','Wearer','Measured on',''],measurements.map(m=>[
      esc(m.garment)+' &middot; '+esc(audienceOf(m)),esc(m.wearerName||record.name),dateLabel(m.date),
      button('View or edit','measurement',m.id,true)
    ]),'No measurements saved for this customer.');
}
const option = (id,label,selected) => '<option value="'+esc(id)+'"'+(id===selected?' selected':'')+'>'+esc(label)+'</option>';
const input = (label,name,type,value='',attrs='') => '<label>'+label+'<input name="'+name+'" type="'+type+'" value="'+esc(value)+'" '+attrs+'></label>';
const select = (label,name,options) => '<label>'+label+'<select name="'+name+'" required>'+options+'</select></label>';
const notes = (label,value) => '<label class="wide">'+label+'<textarea name="notes" maxlength="1500">'+esc(value)+'</textarea></label>';
const wearer = record => select('For','audience',audiences.map(group=>option(group,group,audienceOf(record))).join(''));
function designOptions(group, selected, keepPrevious = false) {
  const list = catalog().filter(d=>audienceOf(d)===group);
  const previous = keepPrevious && selected && !list.some(d=>d.name===selected);
  return option('','Custom design',selected)+(previous?option(selected,selected,selected):'')+
    list.map(d=>option(d.name,d.name,selected)).join('');
}
const newCustomerValue = '__new_customer__';
function orderCustomerFields(record){
  const selected=record.customer||(!data.customers.length?newCustomerValue:'');
  const adding=selected===newCustomerValue;
  return select('Customer','customer',option('','Choose customer',selected)+
    data.customers.map(c=>option(c.id,c.name+' - '+c.phone,selected)).join('')+
    option(newCustomerValue,'+ Add new customer',selected))+
    '<fieldset class="wide order-new-customer" '+(adding?'':'hidden disabled')+'><legend>New customer</legend>'+
    input('Customer name','newName','text','','required maxlength="100"')+
    input('Phone number','newPhone','tel','','required maxlength="30"')+'</fieldset>';
}
function showDialog(title,content){
  body.innerHTML='<div class="section-head"><h2 id="dialog-title">'+title+'</h2><button class="secondary close" data-action="close" aria-label="Close">✕</button></div>'+content;
  dialog.setAttribute('aria-labelledby','dialog-title');
  if(!dialog.open)dialog.showModal();
  body.querySelector('input,select,button[data-action="close"]')?.focus();
}
const newRecordId = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36)+Math.random().toString(36).slice(2);
const groups={order:'orders',customer:'customers',measurement:'measurements',design:'designs'};
function edit(kind,id='',prefill={}){
  const record=data[groups[kind]].find(r=>r.id===id);
  const r=record||prefill;
  let fields='';
  if(kind==='customer')fields=input('Name','name','text',r.name,'required maxlength="100"')+input('Phone','phone','tel',r.phone,'required maxlength="30"')+notes('Address or fitting preferences',r.notes);
  if(kind==='order'){
    const extra=Boolean(r.wearerName||r.design||r.fitting||r.notes);
    fields=orderCustomerFields(r)+select('Garment','garment',categories.map(c=>option(c,c,r.garment)).join(''))+wearer(r)+
      input('Due date','due','date',r.due||today(),'required')+
      select('Status','status',statuses.map(s=>option(s,s==='Ready'?'Ready for pickup':s,r.status)).join(''))+
      input('Total price (&#8377;)','total','number',r.total??0,'required min="0" step="0.01"')+
      input('Amount paid (&#8377;)','advance','number',r.advance??0,'required min="0" step="0.01"')+
      '<p class="wide order-balance">Amount to collect <strong id="order-balance"></strong></p>'+
      '<details class="wide order-extra" '+(extra?'open':'')+'><summary>Design, fitting date and notes</summary><div class="fields">'+
      input('Wearer name','wearerName','text',r.wearerName,'maxlength="100"')+input('Fitting date','fitting','date',r.fitting)+
      '<label class="wide">Design<select name="design">'+designOptions(audienceOf(r),r.design,true)+'</select></label>'+
      notes('Stitching notes',r.notes)+'</div></details>';
  }
  if(kind==='measurement'&&!customer(r.customer))return;
  if(kind==='measurement')fields=wearer(r)+input('Wearer name (optional)','wearerName','text',r.wearerName,'maxlength="100"')+select('Garment','garment',['Blouse','Dress','Frock','Pavadai'].map(g=>option(g,g,r.garment)).join(''))+
    input('Measured on','date','date',r.date||today(),'required')+select('Unit','unit',['in','cm'].map(u=>option(u,u==='in'?'Inches':'Centimetres',r.unit)).join(''))+
    sizes.map((size,i)=>input(size,'size'+i,'number',r['size'+i],'min="0.01" step="any"')).join('')+notes('Fit and extra measurements',r.notes);
  if(kind==='design')fields=input('Design name','name','text',r.name,'required maxlength="100"')+wearer(r)+select('Category','category',categories.map(c=>option(c,c,r.category)).join(''))+
    '<div class="wide design-style-inputs fields">'+designStyleInputs(r.category||categories[0],r)+'</div>'+
    '<label class="wide">Design photo<input name="photo" type="file" accept="image/jpeg,image/png,image/webp" '+(record?'':'required')+'></label>'+notes('Design details',r.notes);
  const label=kind==='measurement'?'measurements':kind;
  showDialog((record?'Edit ':kind==='measurement'?'Add ':'New ')+label,
    '<form id="editor">'+(kind==='measurement'?'<p class="measurement-customer">Customer: '+esc(customer(r.customer).name)+'</p>':'')+'<div class="fields">'+fields+'</div><p class="error" role="alert"></p><div class="actions"><button type="submit">Save '+label+'</button>'+button('Cancel','close','',true)+'</div></form>');
  const form=body.querySelector('form');
  if(kind==='design')form.elements.category.onchange=()=>{
    form.querySelector('.design-style-inputs').innerHTML=designStyleInputs(form.elements.category.value,{});
  };
  if(kind==='order'){
    const {customer:customerInput,audience:wearerInput,design,total,advance}=form.elements;
    const newCustomer=form.querySelector('.order-new-customer');
    customerInput.onchange=()=>{
      newCustomer.hidden=newCustomer.disabled=customerInput.value!==newCustomerValue;
      if(!newCustomer.hidden)form.elements.newName.focus();
    };
    wearerInput.onchange=()=>{design.innerHTML=designOptions(wearerInput.value,design.value);};
    const updateBalance=()=>{
      form.querySelector('#order-balance').textContent=money(Math.max(0,Number(total.value)-Number(advance.value)));
    };
    total.oninput=advance.oninput=updateBalance;
    updateBalance();
  }
  form.onsubmit=async event=>{
    event.preventDefault();
    const submit=form.querySelector('[type=submit]');
    submit.disabled=true;
    try{
      const values=Object.fromEntries(new FormData(form));
      for(const key in values)if(typeof values[key]==='string')values[key]=values[key].trim();
      if(('name' in values&&!values.name)||('phone' in values&&!values.phone))throw Error('Enter a name and phone number for a customer, or a name for a design.');
      let addedCustomer;
      if(kind==='order'){
        values.total=Number(values.total);
        values.advance=Number(values.advance);
        if(values.advance>values.total)throw Error('Amount paid cannot be more than the total price.');
        if(values.fitting && values.fitting>values.due)throw Error('Choose a fitting date on or before the due date.');
        if(values.customer===newCustomerValue){
          if(!values.newName||!values.newPhone)throw Error('Enter the new customer name and phone number.');
          addedCustomer={id:newRecordId(),name:values.newName,phone:values.newPhone,notes:''};
          values.customer=addedCustomer.id;
        }
        delete values.newName;
        delete values.newPhone;
        values.number=record?.number||'ST-'+String(data.orders.length+1).padStart(4,'0');
      }
      if(kind==='measurement'){
        if(!sizes.some((_,index)=>values['size'+index])&&!values.notes)throw Error('Enter at least one measurement or a fitting note.');
        values.customer=r.customer;
      }
      if(kind==='design')values.photo=values.photo.size?await compressPhoto(values.photo):record?.photo;
      const saved={...values,id:record?.id || newRecordId()};
      const list=data[groups[kind]];
      const next={...data,[groups[kind]]:record?list.map(item=>item.id===id?saved:item):[saved,...list]};
      if(addedCustomer)next.customers=[addedCustomer,...data.customers];
      localStorage.setItem(storageKey,JSON.stringify(next));
      data=next;
      dialog.close();
      render();
      notify(label[0].toUpperCase()+label.slice(1)+' saved.');
    }catch(error){
      form.querySelector('.error').textContent=error.name==='QuotaExceededError'?'Browser storage is full. Try a smaller design photo.':error.message;
    }finally{submit.disabled=false;}
  };
}
async function compressPhoto(file){
  if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Choose a JPEG, PNG or WebP photo.');
  const url=URL.createObjectURL(file);
  try{
    const image=new Image();
    image.src=url;
    await image.decode();
    const scale=Math.min(1,900/Math.max(image.width,image.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(image.width*scale));
    canvas.height=Math.max(1,Math.round(image.height*scale));
    canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
    return canvas.toDataURL('image/webp',.82);
  }catch{throw Error('This photo could not be opened. Try another image.');}
  finally{URL.revokeObjectURL(url);}
}
let timer;
function notify(message){
  const notice=document.querySelector('#notice');
  notice.textContent=message;
  clearTimeout(timer);
  timer=setTimeout(()=>notice.textContent='',3500);
}
document.querySelector('[data-skip-link]').onclick=event=>{event.preventDefault();main.focus();};
document.addEventListener('click',event=>{
  const control=event.target.closest('button[data-action],button[data-category],button[data-order-view],button[data-photo-view]');
  if(!control)return;
  if(control.dataset.photoView!==undefined){
    const design=designs.find(item=>item.id===control.dataset.id);
    const index=Number(control.dataset.photoView);
    const photo=document.querySelector('#design-photo');
    if(!design?.photoRow||!photo||!photoViews[index])return;
    photo.innerHTML=designPhoto(design,index);
    dialog.querySelectorAll('[data-photo-view]').forEach(button=>{
      const selected=button===control;
      button.setAttribute('aria-pressed',String(selected));
      button.classList.toggle('secondary',!selected);
    });
    return;
  }
  if(control.dataset.orderView){
    orderView=control.dataset.orderView;
    document.querySelectorAll('[data-order-view]').forEach(chip=>{
      const selected=chip.dataset.orderView===orderView;
      chip.setAttribute('aria-pressed',String(selected));
      chip.classList.toggle('secondary',!selected);
    });
    renderResults();
    return;
  }
  if(control.dataset.category){
    if(category!==control.dataset.category)designFilters=['',''];
    category=control.dataset.category;
    document.querySelectorAll('[data-category]').forEach(chip=>{
      const chosen=chip.dataset.category===category;
      chip.setAttribute('aria-pressed',String(chosen));
      chip.classList.toggle('secondary',!chosen);
    });
    renderDesignFilters();
    renderResults();
    return;
  }
  const {action,id}=control.dataset;
  if(action==='close')dialog.close();
  if(action==='contact')editContact();
  if(action==='backup-download')downloadBackup();
  if(action==='backup-choose')chooseBackup();
  if(action==='order-next')changeOrderStatus(id);
  if(Object.hasOwn(groups,action))edit(action,id);
  if(action==='measure-for')edit('measurement','',{customer:id});
  if(action==='view-design'){
    const d=catalog().find(item=>item.id===id);
    if(d)showDialog(esc(d.name),designGallery(d)+'<p>'+esc(d.category)+' &middot; '+audienceOf(d)+(d.position?' · Reference design':'')+'</p><p>'+esc(d.notes)+'</p>'+designFeatureDetails(d)+'<div class="actions dialog-actions">'+button('Use in order','design-order',d.id)+(d.photo?button('Edit design','design',d.id,true):'')+'</div>');
  }
  if(action==='design-order'){
    const d=catalog().find(item=>item.id===id);
    if(d)edit('order','',{design:d.name,garment:d.category,audience:audienceOf(d)});
  }
});
document.addEventListener('input',event=>{if(event.target.id==='search'){query=event.target.value;renderResults();}});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-design-filter]')){
    designFilters[Number(event.target.dataset.designFilter)]=event.target.value;
    renderResults();
  }
});
document.addEventListener('change',event=>{if(event.target.id==='audience-filter'){audience=event.target.value;renderResults();}});
function measurementJumpTarget(){
  return /^#customers\/[^/]+\/measurements$/.test(location.hash)?document.querySelector('#customer-measurements'):null;
}
let pageTransition;
window.addEventListener('hashchange',()=>{
  function updatePage(){
    render();
    window.scrollTo(0,0);
    const target=measurementJumpTarget();
    if(target)target.focus();
    else main.focus({preventScroll:true});
  }
  if(!document.startViewTransition||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    updatePage();
    return;
  }
  pageTransition?.skipTransition();
  pageTransition=document.startViewTransition(updatePage);
});
window.addEventListener('storage',event=>{if(event.key===storageKey&&event.newValue){data={contact:{},...JSON.parse(event.newValue)};render();}});
render();
measurementJumpTarget()?.focus();

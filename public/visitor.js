'use strict';
const main = document.querySelector('#main');
const dialog = document.querySelector('#design-dialog');
const photoBody = document.querySelector('#design-body');
const filters = {category:'',audience:'',query:'',traits:['','']};

function render(){
  const showingCatalog = location.hash==='#designs';
  const page = showingCatalog?'#designs':'#home';
  if(location.hash!==page) history.replaceState(null,'',page);
  document.querySelectorAll('nav a').forEach(link=>{
    if(link.hash===page)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(!showingCatalog){
    document.title='Sonali Ladies Tailor';
    main.innerHTML='<section class="hero public-hero"><div class="hero-copy"><h1>Custom tailoring for women and girls</h1>'+
      '<p>Explore dresses, blouses, maggam work and embroidery.</p><a class="button" href="#designs">Explore designs</a></div>'+
      '<div class="hero-gallery"><div class="hero-photo hero-dress" role="img" aria-label="Rose Anarkali dress"></div>'+
      '<div class="hero-photo hero-blouse" role="img" aria-label="Bridal maggam blouse"></div></div></section>'+
      '<div class="section-head"><h2>Featured designs</h2><a href="#designs">Browse catalog</a></div>'+
      designCards(['sample-0','views-4','silhouette-2'].map(id=>designs.find(design=>design.id===id)));
    return;
  }
  document.title='Design catalog | Sonali Ladies Tailor';
  main.innerHTML=heading('Design catalog','Browse reference designs by wearer, garment style, and type of handwork.')+
    '<div class="toolbar"><input id="design-search" type="search" aria-label="Search designs" placeholder="Search designs" value="'+esc(filters.query)+'">'+
    '<select id="wearer-filter" aria-label="Filter by wearer">'+option('','Women & girls',filters.audience)+
      audiences.map(group=>option(group,group,filters.audience)).join('')+'</select></div>'+
    '<div class="chips" aria-label="Design categories">'+['',...categories].map(group=>
      '<button type="button" class="'+(filters.category===group?'':'secondary')+'" data-category="'+group+'" aria-pressed="'+(filters.category===group)+'">'+(group||'All designs')+'</button>'
    ).join('')+'</div><div id="design-filters"></div><div id="results"></div>';
  renderFilters();
  renderResults();
}
function renderFilters(){
  const target=document.querySelector('#design-filters');
  const labels=designGroups[filters.category];
  target.innerHTML=labels?'<div class="design-filters">'+labels.map((label,index)=>{
    const values=[...new Set(designs.filter(d=>d.category===filters.category)
      .map(d=>featuresOf(d)[index]).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    return '<label>'+label+'<select data-trait="'+index+'">'+option('','Any '+label.toLowerCase(),filters.traits[index])+
      values.map(value=>option(value,value,filters.traits[index])).join('')+'</select></label>';
  }).join('')+'</div>':'';
}
function renderResults(){
  const query=filters.query.toLowerCase().trim();
  const list=designs.filter(d=>(!filters.category||d.category===filters.category)
    &&(!filters.audience||audienceOf(d)===filters.audience)
    &&filters.traits.every((value,index)=>!value||value===featuresOf(d)[index])
    &&[d.name,d.category,d.notes,audienceOf(d),...featuresOf(d)].join(' ').toLowerCase().includes(query));
  document.querySelector('#results').innerHTML='<p class="result-count" role="status">'+list.length+
    (list.length===1?' design':' designs')+'</p>'+designCards(list);
}
document.addEventListener('click',event=>{
  const control=event.target.closest('button[data-action],button[data-category],button[data-photo-view]');
  if(!control)return;
  const {action,category,id,photoView}=control.dataset;
  if(category!==undefined){
    if(filters.category!==category)filters.traits=['',''];
    filters.category=category;
    document.querySelectorAll('[data-category]').forEach(button=>{
      const selected=button===control;
      button.setAttribute('aria-pressed',String(selected));
      button.classList.toggle('secondary',!selected);
    });
    renderFilters();
    renderResults();
  }
  if(action==='view-design'){
    const design=designs.find(item=>item.id===id);
    if(!design)return;
    photoBody.innerHTML='<div class="section-head"><h2 id="design-title">'+esc(design.name)+'</h2>'+
      '<button type="button" class="secondary close" data-action="close" aria-label="Close">&#10005;</button></div>'+
      designGallery(design)+'<p>'+esc(design.notes)+'</p>'+designFeatureDetails(design);
    dialog.showModal();
  }
  if(action==='close')dialog.close();
  if(photoView!==undefined){
    const design=designs.find(item=>item.id===id);
    const index=Number(photoView);
    if(!design?.photoRow||!photoViews[index])return;
    photoBody.querySelector('#design-photo').innerHTML=designPhoto(design,index);
    photoBody.querySelectorAll('[data-photo-view]').forEach(button=>{
      const selected=button===control;
      button.setAttribute('aria-pressed',String(selected));
      button.classList.toggle('secondary',!selected);
    });
  }
});
main.addEventListener('input',event=>{
  if(event.target.id!=='design-search')return;
  filters.query=event.target.value;
  renderResults();
});
main.addEventListener('change',event=>{
  const {id,dataset,value}=event.target;
  if(id==='wearer-filter')filters.audience=value;
  else if(dataset.trait!==undefined)filters.traits[Number(dataset.trait)]=value;
  else return;
  renderResults();
});
window.addEventListener('hashchange',()=>{
  if(dialog.open)dialog.close();
  render();
  window.scrollTo(0,0);
  main.focus({preventScroll:true});
});
render();


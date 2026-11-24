'use strict';
const categories = ['Dresses','Blouses','Maggam','Embroidery'];
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
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const button = (label,action,id='',secondary=false) => '<button type="button" class="'+(secondary?'secondary':'')+'" data-action="'+action+'" data-id="'+esc(id)+'">'+label+'</button>';
const heading = (title,desc,action='') => '<div class="heading"><div><h1>'+title+'</h1><p>'+desc+'</p></div>'+action+'</div>';
const art = (design,large=false,description=design.name) => '<div class="art '+(large?'dialog-art ':'')+(design.sheet?design.sheet+' ':design.position&&audienceOf(design)==='Girls'?'girls-art ':'')+(design.photo?'upload':'')+'" '+(design.position?'style="background-position:'+design.position+'" role="img" aria-label="'+esc(description)+'"':'')+'>'+(design.photo?'<img src="'+esc(design.photo)+'" alt="'+esc(design.name)+'">':'')+'</div>';
const designCards = list => list.length ? '<div class="grid">'+list.map(d=>'<article class="card"><div class="card-image">'+art(d)+'</div>'+'<div class="card-body"><small>'+esc(d.category)+' &middot; '+audienceOf(d)+(d.position?' · Reference design':'')+'</small><h3>'+esc(d.name)+'</h3>'+button('View design','view-design',d.id,true)+'</div></article>').join('')+'</div>' : '<div class="panel empty">No matching designs.</div>';
const option = (id,label,selected) => '<option value="'+esc(id)+'"'+(id===selected?' selected':'')+'>'+esc(label)+'</option>';
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
function designFeatureDetails(design){
  const labels=designGroups[design.category];
  if(!labels)return '';
  const values=featuresOf(design);
  const rows=labels.map((label,index)=>values[index]?'<div><dt>'+label+'</dt><dd>'+esc(values[index])+'</dd></div>':'').join('');
  return rows?'<dl class="design-feature-details">'+rows+'</dl>':'';
}

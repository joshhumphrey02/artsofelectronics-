module.exports = {
  features: (products)=>{
    let categories = [ "Accessories", "Modules", "Sensors", "Batteries", "Ic's"];
    let items = [];
    categories.forEach((cat, i)=>{
      let pixs = [];
      for(let catPix=0; catPix<products.length; catPix++){
        if(products[catPix].category == cat && pixs.length < 4){
          pixs.push(products[catPix].image);
        }
      }
      items.push(
        {
          category: cat,
          pix1: pixs[0],
          pix2: pixs[1],
          pix3: pixs[2]
        }
      )
    })
      return items;
  },
  mobileFeatures: (products)=>{
    let categories = [ "Accessories", "Modules", "Sensors", "Batteries", "Ic's", "Diodes", "Capacitors", "Resistors" ];
    let items = [];
    categories.forEach(cat=>{
      let pixs = [];
      for(let catPix=0; catPix<products.length; catPix++){
        if(products[catPix].category == cat && pixs.length < 2){
          pixs.push(products[catPix].image);
        }
      }
      items.push(
        {
          category: cat,
          pix1: pixs[0],
        }
      )
    })
      return items;
  },
  recent: (products, length)=>{
    let rows = [];
    for(let b=0; b<length; b++){
      rows.push(products[b]);
    }
    return rows;
  },
  rows: (products, categories, category, length)=>{let items = [];
    categories.forEach((cat, i)=>{
      let sub = [];
      for(let catPix=0; catPix<products.length; catPix++){
        if(products[catPix].sub_category == cat.type && sub.length < length){
          sub.push({...products[catPix]});
        }
      }
      items.push(
        {
          category: category,
          type: cat.type,
          sub
        }
      )
    })
      return items;
  },
}
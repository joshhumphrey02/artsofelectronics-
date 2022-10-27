exports.features = (products, categories)=>{
  let items = [];
  categories.forEach(cat=>{
    let pixs = [];
    for(let catPix=0; catPix<products.length; catPix++){
      if(products[catPix].category == cat && pixs.length < 4){
        pixs.push(products[catPix].image);
      }
    }
    items.push(
      {
        category: cat == "Accessories" ? "Maintenance And Repairs" : cat,
        pix1: pixs[0],
        pix2: pixs[1],
        pix3: pixs[2]
      }
    )
  })
    return items;
}

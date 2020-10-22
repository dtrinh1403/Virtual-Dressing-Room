$(document).ready(()=>{
   let chosenList = new ListChosen();


  const render = () =>{
    let callData = new CallData;
    callData
    .getListData()
    .done((res) =>{
      //  console.log(res.navPills);
      //  console.log(res.tabPanes);

       let navPillsUI = "";
       let tabPaneUI = "";

       res.navPills.forEach((tabItem,index) => {
         let activeClass = tabItem.tabName === "tabTopClothes" ? "active" : "";
         let fadeClass = tabItem.tabName !== "tabTopClothes" ? "fade" : "";
         

         navPillsUI += getTabRender(tabItem,activeClass);
         tabPaneUI += `
         <div id = "${tabItem.tabName}" class="container tab-pane ${fadeClass} ${activeClass} ">
                <div class = "row">
                   ${renderTabPane(tabItem.tabName, res.tabPanes)}
                </div>
         </div>

         `
        
         
        });
        
        //DOM to HTML render
        $(".nav-pills").html(navPillsUI);
        $(".tab-content").html(tabPaneUI);

    })
    .fail((err)=>{
      console.log(err);
    })
  }

  render();
  //=============render nav pills===============
  const getTabRender = (tabItem, activeClass) =>{
    return  `
    <li class="nav-item">
    <a class="nav-link ${activeClass} btn-default" data-toggle="pill" href="#${tabItem.tabName}"> ${tabItem.showName}</a>
    </li>
    `
  }

  

   //=============render tab pane===============

   const getProductTypeMatch = (tabType, arrayProductTabPane) =>{
     let matchedProduct = [];
      arrayProductTabPane.forEach((item,index)=>{
         if(item.type  === tabType){
           matchedProduct.push(item);
         }
      })
      return matchedProduct;
   }

   const renderProduct = (matchedProduct) =>{
     let productUI = "";
      matchedProduct.forEach((product) =>{
        productUI += `
              <div class = "col-md-3">
                    <div class = "card text-center mb-3 mt-3 card-product">
                         <img  class = "imgReal" src = ${product.imgSrc_jpg} >
                       
                        <h4 class = "product-name" ><b> ${product.name} </b></h4>
                        <button class = "tryon" data-id = "${product.id}" data-type = "${product.type}" data-name = "${product.name}" data-desc = "${product.desc}"
                        data-imgsrcjpg = "${product.imgSrc_jpg}" data-imgsrcpng = "${product.imgSrc_png}"> Try this on ! </button>
                    </div>
              </div>
       `
      })

      return productUI;

  }
   const renderTabPane = (tabName, arrayProductTabPane) =>{
     let matchedProduct = null;
     let tabPaneUI = null;

       switch(tabName){
         case "tabTopClothes":
           matchedProduct = getProductTypeMatch("topclothes", arrayProductTabPane);
           tabPaneUI = renderProduct(matchedProduct);
           break;

          case "tabBotClothes":
            matchedProduct = getProductTypeMatch("botclothes", arrayProductTabPane);
            tabPaneUI = renderProduct(matchedProduct);
            break;

          case "tabShoes":
              matchedProduct = getProductTypeMatch("shoes", arrayProductTabPane);
              tabPaneUI = renderProduct(matchedProduct);
              break;

          case "tabHandBags":
              matchedProduct = getProductTypeMatch("handbags", arrayProductTabPane);
                tabPaneUI = renderProduct(matchedProduct);
                break;

          case "tabNecklaces":
              matchedProduct = getProductTypeMatch("necklaces", arrayProductTabPane);
              tabPaneUI = renderProduct(matchedProduct);
              break;


                

          case "tabHairStyle":
                matchedProduct = getProductTypeMatch("hairstyle", arrayProductTabPane);
                tabPaneUI = renderProduct(matchedProduct);
                break;
                    
          case "tabBackground":
                matchedProduct = getProductTypeMatch("background", arrayProductTabPane);
                tabPaneUI = renderProduct(matchedProduct);
                break;

            default:
            break;
       }
       return tabPaneUI;
}

const checkIndexAvailability = (chosenType) =>{
  let index = -1;
  if(chosenList.arr && chosenList.arr.length > 0){
    chosenList.arr.forEach((item,i) =>{
      if(item.type === chosenType){
        
        index = i

      }
  });
}
return index;

  

}

$("body").delegate(".tryon", "click", function(){ 
  let id = $(this).data("id");
  let name = $(this).data("name");
  let type = $(this).data("type");
  let desc = $(this).data("desc");
  let imgSrc_jpg = $(this).data("imgsrcjpg");
  let imgSrc_png = $(this).data("imgsrcpng");

  let chosenItem = new ChoseItem(id,type,name,desc,imgSrc_jpg,imgSrc_png);


  let index = checkIndexAvailability(chosenItem.type);
  if(index != -1){
    //UPDATE
    chosenList.arr[index] = chosenItem;
  }
  else{
    //ADD
    chosenList.addItem(chosenItem);
  }
 
  console.log(chosenList.arr);
  renderModel(chosenList.arr);


});

const renderModel = (chosenItemsArray) => {
   if(chosenItemsArray && chosenItemsArray.length > 0){
     chosenItemsArray.forEach((item)=>{
       switch(item.type){
         case"topclothes":
         renderBikiniTop(item.imgsrc_png);
         break;

         case "botclothes":
           renderBikiniBot(item.imgsrc_png);
           break;


          case "shoes":
            renderShoes(item.imgsrc_png);
            break;

          case "handbags":
              renderBags(item.imgsrc_png);
              break;

          case "necklaces":
              renderNeck(item.imgsrc_png);
              break;

          case "hairstyle":
              renderHair(item.imgsrc_png);
              break;

          case "background":
              renderBackground(item.imgsrc_png);
              break;
         
       }
     })
   }
} 

const renderBikiniTop = (img) =>{
  $(".bikinitop").css({
    width: "500px",
    height: "500px",
    background: `url(${img})`,
    position: "absolute",
    top: "-9%",
    left: "-5%",
    zIndex: "3",
    transform: "scale(0.5)"
  })
}
const renderBikiniBot = (img) =>{
  $(".bikinibottom").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    top: "-30%",
    left: "-5%",
    zIndex: "2",
    transform: "scale(0.5)"
  })
}

const renderShoes = (img) =>{
  $(".feet").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-37%",
    right: "-3.5%",
    zIndex: "1",
    transform: "scale(0.5)"
  })
}

const renderBags = (img) =>{
  $(".handbag").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-40%",
    right: "-3.5%",
    zIndex: "4",
    transform: "scale(0.5)"
  })
}

const renderNeck = (img) =>{
  $(".necklace").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-40%",
    right: "-3.5%",
    zIndex: "4",
    transform: "scale(0.5)"
  })
}

const renderHair = (img) =>{
  $(".hairstyle").css({
    width: "1000px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    top: "-75%",
    right: "-57%",
    zIndex: "4",
    transform: "scale(0.15)"
  })
}


const renderBackground = (img) =>{
  $(".background").css({
   backgroundImage: `url(${img})`
  })
}
});
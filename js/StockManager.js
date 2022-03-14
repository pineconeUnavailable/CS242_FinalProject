let stock = new Array();

{
    let i = new DisplayItem;
    i.itemID = "PowderedSugar";
    i.itemName = "Powdered Sugar";
    i.unitCost = "500";
    i.quantity = 500;
    i.imageUrl = "https://m.media-amazon.com/images/I/812zAGhL84L._SL1500_.jpg";
    stock.push(i)
}

{
    let i = new DisplayItem;
    i.itemID = "FreeGun";
    i.itemName = "Free Gun!!";
    i.unitCost = "0";
    i.quantity = 1;
    i.imageUrl = "";
    stock.push(i)
}

{
    let i = new DisplayItem;
    i.itemID = "Soap";
    i.itemName = "Soap";
    i.unitCost = "30";
    i.quantity = 10;
    i.imageUrl = "https://www.oddee.com/wp-content/uploads/_media/imgs/articles2/a96821_a515_baby-hand-soap2.jpg";
    stock.push(i)
}

{
    let i = new DisplayItem;
    i.itemID = "";
    i.itemName = "";
    i.unitCost = "";
    i.quantity = "";
    i.imageUrl = "";
    stock.push(i)
}

try{
    let stockDisplay = document.getElementById("stock");
    stock.forEach(item => {
        stockDisplay.appendChild(item.render());
    });
} catch {}




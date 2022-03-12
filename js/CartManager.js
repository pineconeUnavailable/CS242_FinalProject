function getCart(cartJSON) {
    try { //deserialize existing cart
        let obj = JSON.parse(cartJSON);
        if (obj == null) {
            console.log("Unable to Parse Cart\nCreated new cart");
            return new Cart;
        }
        console.log("Loaded existing cart");

        return Cart.from(obj);
    } catch (error) { //new cart
        console.log(error);
        console.log("Created new cart");
        return new Cart;
    }
}

var assignID = (function () {
    let i = 1;

    return function () {
        return i++;
    }
})();

class Item {
    constructor() {
        this.itemInstId = assignID();
        this.itemID = "aw4at36ds";
        this.itemName = "Soap";
        this.unitCost = "30.00";
        this.quantity = 1;
        this.imageUrl = "";
        this.isDisplay = false;
    }

    static from(itemObject) {
        return Object.assign(new Item, itemObject);
    }

    render() {
        let node = document.createElement("li").appendChild(document.createElement("div"));
        let btn = document.createElement("button");
        console.log(this.isDisplay);
        if(this.isDisplay == false){
            btn.onclick = () => { cart.removeGuiItem(node, this.itemInstId) };
            btn.appendChild(document.createTextNode("X"));
            btn.classList.add("close");
        } else {
            btn.onclick = () => {
                console.log(this);
                let cpy = Object.create(new Item);
                cpy.unitCost = this.unitCost;
                cpy.quantity = 1;

                cpy.itemID = "Soap";
                cpy.itemName = "Soap2";
                cpy.unitCost = "300";
                cpy.quantity = 10;
                cpy.imageUrl = "example.com"

                console.log("NOT YET IMPLEMENTED\n this value:");
                console.log(this);
                cart.addGuiItem(document.getElementById("cart-sidebar"), this);
            };
            btn.onclick.bind(this);
            
            btn.appendChild(document.createTextNode("✓"));
            btn.classList.add("add");
        }
        node.appendChild(btn);

        node.appendChild(document.createTextNode(this.itemName));
        node.appendChild(document.createElement("br"));
        node.appendChild(document.createTextNode("$"));
        node.appendChild(document.createTextNode(this.unitCost));
        node.appendChild(document.createElement("br"));

        if(this.isDisplay == true){
            node.appendChild(document.createElement("Available:"));
        }
        node.appendChild(document.createTextNode(this.quantity));
        node.classList.add("text");
        node.classList.add("hidden-list");
        node.classList.add("item");

        if(this.imageUrl != undefined){
            node.appendChild(document.createElement("br"));
            let img = document.createElement("img");
            img.src = this.imageUrl;
            img.style.height = "auto";
            img.style.marginLeft = "auto";
            img.style.marginRight = "auto";
            img.style.width = "80%";
            img.style.display = "block";

            node.appendChild(img);
            this.imageUrl = undefined;
        }

        return node;
    }
}

class DisplayItem extends Item {
    constructor() {
        super();
    }

    render(){
        let node = document.createElement("li").appendChild(document.createElement("div"));
        let btn = document.createElement("button");
        
    }
}

class Cart {
    constructor() {
        this.items = new Array();
    }

    static from(cartObject) {
        let c = Object.assign(new Cart, cartObject);
        c.items = Object.assign(new Array, c.items);
        c.items.forEach((item, i) => {
            c.items[i] = Object.assign(new Item, item);
        });
        return c;
    }

    renderTo(element) {
        cartItems.innerHTML = "";
        this.items.forEach(item => {
            element.appendChild(item.render());
        });
    }

    getItems() {
        return items;
    }

    addGuiItem(node, item){
        this.renderTo(node);
        this.addItem(item);
    }

    addItem(item) {
        this.items += item;
    }

    removeGuiItem(node, item) {
        node.remove();
        this.removeItem(item);
    }

    
    removeItem(itemInstID) {
        this.items.forEach((element, i, arr) => {
            if (element.itemInstId == itemInstID) {
                arr.splice(i, 1)
            }
        });
    }

    clearGui(node){
        node.innerHTML = "";
        this.clear();
    }

    clear(){
        this.items.clear();
    }
}





/*--------------------------------------------------*/
//The following 2 functions are from this source:
//https://stackoverflow.com/questions/11344531/pure-javascript-store-object-in-cookie
function read_cookie(name) {
    // var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    // result && (result = JSON.parse(result[1]));
    result = document.cookie;
    return result;
}

function bake_cookie(name, value) {
    // let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    let cookie = JSON.stringify(value);
    document.cookie = cookie;
}
/*--------------------------------------------------*/





var cart = getCart(read_cookie("CartData"));
window.onbeforeunload = () => { bake_cookie("CartData", cart); };
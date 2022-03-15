// function getCart(cartJSON) {
//     try { //deserialize existing cart
//         let obj = JSON.parse(cartJSON);
//         if (obj == null) {
//             console.log("Unable to Parse Cart\nCreated new cart");
//             return new Cart;
//         }
//         console.log("Loaded existing cart");

//         return Cart.from(obj);
//     } catch (error) { //new cart
//         console.log(error);
//         console.log("Created new cart");
//         return new Cart;
//     }
// }

var assignID = (function () {
    let i = 1;

    return function () {
        return i++;
    }
})();

class Item {
    constructor(itemID, itemName, unitCost, quantity, imageUrl) {
        this.itemInstId = assignID();
        if(itemID != null){
            this.itemID = itemID;
            this.itemName = itemName;
            this.unitCost = unitCost;
            this.quantity = quantity;
            this.imageUrl = imageUrl;
            
        } else {
            this.itemID = "NULL_ITEM";
            this.itemName = "NULL ITEM";
            this.unitCost = "10000000";
            this.quantity = 0;
        }
        this.imageShown = false;
        this.isDisplay = false;
    }

    static from(itemObject) {
        return Object.assign(new Item, itemObject);
    }

    render() {
        let node = document.createElement("li").appendChild(document.createElement("div"));
        let btn = document.createElement("button");
        // ----------- Close Button -----------//
        btn.onclick = () => { cart.removeGuiItem(document.getElementById("cartItems"), this.itemInstId) };
        btn.appendChild(document.createTextNode("X"));
        btn.classList.add("close");
        node.appendChild(btn);

        // ----------- Name and Unit Cost -----------//
        node = this.renderBase(node);

        node.appendChild(document.createTextNode(this.quantity));
        node.appendChild(document.createTextNode(" "));

        // ----------- Display & Toggle Image -----------//
        if(this.imageUrl != undefined && this.imageShown == true){
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

        // ----------- Quantity Increment / Decrement -----------//
        

        let btnLess = document.createElement("button");
        btnLess.onclick = () =>{this.changeAmt(-1);};
        btnLess.appendChild(document.createTextNode("<"));
        btnLess.classList.add("change");
        node.appendChild(btnLess);
        let btnMore = document.createElement("button");
        btnMore.onclick = () =>{this.changeAmt(1);};
        btnMore.appendChild(document.createTextNode(">"));
        btnMore.classList.add("change");
        node.appendChild(btnMore);

        // ----------- Options Selection -----------//
        try {
            if(orderSummary == true) {
                node.appendChild(document.createElement("br")); //newline
                let div = document.createElement("div");//shipping div

                //button 0
                let btnRad0 = document.createElement("input");
                btnRad0.type = "radio";
                btnRad0.name = this.itemID;
                btnRad0.oninput = () =>{
                    this.shipping = "Box";
                    updateFunc();
                }
                
                div.appendChild(document.createTextNode("Ship in: "));
                div.appendChild(document.createTextNode(" "));
                div.appendChild(btnRad0);
                div.appendChild(document.createTextNode("Box "));
                div.appendChild(document.createTextNode(" "));
                
                //button 1
                let btnRad1 = document.createElement("input");
                btnRad1.type = "radio";
                btnRad1.name = this.itemID;
                btnRad1.oninput = () => {
                    this.shipping = "Crate";
                    updateFunc();
                };
                

                div.appendChild(btnRad1);
                div.appendChild(document.createTextNode("Crate [+$10]"));
                div.classList.add("centerX");
                div.appendChild(document.createTextNode(" "));

                if(this.shipping == "Crate"){
                    btnRad1.checked = true;
                } else {
                    btnRad0.checked = true;
                    this.shipping = "Box";
                }

                node.appendChild(div);
            }
        } catch {}

        return node;
    }

    changeAmt(increment){
        console.log(this);
        if(this.quantity + increment > 0){
            let maxQ = 0;
            stock.forEach((elem, i) => {
                if(this.itemID == stock[i].itemID){
                    maxQ = elem.quantity;
                }
            });
            if(maxQ >= this.quantity + increment){
                this.quantity += increment;
            }
        }
        cart.renderTo(document.getElementById("cartItems"));
    };

    renderBase(node){
        node.appendChild(document.createTextNode(this.itemName));
        node.appendChild(document.createElement("br"));
        node.appendChild(document.createTextNode("$"));
        node.appendChild(document.createTextNode(this.unitCost));
        node.appendChild(document.createElement("br"));

        node.classList.add("text");
        node.classList.add("hidden-list");
        node.classList.add("item");
        return node;
    }
}

class DisplayItem extends Item {
    constructor(itemID, itemName, unitCost, quantity, imageUrl) {
        super(itemID, itemName, unitCost, quantity, imageUrl);
        this.isDisplay = true;
    }

    render(){
        let node = document.createElement("li").appendChild(document.createElement("div"));
        let btn = document.createElement("button");
        
        node.appendChild(document.createElement("Available:"));
        btn.onclick = () => {
            if(this instanceof DisplayItem){
                let existing = null;
                cart.items.forEach(elem => {
                    if(this.itemID == elem.itemID){
                        elem.changeAmt(1);
                        cart.renderTo(document.getElementById("cartItems"));
                        existing = elem;
                    }
                });

                if(existing == null){
                    let cpy = Object.create(new Item);
                    cpy.unitCost = this.unitCost;
                    cpy.quantity = 1;
                    cpy.itemID = this.itemID;
                    cpy.itemName = this.itemName;
                    cpy.unitCost = this.unitCost;
                    cpy.quantity = 1;
                    cpy.imageUrl = this.imageUrl;
                    cpy.imageShown = false;

                    cart.addGuiItem(document.getElementById("cartItems"), cpy);
                }
            }
        };
        btn.onclick.bind(this);

        node.onclick = (event) => {
            if(!(event.target instanceof HTMLButtonElement)){
                this.imageShown = !this.imageShown;
                if(this.imageShown){
                    let img = document.createElement("img");
                    img.src = this.imageUrl;
                    img.style.height = "auto";
                    img.style.marginLeft = "auto";
                    img.style.marginRight = "auto";
                    img.style.width = "80%";
                    img.style.display = "block";
                    node.appendChild(img);
                    node.childNodes.forEach(subNode =>{
                        if(subNode instanceof Text && subNode.textContent == "[Click To View]"){
                            subNode.remove();
                        }
                    });
                } else {
                    node.childNodes.forEach(subNode =>{
                        if(subNode instanceof HTMLImageElement){
                            subNode.remove();
                        }
                    });
                    node.appendChild(document.createTextNode("[Click To View]"));
                }
            }
        }
        node.onclick.bind(this);

        btn.appendChild(document.createTextNode("✓"));
        btn.classList.add("add");
        node.appendChild(btn);

        node = super.renderBase(node);
        node.appendChild(document.createTextNode("Stock:" + this.quantity));
        node.appendChild(document.createElement("br"));

        node.appendChild(document.createTextNode("[Click To View]"));
        
        return node;
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
        element.innerHTML = "";
        this.items.forEach(item => {
            let newElem = document.createElement("li");
            newElem.appendChild(item.render());
            element.appendChild(newElem);
        });
        try{
            updateFunc();
        } catch {}
    }

    getItems() {
        return items;
    }

    addGuiItem(node, item){
        this.addItem(item);
        this.renderTo(node);
    }

    addItem(item) {
        this.items.push(item);
    }

    removeGuiItem(node, item) {
        // node.remove();
        this.removeItem(item);
        this.renderTo(node);
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

    getTotal(){
        let total = 0;
        this.items.forEach(item => {
            total += item.unitCost * item.quantity;
            if(item.shipping == "Crate"){
                total += 10;
            }
        });
        return total;
    }

    getItemList(){
        let itemList = document.createElement("p");
        this.items.forEach(item => {
            itemList.appendChild(document.createTextNode(item.itemName + " x" + item.quantity));
            itemList.appendChild(document.createElement("br"));
        });
        return itemList;
    }
}










class FormDataStore {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.address = "";
        this.aptNum = "";
        this.city = "";
        this.state = "";
        this.zipcode = "";
        this.email = "";
        this.phone = "";
    }
    
    static from(frm) {
        return Object.assign(new FormDataStore(), frm);
    }

    static initFromEnv(){
        let form = document.getElementById("purchaseForm");
        let sFrm = new FormDataStore();
        sFrm.firstName = form.elements["firstName"].value;
        sFrm.lastName = form.elements["lastName"].value;
        sFrm.address = form.elements["address"].value;
        sFrm.aptNum = form.elements["aptNum"].value;
        sFrm.city = form.elements["city"].value;
        sFrm.state = form.elements["state"].value;
        sFrm.zipcode = form.elements["zipcode"].value;
        sFrm.email = form.elements["email"].value;
        sFrm.phone = form.elements["phone"].value;
        return sFrm;
    }
}




class PageData {
    constructor(){
        this.cart = null;
        this.form = null;
    }

    static from(data) {
        let dat = Object.assign(new PageData, JSON.parse(data));

        try{
            dat.cart = Cart.from(dat.cart);
        } catch (err) {
            console.log(err);
            dat.cart = null;
        }
        try {
            dat.form = FormDataStore.from(dat.form);
        } catch (err) {
            console.log(err);
            console.log("Created new FormDataStore")
            dat.form = new FormDataStore();
        }

        if(dat.cart == null){
            console.log("Created new cart")
            dat.cart = new Cart();
        }

        return dat;
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

function bake_cookie(value) {
    // let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    let cookie = JSON.stringify(value);
    document.cookie = cookie;
}
/*--------------------------------------------------*/





// var cart = getCart(read_cookie("CartData"));
// window.onbeforeunload = () => { bake_cookie(cart); };

let pageData = PageData.from(document.cookie);
let cart = pageData.cart;

window.onbeforeunload = () => {
    document.cookie = JSON.stringify(pageData);
};
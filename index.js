let words = document.getElementById("search-box");
let card = document.getElementById("card");
var count = 0;

let content = [];



const api_url =  "https://www.mocky.io/v2/5ba8efb23100007200c2750c"; 


words.addEventListener('keyup', (e) => {
        const searchstring = e.target.value.toLowerCase();
        if(words && searchstring ){
        const filtereditems = content.filter(item => {
            const internal = item.items.filter(item => {return item.toLowerCase().includes(searchstring)}).join('');
            return (
                item.id.toLowerCase().includes(searchstring)||
                item.name.toLowerCase().includes(searchstring)||
                internal.toLowerCase().includes(searchstring) ||
                item.address.toLowerCase().includes(searchstring)||
                item.pincode.toLowerCase().includes(searchstring)
            );
        });
        if(filtereditems.length>0)
        {
            card.style.overflow = scroll;
            display(filtereditems);
            let listItems = card.children,
             newarray = new Array();
            for (var i = 0;i<listItems.length;i++) {
                newarray[i] = listItems[i].firstElementChild;
                }
                card.onkeydown = function(e) {
                var focusedElement = document.activeElement,
                index = newarray.indexOf(focusedElement.firstElementChild);
                if (index >= 0) {
                    if (e.keyCode == 40) {
                        if (focusedElement.nextElementSibling) {
                          
                            var nextNode = focusedElement.nextElementSibling;
                            console.log(nextNode);
                            console.log(document.getElementById('items'))
                            nextNode.focus();
                            focusedElement.scrollIntoView({ block: 'start',  behavior: 'smooth' });
                            
                            
                        } else {
                           
                           listItems[0].scrollIntoView({ block: 'start',  behavior: 'smooth' });
                            card.firstElementChild.focus(); 
                            
                        }
                    }
                    if (e.keyCode == 38) {
                        if (focusedElement.previousElementSibling) {
                            var previousNode = focusedElement.previousElementSibling;
                            focusedElement.scrollIntoView({ block: 'start',  behavior: 'smooth' });
                            previousNode.focus();
                            
                        } else {
                            card.lastElementChild.focus();
                            card.lastElementChild.scrollIntoView({ block: 'start',  behavior: 'smooth' })
                        }
                    }
                }
            };
        }
        else
            card.innerHTML = `<div id = "nouser">No User found</div>` 
        }
        else{
            card.innerHTML = ''
        }
});

const loadItems = async function getdata(url){
            try {
                    const res = await fetch(url);
                    content = await res.json();
            } catch (err){
                console.log(err);
        }
};

const display = function(records){
    count++;
       const htmlform =  records.map((item) => {
    return `<div class = "items" tabindex="1" id = "items">
            <div id = "itemid"> ${item.id} </div>
            <div id = "itemname"> ${item.name} </div>
            <div id = "items"> ${item.items} </div>
            <div id = "itemaddr"> ${item.address} </div>
            <div id = "itempin"> ${item.pincode} </div>
            </div>`;
        })
        .join('');
        count =0;
        card.innerHTML = htmlform;

};

loadItems(api_url);

var errors = 0;
var cardList = [
    "captain",
    "hawyeke",
    "hulk",
    "human",
    "invisible",
    "panther",
    "scarlet",
    "spiderman",
    "strange",
    "vision"
]


var cardSet; //kart seti
var board = []; //oyun tahtası
var rows = 4; //tahta üzerindeki satır sayısı 
var columns = 5; //oyun tahtası üzerindeki sütun sayısı

var card1Selected; //ilk seçilen kartı tutan değişken
var card2Selected; //ikinci kez seçilen kartı tutan değişken

window.onload = function() {
    shuffleCards(); //kartları karıştıran işlevi çağırır
    startGame(); //oyunu başlatan işlevi çağıran nokta
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); 
    console.log(cardSet); //cardset değişkenini konsola yazdırır.
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); 
        //iki dizi elemanının yerlerini değiştirir
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); 

            //yeni kart öğesi oluşturulur
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);

            //kart öğesi tahta üzerine eklenir
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    // tahta durumu konsola yazdırılır
    console.log(board);
    // kartlara gizleme süresi
    setTimeout(hideCards, 1200);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // kartın ön yüzü görünür hale getirilir
            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}
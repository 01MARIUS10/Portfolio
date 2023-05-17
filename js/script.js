var cardAffiche = {
    showThatCard :function(id){
        console.log(id)
        if(id==0){
            this.showIndex()
        }
        else{
            this.showCard(id)
        }
    },
    showIndex:function(){
        let cards = document.querySelectorAll(".card");
        cards.forEach(e=>{
            e.classList.add("noneThat")
        })
        document.querySelector(".index").classList.remove("noneThat")
    },
    showCard:function(id){
        let cards = document.querySelectorAll(".card");
        cards.forEach(e=>{
            e.classList.remove("noneThat")
        })
        document.querySelector(".index").classList.add("noneThat")
        this.setAllCardPosition(id)
    },
    setAllCardPosition:function(id){
        let cards = document.querySelectorAll(".card")
        cards.forEach(e => {
            if(e.id==id){
                e.setAttribute("transform","translate(-46%,-50%)")
            }
        });
        
    }

}

var projects = {
    activeTricards :1,
    tricardsNbr : 0,
    init : function(){
        let tricards = document.querySelectorAll(".projects .tricards");
        this.tricardsNbr = tricards.length
    },
    checkButton : function(){
        let next = document.querySelector(".projects .next")
        let precedent = document.querySelector(".projects .precedent")
        next.classList.remove("noneThat")
        precedent.classList.remove("noneThat")
        
        if(this.activeTricards==1){
            precedent.classList.add("noneThat")
        }
        else if(this.activeTricards==this.tricardsNbr){
            next.classList.add("noneThat")
        }
    },
    showTriCards : function(){
        let id = `tricards${this.activeTricards}`
        let tricards = document.querySelectorAll(".projects .tricards");
        tricards.forEach(e=>{
            console.log(e)
            if(e.id!=id){
                e.classList.add("noneThat")
            }
            else{
                e.classList.remove("noneThat")
            }
            e.setAttribute("style","")
        })
        this.checkButton()
        this.removeopacityclass()
    },
    nextShowTriCards : function(){
        this.dismisOpacity()
        setTimeout(()=>{
            if(this.activeTricards < this.tricardsNbr){
                this.activeTricards++;
                this.showTriCards()
            }
        },1200)
        // console.log("click id is"+this.activeTricards)
    },
    precShowTriCards : function(){
        this.dismisOpacity()
        setTimeout(()=>{
            if(this.activeTricards > 1){
                this.activeTricards--;
                this.showTriCards()
            }
        },1200)
        // console.log("click id is"+this.activeTricards)
    },
    dismisOpacity: function(){
        let id = `#tricards${this.activeTricards}`
        let myDiv = document.querySelector(id)
        myDiv.style.transition = "opacity 1.2s";
        myDiv.style.opacity = 0;
    }
}

cardAffiche.showThatCard(0);
projects.init();
projects.showTriCards();
projects.nextShowTriCards()

let cardAffiche = {
    cardShow:"0",
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
            e.setAttribute('hidden',"");
        })
        document.querySelector(".index").removeAttribute("hidden")
    },
    showCard:function(id){
        let cards = document.querySelectorAll(".card");
        cards.forEach(e=>{
            e.removeAttribute('hidden');
        })
        document.querySelector(".index").setAttribute("hidden","")
        this.setAllCardPosition(id)
    },
    setAllCardPosition:function(id){
        let cards = document.querySelectorAll(".card")
        cards.forEach(e => {
            if(e.id==id){
                e.setAttribute("transform","translate(-46%,-50%)")
            }
        });
        if(card[0].id==id){
            console.log('mtocv')
        }
    }


}
cardAffiche.showThatCard(0);
let gofetch = async () =>{
    fetch('https://01marius10.github.io/Portfolio/data/data.json')
   .then(response => response.json())
   .then(data =>{ 
        cardAffiche.init(data.projects);
        projects.init();
        projects.showTriCards();
    })
   .catch(error => {
     console.log('An error occurred:', error);
     return false
   });
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
            if(e.id!=id){
                e.classList.add("noneThat")
            }
            else{
                e.classList.remove("noneThat")
            }
            e.setAttribute("style","")
        })
        this.checkButton()
    },
    nextShowTriCards : function(){
        this.dismisOpacity()
        setTimeout(()=>{
            if(this.activeTricards < this.tricardsNbr){
                this.activeTricards++;
                this.showTriCards()
            }
        },1200)
    },
    precShowTriCards : function(){
        this.dismisOpacity()
        setTimeout(()=>{
            if(this.activeTricards > 1){
                this.activeTricards--;
                this.showTriCards()
            }
        },1200)
    },
    dismisOpacity: function(){
        let id = `#tricards${this.activeTricards}`
        let myDiv = document.querySelector(id)
        myDiv.style.transition = "opacity 1.2s";
        myDiv.style.opacity = 0;
    },
    swapNav : function(id){
        let cla = `.cardInactive${id}`
        let cl = `cardInactive${id}`
        let a =  document.querySelector(".cardActive")
        let b = document.querySelector(cla)
        console.log(a,b)
        a.classList.toggle("cardActive")
        a.classList.toggle(cl)
        b.classList.toggle(cl)
        b.classList.toggle("cardActive")
    }
}

var cardAffiche = {
    projects:[],
    projectTri:[],
    nbrTricard:0,
    el:"#projects",
    nodeEl:'',

    init:function(projects){
        this.showIndex()
        this.projects = projects
        this.nodeEl = document.querySelector(this.el)
        this.initTricard()
        this.render()
    },
    initTricard:function(){
        this.projects.forEach((e,i)=>{
            let o = i%3
            let p = i/3 -o/3
            if(!this.projectTri[p]){
                this.projectTri[p] = []
            }
            this.projectTri[p][o] = e
        })
    },
    showThatCard :function(id){
        console.log(document.querySelector(".box:not(.noneThat)"))
        this.dismisOpacity(document.querySelector(".box:not(.noneThat)"))
        setTimeout(()=>{
            this.removeStyle(document.querySelector(".box:not(.noneThat)"))
            if(id==0){
                this.showIndex()
            }
            else{
                this.showCard(id)
            }
        },1200)
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
    },
    dismisOpacity: function(el){
        el.style.transition = "opacity 1.2s";
        el.style.opacity = 0;
    },
    removeStyle:function(el){
        el.setAttribute("style","")
    },
    render:function(){
        this.createTricard()
    },
    createTricard(){
        let nodeEl = this.nodeEl
        this.projectTri.forEach(function(ptri,n){
            let tricard = document.createElement('div')
            tricard.setAttribute('id',`tricards${n+1}`)
            tricard.setAttribute('class',`tricards`)

            let next = document.querySelector('.next')
            
            ptri.forEach((p,j)=>{
                tricard.appendChild(cardAffiche.getCardProject(p))
            })
            nodeEl.insertBefore(tricard,next)
        })
    },
    getCardProject(project){
        let div = document.createElement('div')
        div.setAttribute('class','cardProject')

        let techs = ``
        project.skills.forEach((e)=>{
            techs = techs+`
            <div class="skills">
                <img src="${e}" alt="">
            </div>
            `
        })

        let link =`
        <a href='${project.github}' target='_blank'> watch code in github </a>
        `
        if(project.website){
            link = link+ `<a href='${project.website}' target='_blank'> go to website </a>`
        }
        
        let a = `
        <div class="card_title">
            <h3>${project.title}</h3>
        </div>
        <div class="card_image">
        <img src="${project.image}" alt="">
        </div>
        <div class="card_text">
            <p>
            <span>Description : </span> 
                ${project.description}
            </p>
        </div>
        <div class="skillsProject">
            <p>Technologies used : </p>
            <div class="allskills">
            ${techs}
            </div>
        </div>
        <div class="link">
            ${link}
        </div>
        `
        
        div.innerHTML = a
        return div
    }

}

gofetch()


(function(){
    
    var imagens=[];
    var flippedCards=[];
    var ModalGameOver = document.querySelector("#ModalGameOver");
    var ImgMatchSign = document.querySelector("#ImgMatchSign");
	var troca = document.querySelector("#Tempo");
	var time=0;
	var status;
    var matches = 0;

    //criando as imagens
    for(i=0;i<16;i++)
    {
        var img = {
            src:"img/"+i+".png",
            id:i%8
        };
        imagens.push(img);
    }
   
	
	StartGame();
		
    
    function StartGame()
    {
		//setando o jogo
		matches = 0;
        flippedCards=[];
        imagens = RandomSort(imagens);
		ModalGameOver.style.visibility="hidden";
		ModalGameOver.style.zIndex=-1;
        ModalGameOver.removeEventListener("click",StartGame,false);
		time = 0;
		ContTime();
		
        var frontFace= document.getElementsByClassName("front");
		var backFace= document.getElementsByClassName("back");

        //posicionando as imagens
        for(var i = 0;i<=15;i++){
			frontFace[i].classList.remove("flipped","match");
			backFace[i].classList.remove("flipped","match");
			
            var card =document.querySelector("#card"+i);
            if(i%8==0)
            {
                card.style.left= 5+"px";
            }else{
                card.style.left= (i%8)*165+5+"px";
            }

            if(i<8)
            {
                card.style.top= 5+"px";
            }else
            {
                card.style.top= 240+15+"px";
            }

            card.addEventListener("click",FlipCard,false);                   
            frontFace[i].style.background = "url('"+imagens[i].src+"')";
            frontFace[i].setAttribute("id",imagens[i].id);
                     
        }         
        
    }
    

    function RandomSort(oldArray)
    {
        var newArray = [];
        while(newArray.length!=oldArray.length)
        {
            var i = Math.floor(Math.random()*oldArray.length);//aleatorio com tamanho o vet arredonfa para baixo
            if(newArray.indexOf(oldArray[i])<0)
            {
                newArray.push(oldArray[i]);
            }
        }
        return newArray;
        
    }

    function FlipCard()
    {
        if(flippedCards.length<2)
        {
            var face = this.getElementsByClassName("face");
            if(face[0].classList.length>2)
                return;//aborta caso ja tenha sido virada

            face[0].classList.toggle("flipped");
            face[1].classList.toggle("flipped");

            flippedCards.push(this);
            //comparando as cartas
            if(flippedCards.length == 2)
            {
                if(flippedCards[0].childNodes[3].id == flippedCards[1].childNodes[3].id)
                {
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");
                    MatchCardSign();
                    matches++;
                    flippedCards=[];
                    if(matches == 8)
                    {							
						StopTime();
						GameOver();
                    }
                }
                        
            }
            
        }else
        {//desvirando as cartas caso jatenha realizado 2 escolhas
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");
            flippedCards = [];      
        }
                
    }

        
    function GameOver()
    {
        ModalGameOver.style.zIndex = 1;
		ModalGameOver.style.visibility= "visible";
        ModalGameOver.addEventListener("click",StartGame,false);		
    }

    function MatchCardSign()
    {
        ImgMatchSign.style.zIndex = 1;
        ImgMatchSign.style.top = 150+"px";
        ImgMatchSign.style.opacity = 0;

        setTimeout(function(){
            ImgMatchSign.style.zIndex =-1;
            ImgMatchSign.style.top = 250+"px";
            ImgMatchSign.style.opacity =1;
        },1000);
    }
	
	function ContTime()
	{
		status = setInterval(function(){
		time++;		
		
		troca.innerHTML ="Ja passou "+time+" segundos!";			
		},1000);				
			
	}
	function StopTime(){
		troca.innerHTML ="Seu tempo foi "+time+" segundos!";
		clearInterval(status);
	}
	
}());

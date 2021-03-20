window.addEventListener("load", function () {
    game.start();
});

const game = {

    htmlBoard: [],
    currentgame: 0,
    sidecliked: 'none',
    currentstart: [0,0],
    currentend: [0,0],
    atome: [],
    zeahler: 0,
    win: false,
    clickfields: [],
    anfang: 0,

    start(){
        const button = document.querySelector('#play');
        const button2 = document.querySelector('#solve');
        const finish = document.getElementById('ergebnis');

        
        this.init();
        button2.addEventListener('click', () => this.check());
        

        button.addEventListener('click', () => {
        
        this.resetBoard();   
        finish.innerHTML = '';
        finish.style.background = 'white';
        this.zeahler = 0;
        this.currentgame = 0;
        this.win = false;
        const element = document.querySelector('#Spiel');
        element.innerHTML = '';
        this.init(); 
        console.log(this.win);
    }   
        )
    },
    

    init(){
        let zufallszahl = [7,8,9];
        let i = zufallszahl[Math.round(Math.random() * 2)];
        this.currentgame = i;
        this.logikboard = this.buildBoard();
        this.board = this.buildBoard();
        this.clickboard = this.buildBoard();
        this.buildHtmlBoard();
    },

    resetBoard(){

        this.board = null;
        this.logikboard = null;
        this.clickboard = null;

    },


    buildBoard()
    {
        const board = [];

        for(let y = 0; y < this.currentgame; y++){
            board.push([]);
            for(let x = 0; x <  this.currentgame; x++){
                board[y].push('0');
            }
        }

        return board;
    },

    buildHtmlBoard() {
        const brett = document.querySelector('#Spiel');

        //################# Board bauen #######################
        for(let y = 0; y <  this.currentgame; y++){
            for(let x = 0; x <  this.currentgame; x++){
                let feld = document.createElement('div');
                
                if( this.currentgame === 7){
                    feld.classList.add('felder5');
                }
                else if( this.currentgame == 8){
                    feld.classList.add('felder6');
                }
                else{
                    feld.classList.add('felder7');
                }
                
                feld.setAttribute('data-x', x);
                feld.setAttribute('data-y', y);
                brett.appendChild(feld);
                this.board[x][y] = feld;
                this.board[x][y].addEventListener('click', event => this.atomeclick(event));
            }
         }

        //############## Border bauen #########################

        //left
         for(let y = 1; y < ( this.currentgame - 1); y++)
         {
            //HTML-board 
            this.board[0][y].classList.add('test');
            this.board[0][y].setAttribute('data-Border', 'left');

            //Logik-board
            this.logikboard[0][y] = 'b';
            
            this.board[0][y].addEventListener('click', event => this.click(event));
        }
        
       //top
        for(let x = 1; x < ( this.currentgame -1); x++){

            //HTML-board
            this.board[x][0].classList.add('test');
            this.board[x][0].setAttribute('data-Border', 'top');

            //Logik-board
            this.logikboard[x][0] = 'b';

            this.board[x][0].addEventListener('click', event => this.click(event));
        }
        
        //bottom
        for(let x = 1; x < ( this.currentgame -1); x++){

            //HTML-board
            this.board[x][ this.currentgame-1].classList.add('test');
            this.board[x][ this.currentgame-1].setAttribute('data-Border', 'bottom')

            //Logik-board
            this.logikboard[x][ this.currentgame-1] = 'b';
            this.board[x][ this.currentgame-1].addEventListener('click', event => this.click(event));
        }

        //right
        for(let y = 1; y < ( this.currentgame -1); y++)
         {
            //HTML-board 
            this.board[ this.currentgame-1][y].classList.add('test');
            this.board[ this.currentgame-1][y].setAttribute('data-Border', 'right');

             //Logik-board
             this.logikboard[ this.currentgame-1][y] = 'b';
             this.board[ this.currentgame-1][y].addEventListener('click', event => this.click(event));

        }
        

        //#################### Atome platzieren #####################
        
        //Anzahl der Atome bestimmen
        let platziert = false;
        
        //Speziallfall bei 5 feldern
       
        if( this.currentgame === 7 ||  this.currentgame === 8 ){
        while(platziert === false){
        
        //1 Atom
        let xmin = 2;
        let xmax = 2 + ( this.currentgame - 5);
        let x = Math.round((Math.random() * (xmax - xmin)) + xmin);

        let ymin = 2;
        let ymax = 2 + ( this.currentgame - 5);
        let y = Math.round((Math.random() * (ymax - ymin)) + ymin);

        //2 Atom
        let xxmin = 2;
        let xxmax = 2 + ( this.currentgame - 5);
        let xx = Math.round((Math.random() * (xxmax - xxmin)) + xxmin);

        let yymin = 2;
        let yymax = 2 + ( this.currentgame - 5);
        let yy = Math.round((Math.random() * (yymax - yymin)) + yymin);

        this.logikboard[xx][yy] = 'x';
        this.logikboard[x][y] = 'x';
        

        
        if(x === xx && y === yy){
            console.log('doppelt belegt');
        }
        else if(this.logikboard[x+1][y] === 'x' || this.logikboard[x-1][y] === 'x' || this.logikboard[x][y+1] === 'x' || this.logikboard[x][y-1] === 'x'){
            console.log('hey');
            this.logikboard[x][y] = '0';
            this.logikboard[xx][yy] = '0';
        }
        else{
            this.board[xx][yy].classList.add('atomeunsichtbar');
            this.board[x][y].classList.add('atomeunsichtbar');
            this.atome[0] = x;
            this.atome[1] = y;
            this.atome[2] = xx;
            this.atome[3] = yy;

        return;
        }

        }
        }else
        {
        while(platziert === false)
        {
            //1 Atom
            let xmin = 2;
            let xmax = 2 + ( this.currentgame - 5);
            let x = Math.round((Math.random() * (xmax - xmin)) + xmin);

            let ymin = 2;
            let ymax = 2 + ( this.currentgame - 5);
            let y = Math.round((Math.random() * (ymax - ymin)) + ymin);
    
            

            //2 Atom
            let xxmin = 2;
            let xxmax = 2 + ( this.currentgame - 5);
            let xx = Math.round((Math.random() * (xxmax - xxmin)) + xxmin);

            let yymin = 2;
            let yymax = 2 + ( this.currentgame - 5);
            let yy = Math.round((Math.random() * (yymax - yymin)) + yymin);
            

            //3 Atom
            let xxxmin = 2;
            let xxxmax = 2 + ( this.currentgame - 5);
            let xxx = Math.round((Math.random() * (xxxmax - xxxmin)) + xxmin);

            let yyymin = 2;
            let yyymax = 2 + ( this.currentgame - 5);
            let yyy = Math.round((Math.random() * (yyymax - yyymin)) + yymin);

            this.logikboard[x][y] = 'x';
            this.logikboard[xx][yy] = 'x';
            this.logikboard[xxx][yyy] = 'x';

            console.log(x,y, "1");
            console.log(xx,yy, "2");
            console.log(xxx,yyy, "3");
            
            

            if((x === xx && y === yy) || (x === xxx && y === yyy) || (xx === xxx && yy === yyy))
            {
                
               
            }else if(this.logikboard[x+1][y] === 'x' || this.logikboard[x-1][y] === 'x' || this.logikboard[x][y+1] === 'x' || this.logikboard[x][y-1] === 'x' ||
            this.logikboard[xx+1][yy] === 'x' || this.logikboard[xx-1][yy] === 'x' || this.logikboard[xx][yy+1] === 'x' || this.logikboard[xx][yy-1] === 'x'){
                this.logikboard[x][y] = '0';
                this.logikboard[xx][yy] = '0';
                this.logikboard[xxx][yyy] = '0';
            }
            else{
                this.board[x][y].classList.add('atomeunsichtbar');

                this.board[xx][yy].classList.add('atomeunsichtbar');

                this.board[xxx][yyy].classList.add('atomeunsichtbar');

                this.atome[0] = x;
                this.atome[1] = y;
                this.atome[2] = xx;
                this.atome[3] = yy;
                this.atome[4] = xxx;
                this.atome[5] = yyy;

                
                return;
                
                
            }
        }
    }
    },

    click(event){
        this.resetPfeil(this.currentstart[0], this.currentstart[1]);
        this.resetPfeil(this.currentend[0], this.currentend[1]);
        let clicked = event.target;
        side = clicked.getAttribute('data-Border');
        x = parseInt(clicked.getAttribute('data-x'));
        y = parseInt(clicked.getAttribute('data-y'));
        this.currentstart[0] = x;
        this.currentstart[1] = y;


        if(side === 'right'){ 
            console.dir(this.board[x][y]);
            x--;
            this.atomscannerRight(x,y);
        }
        else if(side === 'bottom'){
            y--;
            this.atomscannerBottom(x,y);
        }
        else if(side === 'left'){
            
            x++;
            this.atomscannerLeft(x,y);
        } else{ 
            y++;
            this.atomscannerTop(x,y);
        }

    },

    atomscannerRight(x,y){

        let ende = false;
        while(ende === false){
            
            //Abbruch
            if(this.logikboard[x][y] === 'b'){
                
                this.pfeile(x,y);
                this.currentend[0] = x;
                this.currentend[1] = y;
                return;
            }
            else {
               
                
            }
            
            
            //vorne
            if(this.logikboard[x-1][y] === 'x'){
                this.atomscannerLeft(x,y);
                return;
            }

            //rechts
            if(this.logikboard[x-1][y+1] === 'x'){
                this.atomscannerBottom(x, y);
                return;
            }

            //links
            if(this.logikboard[x-1][y-1] === 'x'){
                this.atomscannerTop(x, y);
                return;
            }
            x--;
        }
    },

    atomscannerLeft(x,y){

        let ende = false;
        while(ende === false){
            
            //Abbruch
            if(this.logikboard[x][y] === 'b'){
                
                this.pfeile(x,y);
                this.currentend[0] = x;
                this.currentend[1] = y;
                return;
            }else{
              
    
            }
            
            
            //vorne
            if(this.logikboard[x+1][y] === 'x'){
                this.atomscannerRight(x,y);
                return;
            }

            //rechts
            if(this.logikboard[x+1][y+1] === 'x'){
                this.atomscannerBottom(x, y);
                return;
            }

            //links
            if(this.logikboard[x+1][y-1] === 'x'){
                this.atomscannerTop(x, y);
                return;
            }

            x++;
        }
    },

    atomscannerTop(x,y){

        let ende = false;
        while(ende === false){
            
            //Abbruch
            if(this.logikboard[x][y] === 'b'){
                
                this.pfeile(x,y); 
                this.currentend[0] = x;
                this.currentend[1] = y;
                return;
            }else{
               
    
            }
            
            
            //vorne
            if(this.logikboard[x][y+1] === 'x'){
                this.atomscannerBottom(x,y);
                return;
            }

            //rechts
            if(this.logikboard[x-1][y+1] === 'x'){
                this.atomscannerLeft(x, y);
                return;
            }

            //links
            if(this.logikboard[x+1][y+1] === 'x'){
                this.atomscannerRight(x, y);
                return;
            }

            y++;
        }
    },

    atomscannerBottom(x,y){

        let ende = false;
        while(ende === false){
            
            //Abbruch
            if(this.logikboard[x][y] === 'b'){
                this.pfeile(x,y);  
                this.currentend[0] = x;
                this.currentend[1] = y;

                return;
            }else{
                
    
            }
            
            
            //vorne
            if(this.logikboard[x][y-1] === 'x'){
                this.atomscannerTop(x,y);
                return;
            }

            //rechts
            if(this.logikboard[x+1][y-1] === 'x'){
                this.atomscannerRight(x, y);
                return;
            }

            //links
            if(this.logikboard[x-1][y-1] === 'x'){
                this.atomscannerLeft(x, y);
                return;
            }

            y--;
        }
    },

    pfeile(x,y){
        
        xs = this.currentstart[0];
        ys = this.currentstart[1];

        console.log(this.currentgame);
        if(x === xs && y === ys)
        {
            if(y === 0 || this.currentgame - 1 === y){
                console.log('s');
                this.board[x][y].classList.add('doppeloben');
                setTimeout( () => {this.resetPfeil(x,y);}, 3000);

            }else{
                console.log('s');
                this.board[x][y].classList.add('doppelrechts');
                setTimeout( () => {this.resetPfeil(x,y);}, 3000);
            }
        }
        
        else if(this.currentgame -  1 === y){
            console.log('s');
            this.setFile(xs, ys);
            this.board[x][y].classList.add('pfeilunten');
            setTimeout( () => {this.resetPfeil(xs, ys); this.resetPfeil(x,y);}, 3000); 
        }

        else if(y === 0){
            console.log('s');
            this.setFile(xs, ys);
            this.board[x][y].classList.add('pfeiloben');
            setTimeout( () => {this.resetPfeil(xs, ys); this.resetPfeil(x,y);}, 3000);
        }

        else if(this.currentgame - 1 === x){
            console.log('s');
            this.setFile(xs, ys);
            this.board[x][y].classList.add('pfeilrechts');
            setTimeout( () => {this.resetPfeil(xs, ys); this.resetPfeil(x,y);}, 3000);
        }

        else if(x === 0){
            console.log('s');
            this.setFile(xs, ys);
            this.board[x][y].classList.add('pfeillinks');
            setTimeout( () => {this.resetPfeil(xs,ys); this.resetPfeil(x,y);}, 3000);
        }
    },

    resetPfeil(x,y){
        console.log(x,y);

        if(x > this.currentgame - 1 || y > this.currentgame - 1) return;

        console.log(this.board[x][y].classList);
        this.board[parseInt(x)][parseInt(y)].classList.remove('pfeilunten', 'pfeilrechts', 'pfeillinks', 'pfeiloben', 'doppeloben', 'doppelrechts');
            
    },
    

    setFile(x,y){
        
        if(this.currentgame -  1 === y){
            this.board[x][y].classList.add('pfeiloben'); 
        }

        else if(y === 0){
            this.board[x][y].classList.add('pfeilunten');
        }

        else if(this.currentgame - 1 === x){
            this.board[x][y].classList.add('pfeillinks');
        }

        else if(x === 0){
            this.board[x][y].classList.add('pfeilrechts');
        }
    },

    atomeclick(event){
        let clicked = event.target;
        side = clicked.getAttribute('data-Border');
        x = parseInt(clicked.getAttribute('data-x'));
        y = parseInt(clicked.getAttribute('data-y'));

        if((x === this.currentgame - 1 && y === 0) || (x === 0 && y === 0) || (y === this.currentgame - 1 && x === this.currentgame -1) || (y === this.currentgame - 1 && x === 0)) return;

        if(this.anfang === 0){

            this.clickboard[x][y] = 'c';
            this.anfang = this.anfang + 1;    
        }
        
        if(this.currentgame === 7 || this.currentgame === 8 || this.currentgame === 9   ){
        if(this.logikboard[x][y] === 'b'){}else{


        
            if(this.logikboard[x][y] === 'x' && this.clickboard[x][y] === 'c'){
                this.zeahler = this.zeahler + 1;
                this.clickboard[x][y] = '0';
                this.board[x][y].classList.remove('atome');  
                this.board[x][y].classList.add('atomeunsichtbar');
            }
            else if(this.logikboard[x][y] === 'x'){
                    this.zeahler = this.zeahler - 1;
                    this.clickboard[x][y] = 'c';
                    this.board[x][y].classList.remove('atomeunsichtbar');
                    this.board[x][y].classList.add('atome');  
                }
        

        if(this.logikboard[x][y] === '0'){
            
            if(this.clickboard[x][y] === 'a'){
                console.log('weg');
                this.zeahler = this.zeahler - 1;
                this.clickboard[x][y] = '0';
                this.board[x][y].classList.remove('atome');  
                this.board[x][y].classList.add('atomeunsichtbar');
            }else{
            this.clickboard[x][y] = 'a';
            this.zeahler = this.zeahler + 1;
            console.log('da');
            this.board[x][y].classList.remove('atomeunsichtbar');
            this.board[x][y].classList.add('atome');  
            }

        }
    }
}


        if(this.currentgame < 9){
            if(this.zeahler === -2){
                this.win = true;
            }else{
                this.win = false;
            }
        }else{
            if(this.zeahler === -3){
                this.win = true;
            }else{
                this.win = false;
            }
        }

        console.log(this.zeahler);  
    
    },

    check(){

       
        console.log(ergebnis);

        if(this.win === false){
            console.log('verloren');
            document.getElementById('ergebnis').style.background = 'red';
            document.getElementById('ergebnis').innerText = 'YOU LOSE';
            document.getElementById('ergebnis').style.textAlign = 'center';
            document.getElementById('ergebnis').style.lineHeight = '10em';
            document.getElementById('ergebnis').style.fontWeight = 'bold';

            if(this.currentgame === 8 || this.currentgame === 7){
                this.board[this.atome[0]][this.atome[1]].style.background = 'red';
                this.board[this.atome[2]][this.atome[3]].style.background = 'red';
            }
            if(this.currentgame === 9){
                this.board[this.atome[0]][this.atome[1]].style.background = 'red';
                this.board[this.atome[2]][this.atome[3]].style.background = 'red';
                this.board[this.atome[4]][this.atome[5]].style.background = 'red';
            }

        }else{

            console.log('verloren');
            document.getElementById('ergebnis').style.background = 'green';
            document.getElementById('ergebnis').innerText = 'YOU WIN';
            document.getElementById('ergebnis').style.textAlign = 'center';
            document.getElementById('ergebnis').style.lineHeight = '10em';
            document.getElementById('ergebnis').style.fontWeight = 'bold';

            if(this.currentgame === 8 || this.currentgame === 7){
                console.log('gewonnen')
                this.board[this.atome[0]][this.atome[1]].style.background = 'green';
                this.board[this.atome[2]][this.atome[3]].style.background = 'green';
            }
            if(this.currentgame === 9){
                this.board[this.atome[0]][this.atome[1]].style.background = 'green';
                this.board[this.atome[2]][this.atome[3]].style.background = 'green';
                this.board[this.atome[4]][this.atome[5]].style.background = 'green';
            }
  

    }

}
}

        
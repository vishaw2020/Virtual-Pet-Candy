class food
{
    constructor()
    {
        //loading milk image
        this.image=loadImage("milk2.png");

        //Declaration of two variables foodStock and LastFed
        this.foodStock=0;
        this.lastFed;

    }

    getFoodStock()
    {
    return this.foodStock;
    }

    

    //updating Food into database by passing a parameter foodStock
    updateFoodStock(foodStock)
    {
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   

    deductFood()
    {
      if(this.footstock>0){
        this.foodStock=this.foodStock-1;
      }
        
    }
    

    //displaying food images in group of 10 using % operator and for loop
    display()
    {
        var x=80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);
      

       if(foodS!==0)
       {
           for(var i=0;i<this.foodStock;i++)
           {
               if(i%10===0)
               {
                   x=80 ;
                   y=y+50;
               }
                image(this.image,x,y,50,50);
                x=x+30;
           }
       }
    }
}
class Pubsub{

    constructor(){
        this.subscriber={};
    }
    subscribe(event,callback){
      if(!this.subscriber[event]){
        this.subscriber[event]=[];
      }
      this.subscriber[event].push(callback);

      return ()=>this.unsubscribe(event,callback);
    }

    unsubscribe(event,callback){
        if(!this.subscriber[event]) return;

        this.subscriber[event]=this.subscriber[event].filter(cb=>cb!=callback);
    }

    publish(event,data){
        if(!this.subscriber[event]) return;

        this.subscriber[event].forEach(callback=>callback(data));
    }
}

const pb=new Pubsub();

const unsubscribeAirforce1=pb.subscribe('airforce',(data)=>{
    console.log('subscriber 1 of airforce',data);
})

const unsubscribeAirforce2=pb.subscribe('airforce',(data)=>{
    console.log('subscribe 2 of airforce',data);
})

const unsubscribeNewbalance=pb.subscribe('newbalance',(data)=>{
    console.log('subscribe 1 of new balance',data);
})

pb.publish('airforce',{shoename:'jordan airforce'});
pb.publish('new balanvce',{showname:'something'});

unsubscribeAirforce1();
pb.publish('airforce',{shoename:'jordan new shoes'});
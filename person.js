const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/App')
.then(()=>{
    console.log('CONNECTION OPEN')
})

.catch(err=>{
    console.log('OH NO ERROR')
})

const personSchema=new mongoose.Schema({
    first:String,
    last:String
})
personSchema.virtual('fullName').
get(function(){
    return `${this.first} ${this.last}`;}).

    set(function(v){
        this.first=v.substr(0,v.indexOf(' '));
        this.last=v.substr=v.substr(v.indexOf(' ')+1);
    });


personSchema.pre('save', async function(){
    this.first='YO',
    this.last='MUMMA',
    console.log("ABOUT TO SAVE!!!")
    
})
personSchema.post('save',async function() {
    console.log("JUST SAVED!!!")
})
const Person=mongoose.model('Person',personSchema);
const tammy=new Person({first:'tammy',last:'CHOW'})
tammy.fullName='tammy johnes';
console.log(tammy.fullName)
tammy.save().then(m=>console.log(m));
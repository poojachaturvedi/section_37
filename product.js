const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
.then(()=>{
    console.log('CONNECTION OPEN')
})

.catch(err=>{
    console.log('OH NO ERROR')
})
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxlength:20
    },
    price: {
        type:Number,
        required: true,
        min: [0,'Price must be positive']
    },
    onSale: {
        type:Boolean,
        default:false
    },
    categories:[String],
    stock:{
        qty: {
            online: {
                type: Number,
                default:0
            },
            instore:{
                type:Number,
                default:0
            },
            size: {
                type:String,
                enum: ['S','M','L']
            }
        }
    }
});
const Product=mongoose.model('Product',productSchema);
// const bike=new Product({name:'Tire Pump',price:99,categories:['cycling']})
// bike.save()
// .then(data=>{
//     console.log("IT WORKED!!")
//     console.log(data);
// })
// .catch(err=>{
//     console.log("OH NO ERROR!")
//     console.log(err.errors.name.properties.message);
// })


//PROBLEME WITH UPDATION IN THE MONGOOSE
// Product.findOneAndUpdate({name:'Tire Pump'},{price:10},{size:'XL'})
// .then(data=>{
//     console.log("IT WORKED!!")
//     console.log(data);
// })
// .catch(err=>{
//     console.log("OH NO ERROR!")
//     console.log(err);
// })
//don't use the arrow function as there will be one instance only
// productSchema.methods.greet=function(){
// console.log("HELLO HI HOW DO YOU DO!!!")
// console.lof(``)
// }
// const p=new Product({name:'TVS'},{price:280})

// //use traditional method not the arrow function
// productSchema.methods.greet=function(){
//     console.log("HELLO !!!, HI!!!, HOWDY !!!!");
//     console.lpg(`from ${this.name}`);
// }
// const pro= new Product({name:'bike bag',price:10});
// console.log(pro);
// // console.log(pro.greet());

// const findProduct = async () =>{
//    const foundProduct=await  Product.findOne({name:'Bike Helmet'})
//    foundProduct.onSale=!foundProduct.onSale
//    foundProduct.save()
// }
// findProduct();




// STATIC METHOD

//refers to model class itself not its instances
Product.statics.fireSale=function() {
    this.updateMany({},{onSale:true,price:0})
}

Product.fireSale().then(res=>console.log(res));


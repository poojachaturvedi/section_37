const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp')
.then(()=>{
    console.log('CONNECTION OPEN')
})

.catch(err=>{
    console.log('OH NO ERROR')
})
const movieSchema=new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating:String
})

//Movie on LHS is  a class and it models the movie

const Movie=mongoose.model('Movie',movieSchema);

// const amadeus=new Movie({
//     title:'Amadeus',
//     year:1986,
//     score:9.2,
//     rating:'R'
// })
// amadeus.save();

// Movie.insertMany([
//     {
//         title:'Amadeus',
//         year:1986,
//         score:9.2,
//         rating:'R'
//     },
//     {
//         title:'Titanic',
//         year:1980,
//         score:8,
//         rating:'PG'
//     },
//     {
//         title:'Avengers',
//         year:1985,
//         score:9,
//         rating:'R'
//     },
//     {
//         title:'persuit of happiness',
//         year:1988,
//         score:10,
//         rating:'PG-13'
//     }
// ])
// .then(data=>{
//     console.log("IT WORKED !!")
//     console.log(data)
// })


Movie.updateMany({title:{$in:['Avengers']}},{score:10}).then(res=>console.log(res));
Movie.findOneAndUpdate({score:10},{title:"shaktiman"},{new:true}).then(m=>console.log(m));
//if we want to return the new updated version we set new as false
//this is important for things like finding the post and then update it
//if we want the updated document we should use new as true in findandUpdate

//DELETION
Movie.remove({title:"Amadeus"}).then(msg=>console.log(msg));
//Movie.findOneAndDelete({title:"alien"}).then(m=>console.log(m));
//they return back the document but in above we option of using or not



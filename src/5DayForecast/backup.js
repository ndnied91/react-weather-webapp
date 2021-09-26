
// async componentDidMount(){
//
//       const url ="https://api.openweathermap.org/data/2.5/forecast?q=London&appid=b45d84a44810d326858ee63a6fe20047"
//       const res =await axios.get(url)
//
//       let list = []
//
//       let map1 = new Map();
//
//       res.data.list.map((item)=>{
//
//         let date = item.dt_txt.split(" ")[0]
//         let temp = item.main.temp
//
//
//         if(!(list.includes( date ))){ //create the array
//           console.log(date)
//           list.push([date , temp])
//
//         }
//         else{
//           console.log('found date')
//           //find that item in array and update the temp
//         }
//
//
/
//
//       })
//
//       console.log(list)
//     this.setState({ })
// }









import React from 'react'
import axios from 'axios'

class FiveDayForeCast extends React.Component{
  constructor(props) {
  super(props)
     this.state = { temps:[] }

}

mode = (myArray) => //this function finds the most common string in an array
  myArray.reduce(
    (a,b,i,arr)=>
     (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
    null)

getMaxIcon = (item)=>{

  let ret = new Map()
    item.forEach((item, date) => {
      let str = item.split(" ") //splits string
      let icon= this.mode(str) //returns the most common icon
      ret.set(date,icon)
    });

  return ret //returns a map
}

async componentDidMount(){

      const url ="https://api.openweathermap.org/data/2.5/forecast?q=London&appid=b45d84a44810d326858ee63a6fe20047"
      const res =await axios.get(url)



      let highs = new Map();
      let dateCount = new Map();
      let lows = new Map()



      let iconMap = new Map()


      let data  = res.data.list


      for( let str in data){
        let item = data[str]
        let date = item.dt_txt.split(" ")[0]
        let high = item.main.temp_max
        let low = item.main.temp_min
        let icon = item.weather[0].icon

          if(!highs.has(date)){
                   highs.set(date , high );  // if not in map, sets initial temp
                   dateCount.set( date , 1); //gets number of times date is shown
                   lows.set(date , low );  // if not in map, sets initial temp
                   iconMap.set(date, (  `${icon} `))
            }
           else{
                highs.set(date ,  highs.get(date) + high);
                dateCount.set(date ,  dateCount.get(date) + 1);
                lows.set(date ,  lows.get(date) + low);
                iconMap.set(date , iconMap.get(date) + (  `${icon} `) )
           }
         }






        let icons = this.getMaxIcon(iconMap)

          dateCount.forEach((item, date) => {

            let high = highs.get(date)
            let low = lows.get(date)

              let temp_high = this.convertToF((high / item))
              let temp_low = this.convertToF((low / item))

              let icon = icons.get(date)

              this.setState({ temps: [...this.state.temps,  { date, temp_low, temp_high , icon  } ] })
         });



}


convertToF(temp){
    return parseInt((temp-273.15)*1.8)+32
}







  render(){
    return <div> 5 Day forcase </div>
  }
}


export default FiveDayForeCast

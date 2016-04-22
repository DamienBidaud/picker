/**
 * Created by d.bidaud on 22/04/2016.
 */
import BodyTime from "./BodyTime";
import BodyHalfDay from "./BodyHalfDay";
import BodyCalendar from "./BodyCalendar"


var times = document.getElementsByClassName("glyphicon-time");
var halfDay = document.getElementsByClassName("halfDaySelect");
var calendars = document.getElementsByClassName("daySelect");
var limitDay = new Date();
limitDay.setDate(limitDay.getDate()+2);
var currentDate = new Date();
currentDate.setDate(currentDate.getDate()+2);
while (currentDate.getDay()==6 || currentDate.getDay() ==0){
    currentDate.setDate(currentDate.getDate()+1);
    limitDay.setDate(limitDay.getDate()+1);
}
var hoursDisplay = {
    0:[
        8,9,10,11,12,13
    ],
    1:[
        14,15,16,17,18,19
    ]};



class Picker{

    var month = {0:"Janvier", 1:"Février", 2:"Mars", 3:"Avril", 4:"Mai",5:"Juin", 6:"Juillet", 7:"Août", 8:"Septembre", 9:"Octobre", 10:"Novembre", 11:"Décembre"};
    var day = {0:"Dimanche", 1:"Lundi", 2:"Mardi", 3:"Mercredi", 4:"Jeudi", 5:"Vendredi", 6:"Samedi"};

    var typeBody = {0: new BodyTime(), 1:new BodyHalfDay(), 2: new BodyCalendar()};
    var type;
    var bodyObject;
    constructor(numBody){
        this.type = numBody;
        this.bodyObject = this.typeBody[numBody]
    }
}


export default Picker;
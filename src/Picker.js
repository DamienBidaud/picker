/**
 * Created by d.bidaud on 31/03/2016.
 */
(function(){


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
    var hoursDisplay = {0:[
        8,9,10,11,12,13
    ],
        1:[
            14,15,16,17,18,19
        ]};



    /**
     * class create body for the time picker
     */
    var bodyTime = function(){

        var hourSelect = [];
        var id_officePicker = 0;
        var createValidButton;

        var removeHourSelect = function (value) {
            var i = 0;
            for(i; i< hourSelect.length; i++){
                if(hourSelect[i]==value)
                    break;
            }
            hourSelect.splice(i, 1);
        };

        var checkboxListener = function () {
            var cell = this;
            var container = document.getElementById("container");
            var checkbox = cell.children[0];
            if(checkbox.checked){
                checkbox.checked = false;
                cell.className = "hourCell";
                removeHourSelect(checkbox.value);
            }else{
                checkbox.checked = true;
                cell.className = "hourSelect";
                hourSelect.push(checkbox.value);
            }
            if(hourSelect.length>0){

                if($.contains(container, document.getElementById("buttonValid"))) {
                    container.removeChild(document.getElementById("buttonValid"));
                }
                var button = document.createElement("div");
                button.className = "table";
                button.id = "buttonValid";
                button.appendChild(createValidButton(id_officePicker));
                container.appendChild(button);
            }else{
                container.removeChild(document.getElementById("buttonValid"));
            }
        };

        var createHourSelect = function(value){
            var hour = document.createElement("input");
            hour.type = "hidden";
            hour.name = "select[]";
            hour.value = value;
            return hour;
        };

        createValidButton = function(id){
            var sendDate = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
            var div= document.createElement("div");
            div.className="myRow";
            var form = document.createElement("form");
            form.method="get";
            form.action="book.php";
            form.id = "formSelect";
            var date = document.createElement("input");
            date.type="hidden";
            date.name = "date";
            date.value = sendDate;
            form.appendChild(date);
            var id_office = document.createElement("input");
            id_office.type="hidden";
            id_office.name="id_office";
            id_office.value = id;
            form.appendChild(id_office);
            var type = document.createElement("input");
            type.type = "hidden";
            type.name = "book_type";
            type.value = 0;
            form.appendChild(type);
            for(var i = 0; i < hourSelect.length; i++){
                form.appendChild(createHourSelect(hourSelect[i]));
            }
            var button = document.createElement("input");
            button.type="submit";
            button.value="Continuer";
            form.appendChild(button);
            div.appendChild(form);
            return div;
        };

        var createTime = function(div, confirm){
            for(var i = 0; i < 2; i++){
                var row = document.createElement("div");
                row.className = "myRow";
                for(var j = 0; j < 6; j++){
                    var cell = document.createElement("div");
                    if(confirm[hoursDisplay[i][j]]==1){
                        cell.innerHTML = hoursDisplay[i][j]+"<input type='checkbox' class='hidden' value='"+hoursDisplay[i][j]+"' disabled>";
                        cell.className = "hourCheck";
                    }else{
                        cell.innerHTML = +hoursDisplay[i][j]+"<input name='bookingSelect' class='hidden' type='checkbox' value='"+hoursDisplay[i][j]+"' disabled>";
                        cell.className = "hourCell";
                        cell.addEventListener("click", checkboxListener);
                    }
                    row.appendChild(cell);
                }
                div.appendChild(row);
            }
        };

        this.createBody = function(id_office){
            var div = document.createElement("div");
            var hours = document.createElement("div");
            hours.className = "table";
            id_officePicker = id_office;
            var confirm = [];
            $.ajax({
                url:"serveur/getTimeDispo.php",
                async:false,
                dataType:"JSON",
                method:"post",
                data:{date:currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate(), id_office:id_office},
                success:function(data){

                    confirm = data;

                }
            });
            createTime(hours, confirm);
            div.appendChild(hours);
            return div;
        };
    };


    /**
     * class create body for the half-day picker
     */
    var bodyHalfDay = function(){

        var halfDaySelect;
        var id_officePicker = 0;

        var createValidButton = function(id){
            var sendDate = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
            var div= document.createElement("div");
            div.className="myRow";
            var form = document.createElement("form");
            form.method="get";
            form.action="book.php";
            form.id = "formSelect";
            var date = document.createElement("input");
            date.type="hidden";
            date.name = "date";
            date.value = sendDate;
            form.appendChild(date);
            var id_office = document.createElement("input");
            id_office.type="hidden";
            id_office.name="id_office";
            id_office.value = id;
            form.appendChild(id_office);
            var type = document.createElement("input");
            type.type = "hidden";
            type.name = "book_type";
            type.value = 1;
            form.appendChild(type);
            var hour = document.createElement("input");
            hour.type = "hidden";
            hour.name = "select";
            hour.value = halfDaySelect;
            form.appendChild(hour);
            var button = document.createElement("input");
            button.type="submit";
            button.value="Continuer";
            form.appendChild(button);
            div.appendChild(form);
            return div;
        };


        var checkboxListener = function(){
            var cell = this;
            var container = document.getElementById("container");
            var checkbox = cell.children[0];
            if(checkbox.checked){
                checkbox.checked = false;
                cell.className = "hourCell";
                halfDaySelect = null;
            }else{
                checkbox.checked = true;
                cell.className = "hourSelect";
                halfDaySelect = checkbox.value;
            }
            if(halfDaySelect!= null){

                if($.contains(container, document.getElementById("buttonValid"))) {
                    container.removeChild(document.getElementById("buttonValid"));
                }
                var button = document.createElement("div");
                button.className = "table";
                button.id = "buttonValid";
                button.appendChild(createValidButton(id_officePicker));
                container.appendChild(button);
            }else{
                container.removeChild(document.getElementById("buttonValid"));
            }
        };

        var createHalfDay = function(div, confirm){
            var label = ["matin", "après-midi"];
            for(var i = 0; i < 2; i++){
                var row = document.createElement("div");
                row.className = "myRow";
                var cell = document.createElement("div");
                cell.innerHTML = label[i]+"<input type='checkbox' class='hidden' value='"+i+"' disabled>";
                if(confirm[i]==1) {
                    cell.className = "hourCheck";
                }else{
                    cell.className = "hourCell";
                    cell.addEventListener("click", checkboxListener);
                }
                row.appendChild(cell);
                div.appendChild(row);
            }
        };

        this.createBody = function(id_office){
            id_officePicker = id_office;
            var div = document.createElement("div");
            div.className = "table";
            var confirm = [];
            $.ajax({
                url:"serveur/getHalfDayDispo.php",
                async:false,
                dataType:"JSON",
                method:"post",
                data:{date:currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate(), id_office:id_office},
                success:function(data){
                    confirm = data;
                }
            });
            createHalfDay(div, confirm);
            return div;
        };
    };

    /**
     * class create body for the calendar picker
     */
    var bodyCalendar = function(){

        var hourSelect = [];
        var createValidButton;
        var id_officePicker = 0;
        var removeHourSelect = function (value) {
            var i = 0;
            for(i; i< hourSelect.length; i++){
                if(hourSelect[i]==value)
                    break;
            }
            hourSelect.splice(i, 1);
        };

        var checkboxListener = function () {
            var cell = this;
            var container = document.getElementById("container");
            var checkbox = cell.children[0];
            if(checkbox.checked){
                checkbox.checked = false;
                cell.className = "hourCell";
                removeHourSelect(checkbox.value);
            }else{
                checkbox.checked = true;
                cell.className = "hourSelect";
                hourSelect.push(checkbox.value);
            }
            if(hourSelect.length>0){

                if($.contains(container, document.getElementById("buttonValid"))) {
                    container.removeChild(document.getElementById("buttonValid"));
                }
                var button = document.createElement("div");
                button.className = "table";
                button.id = "buttonValid";
                button.appendChild(createValidButton(id_officePicker));
                container.appendChild(button);
            }else{
                container.removeChild(document.getElementById("buttonValid"));
            }
        };

        var createHourSelect = function(value){
            var hour = document.createElement("input");
            hour.type = "hidden";
            hour.name = "select[]";
            hour.value = value;
            return hour;
        };

        createValidButton = function(id){
            var sendDate = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
            var div= document.createElement("div");
            div.className="myRow";
            var form = document.createElement("form");
            form.method="get";
            form.action="book.php";
            form.id = "formSelect";
            var date = document.createElement("input");
            date.type="hidden";
            date.name = "date";
            date.value = sendDate;
            form.appendChild(date);
            var id_office = document.createElement("input");
            id_office.type="hidden";
            id_office.name="id_office";
            id_office.value = id;
            form.appendChild(id_office);
            var type = document.createElement("input");
            type.type = "hidden";
            type.name = "book_type";
            type.value = 2;
            form.appendChild(type);
            for(var i = 0; i < hourSelect.length; i++){
                form.appendChild(createHourSelect(hourSelect[i]));
            }
            var button = document.createElement("input");
            button.type="submit";
            button.value="Continuer";
            form.appendChild(button);
            div.appendChild(form);
            return div;
        };

        var createCalendar = function(div, confirm){
            var daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
            var table = document.createElement("div");
            table.className="table";
            var calendar = new Calendar(1);
            var month = calendar.monthDays(currentDate.getFullYear(), currentDate.getMonth());
            var days = document.createElement("div");
            days.className = "myRow";
            for(var i = 0; i  < 5; i++){
                var day = document.createElement("div");
                day.className = "cellDay";
                day.innerHTML = daysOfWeek[i];
                days.appendChild(day);
            }
            table.appendChild(days);
            for(i = 0; i < month.length; i++) {
                var row = document.createElement('div');
                row.className = "myRow";
                for (var j = 0; j < 5; j++) {
                    var cell = document.createElement("div");
                    row.appendChild(cell);

                    if (confirm[month[i][j]] === 1) {
                        cell.className = "hourCheck";
                    } else {
                        cell.className = "hourCell";
                        cell.addEventListener("click", checkboxListener);
                    }
                    if(month[i][j] != 0) {
                        cell.innerHTML = month[i][j] + "<input type='checkbox' class='hidden' value='" + month[i][j] + "' disabled>";

                    }
                    else
                        cell.innerHTML = "";
                }
                table.appendChild(row);
            }
            div.appendChild(table);
        };

        this.createBody = function(id_office){
            var div = document.createElement("div");
            div.className = "table";
            id_officePicker = id_office;
            var confirm = [];
            $.ajax({
                url:"serveur/getCalendarDispo.php",
                async:false,
                dataType:"JSON",
                method:"post",
                data:{date:currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate(), id_office:id_office},
                success:function(data){
                    confirm = data;
                }
            });
            createCalendar(div, confirm);
            return div;
        };
    };

    /**
     * class picker
     * @param numBody
     */
    var picker = function(numBody){
        var month = {0:"Janvier", 1:"Février", 2:"Mars", 3:"Avril", 4:"Mai",5:"Juin", 6:"Juillet", 7:"Août", 8:"Septembre", 9:"Octobre", 10:"Novembre", 11:"Décembre"};
        var day = {0:"Dimanche", 1:"Lundi", 2:"Mardi", 3:"Mercredi", 4:"Jeudi", 5:"Vendredi", 6:"Samedi"};

        var typeBody = {0: new bodyTime(), 1:new bodyHalfDay(), 2: new bodyCalendar()};
        var type = numBody;
        var bodyObject = typeBody[numBody];


        /**
         * remove valid button
         */
        var removeValidButton = function(){
            var button = document.getElementById("buttonValid");
            if($.contains(document, button)){
                button.parentNode.removeChild(button);
            }
        };

        /**
         * remove picker
         * @param picker
         */
        var removePicker = function(picker){
            var timePickers = document.getElementById("container");
            var i;
            if(document.getElementById("formSelect")!=null){
                removeValidButton();
            }
            for(i = 0; i < times.length; i++){
                if(times[i].nextSibling.nextSibling.contains(picker)){
                    times[i].nextSibling.nextSibling.removeChild(timePickers);
                }
            }
            for(i = 0; i < halfDay.length; i++){
                if(halfDay[i].nextSibling.nextSibling.contains(picker)){
                    halfDay[i].nextSibling.nextSibling.removeChild(timePickers);
                }
            }
            for(i = 0; i < calendars.length; i++){
                if(calendars[i].nextSibling.nextSibling.contains(picker)){
                    calendars[i].nextSibling.nextSibling.removeChild(timePickers);
                }
            }
        };

        /**
         * go to prev day
         */
        var prevDay = function(){
            if(currentDate.getTime() > limitDay.getTime()){
                removeValidButton();
                currentDate.setDate(currentDate.getDate() - 1);
                while ((currentDate.getDay()==6 || currentDate.getDay() ==0) && currentDate.getTime() > limitDay.getTime()){
                    currentDate.setDate(currentDate.getDate()-1);
                }
                this.parentElement.nextSibling.innerHTML = day[currentDate.getDay()] + " " + currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
                var table = this.parentElement.parentElement.nextSibling;
                var container = document.getElementById("container");
                container.removeChild(table);
                container.appendChild(bodyObject.createBody(container.parentElement.parentElement.children[0].children[0].value));

            }
        };

        var prevMonth = function(){
            if(currentDate.getTime() > limitDay.getTime()){
                removeValidButton();
                currentDate.setMonth(currentDate.getMonth() - 1);
                this.parentElement.nextSibling.innerHTML = month[currentDate.getMonth()] + " " + currentDate.getFullYear();
                var table = this.parentElement.parentElement.nextSibling;
                var container = document.getElementById("container");
                container.removeChild(table);
                container.appendChild(bodyObject.createBody(container.parentElement.parentElement.children[0].children[0].value));
            }
        };

        /**
         * go to next day
         */
        var nextDay = function(){
            removeValidButton();

            currentDate.setDate(currentDate.getDate()+1);
            while (currentDate.getDay()==6 || currentDate.getDay() ==0){
                currentDate.setDate(currentDate.getDate()+1);
            }
            this.parentElement.previousSibling.innerHTML =  day[currentDate.getDay()] + " " + currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
            var table = this.parentElement.parentElement.nextSibling;
            var container = document.getElementById("container");
            container.removeChild(table);
            container.appendChild(bodyObject.createBody(container.parentElement.parentElement.children[0].children[0].value));

        };

        var nextMonth = function(){
            removeValidButton();
            currentDate.setMonth(currentDate.getMonth()+1);
            this.parentElement.previousSibling.innerHTML =  month[currentDate.getMonth()] + " " + currentDate.getFullYear();
            var table = this.parentElement.parentElement.nextSibling;
            var container = document.getElementById("container");
            container.removeChild(table);
            container.appendChild(bodyObject.createBody(container.parentElement.parentElement.children[0].children[0].value));
        }

        /**
         * create header
         * @returns {Element}
         */
        var createDateHeader = function(){
            var div = document.createElement("div");
            div.className= "table myRow";
            var prev = document.createElement("div");
            var date = document.createElement("div");
            var next = document.createElement("div");

            prev.className = "left";
            date.className = "middle date";
            next.className = "right";
            date.innerHTML = day[currentDate.getDay()] + " " + currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
            div.appendChild(prev);
            div.appendChild(date);
            div.appendChild(next);
            var rightArrow = document.createElement("span");
            var leftArrow = document.createElement("span");
            rightArrow.className = "pointer";
            leftArrow.className = "pointer";
            rightArrow.innerHTML = "&#10094;";
            leftArrow.innerHTML = "&#10095;";
            rightArrow.onclick = prevDay;
            leftArrow.onclick = nextDay;
            prev.appendChild(rightArrow);
            next.appendChild(leftArrow);
            return div;
        };

        var createMonthHeader = function(){
            var div = document.createElement("div");
            div.className= "table myRow";
            var prev = document.createElement("div");
            var date = document.createElement("div");
            var next = document.createElement("div");

            prev.className = "left";
            date.className = "middle date";
            next.className = "right";
            date.innerHTML =  month[currentDate.getMonth()] + " " + currentDate.getFullYear();
            div.appendChild(prev);
            div.appendChild(date);
            div.appendChild(next);
            var rightArrow = document.createElement("span");
            var leftArrow = document.createElement("span");
            rightArrow.className = "pointer";
            leftArrow.className = "pointer";
            rightArrow.innerHTML = "&#10094;";
            leftArrow.innerHTML = "&#10095;";
            rightArrow.onclick = prevMonth;
            leftArrow.onclick = nextMonth;
            prev.appendChild(rightArrow);
            next.appendChild(leftArrow);
            return div;
        };


        /**
         * display the picker
         */
        this.displayPicker = function(){
            var timePickers = document.getElementById("container");
            var button = this;
            var picker = button.nextSibling.nextSibling;
            var id_office = button.children[0].value;
            var body = document.createElement("div");
            if(!$.contains(document, timePickers)) {
                body.id = "container";
                if(type===2){
                    body.appendChild(createMonthHeader());
                }else {
                    body.appendChild(createDateHeader());
                }
                body.appendChild(bodyObject.createBody(id_office));
                picker.appendChild(body);
            }else{
                if($.contains(picker, timePickers)){
                    if(document.getElementById("formSelect")!=null){
                        removeValidButton();
                    }
                    picker.removeChild(timePickers);
                }else{
                    removePicker(timePickers);
                    body.id = "container";
                    if(type===2){
                        body.appendChild(createMonthHeader());
                    }else {
                        body.appendChild(createDateHeader());
                    }
                    body.appendChild(bodyObject.createBody(id_office));
                    picker.appendChild(body);
                }
            }
        };
    };


    var pickerObject;
    for(var i = 0; i < times.length; i++){
        pickerObject = new picker(0);
        times[i].onclick = pickerObject.displayPicker;
    }


    for(i = 0; i < halfDay.length; i++){
        pickerObject = new picker(1);
        halfDay[i].onclick = pickerObject.displayPicker;
    }

    for(i = 0; i < calendars.length; i++){
        pickerObject = new picker(2);
        calendars[i].onclick = pickerObject.displayPicker;
    }

})();
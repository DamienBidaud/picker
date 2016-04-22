/**
 * Created by d.bidaud on 22/04/2016.
 */
import BodyPicker from "./BodyPicker"

class BodyTime extends BodyPicker{
    var id_officePicker = 0;
    

    removeHourSelect(value) {
        var i = 0;
        for(i; i< this.hourSelect.length; i++){
            if(this.hourSelect[i]==value)
                break;
        }
        this.hourSelect.splice(i, 1);
    };

    checkboxListener() {
        var cell = this;
        var container = document.getElementById("container");
        var checkbox = cell.children[0];
        if(checkbox.checked){
            checkbox.checked = false;
            cell.className = "hourCell";
            this.removeHourSelect(checkbox.value);
        }else{
            checkbox.checked = true;
            cell.className = "hourSelect";
            this.hourSelect.push(checkbox.value);
        }
        if(this.hourSelect.length>0){

            if($.contains(container, document.getElementById("buttonValid"))) {
                container.removeChild(document.getElementById("buttonValid"));
            }
            var button = document.createElement("div");
            button.className = "table";
            button.id = "buttonValid";
            button.appendChild(this.createValidButton(id_officePicker));
            container.appendChild(button);
        }else{
            container.removeChild(document.getElementById("buttonValid"));
        }
    };

    createHourSelect(value){
        var hour = document.createElement("input");
        hour.type = "hidden";
        hour.name = "select[]";
        hour.value = value;
        return hour;
    };

    createValidButton(id){
        var sendDate = this.currentDate.getFullYear()+"-"+(this.currentDate.getMonth()+1)+"-"+this.currentDate.getDate();
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
        for(var i = 0; i < this.hourSelect.length; i++){
            form.appendChild(this.createHourSelect(this.hourSelect[i]));
        }
        var button = document.createElement("input");
        button.type="submit";
        button.value="Continuer";
        form.appendChild(button);
        div.appendChild(form);
        return div;
    };

    createTime(div, confirm){
        for(var i = 0; i < 2; i++){
            var row = document.createElement("div");
            row.className = "myRow";
            for(var j = 0; j < 6; j++){
                var cell = document.createElement("div");
                if(confirm[this.hoursDisplay[i][j]]==1){
                    cell.innerHTML = this.hoursDisplay[i][j]+"<input type='checkbox' class='hidden' value='"+this.hoursDisplay[i][j]+"' disabled>";
                    cell.className = "hourCheck";
                }else{
                    cell.innerHTML = this.hoursDisplay[i][j]+"<input name='bookingSelect' class='hidden' type='checkbox' value='"+this.hoursDisplay[i][j]+"' disabled>";
                    cell.className = "hourCell";
                    cell.addEventListener("click", this.checkboxListener);
                }
                row.appendChild(cell);
            }
            div.appendChild(row);
        }
    };

    createBody(id_office){
        var div = document.createElement("div");
        var hours = document.createElement("div");
        hours.className = "table";
        this.id_officePicker = id_office;
        var confirm = [];
        $.ajax({
            url:"",
            async:false,
            dataType:"JSON",
            method:"post",
            data:{date:this.currentDate.getFullYear()+"-"+(this.currentDate.getMonth()+1)+"-"+this.currentDate.getDate(), id_office:id_office},
            success:function(data){

                confirm = data;

            }
        });
        this.createTime(hours, confirm);
        div.appendChild(hours);
        return div;
    };
}

export default BodyTime;
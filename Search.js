$(document).ready(function(){
    const resultsperpage = 30;
    let pagenumber = 1;
    let totalpages = 1;
    $("#Submit").click(function(){
        $(".data").css("display","none");
        $(".Followers-name").remove();
        $(".Repository").remove();
        pagenumber = 1;
        var num1 = $("#Input input").val();
        searchUser(pagenumber,num1);
    });
    function searchUser(num2,num3){
        const num4 = num2;
        const num5 = num3;
        const url = `https://api.github.com/search/users?q=${num5}&per_page=${resultsperpage}&page=${num4}`;
        $.ajax({
            url: url,
            method:"GET",
            header:{
            "Accept":'application/vnd.github.v3+json'
            },
            success:function(data){
            var num6 = data.items;
            var num13 = $("<h2></h2>");
            var num14 = "Found "+data.total_count+" results for "+num5;
            num13.text(num14);
            $("#founds").remove();
            var num15 = $("<div></div>").attr("id","founds");
            $(num15).append(num13);
            $("body").append(num15);
            displayData(num6);
            totalpages = Math.ceil(data.total_count/resultsperpage);
            pagination();
            },
            error:function(status,error){
                console.log("Error:",error);
            }
        });
    };
    function displayData(response){
        $(".container").remove();
        var num23 = $("<div></div>").addClass("container");
        $("body").append(num23);
        $(".user_data").remove();
        response.forEach(user => {
            var num7 = $("<div></div>").addClass("user_data");
            var num8 = user.login;
            var num9 = user.avatar_url;
            var num10 = $("<img></img>").attr("src",num9);
            num10.addClass("tags");
            var num11 = $("<label></label>").text(num8);
            num11.addClass("tags");
            num7.append(num10);
            num7.append(num11);
            $(num23).append(num7);
        });
    }
    function pagination(){
       $("footer").remove();
       var num24 = $("<footer></footer>")
       $("body").append(num24);
        if (pagenumber > 1) {
            var num12 = $("<i></i>").addClass("bi bi-arrow-left");
            num12.attr("id","Previous");
            num24.append(num12);
        }

        if (pagenumber < totalpages) {
            var num12 = $("<i></i>").addClass("bi bi-arrow-right");
            num12.attr("id","Next");
            num24.append(num12);
        }
        $(document).on("click","#Next",function(){
            if(pagenumber < totalpages){
            pagenumber++;
            searchUser(pagenumber,$("#Input input").val());
        }
        });
        $(document).on("click","#Previous",function(){
            if(pagenumber > 1){
                pagenumber--;
                searchUser(pagenumber,$("#Input input").val());
            }
        });
    }
});
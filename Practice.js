$(document).ready(function() {
    $(document).on("click",".tags",function(){
      var num1 = $(this).text();
      $("footer").remove();
      $("#founds").remove();
      $(".container").remove();
      $(".data").css("display","flex")
      var num2 = "https://api.github.com/users/" + num1 + "/repos";
      var num5 = "https://api.github.com/users/" + num1 + "/followers";
      var num6 = "https://api.github.com/users/" + num1 + "/following";
      fetchfollowersdata(num5);
      fetchAll(num1);
      fetchrepos(num2);
      function fetchfollowersdata(request) {
        $.ajax({
          url: request,
          method: "GET",
          success: function(data) {
            $(".Followers-name").remove();
            if (data.length <= 0) {
              var num14 = $("<div></div>").addClass("Followers-name");
              $("body").append(num14);
              var num16 = $("<h1></h1>");
              $(num16).text("Followers");
              $(num14).append(num16);
              var h2 = $("<h2></h2>");
              $(h2).text("No Data Found");
              $(num14).append(h2);
            } else {
              let num13 = 0;
              var num14 = $("<div></div>").addClass("Followers-name");
              $("body").append(num14);
              var num16 = $("<h1></h1>");
              $(num16).text("Followers");
              $(num14).append(num16);
              for (var i = 0; i < data.length; i++) {
                if (num13 < 5) {
                  var a = $("<a></a>").attr("class", "tags");
                  var num15 = $("<div></div>").addClass("Follower-data");
                  $(num14).append(num15);
                  var num17 = $("<img />").addClass("Follow");
                  var num18 = data[i].avatar_url;
                  $(num17).attr("src", num18);
                  var num19 = $("<hr />");
                  var num20 = $("<label></label>");
                  var num21 = data[i].login;
                  $(a).text(num21);
                  $(num20).append(a);
                  $(num15).append(num17);
                  $(num15).append(num20);
                  $(num15).append(num19);
                }
                num13++;
              }
            }
          },
          error: function(xhrFields, status, error) {
            console.log("Error:", error);
          }
        });
      }
      function fetchrepos(repository) {
        $.ajax({
          url: repository,
          method: "GET",
          success: function(data) {
            $(".Repository").remove();
            const num3 = data[0].owner.login;
            const num4 = data[0].owner.avatar_url;
            $("#image").attr("src", num4);
            $("#anchor").text(num3);

            var repos = $("<div></div>");
            var heading = $("<h1></h1>");
            $(heading).text("Repositories");
            $(repos).append(heading);
            $(repos).attr("class", "Repository");
            $("body").append(repos);

            for (var i = 0; i < data.length; i++) {
              var num22 = data[i].html_url;
              var datas = $("<div></div>");
              var h2 = $("<h2></h2>");
              var an = $("<a></a>").attr("href", num22);
              var description = $("<p></p>");
              var language = $("<h3></h3>");
              var hr = $("<hr />");

              $(h2).append(an);
              $(description).attr("class", "description");
              $(language).attr("class", "language");
              $(h2).attr("class", "name");
              $(datas).attr("class", "Repo_data");

              $(repos).append(datas);
              var num10 = data[i].name;
              $(an).text(num10);
              $(datas).append(h2);

              var num11 = data[i].description;
              if (num11 !== "") {
                $(description).text(num11);
                $(datas).append(description);
              }

              var num12 = data[i].language;
              $(language).text(num12);
              $(datas).append(language);
              $(datas).append(hr);
            }
          },
          error: function(xhrFields, status, error) {
            console.log("Error:", error);
          }
        });
      }

      function fetchAll(username) {
        $.ajax({
          url: `https://api.github.com/users/${username}`,
          method: "GET",
          success: function(userData) {
            var totalFollowers = userData.followers;
            var repos = userData.public_repos;
            var following = userData.following;

            $("#Followers").text(totalFollowers);
            $("#Repos").text(repos);
            $("#Following").text(following);

            console.log(totalFollowers, repos, following);
          },
          error: function(error) {
            console.error("Error fetching user data: ", error);
          }
        });
      }
    });
  });
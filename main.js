document.addEventListener('DOMContentLoaded', getdata);

const UIcomp = (function(){
    let world = document.querySelectorAll('.stats_num');
    let cont =  document.getElementById('statcont');

    world = Array.from(world);

    return {
        setWorlddata : function (world_data){
            world[0].textContent = world_data.total_cases;
            world[1].textContent = world_data.active_cases;
            world[2].textContent = world_data.total_recovered;
            world[3].textContent = world_data.total_deaths;
            },
        setCounteriesData : function(counteries_data){
            for(i=0;i<counteries_data.length;i++){
                let div = document.createElement('div');
                div.className = 'counteries_boxes';
                div.innerHTML = `<div class="circle_big"></div>
                                    <div class="circle_small"></div>
                                    <h1 class="boxes_head">#${i+1}<span>${counteries_data[i].country_name}</span></h1>
                                    <div class="counteries_stats">
                                        <div class="count_stats_part">
                                            <h3 class="counteries_heading">Confirmed cases</h3>
                                            <h1 class="counteries_num">${counteries_data[i].cases}</h1>
                                        </div>
                                        <div class="count_stats_part">
                                            <h3 class="counteries_heading">Active cases</h3>
                                            <h1 class="counteries_num">${counteries_data[i].active_cases}</h1>
                                        </div>
                                        <div class="count_stats_part">
                                            <h3 class="counteries_heading">Recovered cases</h3>
                                            <h1 class="counteries_num">${counteries_data[i].total_recovered}</h1>
                                        </div>
                                        <div class="count_stats_part">
                                            <h3 class="counteries_heading">Deaths</h3>
                                            <h1 class="counteries_num">${counteries_data[i].deaths}</h1>
                                        </div>
                                </div>`;
                cont.append(div);
            }
        },
        disabledDark: function(){
            console.log("disable")
            document.body.classList.remove('darkmode');
            document.getElementById("myImg").src = "./sun.png";
            localStorage.setItem('mode',"disabled");
        },
        enabledDark: function(){
            console.log("enable");
            document.body.classList.add('darkmode');
            document.getElementById("myImg").src = "./moon.png";
            localStorage.setItem('mode',"enabled");
        },
        setTheme : function(){
            let darkMode = localStorage.getItem("mode");

            if(darkMode==='disabled'|| darkMode ===null){
                this.enabledDark();
            }else{
                this.disabledDark();

            }
        },
        setMode: function(){
            localStorage.setItem('mode','disabled');
        }
    };
})();

async function getdata(){

    let url = "https://corona-virus-world-and-india-data.p.rapidapi.com/api";
    let header = {
                method:'GET',
                headers: {
                    'x-rapidapi-host': "corona-virus-world-and-india-data.p.rapidapi.com",
                    'x-rapidapi-key': "b8a8fb0a52msh80becebcc52f771p1d0917jsn9a7294927667"
                }
              };
    let response = await fetch(url,header);
    let data = await response.json();
    let world = data.world_total;
    let countries_data = data.countries_stat;
    UIcomp.setWorlddata(world);
    UIcomp.setCounteriesData(countries_data);
    document.getElementById('search').addEventListener('keyup',search);
}

function search(e){
    let search = e.target.value;
    let reg = new RegExp(search,'i');
    let container = document.querySelectorAll('.counteries_boxes');
    let countries = document.querySelectorAll('span');
    container = Array.from(container);
    countries = Array.from(countries);
    let names = [];
    countries.forEach((ele)=>{
        names.push(ele.innerText);
    });
    let ui ={};
    names.forEach((word,index)=>{
        if(reg.test(word)) ui[index] = true;
    });
    container.forEach((ele,index)=>{
        if(!ui.hasOwnProperty(index)){
             ele.style.display = 'none';
        }else{
            ele.style.display = 'block';
        };
    });    
    e.preventDefault();
}
document.getElementById('toogle').addEventListener('click',toogleSwitch);
function toogleSwitch(e){
    // console.log("hello");
    let theme = localStorage.getItem('mode');
    UIcomp.setTheme();
    e.preventDefault();
}
UIcomp.setMode();
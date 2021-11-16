$(document).ready(function(){$('#sidebarCollapse').on('click',function(){$('#sidebar').toggleClass('active');});});

$(document).off("click" ,".list-group .list-group-item").on("click" ,".list-group .list-group-item" ,function(){

    $(this).sibbling().removeClass("active");
    $(this).addClass("active");
});

$(document).off("click" ,".list-group .list-group-item").on("click" ,".list-group .list-group-item" ,function(){

    $(this).sibbling().removeClass("active");
    $(this).addClass("active");
});
(function (){
    $('.navbar-toggler').on('click', function(){
        if($('.navbar-collapse.show').length > 0){
            $('.navbar-collapse').collapse('hide');
        }else{
            $('.navbar-collapse').collapse('show');
        }
    })

    $('#nav-menu').on('show.bs.collapse', function(){
        $('#user').addClass('menu-opened');
    });
    $('.navbar-collapse').on('hidden.bs.collapse', function(){
        $('#user').removeClass('menu-opened');
    })
})();
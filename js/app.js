// Ajax call to fetch the menu data
$.get( "https://jsonblob.com/api/jsonBlob/6766327f-607d-11e9-95ef-9bcb815ba4a4", function( data ) {

	var mainNav = '<ul class="navbar-menu">' +
					createMainNavlist(data) +
				'</ul>';

  	$(".nav-root").append(mainNav);

});

//Create the Nav menu
function createMainNavlist(data) {
	var newItem = '';
	for (var item in data) {
		var dropDownlist = '<ul class="dropdown-menu '+ (item === "product"?"isProduct":"notProduct") +'">' +
								createDropDownList(data[item]) +
							'</ul>';
			//Nav for mobile 
			$(".dropdown-root").append(dropDownlist);

			//Nav for desktop
			newItem += '<li>'+ item + dropDownlist +'</li>';
	}
	return newItem;
}

//Create the dropdown menu
function createDropDownList(items) {
	var dropDownlist = '';
	for(i=0;i<items.length;i++) {
		dropDownlist += '<li>'+
							'<a class="link-container" href="#">'+
								'<span class="icon-background" style="background: url(images/svg/'+ items[i].title.toLowerCase().replace(/ /g,"_") +'.svg) no-repeat;"></span>'+
								'<div class="link-content">'+
									'<h3 class="link-title">'+ items[i].title.toLowerCase() +'</h3>'+
									'<p class="link-sub-title">'+items[i]['sub-title'] +'</p>'+
								'</div>'+
							'</a>' +
						'</li>' ;
	}
	return dropDownlist;
}

//Adding animmation to the main nav mneu
$("body").on("mouseenter",".navbar-menu > li", function(){
	if($(".dropdown-menu").hasClass("flipOut")) {
		$(".dropdown-menu").removeClass("fadeInLeft")
		$(this).children(".dropdown-menu").addClass("fadeInLeft");
	}
	else {
		$(this).children(".dropdown-menu").addClass("flipOut");
	}

});

//Adding animmation to the mobile hanburger
$(".hamburger-icon").on("click", function(){
	$(".dropdown-root").removeClass('mobileFadeOut');
	$(".dropdown-root").addClass('mobileFadeIn');
	$(".dropdown-root").addClass('open');
	setTimeout(function() {
       $('.dropdown-root').removeClass("mobileFadeIn");
    }, 1000);

});

//Adding animmation to the close of the mobile menu
$(".close-popup").on("click", function(){
	$(".dropdown-root").removeClass('mobileFadeIn');
	$(".dropdown-root").addClass('mobileFadeOut');
	setTimeout(function() {
		$(".dropdown-root").removeClass('open');
	}, 400);
	setTimeout(function() {
       $('.dropdown-root').removeClass("mobileFadeOut");
    }, 1000)
});
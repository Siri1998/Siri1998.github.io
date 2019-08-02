$(document).ready(function(){
	$(".reg").hide()

	$("#single").click(function(){	
		$(".gstart").hide()
		 $('#onepl').toggle("fast");		 
 })



	$("#multiplayer").click(function(){
		$(".gstart").hide()
		 $('#twopl').toggle("fast");
	})



		$("#onebtn").click(function(){
			let user=$(".user").val()
			if(user.length==0){
				alert("Name Field is missing")
			} else{
					window.open("single.html", "_parent")
			}
		})


		$("#twobtn").click(function(){
			let user1=$(".user1").val()
			let user2=$(".user2").val()
			if((user1.length==0) ||  (user2.length==0)){
				alert("Name Field is missing")
			}else{
				window.open("multiplayer.html", "_parent")
			}
			
		})


})








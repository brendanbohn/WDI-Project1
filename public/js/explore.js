console.log('Sanity check, client-side JS is working.');


$(document).ready(function(){

	function signSwitch() {
		if ($('.data-target').attr('.signup-form-modal-lg')) {
			$('.data-target').attr('.signin-form-modal-lg');
		}
	}

	$('.sign-title').on('click',function(){
		console.log('clicked sign text');
	});

});
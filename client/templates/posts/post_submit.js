// Template.postSubmit.onCreated(function(){
// 	Session.set('postSubmitErrors', {});
// });

 Template.postSubmit.helpers({
 	errorMessage: function(field){
 		return false; //Session.get('postSubmitErrors')[field];
 	},
 	errorClass: function (field){
 		return false; //!!Session.get('postSubmitErrors')[field] ? 'has-errors' : '';
	}
 })

Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
		};

		//var errors = validatePost(post);
		//if (errors.url)
		//	return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result){
			if(error)
				return throwError(error.reason);

			if(result.postExists)
				throwError('This link has already been posted.');

			Router.go('postPage', {_id: result._id});
		});
	}
});
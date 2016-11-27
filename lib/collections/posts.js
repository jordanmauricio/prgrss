Posts = new Mongo.Collection('posts');

Meteor.methods({
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes,{
			url: String
		});

		validatePost = function(post){
			var errors = {};
			if(!post.url)
				errors.url = "URL required.";
			return errors;
		}

		var errors = validatePost(postAttributes);
		if(errors.url)
			throw new Meteor.Error('invalid-post', "Title required.");

		var postWithSameLink = Posts.findOne({url:postAttributes.url});
		if (postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var retrievedData = Metainspector.fetch(postAttributes.url);

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			title: retrievedData.title,
			userId: user._id,
			author: user.username,
			desc: retrievedData.description,
			img: retrievedData.image,
			submitted: new Date(),
			commentCount: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', )

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/sdc');
}


const questionsSchema = new mongoose.Schema({
	product_id : {
		type: Number,
	},
	question_id : {
		type: Number,
	},
	question_body : {
		type: String,
		default: null
	},
	question_date : {
		type: Date,
		default: Date.now(),
	},
	asker_name : {
		type: String,
		default: null,
	},
	asker_email : {
		type: String,
		default: null,
	},
	question_helpfulness : {
		type: Number,
		default: 0,
	},
	reported : {
		type: Boolean,
		default: false,
	},
})

const answersSchema = new mongoose.Schema({
	question_id : {
		type: Number,
		index: true
	},
	answer_id : {
		type: Number,
	},
	answer_body : {
		type: String,
		default: null,
	},
	answer_date : {
		type: Date,
		default: Date.now()
	},
	answer_name : {
		type: String,
		default: null
	},
	answer_email : {
		type: String,
		default: null
	},
	answer_helpfulness : {
		type: Number,
		default: 0
	},
	reported : {
		type: Boolean,
		default: false
	},
	answer_photos : [
		{
			photo_id: {
				type: Number,
			},
			url : {
				type: String,
				default: null
			}
		}
	],

})

const Questions = mongoose.model('Questions', questionsSchema);
const Answers = mongoose.model('Answers', answersSchema);




module.exports = { Questions, Answers }
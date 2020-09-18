const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'A company must have name']
    },
    role: {
      type: String,
      required: [true, 'A Role must have a name'],
      trim: true,
      maxlength: [20, 'A Role have less or equal then 40 characters'],
      minlength: [
        5,
        'A Role must have more or equal then 10 characters'
      ]
    },
    salary: {
      type: Number,
      required: [true, 'A company must provide salary']
    },
    duration: {
      type: String,
      required: [true, 'Mention the time period of work']
    },
    companySize: {
      type: Number,
      required: [true, 'A company must few employees']
    },
    postedAt: {
      type: Date,
      default: Date.now()
    },
    employer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A job can only be posted by employer']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

jobSchema.virtual('applicants', {
  ref: 'Application',
  foreignField: 'job',
  localField: '_id'
});

jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'employer',
    select: '-role -__v'
  });

  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

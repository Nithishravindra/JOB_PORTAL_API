const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job',
      required: [true, 'Application must belong to a Job!']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Application must belong to a User!']
    },
    description: {
      type: String,
      require: [true, 'Enter description']
    },
    appliedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

applicationSchema.pre(/^find/, function (next) {
  this.populate({ path: 'job', select: '_id salary role' }).populate({
    path: 'user',
    select: 'name email _id'
  });
  next();
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

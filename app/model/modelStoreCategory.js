// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Category Schema. This will be the basis of how category data is stored in the db
var CategorySchema = new Schema({
    categoryName: {type: String, required: true},
    categoryDesc: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
CategorySchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the CategorySchema for use elsewhere. Sets the MongoDB collection to be used as: "store-categorys"
module.exports = mongoose.model('store-category', CategorySchema);

// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Store Schema. This will be the basis of how store data is stored in the db
var StoreSchema = new Schema({
    storeName: {type: String, required: true},
    storeAddress: {type: String, required: true},
    storeLocation: {type: [Number], required: true}, // [Long, Lat]
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    status: {type: Number, default: 1}
});

// Sets the created_at parameter equal to the current time
StoreSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
StoreSchema.index({storeLocation: '2dsphere'});

// Exports the StoreSchema for use elsewhere. Sets the MongoDB collection to be used as: "store-details"
module.exports = mongoose.model('store-detail', StoreSchema);

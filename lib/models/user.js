'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');
  
var authTypes = ['github', 'twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    default: 'user'
  },
  profile:{fio:String,
      phone:String,
      zip:String,
      country:String,
      region:String,
      city:String,
      countryId:String,
      regionId:Number,
      cityId:String,
      address:String
  },
  date: { type: Date, default: Date.now },
  subscribe :{type : Boolean, default : true},
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

UserSchema.add({profile:{fio:String,
    phone:String,
    zip:String,
    country:String,
    region:String,
    city:String,
    countryId:String,
    regionId:Number,
    cityId:String,
    adress:String
}});
UserSchema.add({ type: Date});
UserSchema.add({subscribe :{type : Boolean, default : true}});

/**
 * Virtuals
 */
/*
UserSchema.pre('save',function( next){
    console.log(this);
    next();
})
*/


UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password, this.salt);
  })
  .get(function() {
    return this._password;
  });

// Basic info to identify the current authenticated user in the app
UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role,
      'provider': this.provider,
      'email':this.email,
       'id':this._id,
        '_id':this._id,
        'profile':this.profile
    };
  });

// Public profile information
/*UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });*/
    
/**
 * Validations
 */
var validatePresenceOf = function(value) {
  return value && value.length;
};

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

/**
 * Plugins
 */
UserSchema.plugin(uniqueValidator,  { message: 'Value is not unique.' });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
        //console.log(this);
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return bcrypt.genSaltSync(SALT_WORK_FACTOR);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, salt) {
    // hash the password using our new salt
    return bcrypt.hashSync(password, salt);
  }
};

mongoose.model('User', UserSchema);




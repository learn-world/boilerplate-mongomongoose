require('dotenv').config();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("MongoDb Successfully Connected...");
}
);

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: {
    type: [String],
  },
});

let Person = model('Person', personSchema);

const createAndSavePerson = (done) => {
  const user = new Person({
    name: "sourav",
    age: 24,
    favoriteFoods: ["Badam", "Tetul"],
  });
    user.save((err, data) => {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = function(personName, done) {
    Person.find({name: personName}, function (err,personFound) {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then((res) => done(null, res))
    .catch((e) => console.log(e));
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId })
    .then((res) => done(null, res))
    .catch((err) => console.log(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  )
    .then((res) => done(null, res))
    .catch((err) => console.log(err));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId })
    .then((res) => done(null, res))
    .catch((err) => console.log(err));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, res) => {
    if (err) {
      return console.log(err);
    }
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = { favoriteFoods: foodToSearch };
  Person.find(query)
    .sort({ name: "asc" })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

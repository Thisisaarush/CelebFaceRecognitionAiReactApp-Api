const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '7eabbf82156d447ca7950794983ac45a'
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => status(400).json('Unable to use Api'));
} 

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('rank', 1)
  .returning('rank')
  .then(rank => {
    res.json(rank[0]);
  })
  .catch(err => res.status(400).json('Unable to get your rank'));

};

module.exports = {
  handleImage,
  handleApiCall
}
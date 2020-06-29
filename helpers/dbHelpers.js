module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users;`,
    };

    return db.query(query).then((result) => result.rows);
  };

  const addUser = (name, email, password) => {
    const query = {
      text: `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      values: [name, email, password]
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const getAllQuizzes = function(options, limit = 6) {
    const queryParams = [];

    let queryString = `
    SELECT *
    FROM quizzes
    WHERE is_public=true
    `;

    // console.log(queryString, queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };

  const getQuizById = function(id, limit) { //would need to create a search form by name or id
    const queryParams = [];

    let queryString = `
    SELECT quizzes.*, questions.text as text
    FROM quizzes
    JOIN questions ON questions.quiz_id = quizzes.id
    WHERE is_public = true AND quizzes.id = $1
    LIMIT 1;
    `;

    queryParams.push(id);
    console.log("dbQuery:", queryString, "the param:", queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows[0]);
  };

  return {
    getUsers,
    addUser,
    getAllQuizzes,
    getQuizById
  };
};

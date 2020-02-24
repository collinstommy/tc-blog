---
title: "Your code should tell a story: Tips for writing code for others to read"
date: "2020-02-21"
---

When we write code, we are also writing a story for other developers.

Here are a few tips on how we can write code for our future selves and other developers (our readers).

### 1. Use functions and variables to convey your intention, not comments

Relying on comments can lead to code that takes longer to read and digest. You should think about how your code will live on. It’s a story that others are going to read, possibly for years to come.

**Bad:**
```js
const sendResult = (dbConfig, query) => {
  // get connection to database
  const db = getConnection(dbConfig);
  /* The function calculates exame results for all students */
  const users = db.sendQuery(query);
  const resuls = users.map(user => ({ id: user.id, result: result }));

  /* Generate Email with results */
  const html = generateHTML(results);
  sendEmail(html);
}
```
**Good:**
Create extra functions to explain your code. Needing to add a comment should be a call to action to either create a new variable or a new function. Smaller functions are easier to test and lead to dryer code.

```js
const getStudentResults = (dbConfig, query) => {
  const dbConnection = getConnection(dbConfig);
  const users = dbConnection.sendQuery(dbConfig, query);
  return users.map(user => ({ id: user.id, result: result }));
}

const emailResults = () => {
  const html = generateHTML(results);
  sendEmail(html);
}

const sendResult = (dbConfig, query) => {
  const resuls = getStudentResults(dbConfig, query);
  emailResultse(resuls);
}
```

**Good:**
Documenting high level functions using something like JSDoc is an ideal use case for comments.
```js
/**
 * Get student results from the Database
 * @param {object} dbConfig - Config for connecting to the db
 * @param {string} query - Query for the database
 */
const getStudentResults = (dbConfig, query) => { }

```

Disclaimer: There are a place and time for comments. I’m not against comments per se, just the overuse of them when clean code is a better option.

### 2. Use variables to explain control statements

When others are reading your code you should make their lives as easy as possible. I don’t want a good story ruined by constantly having to make small calculations in my head.

**Bad:**
```js
const user = getStudentResults(4309394);
// I need to compute this in my brain to figure out what is happening in this if statement
if (user.result < 40 || user.attendance < 50) {
  sendEmail(user, false);
} else {
  sendPassMail(user, true)
}
```


**Good:**
Assigning new variables to store the results of a statement allows readers of your code to get on with the story.  A reader of your code is trying to find the piece that they are concerned with. Help them follow the story so they can fix the bug or add that piece of functionality. This story will have co-authors.

```js
const user = getStduentResults(4309394);
const userPassedCourse = user.result < 40 || user.attendance < 50;

if (userPassedCourse) {
  sendEmail(user, false);
} else {
  sendEmail(user, true)
}
```

### 3. Avoid ambiguous arguments
`myFunction(null, undefined, 1)` is not the best start to any story.  Don’t make your readers delve into the function so see what the arguments do. 

**Bad:** 
```js
const user = getStudentResults(4309394);

if (user.result < 40 || user.attendance < 50) {
	// what does false mean here, I can guess but it should be explicit
  sendEmail(user, false);
} else {
  sendEmail(user, true)
}
```


**Good:**
Passing in an object can be a great solution here. 

```js
const sendEmail = ({ user, passedCourse }) => { }

const user = getStudentResults(4309394);
const userPassedCourse = user.result < 40 || user.attendance < 50;

if (userPassedCourse) {
  sendEmail({ user, passedCourse: true });
} else {
  sendEmail({ user, passedCourse: true });
}
```


**Also Good:**
You could make your story more expressive by creating some new functions.
```js
const sendEmail = ({ user, passedCourse }) => { }

const sendPassEmail = (user) => {
  sendEmail({ user, passedCourse: true });
}

const sendFailEmail = (user) => {
  sendEmail({ user, passedCourse: false });
}

const user = getStudentResults(4309394);
const userPassedCourse = user.result < 40 || user.attendance < 50;

if (userPassedCourse) {
  sendPassedEmail(user);
} else {
  sendFailEmail(user)
}
```

### 4. Magic is good in some stories, not in ours

Avoid magic numbers. Similar to the ambiguous arguments above, magic numbers have the sort of intrigue we don’t want in our stories

**Bad:**
```js
const getStudents = (courseId, fieldOfStudy) => {}

const students = getStudents('323424', 4);
```


**Good:**
```js
const getStudents = (courseId, studentType) => {}
const courseId = '323424';
const fieldsOfStudy = {
	ENGINEERING: 4,
	BUSINESS: 5
};

const students = getStudents(courseId, fieldsOfStudy.ENGINEERING);
```

### 5. Use enums. Avoid using strings as identifiers.
In the same vain as magic numbers, using strings as indentifier can lead to confusion in your story. Having ids in strings can lead to ambiguity. Refactoring these strings will be more difficult.

**Bad:**
```js
getResults({ entity: 'undergrad', courseId: 'SCIENCE_101'});

// Elsewhere in the code
getResults({ entity: 'undergrad', courseId: 'SCIENCE_101'});
getResults({ entity: 'undergrad', courseId: 'SCIENCE_100'});

```

**Good:**
```js
const entity = {
  UNDERGRAD: 'underGrad',
  POSTGRAD: 'postGrad',
}

getResultsFromDB({ entity: 'undergrad', courseId: 'SCIENCE_101'})
```
Better yet, use typescript to enforce type safety.

### 6.  Favor verbosity over brevity

Don’t confuse your readers. Our code should be dry, concise and clean but our function names don’t need to be restricted by length.

**Bad:**
```js
const results = getResults();
```

**Good:**
```js
const examResults = getStudentExamResults();
```

What tips do you have?
Would love to see some code snippets in the comments.

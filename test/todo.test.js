const request = require('supertest');
const app = require('../src/app');

describe('Todo API', () => {
  let todoId;
  let token;

  // Login and get the token before running tests
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login') // Adjust the endpoint according to your login API
      .send({
        "email" : "vaibhavpandey@yopmail.com",
        "password" : "Test@123"
      })
      .expect(200);

    token = res.body.data.access.token; // Adjust according to your API response structure
  });

  // Create a new todo
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/v1/todo')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send({
        task: 'Test Todo',
      })
      .expect(200);

    todoId = res.body.data.id; // Assuming API returns the created todo with an id field
  });

  // Fetch all todos
  it('should fetch all todos', async () => {
    await request(app)
      .get('/api/v1/todo')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .expect(200);
  });

  // Update an existing todo
  it('should update an existing todo', async () => {
    if (!todoId) {
      throw new Error('Todo ID not set'); // Ensure todoId is set before updating
    }

    await request(app)
      .put(`/api/v1/todo`)
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send({
        task: 'Updated Test Todo',
        task_id : todoId
      })
      .expect(200);
  });


  // complete an existing todo
  it('should complete an existing todo', async () => {
    if (!todoId) {
      throw new Error('Todo ID not set'); // Ensure todoId is set before deleting
    }
    await request(app)
    .put(`/api/v1/todo/complete`)
    .set('Authorization', `Bearer ${token}`).send({
      task_id : todoId
    }).expect(200);
  });


  afterAll(async () => {
    // Perform cleanup actions here after all tests
       await request(app)
      .delete(`/api/v1/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .expect(200);
  });
  
});

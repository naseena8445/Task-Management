from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Task


class TaskManagerApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_and_login_and_task_crud(self):
        register_response = self.client.post('/api/auth/register', {
            'name': 'Alice',
            'email': 'alice@example.com',
            'password': 'secret123'
        }, format='json')
        self.assertEqual(register_response.status_code, 201)
        self.assertIn('token', register_response.data)

        login_response = self.client.post('/api/auth/login', {
            'email': 'alice@example.com',
            'password': 'secret123'
        }, format='json')
        self.assertEqual(login_response.status_code, 200)
        token = login_response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        create_response = self.client.post('/api/tasks', {
            'title': 'Write report',
            'description': 'Need to finish it',
            'dueDate': '2026-07-01',
            'priority': 'High'
        }, format='json')
        self.assertEqual(create_response.status_code, 201)
        task_id = create_response.data['id']

        list_response = self.client.get('/api/tasks')
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(len(list_response.data), 1)

        update_response = self.client.put(f'/api/tasks/{task_id}', {
            'completed': True
        }, format='json')
        self.assertEqual(update_response.status_code, 200)
        self.assertTrue(update_response.data['completed'])

        delete_response = self.client.delete(f'/api/tasks/{task_id}')
        self.assertEqual(delete_response.status_code, 204)

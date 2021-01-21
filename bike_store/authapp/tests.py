from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from authapp.models import User


class AccountsTest(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user('testuser', 'testuser', 'test@example.com', 'testpassword')
        self.create_url = reverse('registration')
        print(self.create_url)

    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            'first_name': 'test',
            'last_name': 'test',
            'email': 'test@test.com',
            'password': 'test',
            'password_confirm': 'test',
        }

        response = self.client.post(self.create_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        user = User.objects.latest('id')
        token = Token.objects.get(user=user)
        self.assertTrue('token' in response.data)
        self.assertEqual(response.data['token'], token.key)

    def test_create_user_with_no_password(self):
        data = {
            'first_name': '',
            'last_name': '',
            'email': 'test@test.com',
            'password': '',
            'password_confirm': '',
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_too_long_name(self):
        data = {
            'first_name': 'test'*300,
            'last_name': '',
            'email': 'test@test.com',
            'password': 'test',
            'password_confirm': 'test',
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_invalid_email(self):
        data = {
            'first_name': 'test',
            'last_name': '',
            'email': 'test.com',
            'password': 'test',
            'password_confirm': 'test',
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_no_email(self):
        data = {
            'first_name': 'test',
            'last_name': '',
            'email': '',
            'password': 'test',
            'password_confirm': 'test',
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            'first_name': 'test',
            'last_name': '',
            'email': 'test@example.com',
            'password': 'test',
            'password_confirm': 'test',
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

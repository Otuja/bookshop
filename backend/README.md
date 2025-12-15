# Bookshop Backend

This is the Django backend for the Bookshop application. It provides a REST API for managing users, books, orders, and payments.

## Tech Stack

- **Framework**: Django 6.0
- **API**: Django REST Framework
- **Authentication**: SimpleJWT (JWT)
- **Database**: SQLite (Development) / PostgreSQL (Production ready)
- **Image Handling**: Pillow
- **CORS**: django-cors-headers

## Project Structure

```
backend/
├── accounts/         # User authentication and profiles
├── books/            # Book management and categories
├── orders/           # Order processing
├── payments/         # Payment transaction handling
├── config/           # Project settings and URLs
├── media/            # User uploaded files (avatars, book covers)
└── manage.py         # Django management script
```

## Setup Instructions

1.  **Create a Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run Migrations**:
    ```bash
    python manage.py migrate
    ```

4.  **Create Superuser** (Optional, for Admin access):
    ```bash
    python manage.py createsuperuser
    ```

5.  **Run Development Server**:
    ```bash
    python manage.py runserver
    ```

    The API will be available at `http://127.0.0.1:8000/api/`.
    The Admin interface will be at `http://127.0.0.1:8000/admin/`.

## API Endpoints

### Authentication
- `POST /api/auth/register/`: Register a new user.
- `POST /api/auth/login/`: Login and obtain JWT tokens.
- `POST /api/auth/logout/`: Logout (blacklist refresh token).
- `GET /api/auth/profile/`: Get current user profile.

### Books
- `GET /api/books/`: List all books (supports filtering).
- `GET /api/books/<uuid>/`: Get book details.
- `GET /api/categories/`: List all categories.

### Orders
- `GET /api/orders/`: List user's orders.
- `GET /api/orders/<uuid>/`: Get order details.

### Payments
- `POST /api/checkout/initiate/`: Initiate a payment.
- `GET /api/checkout/confirm/`: Confirm payment status.

## Environment Variables

For production, you should set the following environment variables:

- `SECRET_KEY`: Django secret key.
- `DEBUG`: Set to `False`.
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: PostgreSQL connection details.

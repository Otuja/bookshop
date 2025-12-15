import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_backend():
    print("Testing Backend...")

    # 1. Register
    print("\n1. Registering User...")
    register_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123",
        "password_confirm": "testpassword123",
        "first_name": "Test",
        "last_name": "User"
    }
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", data=register_data)
        if response.status_code == 201:
            print("User registered successfully.")
        elif response.status_code == 400 and "email" in response.json() and "already exists" in str(response.json()):
             print("User already exists.")
        else:
            print(f"Registration failed: {response.status_code} {response.text}")
    except Exception as e:
        print(f"Registration failed with error: {e}")

    # 2. Login
    print("\n2. Logging in...")
    login_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    token = None
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", data=login_data)
        if response.status_code == 200:
            token = response.json().get("access")
            print("Login successful. Token obtained.")
        else:
            print(f"Login failed: {response.status_code} {response.text}")
    except Exception as e:
        print(f"Login failed with error: {e}")

    if not token:
        print("Skipping authenticated tests.")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 3. Get Profile
    print("\n3. Getting Profile...")
    response = requests.get(f"{BASE_URL}/auth/profile/", headers=headers)
    if response.status_code == 200:
        print("Profile retrieved successfully.")
    else:
        print(f"Get Profile failed: {response.status_code} {response.text}")

    # 4. List Books
    print("\n4. Listing Books...")
    response = requests.get(f"{BASE_URL}/books/")
    if response.status_code == 200:
        print("Books listed successfully.")
    else:
        print(f"List Books failed: {response.status_code} {response.text}")

    # 5. Initiate Checkout (Mock)
    print("\n5. Initiating Checkout...")
    checkout_data = {
        "items": [], # Empty for now as we have no books
        "email": "test@example.com",
        "provider": "paystack"
    }
    response = requests.post(f"{BASE_URL}/checkout/initiate/", json=checkout_data, headers=headers)
    if response.status_code == 201:
        print("Checkout initiated successfully.")
    elif response.status_code == 400: # Expected since items are empty or stock check fails
        print(f"Checkout validation working: {response.status_code} {response.text}")
    else:
        print(f"Checkout failed: {response.status_code} {response.text}")

if __name__ == "__main__":
    test_backend()

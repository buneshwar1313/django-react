# Django Project README

## Installation

1. Create a virtual environment using Python 3:

    ```bash
    python3 -m venv test-env
    ```

2. Activate the virtual environment:

    - On Windows:

        ```bash
        test-env\Scripts\activate
        ```

    - On macOS/Linux:

        ```bash
        source test-env/bin/activate
        ```

3. Install the project dependencies using pip:

    ```bash
    pip3 install -r requirements.txt
    ```

## Running the Django Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Run the Django development server:

    ```bash
    python3 manage.py runserver
    ```

The backend server should now be running at `http://127.0.0.1:8000/`.

## Setting Up the Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install Node.js dependencies using Yarn or npm:

    ```bash
    # Using Yarn
    yarn install

    # Using npm
    npm install
    ```

## Running the Frontend Development Server

1. After installing dependencies, you can start the development server:

    ```bash
    # Using Yarn
    yarn dev

    # Using npm
    npm run dev
    ```

The frontend development server should now be running at `http://localhost:3000/`.

# Inventory Tracker

An app I'm creating to track my growing personal inventory comprised mostly of home automation gear (IoT), some gaming stuff, and other knick-knacks but it could extend to other things.

## Tech Stack

- Backend
  - [Python 3.11](https://www.python.org/)
  - [Django](https://www.djangoproject.com/)

- Frontend
  - [React](https://react.dev/)
  - [MUI](https://mui.com/)

---

### Installation & Usage

**Pre-requisites:** Before you can run the application, ensure the following pre-requisites are installed:

- [Python 3.11](https://www.python.org/)
- [Django](https://www.djangoproject.com)

#### Run instructions

1. Clone/download the repo.

    ```
    git clone https://github.com/moh-i-ahmed/inventoryTracker
    ```

2. Run the Django app server.

    ```
    cd <repo_location>/inventoryTracker/inventoryTracker
    python .\manage.py makemigrations
    python .\manage.py migrate
    python .\manage.py runserver
    ```

3. Run the React app.

    ```
    cd <repo_location>/inventoryTracker/inventoryTracker/frontend
    npm run dev
    ```

4. After the application starts, go to [http://127.0.0.1:8000](http://127.0.0.1:8000) to view it in the browser.

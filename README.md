# A Fullstack Blog Application in Django and React

This is a full-stack blog application made using React on the frontend and Django on the backend.

## Run this project locally

First, Clone the repository:

```bash
git clone https://github.com/matrix-bro/full-stack-blog-app.git
```

### Setup Django (Backend)

Go to this folder

```bash
cd full-stack-blog-app/backend
```

Create a virtual environment and activate it

```bash
python -m venv venv

(In windows)
source .\venv\Scripts\activate

(In linux)
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Apply migrations

```bash
python manage.py migrate
```

Start the development server

```bash
python manage.py runserver
```

### Setup React (Frontend)

Go to this folder

```bash
cd full-stack-blog-app/frontend
```

Install Dependencies

```bash
npm install
```

Start the Development Server

```bash
npm run dev
```

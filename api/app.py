from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import os
import json
import datetime
import uuid
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app)


users = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "demo@example.com",
        "password": "password",  
        "role": "admin",
        "avatar": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
]

projects = [
    {
        "id": 1,
        "name": "Website Redesign",
        "description": "Redesign the company website with new branding",
        "status": "in-progress",
        "progress": 70,
        "startDate": "2025-05-01",
        "dueDate": "2025-07-15",
        "members": [1, 2, 3, 4, 5],
        "created_by": 1
    },
    {
        "id": 2,
        "name": "Mobile Application",
        "description": "Develop a cross-platform mobile app for our services",
        "status": "in-progress",
        "progress": 45,
        "startDate": "2025-06-01",
        "dueDate": "2025-08-20",
        "members": [1, 2, 3],
        "created_by": 1
    },
    {
        "id": 3,
        "name": "API Integration",
        "description": "Integrate payment processing API into the platform",
        "status": "completed",
        "progress": 100,
        "startDate": "2025-04-15",
        "dueDate": "2025-06-05",
        "members": [1, 3, 5],
        "created_by": 1
    }
]

tasks = [
    {
        "id": 1,
        "title": "Create wireframes",
        "description": "Create initial wireframes for the homepage and key pages",
        "status": "completed",
        "priority": "high",
        "assignee": 2,
        "project_id": 1,
        "dueDate": "2025-05-15",
        "created_by": 1
    },
    {
        "id": 2,
        "title": "Design homepage mockup",
        "description": "Create detailed mockup of the new homepage",
        "status": "completed",
        "priority": "high",
        "assignee": 2,
        "project_id": 1,
        "dueDate": "2025-05-25",
        "created_by": 1
    },
    {
        "id": 3,
        "title": "Develop frontend components",
        "description": "Build reusable React components for the site",
        "status": "in-progress",
        "priority": "medium",
        "assignee": 3,
        "project_id": 1,
        "dueDate": "2025-06-10",
        "created_by": 1
    }
]


app.config['SECRET_KEY'] = 'your-secret-key'  


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:

            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = next((user for user in users if user['id'] == data['user_id']), None)
            if current_user is None:
                return jsonify({'message': 'User not found!'}), 401
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated


@app.route('/api/auth/login', methods=['POST'])
def login():
    auth = request.json
    
    if not auth or not auth.get('email') or not auth.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
    
    user = next((user for user in users if user['email'] == auth.get('email')), None)
    
    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
    
    if user['password'] == auth.get('password'):  
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'avatar': user.get('avatar')
            }
        })
    
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    if not data or not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    if any(user['email'] == data['email'] for user in users):
        return jsonify({'message': 'User already exists'}), 400
    
    new_user = {
        'id': len(users) + 1,
        'name': data['name'],
        'email': data['email'],
        'password': data['password'],  
        'role': 'user'
    }
    
    users.append(new_user)
    
    token = jwt.encode({
        'user_id': new_user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    
    return jsonify({
        'token': token,
        'user': {
            'id': new_user['id'],
            'name': new_user['name'],
            'email': new_user['email'],
            'role': new_user['role']
        }
    }), 201

@app.route('/api/auth/user', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify({
        'id': current_user['id'],
        'name': current_user['name'],
        'email': current_user['email'],
        'role': current_user['role'],
        'avatar': current_user.get('avatar')
    })

@app.route('/api/projects', methods=['GET'])
@token_required
def get_projects(current_user):
    user_projects = [project for project in projects if current_user['id'] in project['members'] or project['created_by'] == current_user['id']]
    return jsonify(user_projects)

@app.route('/api/projects/<int:project_id>', methods=['GET'])
@token_required
def get_project(current_user, project_id):
    project = next((project for project in projects if project['id'] == project_id), None)
    
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    
    if current_user['id'] not in project['members'] and project['created_by'] != current_user['id']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    project_tasks = [task for task in tasks if task['project_id'] == project_id]
    
    return jsonify({
        'project': project,
        'tasks': project_tasks
    })

@app.route('/api/projects', methods=['POST'])
@token_required
def create_project(current_user):
    data = request.json
    
    if not data or not all(k in data for k in ('name', 'description')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    new_project = {
        'id': len(projects) + 1,
        'name': data['name'],
        'description': data['description'],
        'status': data.get('status', 'planning'),
        'progress': data.get('progress', 0),
        'startDate': data.get('startDate', datetime.datetime.now().strftime('%Y-%m-%d')),
        'dueDate': data.get('dueDate'),
        'members': data.get('members', [current_user['id']]),
        'created_by': current_user['id']
    }
    
    projects.append(new_project)
    
    return jsonify(new_project), 201

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
@token_required
def update_project(current_user, project_id):
    project = next((project for project in projects if project['id'] == project_id), None)
    
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    
    if project['created_by'] != current_user['id'] and current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.json
    
    for key, value in data.items():
        if key in project:
            project[key] = value
    
    return jsonify(project)

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user, project_id):
    project = next((project for project in projects if project['id'] == project_id), None)
    
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    
    if project['created_by'] != current_user['id'] and current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    global projects
    projects = [p for p in projects if p['id'] != project_id]
    

    global tasks
    tasks = [t for t in tasks if t['project_id'] != project_id]
    
    return jsonify({'message': 'Project deleted'})

@app.route('/api/projects/<int:project_id>/tasks', methods=['GET'])
@token_required
def get_project_tasks(current_user, project_id):
    project = next((project for project in projects if project['id'] == project_id), None)
    
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    
    if current_user['id'] not in project['members'] and project['created_by'] != current_user['id']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    project_tasks = [task for task in tasks if task['project_id'] == project_id]
    
    return jsonify(project_tasks)

@app.route('/api/projects/<int:project_id>/tasks', methods=['POST'])
@token_required
def create_task(current_user, project_id):
    project = next((project for project in projects if project['id'] == project_id), None)
    
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    
    if current_user['id'] not in project['members'] and project['created_by'] != current_user['id']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.json
    
    if not data or not data.get('title'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    new_task = {
        'id': len(tasks) + 1,
        'title': data['title'],
        'description': data.get('description', ''),
        'status': data.get('status', 'pending'),
        'priority': data.get('priority', 'medium'),
        'assignee': data.get('assignee'),
        'project_id': project_id,
        'dueDate': data.get('dueDate'),
        'created_by': current_user['id']
    }
    
    tasks.append(new_task)
    
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
@token_required
def update_task(current_user, task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    project = next((project for project in projects if project['id'] == task['project_id']), None)
    
    if current_user['id'] not in project['members'] and project['created_by'] != current_user['id']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.json
    
    for key, value in data.items():
        if key in task:
            task[key] = value
    
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@token_required
def delete_task(current_user, task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    project = next((project for project in projects if project['id'] == task['project_id']), None)
    
    if current_user['id'] not in project['members'] and project['created_by'] != current_user['id']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    
    return jsonify({'message': 'Task deleted'})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
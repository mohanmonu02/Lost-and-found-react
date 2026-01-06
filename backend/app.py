from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# In-memory storage (in production, use a database)
lost_items = []
found_items = []
item_id_counter = 1

# Home route
@app.route('/')
def home():
    return jsonify({"message": "Lost and Found Management System API"})

# Get all lost items
@app.route('/api/lost-items', methods=['GET'])
def get_lost_items():
    return jsonify(lost_items)

# Get all found items
@app.route('/api/found-items', methods=['GET'])
def get_found_items():
    return jsonify(found_items)

# Report a lost item
@app.route('/api/lost-items', methods=['POST'])
def add_lost_item():
    global item_id_counter
    try:
        data = request.json
        print(f"Received lost item data: {data}")  # Debug logging
        
        new_item = {
            'id': item_id_counter,
            'name': data.get('name'),
            'description': data.get('description'),
            'date': data.get('date'),
            'location': data.get('location'),
            'contact': data.get('contact'),
            'status': 'lost',
            'created_at': datetime.now().isoformat()
        }
        
        lost_items.append(new_item)
        item_id_counter += 1
        print(f"Added lost item: {new_item}")  # Debug logging
        
        return jsonify(new_item), 201
    except Exception as e:
        print(f"Error adding lost item: {str(e)}")
        return jsonify({"error": str(e)}), 400

# Report a found item
@app.route('/api/found-items', methods=['POST'])
def add_found_item():
    global item_id_counter
    try:
        data = request.json
        print(f"Received found item data: {data}")  # Debug logging
        
        new_item = {
            'id': item_id_counter,
            'name': data.get('name'),
            'description': data.get('description'),
            'date': data.get('date'),
            'location': data.get('location'),
            'contact': data.get('contact'),
            'status': 'found',
            'created_at': datetime.now().isoformat()
        }
        
        found_items.append(new_item)
        item_id_counter += 1
        print(f"Added found item: {new_item}")  # Debug logging
        
        return jsonify(new_item), 201
    except Exception as e:
        print(f"Error adding found item: {str(e)}")
        return jsonify({"error": str(e)}), 400

# Delete a lost item
@app.route('/api/lost-items/<int:item_id>', methods=['DELETE'])
def delete_lost_item(item_id):
    global lost_items
    lost_items = [item for item in lost_items if item['id'] != item_id]
    return jsonify({"message": "Item deleted successfully"})

# Delete a found item
@app.route('/api/found-items/<int:item_id>', methods=['DELETE'])
def delete_found_item(item_id):
    global found_items
    found_items = [item for item in found_items if item['id'] != item_id]
    return jsonify({"message": "Item deleted successfully"})

# Search items
@app.route('/api/search', methods=['GET'])
def search_items():
    query = request.args.get('q', '').lower()
    
    all_items = lost_items + found_items
    results = [
        item for item in all_items
        if query in item['name'].lower() or query in item['description'].lower()
    ]
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

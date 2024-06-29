from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

notes = []

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        return str(e)

@app.route('/add_note', methods=['POST'])
def add_note():
    try:
        note = request.json.get('note')
        notes.append(note)
        return '', 204
    except Exception as e:
        return str(e), 500

@app.route('/get_notes', methods=['GET'])
def get_notes():
    try:
        return jsonify({'notes': notes})
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)

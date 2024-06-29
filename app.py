from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

notes = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_note', methods=['POST'])
def add_note():
    note = request.json.get('note')
    notes.append(note)
    return '', 204

@app.route('/get_notes', methods=['GET'])
def get_notes():
    return jsonify({'notes': notes})

@app.route('/delete_note', methods=['POST'])
def delete_note():
    note_index = request.json.get('index')
    if 0 <= note_index < len(notes):
        notes.pop(note_index)
        return '', 204
    else:
        return 'Not Found', 404

if __name__ == '__main__':
    app.run(debug=True)

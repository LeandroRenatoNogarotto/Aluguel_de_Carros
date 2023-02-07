from flask import Flask, jsonify, request, render_template, Response
app = Flask(__name__)

carros = [
    {
        'id': 1, 
        'modelo': 'Chevette',  
        'marca': 'Chevrolet', 
        'ano': 1988, 
        'observacoes': 'muito foda', 
        'vDiaria': 2.00, 
        'status': 'livre'},
    {
        'id': 2,
        'modelo': 'Opala',
        'marca': 'Chevrolet', 
        'ano': 1991,
        'observacoes': 'mais que foda',
        'vDiaria': 4.00, 
        'status': 'manutencao'},
        
        
        {
        'id': 3, 
        'modelo': 'Fiesta',  
        'marca': 'Ford', 
        'ano': 2002, 
        'observacoes': 'muito foda', 
        'vDiaria': 29.00, 
        'status': 'livre'},
        
        
        
        {
        'id': 4, 
        'modelo': 'Corvette',  
        'marca': 'Chevrolet', 
        'ano': 2010, 
        'observacoes': 'muito foda', 
        'vDiaria': 400.00, 
        'status': 'livre'},
        
        
        {
        'id': 5, 
        'modelo': 'BMW 320',  
        'marca': 'BMW', 
        'ano': 2015, 
        'observacoes': 'muito foda', 
        'vDiaria': 600, 
        'status': 'livre'},]



# GET request to retrieve all contacts
@app.route('/')
def carro():
    return render_template('index.html')

@app.route('/carros', methods=['GET'])
def get_carros():
    if not carros:
        return jsonify({'message':'No contacts founded in server'}), 404
    return jsonify({'carros': carros}), 200

# GET request to retrieve one car
#@app.route('/carros/<int:id>', methods=['get'])
#def get_carro(id):
#    for carro in carros:
#        if id == carro['id']:
#           return jsonify({'carro': carro}),200
#    return jsonify({'message':'car not found'}), 404

@app.route('/carros/<int:id>', methods=['get'])
def get_contact(id):
    for carro in carros:
        if carro['id'] == id:
            return {'carro': carro}

    return Response("400-BAD REQUEST - ID not find", status = 400)


# DELETE request to delete a contact
@app.route('/carros/<int:id>', methods=['DELETE'])
def delete_Carro(id):
    for i,carro in enumerate(carros):
        if carro['id'] == id:
            del carro[i]   
            return jsonify({'message': 'contact deleted'}),200
    return jsonify({'message':'contact not found'}), 404

app.run(debug=True)
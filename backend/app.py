import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import json
import networkx as nx

# Create a Flask instance
app = Flask(__name__)
CORS(app)  # Enable cross-origin resource sharing

# Configure the upload folder
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the uploads folder if it doesn't exist
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# ---------------------- ROUTES ----------------------

@app.route("/", methods=['GET'])
def index():
    return "Hello Flask!"


@app.route("/upload", methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    extension = request.form.get('extension')

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not extension or extension.lower() != 'json':
        return jsonify({'error': 'Only JSON files are supported.'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    try:
        converted_data = convert_to_cytoscape_json(file_path)
        return jsonify({
            'message': 'File uploaded and parsed successfully',
            'converted_data': converted_data
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 400

@app.route('/fetchCytoscape', methods=['GET', 'POST'])
def fetchCytoscape():
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], "file")

    try:
        cytoscape_data = convert_to_cytoscape_json(file_path)
        G = nx.Graph()
        for node in cytoscape_data["elements"]["nodes"]:
            node_id = node["data"]["id"]
            G.add_node(node_id)

        # Add edges
        for edge in cytoscape_data["elements"]["edges"]:
            source = edge["data"]["source"]
            target = edge["data"]["target"]
            G.add_edge(source, target)

        degree_centrality = nx.degree_centrality(G)
        closeness_centrality = nx.closeness_centrality(G)
        betweenness_centrality = nx.betweenness_centrality(G)
        eigenvector_centrality = nx.eigenvector_centrality(G)
        pagerank_centrality = nx.pagerank(G)
        clustering_coeff = nx.clustering(G)
        return jsonify({
            'message': 'File uploaded and parsed successfully',
            'converted_data': cytoscape_data,
            'degree' : degree_centrality, 
            'closeness': closeness_centrality, 
            'betweenness' : betweenness_centrality, 
            'eigenvector' : eigenvector_centrality,  
            'pagerank': pagerank_centrality, 
            'clustering_coeff': clustering_coeff,
            
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 400

    return jsonify({"cytoscape" : cytoscape_data})


@app.route("/get-centralitites" , methods=['GET', 'POST'])
def centralitites():
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], "file")

    try:
        cytoscape_data = convert_to_cytoscape_json(file_path)
        G = nx.Graph()
        for node in cytoscape_data["elements"]["nodes"]:
            node_id = node["data"]["id"]
            G.add_node(node_id)

        # Add edges
        for edge in cytoscape_data["elements"]["edges"]:
            source = edge["data"]["source"]
            target = edge["data"]["target"]
            G.add_edge(source, target)

        degree_centrality = nx.degree_centrality(G)
        closeness_centrality = nx.closeness_centrality(G)
        betweenness_centrality = nx.betweenness_centrality(G)
        eigenvector_centrality = nx.eigenvector_centrality(G)
        pagerank_centrality = nx.pagerank(G)
        clustering_coeff = nx.clustering(G)

    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 400

    return jsonify({'degree' : degree_centrality, 'closeness': closeness_centrality, 'betweenness' : betweenness_centrality, 'eigenvector' : eigenvector_centrality,  'pagerank': pagerank_centrality, 'clustering_coeff': clustering_coeff})


# ---------------------- UTILITY FUNCTIONS ----------------------

def convert_to_cytoscape_json(input_file):
    """
    Converts a given JSON file into Cytoscape.js compatible JSON format.
    """
    try:
        with open(input_file, 'r') as file:
            input_json = json.load(file)
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{input_file}' not found.")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON format: {e}")

    cytoscape_elements = {"nodes": [], "edges": []}

    if not isinstance(input_json, list):
        raise ValueError("Input JSON must be a list of elements.")

    for idx, element in enumerate(input_json):
        try:
            group = element.get("group")
            data = element.get("data", {})

            if not group:
                print(f"Warning: Element at index {idx} missing 'group'. Skipping.")
                continue

            if group == "nodes":
                node_id = data.get("id")
                if not node_id:
                    print(f"Warning: Node at index {idx} missing 'id'. Skipping.")
                    continue

                node = {
                    "data": {
                        "id": node_id,
                        "altered": data.get("altered"),
                        "rank": data.get("rank"),
                        "cited": data.get("cited"),
                        "uniprotdesc": data.get("uniprotdesc"),
                        "isseed": data.get("isseed"),
                        "uniprot": data.get("uniprot"),
                        "isvalid": data.get("isvalid"),
                        "importance": data.get("importance")
                    },
                    "position": element.get("position", {"x": 0, "y": 0})
                }
                cytoscape_elements["nodes"].append(node)

            elif group == "edges":
                source = data.get("source")
                target = data.get("target")
                if not source or not target:
                    print(f"Warning: Edge at index {idx} missing 'source' or 'target'. Skipping.")
                    continue

                edge = {
                    "data": {
                        "id": data.get("id", f"{source}_{target}"),
                        "source": source,
                        "target": target,
                        "altered": data.get("altered"),
                        "rank": data.get("rank"),
                        "cited": data.get("cited"),
                        "uniprotdesc": data.get("uniprotdesc"),
                        "isseed": data.get("isseed"),
                        "uniprot": data.get("uniprot"),
                        "isvalid": data.get("isvalid"),
                        "importance": data.get("importance")
                    }
                }
                cytoscape_elements["edges"].append(edge)

            else:
                print(f"Warning: Unknown group '{group}' at index {idx}. Skipping.")

        except Exception as e:
            print(f"Error processing element at index {idx}: {e}")

    return {"elements": cytoscape_elements}




def sif_to_cytoscape_json(file_path):
    nodes = set()
    edges = []

    with open(file_path, 'r') as file:
        lines = file.readlines()

    for index, line in enumerate(lines, start=1):
        parts = line.strip().split()
        if len(parts) < 3:
            raise ValueError(f"⚠️ Line {index}: Expected 'source interaction target', found '{line.strip()}'.")

        source, interaction, target = parts
        if source == target:
            raise ValueError(f"⚠️ Line {index}: Self-loop detected ('{source}' interacts with itself').")

        nodes.update([source, target])
        edge_id = f"{source}-{interaction}-{target}"

        edges.append({
            "data": {
                "id": edge_id,
                "source": source,
                "target": target,
                "interaction": interaction
            }
        })

    return {
        "elements": {
            "nodes": [{"data": {"id": node}} for node in nodes],
            "edges": edges
        }
    }




# ---------------------- RUN APP ----------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



    
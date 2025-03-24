from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
from fairlearn.metrics import demographic_parity_difference
from sklearn.preprocessing import LabelEncoder
import pickle


app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the pretrained model
MODEL_PATH = "model.pkl"
try:
    model = joblib.load(MODEL_PATH)
    print(f"[LOG] Model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load model: {str(e)}")
    model = None  # Prevents crashes if model is missing

# Store dataset globally to use in multiple routes
global_df = None


@app.route('/upload', methods=['POST'])
def upload_file():
    """Endpoint to analyze bias before and after model predictions"""
    global global_df  # Store uploaded dataset for later use

    try:
        # Validate file and feature input
        if 'file' not in request.files or 'feature' not in request.form:
            return jsonify({"error": "Missing file or feature"}), 400

        file = request.files['file']
        feature = request.form['feature']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if model is None:
            return jsonify({"error": "Model not loaded. Please upload a valid model."}), 500

        # Save and read the file
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        df = pd.read_csv(filepath)

        # Encode categorical columns
        le = LabelEncoder()
        for col in df.select_dtypes(include=['object']).columns:
            df[col] = le.fit_transform(df[col])

        target_col = 'income'  # Adjust based on actual dataset
        if target_col not in df.columns or feature not in df.columns:
            return jsonify({"error": "Invalid dataset or feature"}), 400

        X = df.drop(columns=[target_col])
        y = (df[target_col] == df[target_col].max()).astype(int)

        # Calculate Bias Before Prediction (Using Ground Truth Labels)
        dpd_before = demographic_parity_difference(y, y, sensitive_features=X[feature])

        # Predictions
        y_pred = model.predict(X)

        # Store dataset with predictions
        df["predicted_income"] = y_pred
        global_df = df  # Store for later retrieval

        # Calculate Bias After Prediction
        dpd_after = demographic_parity_difference(y, y_pred, sensitive_features=X[feature])

        # Convert to percentage
        dpd_before_perc = round(dpd_before * 100, 2)
        dpd_after_perc = round(dpd_after * 100, 2)
        bias_reduction = round((dpd_before - dpd_after) / abs(dpd_before) * 100, 2) if dpd_before != 0 else 0

        print(f"[LOG] Bias Before - DPD: {dpd_before_perc}%")
        print(f"[LOG] Bias After - DPD: {dpd_after_perc}%")
        print(f"[LOG] Bias Reduction: {bias_reduction}%")

        return jsonify({
            "Demographic Parity Difference Before": f"{dpd_before_perc}%",
            "Demographic Parity Difference After": f"{dpd_after_perc}%",
            "Bias Reduction (%)": f"{bias_reduction}%"
        })

    except Exception as e:
        print(f"[ERROR] Bias Analysis Failed: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/income-vs-predicted', methods=['GET'])
def get_income_vs_predicted():
    """Returns original income and predicted income for visualization"""
    global global_df

    try:
        if global_df is None or global_df.empty:
            return jsonify({"error": "No data available. Please upload a dataset first."}), 400

        # Ensure required columns exist
        if "income" not in global_df.columns or "predicted_income" not in global_df.columns:
            return jsonify({"error": "Missing required columns: 'income' or 'predicted_income'"}), 400

        # Extract required columns
        data = global_df[["income", "predicted_income"]].reset_index(drop=True)

        # Debugging: Print dataset sample
        print("🔍 Extracted Data Sample:\n", data.head())

        return jsonify({"data": data.to_dict(orient="records")})

    except Exception as e:
        print(f"[ERROR] Failed to fetch income vs predicted income: {str(e)}")
        return jsonify({"error": str(e)}), 500
    



if __name__ == '__main__':
    app.run(debug=True)
# target criminal_model
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("skin_augmented.csv")  # Change this to your dataset path

# Encode categorical columns
le = LabelEncoder()
for col in ["Skin_Tone", "Lesion_Type", "Diagnosis"]:
    if col in df.columns:
        df[col] = le.fit_transform(df[col])

# Create Age Groups as a new feature
df["Age_Group"] = pd.cut(df["Age"], bins=[0, 20, 40, 60, 80, 100], labels=[0, 1, 2, 3, 4])
df["Age_Group"] = le.fit_transform(df["Age_Group"])

# Create interaction feature
df["Skin_Lesion_Interaction"] = df["Skin_Tone"] * df["Lesion_Type"]

# Define final feature set
X = df.drop(columns=["Diagnosis", "Patient_ID", "Age"])
y = df["Diagnosis"]

# Handle class imbalance
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Feature scaling
scaler = StandardScaler()
X_resampled = scaler.fit_transform(X_resampled)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Train RandomForest model
rf_model = RandomForestClassifier(n_estimators=300, max_depth=20, min_samples_split=5, random_state=42)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, y_pred_rf)

# Train XGBoost model
xgb_model = XGBClassifier(n_estimators=200, max_depth=8, learning_rate=0.05, random_state=42, eval_metric='mlogloss')
xgb_model.fit(X_train, y_train)
y_pred_xgb = xgb_model.predict(X_test)
xgb_accuracy = accuracy_score(y_test, y_pred_xgb)

# Determine best model
best_model = rf_model if rf_accuracy > xgb_accuracy else xgb_model
best_accuracy = max(rf_accuracy, xgb_accuracy)
best_model_name = "RandomForest" if rf_accuracy > xgb_accuracy else "XGBoost"

# Save best model
model_filename = f"best_skin_model_{best_model_name}.pkl"
joblib.dump(best_model, model_filename)

print(f"[LOG] Best Model: {best_model_name} with Accuracy: {best_accuracy * 100:.2f}%")
print(f"[LOG] Model saved at {model_filename}. Ready to use!")

import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("dataset.csv")  # Change this to your dataset path

# Encode categorical columns
le = LabelEncoder()
for col in df.select_dtypes(include=['object']).columns:
    df[col] = le.fit_transform(df[col])

target_col = 'income'  # Change this based on your dataset
if target_col not in df.columns:
    raise ValueError(f"Target column '{target_col}' not found in dataset!")

X = df.drop(columns=[target_col])
y = (df[target_col] == df[target_col].max()).astype(int)  # Convert target to binary

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
print("\n[LOG] Training Model...")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
print("[LOG] Model training completed.")

# Save model
model_path = "model.pkl"
joblib.dump(clf, model_path)
print(f"[LOG] Model saved at {model_path}. Ready to use!")

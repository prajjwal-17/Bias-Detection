import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import tensorflow as tf
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric
from aif360.algorithms.preprocessing import Reweighing
from aif360.algorithms.inprocessing import AdversarialDebiasing

# ✅ Step 1: Load Dataset
df = pd.read_csv("criminal_bias_dataset.csv")

# ✅ Step 2: Encode categorical variables
df = pd.get_dummies(df, drop_first=True)

# ✅ Step 3: Define protected attributes and label
protected_attribute = 'Gender'  # Update if needed
target_label = 'Re-Offend'  # Update if needed

# ✅ Step 4: Convert dataset into AIF360 format
binary_dataset = BinaryLabelDataset(
    df=df,
    label_names=[target_label],
    protected_attribute_names=[protected_attribute]
)

# ✅ Step 5: Compute Bias Metrics Before Mitigation
metrics_before = BinaryLabelDatasetMetric(binary_dataset)
bias_before = {
    "Mean Difference": metrics_before.mean_difference(),
    "Disparate Impact": metrics_before.disparate_impact(),
    "Statistical Parity Difference": metrics_before.statistical_parity_difference()
}
print("Bias Metrics Before Mitigation:", bias_before)

# ✅ Step 6: Bias Mitigation using Reweighing
reweighing = Reweighing(
    unprivileged_groups=[{protected_attribute: 0}],
    privileged_groups=[{protected_attribute: 1}]
)
reweighed_dataset = reweighing.fit_transform(binary_dataset)

# ✅ Step 7: Compute Bias Metrics After Mitigation
metrics_after = BinaryLabelDatasetMetric(reweighed_dataset)
bias_after = {
    "Mean Difference": metrics_after.mean_difference(),
    "Disparate Impact": metrics_after.disparate_impact(),
    "Statistical Parity Difference": metrics_after.statistical_parity_difference()
}
print("Bias Metrics After Mitigation:", bias_after)

# ✅ Step 8: Visualize Bias Metrics
fig, ax = plt.subplots()
metrics = list(bias_before.keys())
before_values = list(bias_before.values())
after_values = list(bias_after.values())
ax.bar(metrics, before_values, alpha=0.6, label='Before Mitigation')
ax.bar(metrics, after_values, alpha=0.6, label='After Mitigation')
ax.set_ylabel("Bias Metric Value")
ax.set_title("Bias Comparison Before and After Mitigation")
ax.legend()
plt.xticks(rotation=45)
plt.show()

# ✅ Step 9: Train a Bias-Mitigated Model (Adversarial Debiasing)
sess = tf.compat.v1.Session()
adversarial_model = AdversarialDebiasing(
    privileged_groups=[{protected_attribute: 1}],
    unprivileged_groups=[{protected_attribute: 0}],
    scope_name='debiased_classifier',
    debias=True,
    sess=sess
)
adversarial_model.fit(reweighed_dataset)

# ✅ Step 10: Save Model Correctly
adversarial_model.sess.close()  # Close session before saving
joblib.dump(adversarial_model, "criminal_model.pkl")
print("✅ Model saved successfully as 'criminal_model.pkl'")

# ✅ Step 11: Load Model for Future Use
sess = tf.compat.v1.Session()
model = joblib.load("criminal_model.pkl")
model.sess = sess
print("✅ Model loaded successfully and ready for predictions!")

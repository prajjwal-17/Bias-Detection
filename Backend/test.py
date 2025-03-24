import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Streamlit App Title
st.title("📊 Dynamic Bias Detection System")

# File Uploader
uploaded_file = st.file_uploader("Upload your CSV dataset", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    st.write("### Preview of Dataset:")
    st.dataframe(df.head())

    # Convert categorical income to numeric if exists
    if "income" in df.columns:
        df["income_encoded"] = df["income"].apply(lambda x: 1 if x == ">50K" else 0)

    # Bias Analysis Section
    st.subheader("Bias Analysis")

    # Gender Bias
    if "sex" in df.columns:
        gender_bias = df.groupby(["sex", "income_encoded"]).size().unstack()
        gender_bias = gender_bias.div(gender_bias.sum(axis=1), axis=0)  # Normalize

        st.write("#### Gender Bias in Income Distribution")
        fig, ax = plt.subplots()
        gender_bias.plot(kind="bar", stacked=True, colormap="coolwarm", ax=ax)
        plt.xlabel("Gender")
        plt.ylabel("Proportion")
        plt.title("Income Distribution by Gender")
        st.pyplot(fig)

    # Race Bias
    if "race" in df.columns:
        race_bias = df.groupby(["race", "income_encoded"]).size().unstack()
        race_bias = race_bias.div(race_bias.sum(axis=1), axis=0)  # Normalize

        st.write("#### Race Bias in Income Distribution")
        fig, ax = plt.subplots(figsize=(8, 5))
        race_bias.plot(kind="bar", stacked=True, colormap="viridis", ax=ax)
        plt.xlabel("Race")
        plt.ylabel("Proportion")
        plt.title("Income Distribution by Race")
        st.pyplot(fig)

    # Education & Occupation Bias
    if "education" in df.columns and "occupation" in df.columns:
        st.write("#### Heatmap: Education & Occupation Bias")
        bias_pivot = df.pivot_table(index="education", columns="occupation", values="income_encoded", aggfunc=np.mean)
        
        fig, ax = plt.subplots(figsize=(10, 6))
        sns.heatmap(bias_pivot, cmap="coolwarm", annot=True, linewidths=0.5)
        plt.xlabel("Occupation")
        plt.ylabel("Education Level")
        plt.title("Income Bias by Education & Occupation")
        st.pyplot(fig)
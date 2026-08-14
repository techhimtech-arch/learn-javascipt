# Exploratory Data Analysis (EDA) with Python

> **Difficulty:** ⭐⭐⭐☆☆ (Intermediate)
> **Goal:** Learn how to perform an end-to-end Exploratory Data Analysis (EDA) project on raw data.

---

# 💡 EDA (Exploratory Data Analysis) Kya Hota Hai?

EDA ek **Detective Investigation** ki tarah hai!

Jab aapko ek naya raw dataset milta hai, to aap direct model ya report nahi banate. Pehle aap data ka behavior samajhte ho:
- Shape kya hai? (Kitni Rows x Columns hain)
- Outliers/Extreme values hain kya? (e.g. Someone's age = 250 years!)
- Features ke beech me correlation kya hai?
- Missing values kahan kahan hain?

---

# 🛠️ Complete 6-Step EDA Workflow Code

Here is the exact Python script every Data Analyst runs when starting a new project:

```python
import pandas as pd
import numpy as np

# Step 1: Load Dataset
df = pd.read_csv("retail_sales.csv")

# Step 2: Dimensions & Basic Inspection
print(f"Dataset Shape: {df.shape[0]} Rows x {df.shape[1]} Columns")
print("\n--- Data Types & Non-Null Counts ---")
print(df.info())

# Step 3: Check Duplicates & Null Values
print(f"\nDuplicate Rows: {df.duplicated().sum()}")
print("\nMissing Values per column:")
print(df.isnull().sum())

# Step 4: Summary Statistics
print("\n--- Numerical Summary ---")
print(df.describe())

# Step 5: Data Cleaning
# Drop duplicate rows
df = df.drop_duplicates()

# Fill missing numerical sales with median
df['sales'] = df['sales'].fillna(df['sales'].median())

# Step 6: Finding Key Business Insights
print("\n--- Top 5 Best Selling Product Categories ---")
top_products = df.groupby('category')['sales'].sum().sort_values(ascending=False).head(5)
print(top_products)
```

---

# 📊 Visualizing Patterns with Matplotlib & Seaborn

Data Analyst trends ko dikhane ke liye **Matplotlib** aur **Seaborn** visualization libraries use karte hain:

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Set chart style
sns.set_theme(style="whitegrid")

# 1. Bar Chart: Category-wise Sales
plt.figure(figsize=(8, 5))
sns.barplot(x='category', y='sales', data=df, estimator=sum, palette='viridis')
plt.title("Total Sales by Category")
plt.xlabel("Category")
plt.ylabel("Total Sales (₹)")
plt.show()

# 2. Histogram / Distribution Plot: Customer Age
plt.figure(figsize=(7, 4))
sns.histplot(df['age'], kde=True, color='blue')
plt.title("Customer Age Distribution")
plt.show()
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**EDA (Exploratory Data Analysis) ka main primary objective kya hota hai?**
- A) Database server format karna
- B) Raw data ko explore karke initial patterns, anomalies, aur insights dhoondna
- C) Website ka logo color design karna
- D) Password encryption setup karna

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) Raw data ko explore karke initial patterns, anomalies, aur insights dhoondna**

**Explanation:** EDA data distribution, missing values, outliers, aur variable correlations ko samajhne ka foundational process hai.
</details>

---

### Question 2
**DataFrame `df` me Duplicate rows count karne ke liye konsi combination query correct hai?**
- A) `df.duplicated().sum()`
- B) `df.count_duplicates()`
- C) `df.same_rows()`
- D) `df.unique().count()`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **A) `df.duplicated().sum()`**

**Explanation:** `df.duplicated()` boolean True/False series return karta hai, aur `.sum()` total True duplicates ka count deta hai.
</details>

---

### Question 3
**Numerical data me extreme fake values (jaise Salary = ₹99,00,00,000 jabki baaki logon ki ₹50,000 hai) ko kya kehte hain?**
- A) Null value
- B) Outlier
- C) Primary Key
- D) Foreign Key

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) Outlier**

**Explanation:** Outlier ek aisi data point value hai jo baaki overall pattern se bohot zyada alag (extreme high ya low) hoti hai.
</details>

---

# 🚀 2-Minute Revision Card

- **EDA Steps:** Load → Inspect → Clean → Analyze → Visualize.
- **Inspect:** `df.shape`, `df.info()`, `df.describe()`.
- **Clean:** `df.drop_duplicates()`, `df.fillna()`.
- **Outlier:** Extreme unusual values jo data calculations skew kar sakti hain.
- **Visualization:** Bar charts (Categories comparison), Histograms (Distribution), Line charts (Trends over time).

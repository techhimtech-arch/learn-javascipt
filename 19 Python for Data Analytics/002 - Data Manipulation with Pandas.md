# Data Manipulation with Pandas

> **Difficulty:** ⭐⭐☆☆☆ (Beginner to Intermediate)
> **Goal:** Master Pandas DataFrames, CSV reading, data filtering, missing value handling, and grouping.

---

# 💡 Pandas Library Kya Hai?

Pandas Data Analytics ki sabse powerful Python library hai. Ye Excel Spreadsheet ka Python version hai!

Pandas me 2 main Data Structures hote hain:
1. **Series:** 1-Dimensional Column (Single column of data).
2. **DataFrame:** 2-Dimensional Table (Rows and Columns like Excel sheet).

---

# 🛠️ Step-by-Step Pandas Operations

### 1. Library Import Karo & CSV File Load Karo

```python
import pandas as pd

# Load CSV dataset into a DataFrame (df)
df = pd.read_csv("sales_data.csv")

# Quick Data Inspection
print(df.head())     # First 5 rows
print(df.tail(3))    # Last 3 rows
print(df.info())     # Column names, Data Types & Non-Null counts
print(df.describe()) # Statistical Summary (Mean, Min, Max, Standard Deviation)
```

---

### 2. Data Filtering (Rows Select Karo)

```python
# Rule: Sirf 'Delhi' city aur Sales > 5000 wale records filter karo
delhi_sales = df[(df['city'] == 'Delhi') & (df['sales'] > 5000)]

print(delhi_sales)
```

---

### 3. Handling Missing Data (Null Values Clean Karo)

Data Analyst ke paas aane wale data me missing values (`NaN`) hoti hain. Unhe 2 tareeqon se handle karte hain:

```python
# Check total null values per column
print(df.isnull().sum())

# Option A: Missing rows delete kar do
df_clean = df.dropna()

# Option B: Missing value ko Mean / Zero se fill kar do
df['salary'] = df['salary'].fillna(df['salary'].mean())
```

---

### 4. GroupBy & Aggregations (Pivot Table in Python)

```python
# City-wise total sales & average order spend
city_summary = df.groupby('city').agg({
    'order_id': 'count',
    'sales': ['sum', 'mean']
}).reset_index()

print(city_summary)
```

---

### 5. Creating New Columns

```python
# Calculate Total Order Value including 18% GST Tax
df['total_with_tax'] = df['sales'] * 1.18
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Pandas me CSV file ko read karke DataFrame me load karne ke liye konsa method use hota hai?**
- A) `pd.load_csv()`
- B) `pd.open_csv()`
- C) `pd.read_csv()`
- D) `pd.get_csv()`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **C) `pd.read_csv()`**

**Explanation:** `pd.read_csv("filename.csv")` standard pandas function hai CSV datasets read karne ke liye.
</details>

---

### Question 2
**DataFrame `df` ke pehle 5 rows quick inspect karne ke liye konsa command chalaenge?**
- A) `df.first(5)`
- B) `df.head()`
- C) `df.top()`
- D) `df.show()`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `df.head()`**

**Explanation:** `df.head()` default pehli 5 rows display karta hai.
</details>

---

### Question 3
**Column `age` me missing `NaN` values ko mean value se replace karne ke liye konsa function use karenge?**
- A) `df['age'].dropna()`
- B) `df['age'].fillna(df['age'].mean())`
- C) `df['age'].replace()`
- D) `df['age'].clean()`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `df['age'].fillna(df['age'].mean())`**

**Explanation:** `fillna()` missing null values ko specified value (yahan `mean()`) se impute karta hai.
</details>

---

# 🚀 2-Minute Revision Card

- **Import:** `import pandas as pd`.
- **Read Data:** `df = pd.read_csv("file.csv")`.
- **Inspect:** `df.head()`, `df.info()`, `df.describe()`.
- **Filter:** `df[df['city'] == 'Delhi']`.
- **Clean Nulls:** `df.dropna()` or `df.fillna()`.
- **GroupBy:** `df.groupby('city')['sales'].sum()`.

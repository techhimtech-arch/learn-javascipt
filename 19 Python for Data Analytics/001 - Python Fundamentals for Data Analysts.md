# Python Fundamentals for Data Analysts

> **Difficulty:** ⭐☆☆☆☆ (Absolute Beginner)
> **Goal:** Master core Python concepts required for Data Analytics (Variables, Lists, Dictionaries, Loops, Functions).

---

# 💡 Data Analytics Ke Liye Python Kyun Seekhna Hai?

Python duniya ki **#1 Programming Language** hai Data Science aur Analytics ke liye!

- **Why Python?**
  1. Syntax super simple hai (English ki tarah read kar sakte ho).
  2. Large datasets (100MB+ to GBs) handling automated ho jati hai.
  3. Built-in Data Libraries (Pandas, NumPy, Matplotlib, Seaborn).

---

# 🐍 Core Python Fundamentals

### 1. Variables & Data Types
Data store karne ke containers:

```python
# Customer Profile Data
customer_name = "Amit Sharma"    # String (Text)
age = 28                          # Integer (Whole Number)
salary = 65000.50                 # Float (Decimal)
is_prime_member = True            # Boolean (True/False)

print(f"{customer_name} is {age} years old.")
```

---

### 2. Lists (Data Sets & Sequences)
Multiple items ko single variable me array ki tarah store karna.

```python
# Monthly Sales Amounts in Rupees
sales = [12000, 15000, 18000, 22000, 25000]

# List Operations
print(sales[0])        # First element: 12000
print(sum(sales))      # Total Sales: 92000
print(len(sales))      # Total Months: 5
print(max(sales))      # Highest Sales: 25000
```

---

### 3. Dictionaries (Key-Value Data Records)
JSON ya SQL Row ki tarah structured record:

```python
customer = {
    "name": "Priya Kapoor",
    "city": "Mumbai",
    "total_orders": 12,
    "spent": 14500.00
}

# Accessing Dictionary Values
print(customer["name"])  # Priya Kapoor
print(customer["spent"]) # 14500.0
```

---

### 4. For Loops (Automation)
Repeated tasks ko automate karna:

```python
sales_data = [4000, 7000, 12000, 3000, 9000]

# High-Value Sales Filter (> 5000)
for amount in sales_data:
    if amount > 5000:
        print(f"High Value Order Detected: ₹{amount}")
```

---

### 5. Custom Functions (Reusable Analysis Code)
Code duplication se bachne ke liye reusable blocks:

```python
def calculate_discount(price, customer_type):
    if customer_type == "VIP":
        return price * 0.80  # 20% Discount
    else:
        return price * 0.95  # 5% Discount

print(calculate_discount(1000, "VIP"))     # 800.0
print(calculate_discount(1000, "Regular")) # 950.0
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Python me Key-Value pair representation (jaise `"city": "Delhi"`) ke liye konsa data structure use hota hai?**
- A) List
- B) Tuple
- C) Dictionary
- D) Set

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **C) Dictionary**

**Explanation:** Python Dictionary `{key: value}` pairs me data store karti hai.
</details>

---

### Question 2
**`sales = [10, 20, 30, 40]` list ka length/count pta karne ke liye konsa function correct hai?**
- A) `count(sales)`
- B) `len(sales)`
- C) `size(sales)`
- D) `length(sales)`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `len(sales)`**

**Explanation:** `len()` built-in function list, string, dictionary ki length return karta hai.
</details>

---

### Question 3
**Python code `print(10 > 5 and 3 < 1)` ka output kya hoga?**
- A) True
- B) False
- C) None
- D) Error

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) False**

**Explanation:** `10 > 5` True hai, lekin `3 < 1` False hai. `and` operator me dono condition True honi zaroori hoti hain, isliye final output `False` aayega.
</details>

---

# 🚀 2-Minute Revision Card

- **Data Types:** `str`, `int`, `float`, `bool`.
- **List `[ ]`:** Ordered sequence (`sales[0]`).
- **Dictionary `{ }`:** Key-Value records (`customer["city"]`).
- **Loops:** Repeated data processing.
- **Functions (`def`):** Reusable logic blocks.

# SQL Basics for Beginners (SELECT, WHERE, ORDER BY)

> **Difficulty:** ⭐☆☆☆☆ (Absolute Beginner)
> **Goal:** Master the fundamentals of Structured Query Language (SQL), RDBMS, and basic querying statements.

---

# 💡 SQL Kya Hai Aur Analyst Ke Liye Kyun Mandatory Hai?

Excel me max 10 Lakh rows ka data aa sakta hai. Lekin Swiggy, Amazon, aur Netflix ke paas **Billions of rows** ka data hota hai.

Bade datasets Excel me load nahi ho sakte. Unhe special software me store kiya jata hai jise **RDBMS (Relational Database Management System)** bolte hain (e.g. MySQL, PostgreSQL, SQL Server, Snowflake).

> **SQL (Structured Query Language):** Database se baat karne ki bhasha! Jaise aap Waiter ko bolte ho *"1 Pasta lao"*, vaise hi SQL se bolte ho *"Database, mujhe Delhi ke top 50 customers ka data do!"*

---

# 🗄️ Database Table Structure

Database me Data Tables (Rows & Columns) me rehta hai:

**Table Name:** `customers`

| customer_id | first_name | city | total_orders | total_spent |
|---|---|---|---|---|
| 101 | Rahul | Delhi | 15 | 4500 |
| 102 | Priya | Mumbai | 8 | 2100 |
| 103 | Amit | Delhi | 25 | 12000 |
| 104 | Sneha | Bangalore | 3 | 900 |

---

# 🛠️ Top 4 SQL Core Commands

### 1. SELECT & FROM (Columns Choose Karo)
Database se specific columns pull karne ke liye.

```sql
-- Saare columns dekhne ke liye (*)
SELECT * 
FROM customers;

-- Specific columns dekhne ke liye
SELECT first_name, city, total_spent 
FROM customers;
```

---

### 2. WHERE Clause (Filtering Rows)
Condition lagakar specific rows filter karo.

```sql
-- Rule: Sirf Delhi ke customers filter karo
SELECT first_name, city, total_spent
FROM customers
WHERE city = 'Delhi';

-- Multiple conditions (AND / OR)
SELECT first_name, total_spent
FROM customers
WHERE city = 'Delhi' AND total_spent > 5000;
```

---

### 3. ORDER BY (Sorting Results)
Results ko Ascending (A-Z, 1-100) ya Descending (Z-A, 100-1) order me sort karna.

```sql
-- High to Low spenders (Descending = DESC)
SELECT first_name, total_spent
FROM customers
ORDER BY total_spent DESC;
```

---

### 4. LIMIT (Top N Rows Only)
Result set me rows count restrict karna (e.g. Top 3 highest spenders).

```sql
SELECT first_name, total_spent
FROM customers
ORDER BY total_spent DESC
LIMIT 3;
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Database table `customers` se sabhi columns aur rows select karne ke liye konsi SQL query correct hai?**
- A) `GET ALL FROM customers;`
- B) `SELECT * FROM customers;`
- C) `SHOW TABLE customers;`
- D) `FETCH ALL customers;`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `SELECT * FROM customers;`**

**Explanation:** SQL me `SELECT *` asterisk ka matalab hota hai "Select All Columns".
</details>

---

### Question 2
**Aapko top 5 highest spending customers chahiye. SQL Query ka correct order kya hoga?**
- A) `LIMIT 5 ORDER BY total_spent DESC WHERE city = 'Delhi'`
- B) `SELECT * FROM customers WHERE city = 'Delhi' ORDER BY total_spent DESC LIMIT 5;`
- C) `ORDER BY total_spent DESC SELECT * FROM customers;`
- D) `WHERE total_spent DESC LIMIT 5;`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `SELECT * FROM customers WHERE city = 'Delhi' ORDER BY total_spent DESC LIMIT 5;`**

**Explanation:** SQL execution order me standard syntax sequence hota hai: `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`.
</details>

---

### Question 3
**SQL me strings / text values ko kis mark me enclose kiya jata hai?**
- A) Curved brackets `(Delhi)`
- B) Single quotes `'Delhi'`
- C) Dollar signs `$Delhi$`
- D) Square brackets `[Delhi]`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) Single quotes `'Delhi'`**

**Explanation:** SQL standard syntax me literal text/string filtering ke liye single quotes `'value'` use hote hain.
</details>

---

# 🚀 2-Minute Revision Card

- **SELECT:** Columns select karne ke liye.
- **FROM:** Table name specify karne ke liye.
- **WHERE:** Row level filtering (`city = 'Delhi' AND spent > 5000`).
- **ORDER BY col DESC/ASC:** Data sort karne ke liye.
- **LIMIT n:** Result restrict karne ke liye (e.g. Top 10).
- **Execution Order:** `FROM` → `WHERE` → `SELECT` → `ORDER BY` → `LIMIT`.

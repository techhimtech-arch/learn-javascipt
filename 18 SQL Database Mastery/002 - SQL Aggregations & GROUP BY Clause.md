# SQL Aggregations & GROUP BY Clause

> **Difficulty:** ⭐⭐☆☆☆ (Beginner to Intermediate)
> **Goal:** Master SQL Aggregate Functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) and `GROUP BY` with `HAVING`.

---

# 💡 SQL Aggregations (Summary Functions)

Aggregate functions multiple rows ki values par calculation karke single summarized result dete hain.

| Function | What it does | Example Query |
|---|---|---|
| **COUNT()** | Total rows/items count karta hai | `SELECT COUNT(*) FROM orders;` |
| **SUM()** | Numbers ka total addition karta hai | `SELECT SUM(order_amount) FROM orders;` |
| **AVG()** | Average value calculate karta hai | `SELECT AVG(order_amount) FROM orders;` |
| **MIN()** | Smallest value dhoondta hai | `SELECT MIN(order_amount) FROM orders;` |
| **MAX()** | Largest value dhoondta hai | `SELECT MAX(order_amount) FROM orders;` |

---

# 🛠️ GROUP BY Clause (Grouping Categories)

Jaise Excel me Pivot Table category-wise total karta hai, SQL me **GROUP BY** vahi kaam karta hai!

### Real-World Business Query:
*"Har City se total kitne customers hain aur unka total revenue kitna hai?"*

```sql
SELECT 
    city,
    COUNT(customer_id) AS total_customers,
    SUM(total_spent) AS total_revenue,
    AVG(total_spent) AS avg_customer_spend
FROM customers
GROUP BY city
ORDER BY total_revenue DESC;
```

**Output Result:**

| city | total_customers | total_revenue | avg_customer_spend |
|---|---|---|---|
| Delhi | 450 | 18,50,000 | 4,111 |
| Mumbai | 380 | 15,20,000 | 4,000 |
| Bangalore | 290 | 12,90,000 | 4,448 |

---

# 🛑 WHERE vs HAVING (The Ultimate Interview Confusion)

Beginners hamesha **WHERE** aur **HAVING** me confuse hote hain. Clear distinction samjho:

- **WHERE:** Rows ko group hone se **PEHLE** filter karta hai (Individual Row filter).
- **HAVING:** Aggregate metrics par group hone ke **BAAD** filter karta hai (Group Level filter).

### Real-world Query:
*"Un Cities ka total revenue dikhao jahan total revenue ₹15 Lakh se zyada hai aur customer count > 100 hai."*

```sql
SELECT 
    city,
    COUNT(customer_id) AS total_customers,
    SUM(total_spent) AS total_revenue
FROM customers
WHERE country = 'India'              -- 1. Individual row filter
GROUP BY city                       -- 2. Category Grouping
HAVING SUM(total_spent) > 1500000;   -- 3. Filter on Aggregation result!
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Agar aapko SQL me category-wise total sales calculate karni hai, to query me kis clause ka hona mandatory hai?**
- A) `ORDER BY`
- B) `GROUP BY`
- C) `LIMIT`
- D) `JOIN`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `GROUP BY`**

**Explanation:** Non-aggregated columns (e.g. `category`) ke saath `SUM()` ya `COUNT()` aggregate function use karne ke liye `GROUP BY` mandatory hota hai.
</details>

---

### Question 2
**`SUM(sales) > 50000` jaise aggregate calculation result par condition lagane ke liye kiska use karte hain?**
- A) `WHERE`
- B) `HAVING`
- C) `LIKE`
- D) `SELECT`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `HAVING`**

**Explanation:** `WHERE` clause aggregate functions (`SUM`, `COUNT`, `AVG`) par direct condition allow nahi karta. Aggregate outputs ko filter karne ke liye `HAVING` clause ka upayog kiya jata hai.
</details>

---

### Question 3
**Table me active status wale orders ka average amount nikalne ke liye correct aggregate expression kya hai?**
- A) `AVG(amount)`
- B) `MEAN(amount)`
- C) `SUM(amount)`
- D) `COUNT(amount)`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **A) `AVG(amount)`**

**Explanation:** SQL me average calculate karne ke liye standard function name `AVG()` hota hai.
</details>

---

# 🚀 2-Minute Revision Card

- **Aggregates:** `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
- **GROUP BY:** Categorical summary tables banane ke liye (`GROUP BY city`).
- **WHERE vs HAVING:**
  - `WHERE` = Filter individual rows *before* grouping.
  - `HAVING` = Filter aggregated groups *after* `GROUP BY`.
- **Golden Rule:** `SELECT` me agar non-aggregate column hai (`city`) aur aggregate bhi hai (`SUM(spent)`), to `city` hamesha `GROUP BY` me hona zaroori hai!

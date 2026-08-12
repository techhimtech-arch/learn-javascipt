# SQL Joins Masterclass (INNER, LEFT, RIGHT, FULL)

> **Difficulty:** ⭐⭐⭐☆☆ (Intermediate)
> **Goal:** Understand relational tables and master SQL Joins with clear diagrams and real-world queries.

---

# 💡 SQL Joins Kya Hote Hain? (Real-World Analogy)

Real-world databases me saara data ek badi table me nahi rakha jata (kyunki redundancy aur data waste hoti hai). Data alag-alag related tables me divided hota hai:

- **Table 1 (`customers`):** `customer_id`, `name`, `email`
- **Table 2 (`orders`):** `order_id`, `customer_id`, `product_name`, `amount`

Dono tables me **`customer_id`** common connection key hai jise **Foreign Key** bolte hain.

> **SQL JOIN:** Multiple tables ko kisi common key ke basis par jodkar ek single output result banane ko **JOIN** kehte hain.

---

# 🖼️ Visual Guide: The 4 Types of SQL Joins

```
1. INNER JOIN (Common Matches Only)          2. LEFT JOIN (All Left + Matching Right)
   ┌───────┐     ┌───────┐                      ┌───────█████┐     ┌───────┐
   │ Table │     │ Table │                      │ Table █████│     │ Table │
   │   A   │█████│   B   │                      │   A   █████│█████│   B   │
   └───────┘     └───────┘                      └───────█████┘     └───────┘

3. RIGHT JOIN (Matching Left + All Right)    4. FULL OUTER JOIN (Everything)
   ┌───────┐     ┌█████───────┐                 ┌████████████┐     ┌████████████┐
   │ Table │     │█Table      │                 │Table A     │     │Table B     │
   │   A   │█████│█  B        │                 │            │█████│            │
   └───────┘     └█████───────┘                 └████████████┘     └████████████┘
```

---

# 🛠️ SQL Joins Syntax & Queries

### 1. INNER JOIN (Only Matching Records)
Sirf un customers ko dikhayega jinhone kam se kam 1 Order place kiya hai.

```sql
SELECT 
    c.customer_id, 
    c.name, 
    o.order_id, 
    o.amount
FROM customers c
INNER JOIN orders o 
    ON c.customer_id = o.customer_id;
```

---

### 2. LEFT JOIN (All Customers + Order Details if Any)
Saare customers dikhayega. Agar kisi customer ne order nahi bhi kiya, to bhi uska name aayega aur order columns me `NULL` dikhega.

```sql
SELECT 
    c.customer_id, 
    c.name, 
    o.order_id, 
    o.amount
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id;
```

> **Pro Analyst Use Case:** *"Find customers who registered but NEVER placed an order!"*
> ```sql
> SELECT c.name, c.email
> FROM customers c
> LEFT JOIN orders o ON c.customer_id = o.customer_id
> WHERE o.order_id IS NULL;
> ```

---

### 3. RIGHT JOIN (All Orders + Customer Details)
Saare orders dikhayega, chahe customer table me detail ho ya nahi.

---

### 4. FULL OUTER JOIN (Complete Combined Set)
Dono tables ka poora combined data dikhayega. Unmatched records ke samne `NULL` print hoga.

---

# 📊 Quick Reference Table

| Join Type | What it returns | Use Case |
|---|---|---|
| **INNER JOIN** | Only matching records from both tables | Active purchasing customers |
| **LEFT JOIN** | ALL rows from Left table + matches from Right table | Identifying inactive users / non-purchasers |
| **RIGHT JOIN** | ALL rows from Right table + matches from Left table | Auditing orphaned transaction records |
| **FULL JOIN** | ALL rows from both tables | Complete data audit across departments |

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Agar aapko un saare Registered Customers ki list nikalni hai jinhone kabhi koi order nahi banaya, to konsa Join best rahega?**
- A) `INNER JOIN`
- B) `LEFT JOIN` (with `WHERE order_id IS NULL`)
- C) `RIGHT JOIN`
- D) `CROSS JOIN`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `LEFT JOIN` (with `WHERE order_id IS NULL`)**

**Explanation:** `LEFT JOIN` Left table (`customers`) ke saare users rakhta hai. Unmatched orders par `NULL` aata hai, isliye `WHERE order_id IS NULL` se inactive users instant mil jaate hain.
</details>

---

### Question 2
**`INNER JOIN` ka output kya hoga agar Table A me 5 IDs hain aur Table B me sirf 3 matching IDs hain?**
- A) 8 rows
- B) 5 rows
- C) 3 rows
- D) 0 rows

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **C) 3 rows**

**Explanation:** `INNER JOIN` sirf aur sirf exact matching rows return karta hai. Isliye 3 matching records hi final output me aayenge.
</details>

---

### Question 3
**SQL Join query me `ON c.customer_id = o.customer_id` statement ka kya role hai?**
- A) Output row limit set karna
- B) Both tables ke beech connection key / matching logic define karna
- C) Database delete karna
- D) Order amount sum karna

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) Both tables ke beech connection key / matching logic define karna**

**Explanation:** `ON` clause JOIN key (Primary Key / Foreign Key relationship) specify karta hai.
</details>

---

# 🚀 2-Minute Revision Card

- **INNER JOIN:** Sirf common/matching rows.
- **LEFT JOIN:** Left table ke saare rows + matching Right table rows.
- **RIGHT JOIN:** Right table ke saare rows + matching Left table rows.
- **FULL JOIN:** Dono tables ke sabhi rows.
- **Analyst Shortcut:** `LEFT JOIN` + `WHERE right_id IS NULL` = Inactive / Missing records finder!

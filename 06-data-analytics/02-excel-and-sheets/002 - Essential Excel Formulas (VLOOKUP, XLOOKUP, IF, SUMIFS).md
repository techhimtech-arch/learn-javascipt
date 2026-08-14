# Essential Excel Formulas (VLOOKUP, XLOOKUP, IF, SUMIFS)

> **Difficulty:** ⭐⭐☆☆☆ (Beginner to Intermediate)
> **Goal:** Master the top 4 Excel formulas asked in every Data Analyst interview.

---

# 💡 1. VLOOKUP & XLOOKUP (Data Lookup Master)

Imagine aapke paas 2 Tables hain:
- **Table 1:** Customer ID + Customer Name
- **Table 2:** Customer ID + Total Purchase Amount

Aapko Table 1 me Customer Name ke aage uska Purchase Amount lana hai. Iske liye hum **Lookup Formulas** use karte hain!

---

### VLOOKUP Formula Syntax:
`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`

```excel
=VLOOKUP(A2, Sheet2!A:C, 3, FALSE)
```
- `A2`: Kya dhoondna hai? (e.g. `Customer_ID = 101`)
- `Sheet2!A:C`: Kahan dhoondna hai?
- `3`: Konsi column number ki value chahiye? (3rd Column)
- `FALSE`: Exact Match ke liye.

> ⚠️ **VLOOKUP Limit:** VLOOKUP sirf Right-side ki columns look-up kar sakta hai. Left-side look up nahi kar sakta.

---

### XLOOKUP (Modern Excel Ka Superpower 🚀)
XLOOKUP modern Excel me VLOOKUP aur INDEX-MATCH dono ko replace kar chuka hai!

Syntax: `=XLOOKUP(lookup_value, lookup_array, return_array)`

```excel
=XLOOKUP(A2, Customers!A:A, Customers!C:C)
```
- `A2`: Customer ID.
- `Customers!A:A`: Jisme Customer ID search karni hai.
- `Customers!C:C`: Jis column se answer fetch karna hai (chahe Left ho ya Right!).

---

# 💡 2. Logical IF & Nested IF

Jab condition ke basis par value return karni ho.

Syntax: `=IF(condition, value_if_true, value_if_false)`

### Example: Pass/Fail Logic
```excel
=IF(B2 >= 40, "PASS", "FAIL")
```
Agar Marks (B2) 40 ya usse zyada hain to `"PASS"`, warna `"FAIL"`.

### Example: Customer Tier Discount (Nested IF)
```excel
=IF(B2 > 10000, "Gold Customer - 20% Off", IF(B2 > 5000, "Silver Customer - 10% Off", "Regular Customer"))
```

---

# 💡 3. Conditional Aggregations (SUMIFS & COUNTIFS)

Business reports me hamesha specific conditions par sum ya count chahiye hota hai.

### SUMIFS (Sum with multiple conditions)
Syntax: `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)`

**Real-world Query:** *"Delhi city me Total iPhone Sales kitni hui?"*
```excel
=SUMIFS(C:C, A:A, "Delhi", B:B, "iPhone")
```
- `C:C`: Sales Amount column (jis par total karna hai).
- `A:A`: City column (`"Delhi"` condition).
- `B:B`: Product column (`"iPhone"` condition).

### COUNTIFS (Count with multiple conditions)
**Real-world Query:** *"Delhi me kitne customers ne > ₹50,000 purchase kiya?"*
```excel
=COUNTIFS(A:A, "Delhi", C:C, ">50000")
```

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**XLOOKUP formula me konsa main advantage hai jo classic VLOOKUP me NAHI tha?**
- A) XLOOKUP se file save jaldi hoti hai
- B) XLOOKUP Left ki taraf (pehle wali columns) look up kar sakta hai
- C) XLOOKUP sirf numbers par chalta hai
- D) XLOOKUP me uppercase text kaam nahi karta

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) XLOOKUP Left ki taraf look up kar sakta hai**

**Explanation:** VLOOKUP me Lookup column hamesha table ki pehli (leftmost) column honi zaroori hoti thi. XLOOKUP me left/right dono direction me search kar sakte hain.
</details>

---

### Question 2
**Mumbai city me total Sales amount calculate karne ke liye konsa formula use hoga?**
- A) `=COUNTIF(City, "Mumbai")`
- B) `=SUMIF(City, "Mumbai", Sales)`
- C) `=AVERAGE(Sales)`
- D) `=LOOKUP("Mumbai")`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `=SUMIF(City, "Mumbai", Sales)`**

**Explanation:** `SUMIF` ek single condition (City = "Mumbai") ke basis par numeric sales values ka Total Sum karta hai.
</details>

---

### Question 3
**`=IF(Sales > 5000, "Bonus", "No Bonus")` me agar Sales = 5000 hai, to output kya hoga?**
- A) Bonus
- B) No Bonus
- C) ERROR
- D) 0

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) No Bonus**

**Explanation:** Condition `Sales > 5000` hai (Greater than 5000). Kyunki 5000 is not strictly greater than 5000, isliye false condition (`"No Bonus"`) return hoga. Agar `>=` hota to `"Bonus"` milta.
</details>

---

# 🚀 2-Minute Revision Card

- **VLOOKUP(lookup, table, col_num, FALSE):** Right side search exact match.
- **XLOOKUP(lookup, lookup_col, return_col):** Modern lookup (Left & Right search).
- **IF(condition, true_val, false_val):** Logical decision making.
- **SUMIFS(sum_col, cond_col1, val1, cond_col2, val2):** Multi-condition addition.
- **COUNTIFS(cond_col1, val1, cond_col2, val2):** Multi-condition item counting.
